/* ===== Аренда: каталог, прайс, заработок, подбор, шаги, вопросы ===== */
(function(){
var W=function(t){return '<span class="mq-wait">'+t+'</span>'};
/* Ultraformer MPT — из прототипа «Аренды»; фото пока Ultraformer III */
if(!DEVS.some(function(d){return d.n==="Ultraformer MPT"})){DEVS.push({n:"Ultraformer MPT",t:"SMAS-лифтинг нового поколения",m:{day:["от 35 ₽","за линию","посуточно — сверить"],hour:["от 35 ₽","за линию"]},
  rows:[["По линиям",[["Базовая цена","40 ₽ за линию"],["Больше линий","35 ₽ за линию"]],"Чем больше линий, тем дешевле линия.","пороги скидки уточнить"]]});
  RCIMG.push("dv-ufmpt");DVZ.push([178,6])}
var MPT=DEVS.length-1;
var ORDER=[0,2,MPT,3,4,5];
function nm(k){return k===0?"InMode":DEVS[k].n}
var FM={all:{h:"Все аппараты",d:"Посуточно — привезём аппарат в вашу клинику. Почасово — приходите со своим пациентом в пространство ПИМС на Кременчугской."},
  day:{h:"Посуточно",p:"от 14 000 ₽*",d:"Привезём аппарат в вашу клинику утром, установим и проверим при вас. Он у вас 24 часа, оплата — после рабочего дня."},
  hour:{h:"Почасово",p:"от 7 500 ₽",d:"Приходите со своим пациентом в пространство ПИМС на Кременчугской — расходники и документы на месте. Удобно, чтобы попробовать аппарат или проверить спрос."}};
var rcF="all";
function ks(f){return ORDER.filter(function(k){return f==="all"||DEVS[k].m[f]})}
var PRT='<button type="button" class="rc-all ar-prt" data-pr><span class="tl-tx"><span class="mkh-all-k">Прайс</span><b>Весь прайс <span class="nw">на&nbsp;аренду<svg class="ic chv"><use href="#i-chev-r"/></svg></span></b><span>Сутки, часы, линии, импульсы, скидки и&nbsp;абонементы — по&nbsp;каждому аппарату</span></span></button>';
function rcRender(){var r=$("#hmRent");if(!r||!window.RCF)return;
  r.innerHTML=ks(rcF).map(window.RCF).join("");
  var d=$("#rcD");if(d)d.textContent=FM[rcF].d;
  $$("#rcF button").forEach(function(b){var on=b.dataset.f===rcF;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)});
  }
document.addEventListener("click",function(e){var b=e.target.closest("#rcF [data-f]");if(b){rcF=b.dataset.f;rcRender()}});
/* стрелки ленты каталога */
(function(){var tr=$("#hmRent"),nav=$$("#rent [data-rn]");if(!tr||!nav.length)return;
  window.arNav=function(){var mx=tr.scrollWidth-tr.clientWidth-2;nav[0].disabled=tr.scrollLeft<=2;nav[1].disabled=tr.scrollLeft>=mx};
  nav.forEach(function(b){b.addEventListener("click",function(){var c=tr.querySelector(".rc");tr.scrollBy({left:(c.offsetWidth+12)*+b.dataset.rn,behavior:"smooth"})})});
  tr.addEventListener("scroll",function(){requestAnimationFrame(arNav)},{passive:true});window.addEventListener("resize",arNav)})();
rcRender();

/* окно «Весь прайс»: вкладки по аппаратам */
var prK=0;
function prCard(k){var d=DEVS[k];
  return '<article class="ar-prc"><div class="ar-prc-h"><span class="ar-prc-im"><img src="media/'+(k===0?"dv-inmode3":RCIMG[k])+'.webp" alt=""></span><span><b>'+nm(k)+'</b><span>'+d.t+'</span></span></div><div class="ar-prc-g">'+d.rows.map(function(r){return '<div class="ar-prc-r"><i>'+r[0]+'</i><ul>'+r[1].map(function(x){return '<li><span>'+x[0]+'</span><b>'+x[1]+'</b></li>'}).join("")+'</ul>'+(r[2]?'<p>'+r[2]+(r[3]?'<span class="pm">'+r[3]+'</span>':'')+'</p>':'')+'</div>'}).join("")+
    (d.tips?'<div class="ar-prc-r"><i>Насадки — оплачиваются отдельно</i><ul>'+d.tips.map(function(x){return '<li><span>'+x[0]+'</span><b>'+x[1]+'</b></li>'}).join("")+'</ul></div>':'')+'</div>'+
    '<div class="ar-prc-b"><a class="btn btn-red" href="'+tg("Здравствуйте! Хочу арендовать "+nm(k)+". Подскажите условия.")+'" target="_blank" rel="noopener"><svg class="ic"><use href="#i-tg"/></svg>Арендовать '+nm(k)+'</a><button type="button" class="btn btn-out" data-dev="'+k+'">Подробнее об аппарате</button></div></article>'}
function prShow(i){prK=i;$$("#prTabs button").forEach(function(b,n){b.classList.toggle("on",n===i)});$("#prBody").innerHTML=prCard(ORDER[i])+'<p class="ar-prm-ft">* От 14 000 ₽ в сутки — BeeLift.</p>'}
function openPr(){$("#prTabs").innerHTML=ORDER.map(function(k,i){return '<button type="button" data-pk="'+i+'">'+nm(k)+'</button>'}).join("");prShow(prK);
  var M=$("#prModal");M.hidden=false;document.documentElement.style.overflow="hidden"}
document.addEventListener("click",function(e){var b=e.target.closest("#prTabs [data-pk]");if(b)prShow(+b.dataset.pk);var d=e.target.closest("#prModal [data-dev]");if(d){$("#prModal").hidden=true}});
document.addEventListener("click",function(e){if(e.target.closest("[data-pr]")){e.preventDefault();openPr()}});
(function(){var M=$("#prModal");if(!M)return;document.body.appendChild(M);M.addEventListener("click",function(e){if(e.target===M||e.target.closest("[data-x]")){M.hidden=true;document.documentElement.style.overflow=""}});
  document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!M.hidden){M.hidden=true;document.documentElement.style.overflow=""}})})();

