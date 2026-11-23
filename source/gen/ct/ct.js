
/* «Контакты»: форма обратного звонка на странице */
(function(){var f=document.getElementById("ctCbForm");if(!f)return;f.addEventListener("submit",function(e){e.preventDefault();f.hidden=true;document.querySelector(".ct-cb-ok").hidden=false})})();

/* реквизиты: скопировать */
(function(){var b=document.getElementById("rqCopy");if(!b)return;b.addEventListener("click",function(){var t=[].map.call(document.querySelectorAll(".ct-rq-l>div"),function(d){var dd=d.querySelector("dd").cloneNode(true);[].forEach.call(dd.querySelectorAll(".pm"),function(x){x.remove()});return d.querySelector("dt").textContent+": "+dd.textContent.trim()}).join("\n");
 var done=function(){var s=b.querySelector("span");s.textContent="Скопировано";setTimeout(function(){s.textContent="Скопировать реквизиты"},1800)};
 if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fb()})}else fb();
 function fb(){var a=document.createElement("textarea");a.value=t;document.body.appendChild(a);a.select();try{document.execCommand("copy")}catch(e){}a.remove();done()}})})();
