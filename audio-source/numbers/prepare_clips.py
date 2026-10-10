"""Cut verified complete number batches. Refuse ambiguous segment counts."""
from pathlib import Path
import hashlib, json, re, subprocess, wave, tempfile
ROOT = Path(__file__).resolve().parent

def intervals(path, threshold):
    out = subprocess.run(['ffmpeg','-hide_banner','-i',str(path),'-af',f'silencedetect=noise=-38dB:d={threshold}','-f','null','-'],capture_output=True,text=True,check=True).stderr
    with wave.open(str(path)) as w:
        duration=w.getnframes()/w.getframerate()
    silent=[];start=0
    for kind,value in re.findall(r'silence_(start|end): ([0-9.]+)',out):
        if kind=='start':start=float(value)
        else:silent.append((start,float(value)))
    if 'silence_start' in out and out.rfind('silence_start')>out.rfind('silence_end'):silent.append((start,duration))
    speech=[];cursor=0
    for a,b in silent:
        if a-cursor>.16:speech.append((max(0,cursor-.10),min(duration,a+.14)))
        cursor=b
    if duration-cursor>.16:speech.append((max(0,cursor-.10),duration))
    return speech

def main():
    manifest=json.loads((ROOT/'manifest.json').read_text())
    for language in ('bn','en'):
        for first in (1,51):
            name=f'{language}-{first:03}-{first+49:03}';path=ROOT/'batches'/f'{name}.wav'
            if not path.exists():continue
            candidates=[(d,intervals(path,d)) for d in (.55,.7,.85,1.0,1.2)]
            matching=[(d,x) for d,x in candidates if len(x)==50]
            if not matching:raise RuntimeError(f'{name}: ambiguous speech segments {[(d,len(x)) for d,x in candidates]}; inspect before cutting')
            threshold,segments=matching[0]
            (ROOT/'batches'/f'{name}-boundaries.json').write_text(json.dumps({'silenceThresholdSeconds':threshold,'segments':segments},indent=2)+'\n')
            for item,(a,b) in zip(manifest['items'][language][first-1:first+49],segments):
                rel=f"clips/{language}/{item['id']}.mp3";dest=ROOT/rel
                # AI Studio WAV byte-rate can disagree with PCM format. Slice by sample frames,
                # not ffmpeg input seeking, and write a canonical WAV header for each cut.
                with tempfile.NamedTemporaryFile(suffix='.wav') as temp:
                    with wave.open(str(path)) as source:
                        source.setpos(round(a*source.getframerate()))
                        pcm=source.readframes(round((b-a)*source.getframerate()))
                        with wave.open(temp.name,'wb') as cut:
                            cut.setparams(source.getparams());cut.writeframes(pcm)
                    subprocess.run(['ffmpeg','-v','error','-y','-i',temp.name,'-af','loudnorm=I=-19:TP=-2:LRA=7','-ar','24000','-ac','1','-b:a','96k',str(dest)],check=True)
                item.update(file=rel,source=f'batches/{name}.wav',start=a,end=b,sha256=hashlib.sha256(dest.read_bytes()).hexdigest(),review='Listening review pending')
    done=sum('file' in i for group in manifest['items'].values() for i in group)
    manifest['status']=f'{done}/200 clips prepared; pronunciation review pending'
    (ROOT/'manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    print(manifest['status'])
if __name__=='__main__':main()