/* таблица заработка: строка открывает окно аппарата на вкладке «Заработок» */
var ERR=[{k:"m8",d:0,s:"InMode · посуточно в клинике"},{k:"lum",d:0,s:"InMode · посуточно в клинике"},{k:"uf",d:2,s:"посуточно в клинике · по линиям"},
  {n:"Morpheus8",d:0,s:"InMode · почасово в ПИМС",cost:7500+11000,cs:"час 7 500 ₽ + насадка 11 000 ₽",p:45000,q:"сколько пациентов успевают за час?"},
  {n:"Volnewmer",d:3,s:"почасово в ПИМС · за импульсы",cost:"от 85 ₽",cs:"за импульс"},{n:"BeeLift",d:4,s:"почасово в ПИМС · за линии",cost:"14 ₽",cs:"за линию"},
  {n:"Heleo 4",d:5,s:"в клинике на 2 недели",cost:"35 000 ₽",cs:"за 2 недели"}];
var EIMG={m8:"hp-m8",lum:"hp-lum"};
function eCell(lb,b,sm,cls){return '<span class="ar-er-c'+(cls?' '+cls:'')+'" role="cell" data-lb="'+lb+'"><b>'+b+'</b>'+(sm?'<small>'+sm+'</small>':'')+'</span>'}
function eRow(n,sub,d,img,c1,c2,c3,wait){return '<div class="ar-er-r'+(wait?' wait':'')+'" role="row" tabindex="0" data-er="'+d+'"><span class="ar-er-n" role="cell"><span class="ar-er-im"><img src="media/'+img+'.webp" alt="" loading="lazy"></span><span><b>'+n+'</b><small>'+sub+'</small></span></span>'+c1+c2+c3+'<i class="ar-er-go" aria-hidden="true"><svg class="ic chv"><use href="#i-chev-r"/></svg></i></div>'}
function erRows(){var t=$("#erT");if(!t)return;
  t.innerHTML=ERR.map(function(r){var img=r.k&&EIMG[r.k]?EIMG[r.k]:RCIMG[r.d];
    if(r.k){var c=CALC[r.k],e=ex(r.k),cd=c.fix.map(function(f){return (/^Аренда/.test(f[0])?"аренда":f[0])+" "+fmt(f[1])+" ₽"});
      if(c.per)cd.push(r.k==="uf"?"по 1 000 линий на пациента":"насадки "+fmt(c.per[1]*c.pt)+" ₽");
      return eRow(c.n,r.s,r.d,img,eCell("Аренда и расходники",fmt(e.cost)+" ₽",cd.join(" + ")),eCell("Выручка",fmt(e.rev)+" ₽",c.pt+" "+plP(c.pt)+" × "+fmt(c.p)+" ₽"),eCell("Остаётся вам",fmt(e.net)+" ₽","","net"))}
    if(r.p)return eRow(r.n,r.s,r.d,img,eCell("Аренда и расходники",fmt(r.cost)+" ₽",r.cs),eCell("Выручка",fmt(r.p)+" ₽","1 пациент × "+fmt(r.p)+" ₽"),eCell("Остаётся вам",fmt(r.p-r.cost)+" ₽",'с одного пациента<span class="pm">'+r.q+'</span>',"net"));
    return eRow(r.n,r.s,r.d,img,eCell("Аренда и расходники",r.cost,r.cs),eCell("Выручка",W("ждём")),eCell("Остаётся вам",W("ждём"),'<span class="pm">цена процедуры — у ПИМС</span>',"net"),1)}).join("")}
