import re
import os
SRC=os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)),'..','..'))+'/'
D=SRC+'design/'
S=SRC+'gen/'
s=open(D+'glavnaya.src.html',encoding='utf-8').read()
def rr(a,b,n=1):
    global s
    c=s.count(a); assert c==n,(c,a[:120]); s=s.replace(a,b)
s=re.sub(r'Главная · дизайн v0\.\d+','Контакты · дизайн v0.4',s)
s=re.sub(r'<title>[^<]*</title>','<title>ПИМС — Контакты</title>',s,count=1)
rr('''        <a href="#top" class="on">Главная</a>
        <a href="https://claude.ai/artifact/MgEtoEobnKeekMLqn8AYn1" target="_blank" rel="noopener">Мастер-классы</a>
        <a href="https://claude.ai/artifact/URE4EdpPvRcacf6s7UaLmV" target="_blank" rel="noopener">Аренда</a>''',
'''        <a href="https://claude.ai/artifact/BTTAFfknzxJcR5ME3dqsDj" target="_blank" rel="noopener">Главная</a>
        <a href="https://claude.ai/artifact/MgEtoEobnKeekMLqn8AYn1" target="_blank" rel="noopener">Мастер-классы</a>
        <a href="https://claude.ai/artifact/URE4EdpPvRcacf6s7UaLmV" target="_blank" rel="noopener">Аренда</a>''')
m=re.search(r'<nav class="pnav" id="pnav"[^>]*>.*?</nav>',s,flags=re.S)
s=s.replace(m.group(0),'''<nav class="pnav" id="pnav" aria-label="Разделы страницы">
        <a href="#top">Адрес</a>
        <a href="#contacts">Связаться</a>
        <a href="#requisites">Реквизиты</a>
      </nav>''')
for sid in ['hm','about','mk','atm','rent','buy','preps-b','way','reviews','start']:
    m=re.search(r'<section class="([^"]*)"( id="%s")'%re.escape(sid),s); assert m,sid
    s=s.replace(m.group(0),'<section class="%s mk-off"%s'%(m.group(1),m.group(2)),1)
HERO=open(S+'ct/hero.html',encoding='utf-8').read()
rr('<main id="top">\n','<main id="top">\n'+HERO)
mm=re.search(r'<section[^>]*id="contacts"[^>]*>.*?\n</section>\n',s,flags=re.S); c=mm.group(0); s=s.replace(c,'',1)
FORM=open(S+'ct/form.html',encoding='utf-8').read()
i=c.index('<div class="ct2-ph ct-mapc">'); j=c.rindex('    </div>\n  </div>\n</section>')
c=c[:i]+FORM+c[j:]
# v0.3: без макапа телефона и «Обратного звонка»; телефон — в строку с кнопками
import re as _re
c=_re.sub(r'\s*<div class="cphone".*?</div></div></div>\n','\n',c,count=1,flags=_re.S)
assert 'cphone' not in c
c=c.replace('<i class="ct-dv" aria-hidden="true"></i>','').replace('<button class="ct-cbl" data-call><svg aria-hidden="true"><use href="#i-phone"/></svg>Обратный звонок</button>','')
assert 'ct-cbl' not in c
k1=c.index('<div class="ct-ms">'); k2=c.index('<div class="ct-ph2">'); k3=c.index('</div>',c.index('</span>',k2))+6
ms=c[k1:c.index('</div>',k1)+6]; ph=c[k2:k3]
c=c[:k1]+'<div class="ct-row">'+ms+ph+'</div>'+c[k1+len(ms):k2]+c[k3:]
c=c.replace('<section class="sec" id="contacts">','<section class="sec ct-pg" id="contacts">')
BL=open(S+'ct/blocks.html',encoding='utf-8').read()
k=s.index('</section>',s.index('id="cthero"'))+len('</section>\n')
s=s[:k]+c+'\n'+BL+'\n'+s[k:]
CSS=open(S+'mk/mk.css',encoding='utf-8').read()+'\n'+open(S+'ar/ar.css',encoding='utf-8').read()+'\n'+open(S+'ct/ct.css',encoding='utf-8').read()
i=s.index('</style>',s.index('</style>')+1)
s=s[:i]+'\n'+CSS+'\n'+s[i:]
JS=open(S+'ct/ct.js',encoding='utf-8').read()
j=s.rindex('})();',0,s.index('</script>',s.index('var $=function')))
s=s[:j]+'\n'+JS+'\n'+s[j:]
rr('h.classList.toggle("team-off",st.tm2!=="on");','h.classList.toggle("team-off",st.tm2!=="on");h.classList.add("mkx-l","m3bg","mk3sw");h.classList.remove("mkx-d");')
s=s.replace('pims-home-v21','pims-ct-v1')
open(D+'kontakty.src.html','w',encoding='utf-8').write(s)
print('ok',len(s))
