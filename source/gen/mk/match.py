import subprocess,numpy as np,glob,sys
def frames(f,w,h,fps):
    out=subprocess.run(['ffmpeg','-v','error','-i',f,'-vf',f'fps={fps},scale={w}:{h},format=gray','-f','rawvideo','-'],capture_output=True).stdout
    return np.frombuffer(out,np.uint8).reshape(-1,h,w).astype(np.float32)
t=frames('/home/claude/pims/design/media/hero-mk.mp4',72,36,1)[1]
best=[]
for f in glob.glob('/mnt/user-data/uploads/ChatExport_2026-10-23--video_files/*'):
    if f.endswith('.jpg'): continue
    try: fr=frames(f,72,128,2)
    except Exception as e: continue
    for i,F in enumerate(fr):
        for y in range(0,128-36+1,2):
            m=((F[y:y+36]-t)**2).mean()
            best.append((m,f.split('/')[-1],i/2,y))
best.sort();print(best[:5])