erRows();
function erOpen(r){openDev(+r.dataset.er);
  setTimeout(function(){var tb=document.querySelector('#dvBd [data-t="earn"]');if(tb)tb.click()},30)}
$("#erT").addEventListener("click",function(e){var r=e.target.closest("[data-er]");if(r)erOpen(r)});
$("#erT").addEventListener("keydown",function(e){var r=e.target.closest("[data-er]");if(r&&(e.key==="Enter"||e.key===" ")){e.preventDefault();erOpen(r)}});
/* гайд: цифры из тех же примеров */
(function(){var g=$(".ar-gd ul");if(!g)return;g.innerHTML=["m8","lum","uf"].map(function(k){return '<li><i>'+CALC[k].n+'</i><em>'+fmt(ex(k).net)+' ₽</em></li>'}).join("")})();

/* подбор аппарата: три вопроса → готовое сообщение менеджеру */
var MG={hour:{k:"Почасово",h:"Хотите поработать уже сегодня?",t:"Свободные окна для почасовой аренды появляются каждый день. Ответьте на три вопроса — менеджер подскажет ближайшее время и подберёт аппарат под вашу процедуру.",
    n:"Абонементы: 5 часов — 32 500 ₽, 10 часов — 55 000 ₽, действуют 2 месяца.",q:"Когда удобно прийти?",w:["Сегодня","Завтра","На этой неделе"]},
  day:{k:"Посуточно в вашей клинике",h:"Нужен аппарат на конкретную дату?",t:"Ответьте на три вопроса — менеджер проверит, свободен ли аппарат, и подберёт насадки под ваши процедуры.",
    n:"Чем чаще аренда, тем дешевле: от 2 аренд в месяц InMode с одной манипулой — 30 000 ₽ в любой день.",q:"Когда нужен аппарат?",w:["На этой неделе","В выходные","Позже"]},
  any:{k:"Посуточно или почасово",h:"Не знаете, какой аппарат выбрать?",t:"Ответьте на три вопроса — менеджер подберёт аппарат и формат, проверит свободные дни и время.",
    n:"Почасово — абонементы на 5 и 10 часов. Посуточно — дешевле от 2 аренд в месяц.",q:"Когда хотите начать?",w:["Сегодня","На этой неделе","Позже"]}};
var QF=[["day","Посуточно","в вашей клинике · от 14 000 ₽ в сутки"],["hour","Почасово","в пространстве ПИМС · от 7 500 ₽ в час"],["any","Пока не знаю","менеджер подскажет, что удобнее"]];
var QFS={day:"Посуточно в вашей клинике",hour:"Почасово",any:"Пока не знаю"};
var mgS={f:"day",fc:true,w:-1,d:-1,step:0};
function mgDevK(f){return ks(f==="any"?"all":f)}
function mgDevs(f){return mgDevK(f).map(nm).concat(["Подберите мне"])}
var QIC={day:"i-truck",hour:"i-clock",any:"i-chat"};
function qzIc(id){return '<i class="ar-qz-ic"><svg><use href="#'+id+'"/></svg></i>'}
function qzIm(k){return k==null?'<i class="ar-qz-ic ar-qz-q">?</i>':'<i class="ar-qz-im"><img src="media/'+(k===0?"dv-inmode3":RCIMG[k])+'.webp" alt=""></i>'}
function mgText(){var m=MG[mgS.f],a=(m.w[mgS.w]||m.w[0]).toLowerCase(),ds=mgDevs(mgS.f),d=ds[mgS.d]||ds[ds.length-1],pick=d==="Подберите мне";
  if(mgS.f==="hour")return "Здравствуйте! Хочу поработать почасово в ПИМС — "+a+(pick?". Помогите подобрать аппарат и время.":", на "+d+". Какое время свободно?");
  if(mgS.f==="day")return "Здравствуйте! Нужен аппарат в клинику — "+a+(pick?". Помогите подобрать аппарат.":": "+d+". Свободен ли он?");
  return pick?"Здравствуйте! Хочу арендовать аппарат — "+a+". Помогите подобрать аппарат и формат.":"Здравствуйте! Хочу арендовать "+d+" — "+a+". Подскажите, когда он свободен и в каком формате удобнее."}
