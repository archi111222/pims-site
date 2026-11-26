import re
import os
SRC=os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))+'/'
D=SRC+'design/'
s=open(D+'glavnaya.src.html',encoding='utf-8').read()
def rr(a,b,n=1):
    global s
    c=s.count(a); assert c==n,(c,a[:120]); s=s.replace(a,b)
VER='Мастер-классы · дизайн v0.51'
s=re.sub(r'Главная · дизайн v0\.\d+',VER,s)
s=re.sub(r'<title>[^<]*</title>','<title>ПИМС — Мастер-классы</title>',s,count=1)
# header nav
rr('''        <a href="#top" class="on">Главная</a>
        <a href="https://claude.ai/artifact/MgEtoEobnKeekMLqn8AYn1" target="_blank" rel="noopener">Мастер-классы</a>''',
'''        <a href="https://claude.ai/artifact/BTTAFfknzxJcR5ME3dqsDj" target="_blank" rel="noopener">Главная</a>
        <a href="#top" class="on">Мастер-классы</a>''')
m=re.search(r'<nav class="pnav" id="pnav"[^>]*>.*?</nav>',s,flags=re.S)
s=s.replace(m.group(0),'''<nav class="pnav" id="pnav" aria-label="Разделы страницы">
        <a href="#schedule">Расписание</a>
        <a href="#price">Стоимость</a>
        <a href="#formats">Форматы</a>
        <a href="#atm">Как проходят</a>
        <a href="#speakers">Спикеры</a>
        <a href="#faq">Вопросы</a>
        <a href="#contacts">Контакты</a>
      </nav>''')
# hide home sections
for sid in ['hm','mk','model']:
    m=re.search(r'<section class="([^"]*)"( id="%s")'%re.escape(sid),s); assert m,sid
    s=s.replace(m.group(0),'<section class="%s mk-off"%s'%(m.group(1),m.group(2)),1)
HERO=open(SRC+'gen/mk/hero.html',encoding='utf-8').read()
rr('<main id="top">\n','<main id="top">\n'+HERO)
rr('</main>','</main>\n<a class="mq-stk" id="mqStk" href="#schedule"><i class="mk3-live" aria-hidden="true"></i>Смотреть ближайшие мастер-классы<svg class="ic"><use href="#i-chev-r"/></svg></a>')
ORDER=['atm','reviews','way','about','rent','buy','preps-b','contacts','start']
blk={}
for sid in ORDER:
    mm=re.search(r'<section[^>]*id="%s"[^>]*>.*?\n</section>\n'%re.escape(sid),s,flags=re.S); assert mm,sid
    blk[sid]=mm.group(0); s=s.replace(mm.group(0),'',1)
k=s.index('\n</section>\n',s.index('id="schedule"'))+len('\n</section>\n')
BL=open(SRC+'gen/mk/blocks.html',encoding='utf-8').read()
for mm in re.finditer(r'<section[^>]*id="([^"]+)"[^>]*>.*?\n</section>\n',BL,flags=re.S): blk[mm.group(1)]=mm.group(0)
SEQ=['price','formats','atm','reviews','speakers','after','faq','lead','way','preps-b','contacts','about','rent','buy','start']
HOME=['about','rent','buy','start']
for x in HOME: blk[x]=re.sub(r'<section class="',r'<section class="mk-home ',blk[x],count=1)
s=s[:k]+'\n'.join(blk[x] for x in SEQ)+s[k:]
# css: duplicate #mk card rules for #schedule
css_add=[]
for line in s.split('\n'):
    if '#mk ' in line and '{' in line and line.rstrip().endswith('}') and '<' not in line:
        css_add.append(line.replace('#mk ','#schedule '))
CSS=open(SRC+'gen/mk/mk.css',encoding='utf-8').read()
i=s.index('</style>',s.index('</style>')+1)
s=s[:i]+'\n/* MK: правила карточек #mk для #schedule */\n'+'\n'.join(css_add)+'\n'+CSS+'\n'+s[i:]
JS=open(SRC+'gen/mk/mk.js',encoding='utf-8').read()
j=s.rindex('})();',0,s.index('</script>',s.index('var $=function')))
s=s[:j]+'\n'+JS+'\n'+s[j:]
rr('<div class="proto-r"><span>Фото команды</span>','<div class="proto-r"><span>Доп. блоки с Главной</span><div class="seg" data-k="mkhm"><button data-v="off" class="on">скрыть</button><button data-v="on">показать</button></div></div>\n    <div class="proto-r"><span>Карточка «Ближайший»</span><div class="seg" data-k="mknx"><button data-v="auto" class="on">из расписания</button><button data-v="long">длинное название</button></div></div>\n    <div class="proto-r"><span>Фон обложки</span><div class="seg" data-k="m3bg"><button data-v="on" class="on">красный</button><button data-v="off">белый</button></div></div>\n    <div class="proto-r"><span>Аппарат на обложке</span><div class="seg" data-k="mkdv"><button data-v="off" class="on">нет</button><button data-v="on">InMode</button></div></div>\n    <div class="proto-r"><span>Видео на обложке</span><div class="seg" data-k="mksw"><button data-v="on" class="on">справа</button><button data-v="off">слева</button></div></div>\n    <div class="proto-r"><span>Фото команды</span>')
rr('tm2:"off",min:true};','tm2:"off",mkx:"l",m3bg:"on",mksw:"on",mkdv:"off",mknx:"auto",mkhm:"off",min:true};')
rr('h.classList.toggle("team-off",st.tm2!=="on");','h.classList.toggle("team-off",st.tm2!=="on");h.classList.add("mkx-l");h.classList.remove("mkx-d");h.classList.toggle("m3bg",st.m3bg!=="off");h.classList.toggle("mk3sw",st.mksw!=="off");h.classList.toggle("mkdv",st.mkdv==="on");h.classList.toggle("mknxl",st.mknx==="long");h.classList.toggle("mkhm",st.mkhm==="on");')
s=s.replace('pims-home-v21','pims-mk-v30')
open(D+'mk.src.html','w',encoding='utf-8').write(s)
print('ok',len(css_add))