function qzOpt(i,j,on,b,sm,ic){return '<button type="button" data-qa="'+i+'" data-qv="'+j+'"'+(on?' class="on"':'')+'>'+(ic||'')+'<span><b>'+b+'</b>'+(sm?'<small>'+sm+'</small>':'')+'</span><svg class="ic chv" aria-hidden="true"><use href="#i-chev-r"/></svg></button>'}
function qzBody(){var m=MG[mgS.f],s=mgS.step;
  var head='<div class="ar-qz-h"><span>'+(s<3?'Шаг '+(s+1)+' из 3':'Готово')+'</span><span class="ar-qz-bar">'+[0,1,2].map(function(i){return '<i'+(i<s||(i===s&&s<3)||s>=3?' class="on"':'')+'></i>'}).join("")+'</span>'+(s>0?'<button type="button" class="ar-qz-bk" data-qb><svg class="ic chv ui-flip"><use href="#i-chev-r"/></svg>Назад</button>':'')+'</div>';
  if(s===0)return head+'<h4>Где будете работать?</h4><div class="ar-qz-o">'+QF.map(function(x,j){return qzOpt(0,j,mgS.fc&&x[0]===mgS.f,x[1],x[2],qzIc(QIC[x[0]]))}).join("")+'</div>';
  if(s===1)return head+'<h4>'+m.q+'</h4><div class="ar-qz-o">'+m.w.map(function(x,j){return qzOpt(1,j,mgS.w===j,x,'',qzIc(/Сегодня/.test(x)?'i-clock':'i-cal'))}).join("")+'</div>';
  if(s===2)return head+'<h4>Какой аппарат?</h4><div class="ar-qz-o c2">'+mgDevs(mgS.f).map(function(x,j){var kk=mgDevK(mgS.f);return qzOpt(2,j,mgS.d===j,x,'',qzIm(j<kk.length?kk[j]:null))}).join("")+'</div>';
  var ds=mgDevs(mgS.f);
  return head+'<h4>Отправьте менеджеру</h4><ul class="ar-qz-s"><li><span>Формат</span><b>'+QFS[mgS.f]+'</b></li><li><span>Когда</span><b>'+m.w[mgS.w]+'</b></li><li><span>Аппарат</span><b>'+ds[mgS.d]+'</b></li></ul>'+
    '<div class="ar-qz-b"><a class="btn btn-red" href="'+tg(mgText())+'" target="_blank" rel="noopener"><svg class="ic"><use href="#i-tg"/></svg>Отправить в Telegram</a><a class="btn btn-out" href="#" data-wa><svg class="ic"><use href="#i-wa"/></svg>WhatsApp</a></div>'+
    '<p class="ar-qz-n">Откроется чат с менеджером — сообщение с вашим выбором уже будет готово, останется отправить.</p>'}
var MGC=MG.any;
function mg2(anim){var h=$("#hours");if(!h)return;
  if(!h.firstChild||!$(".ar-mg-r",h)){h.innerHTML='<div class="ar-mg-l"><span class="chip chip-lime">'+MGC.k+'</span><h3>'+MGC.h+'</h3><p>'+MGC.t+'</p><p class="ar-mg-n">'+MGC.n+'</p><div class="ar-mg-mgr"><img src="media/av-marina.jpg" alt=""><span><b>Марина</b>менеджер ПИМС</span></div></div><div class="ar-mg-r"><div class="ar-qz-in"></div></div>'}
  var r=$(".ar-qz-in",h);if(anim&&r.animate){r.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateY(-6px)"}],{duration:160,easing:"ease-in"}).onfinish=function(){r.innerHTML=qzBody();r.animate([{opacity:0,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:280,easing:"cubic-bezier(.22,.61,.36,1)"})}}else r.innerHTML=qzBody()}
mg2(false);
var qzBusy=false;
$("#hours").addEventListener("click",function(e){if(qzBusy)return;if(e.target.closest("[data-qb]")){mgS.step=Math.max(0,mgS.step-1);mg2(true);return}
  var b=e.target.closest("[data-qa]");if(!b)return;var i=+b.dataset.qa,v=+b.dataset.qv;
  $$("[data-qa]",b.parentNode).forEach(function(x){x.classList.toggle("on",x===b)});qzBusy=true;
  setTimeout(function(){if(i===0){var f=QF[v][0];if(f!==mgS.f){mgS.w=-1;mgS.d=-1}mgS.f=f;mgS.fc=true;mgS.step=1}else if(i===1){mgS.w=v;mgS.step=2}else{mgS.d=v;mgS.step=3}mg2(true);setTimeout(function(){qzBusy=false},460)},340)});

/* как проходит аренда */
var HW={day:{d:"От брони до вывоза аппарата — без лишних хлопот для вас и вашей клиники.",img:"fg-buy-inst.jpg",alt:"Установка аппарата в кабинете врача",b:"Забронировать дату",
    t:"Здравствуйте! Хочу забронировать дату для аренды аппарата в клинику.",
    s:[["Бронируете дату","Пишете менеджеру, какой аппарат и на какой день нужен. Бронь закрепляет дату за вами."],
      ["Привозим и устанавливаем",'Утром, бесплатно, по адресу вашей клиники в Санкт-Петербурге.<span class="pm">зона доставки — уточнить</span>'],
      ["Подписываем документы","Договор аренды и акт приёма-передачи. Проверяем аппарат при вас."],
      ["Работаете со своими пациентами","Аппарат у вас целые сутки."],
      ["Оплачиваете и возвращаете",'После работы — аренду и расходники по <span class="nw">QR-коду</span> или счёту. Мы забираем аппарат.']]},
  hour:{d:"Приходите со своим пациентом — аппарат, расходники и документы уже на месте.",img:"hero-rent-v.jpg",alt:"Врач с пациентом в пространстве ПИМС",b:"Забронировать время",
    t:"Здравствуйте! Хочу забронировать время для почасовой аренды.",
    s:[["Бронируете время","Пишете менеджеру, какой аппарат и когда. Он подскажет свободные окна."],
      ["Приходите с пациентом","В день процедуры — в пространство ПИМС на Кременчугской. Аппарат готов, расходники на месте."],
      ["Оформляем документы",'На месте, перед процедурой.<span class="pm">какие документы, чья лицензия — уточнить</span>'],
      ["Работаете","Столько часов, сколько забронировали. Если приходите часто — выгоднее абонемент."],
      ["Оплачиваете",'Часы, линии или импульсы — смотря какой аппарат.<span class="pm">как и когда — уточнить</span>']]}};
var hwF="day";
function hwSet(f){var h=HW[f];hwF=f;$("#hwDd").textContent=h.d;$("#hwS").innerHTML=h.s.map(function(x){return '<li><b>'+x[0]+'</b><span>'+x[1]+'</span></li>'}).join("");
  $("#hwPh").innerHTML='<img src="media/'+h.img+'" alt="'+h.alt+'"><em class="ctg ctg-v"><b>Временно</b>· из Telegram</em>';
  var a=$("#hwGo");a.href=tg(h.t);a.lastChild.textContent=h.b;
  $$(".ar-hw-t button").forEach(function(b){var on=b.dataset.hw===f;b.classList.toggle("on",on);b.setAttribute("aria-selected",on)})}
hwSet("day");
document.addEventListener("click",function(e){var b=e.target.closest(".ar-hw-t [data-hw]");if(b)hwSet(b.dataset.hw)});

/* частые вопросы — группы, плавное раскрытие */
var FAQ=[
  ["Почасово или посуточно — что выбрать?","<p>Почасово — если хотите попробовать аппарат, работаете на выезде или пациентов пока немного: работаете в пространстве ПИМС, расходники и документы на месте.</p><p>Посуточно — если у вас свой кабинет и за день набирается 5–10 пациентов: привезём аппарат к вам.</p>"],
  ["Кто может арендовать?",'<p>Частные врачи и клиники.<span class="pm">какие документы нужны: диплом, сертификат, лицензия клиники?</span></p>'],
  ["Можно сначала проверить спрос, а потом покупать свой аппарат?","<p>Да, так делают и клиники: берут аппарат в аренду, когда пациенты спрашивают конкретную процедуру, и покупают свой, когда спрос подтвердился.</p>"],
  ["Я ещё не работал на этом аппарате",'<p>Начните с мастер-класса: теория со спикером и практика на своей модели. После обучения — −15% на почасовую аренду.</p>'],
  ["Кто привозит и устанавливает аппарат?",'<p>Мы: утром привозим аппарат, бесплатно устанавливаем и проверяем его при вас.<span class="pm">только Петербург или область тоже?</span></p>'],
  ["Что входит в аренду?","<p>Аппарат на 24 часа, доставка, установка и вывоз. Насадки InMode и расходники оплачиваются отдельно — их цены в окне аппарата.</p>"],
  ["Что, если аппарат сломается?","<p>"+W("ждём ответ ПИМС")+"</p>"],
  ["Какой минимальный срок?",'<p>Посуточно — от одних суток, Heleo 4 — от 2 недель. Почасово — от часа.<span class="pm">сверить</span></p>'],
  ["Как оплатить?","<p>После рабочего дня — по QR-коду или счёту: за аренду и расходники.</p>"],
  ["Есть ли скидки?","<p>Да. InMode посуточно: от 2 аренд в месяц — 30 000 ₽ с одной манипулой и 40 000 ₽ с двумя, от 4 аренд — 30 000 и 35 000 ₽. Для почасовой работы — абонементы на 5 и 10 часов.</p>"],
  ["Есть ли аренда в других городах?",'<p>Сейчас — в Санкт-Петербурге.<span class="pm">Самара и другие города — уточнить</span></p>']];
var FAQG=[["Перед арендой",[0,1,2,3]],["Доставка и день аренды",[4,5,6,7]],["Оплата и скидки",[8,9,10]]];
var fq=$("#mqFaq");
if(fq){fq.innerHTML=FAQG.map(function(g){return '<span class="ar-fq-g">'+g[0]+'</span>'+g[1].map(function(k){var q=FAQ[k];return '<details class="mq-q'+(k===0?' on':'')+'"'+(k===0?' open':'')+'><summary>'+q[0]+'<i aria-hidden="true"></i></summary><div class="mq-q-a"><div class="mq-q-i">'+q[1]+'</div></div></details>'}).join("")}).join("");
 var RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches,D=420,E="cubic-bezier(.22,.61,.36,1)";
 function shut(d){if(!d.open)return;var a=d.querySelector(".mq-q-a");d.classList.remove("on");if(RM){d.open=false;return}
  var h=a.offsetHeight;var an=a.animate([{height:h+"px",opacity:1},{height:"0px",opacity:0}],{duration:D,easing:E});an.onfinish=function(){if(!d.classList.contains("on"))d.open=false}}
 function show(d){var a=d.querySelector(".mq-q-a");d.open=true;d.classList.add("on");if(RM)return;var h=a.offsetHeight;a.animate([{height:"0px",opacity:0},{height:h+"px",opacity:1}],{duration:D,easing:E})}
 fq.addEventListener("click",function(e){var sm=e.target.closest("summary");if(!sm)return;e.preventDefault();var d=sm.parentNode;
  if(d.classList.contains("on"))shut(d);else{[].forEach.call(fq.querySelectorAll("details.on"),shut);show(d)}})}

/* закреплённая кнопка «Выбрать аппарат» */
(function(){var b=document.getElementById("mqStk");if(!b||!("IntersectionObserver" in window))return;
 var vis={},ids=["arhero","rent","quiz","contacts"];
 function upd(){b.classList.toggle("on",!ids.some(function(k){return vis[k]}))}
 var io=new IntersectionObserver(function(es){es.forEach(function(e){vis[e.target.id]=e.isIntersecting});upd()},{threshold:0,rootMargin:"0px 0px -10% 0px"});
 ids.forEach(function(k){var el=document.getElementById(k);if(el)io.observe(el)})})();
})();
