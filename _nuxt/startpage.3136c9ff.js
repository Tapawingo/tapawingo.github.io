import{d,k as s,l as a,m as t,G as u,H as m,t as c,r as p,o as f,C as k,q as _,I as g,J as w}from"./entry.0cd80060.js";const v={class:"nav-container"},b={class:"nav-subtitle"},y=["href"],x=d({__name:"StartPageNav",props:{links:{type:Array,default:[]}},setup(l){return(i,h)=>(s(),a("nav",null,[t("div",v,[(s(!0),a(u,null,m(l.links,e=>(s(),a("ul",null,[t("a",b,c(e.title),1),(s(!0),a(u,null,m(e.links,o=>(s(),a("li",null,[t("a",{href:o.href},c(o.mask),9,y)]))),256))]))),256))])]))}}),C=""+globalThis.__publicAssetsURL("img/widgetCover.jpg");const N={id:"main_window",class:"widget"},S=t("img",{class:"widget-picture",src:C},null,-1),D={class:"widget-content"},M=t("h1",{class:"widget-title"},"Tapawingo",-1),A={class:"widget-date"},q=t("div",{class:"widget-search"},[t("form",{action:"https://duckduckgo.com/",method:"GET",autocomplete:"off"},[t("label",{for:"q"},">"),t("input",{autofocus:"",id:"q",name:"q",type:"search",placeholder:"search with duckduckgo..."})])],-1),O=d({__name:"startpage",setup(l){const i=p(""),h={links:[{title:"Uni",links:[{href:"https://innsida.ntnu.no/start#/feed/",mask:"Innsida NTNU"},{href:"https://fsweb.no/studentweb/index.jsf",mask:"Studentweb"},{href:"https://ntnu.blackboard.com/ultra/",mask:"Blackboard"},{href:"https://capquiz.math.ntnu.no/",mask:"CapQuiz"},{href:"https://www.microsoft365.com/apps?auth=2",mask:"Office 365"},{href:"https://outlook.office.com/mail/",mask:"Mail"}]},{title:"Media",links:[{href:"https://www.netflix.com/browse",mask:"Netflix"},{href:"https://www.youtube.com/",mask:"YouTube"},{href:"https://aniwave.to",mask:"AniWave"}]},{title:"4Chan",links:[{href:"https://4chan.org/wsg/",mask:"/wsg/"},{href:"https://4chan.org/k/",mask:"/k/"},{href:"https://4chan.org/g/",mask:"/g/"}]},{title:"Devshits",links:[{href:"https://github.com/",mask:"GitHub"},{href:"https://stackoverflow.com/",mask:"Stack Overflow"},{href:"https://ocw.mit.edu/search/?d=Electrical%20Engineering%20and%20Computer%20Science&s=department_course_numbers.sort_coursenum",mask:"OpenCourseWare"},{href:"https://app.diagrams.net/",mask:"draw.io"}]},{title:"Others",links:[{href:"https://catbox.moe/",mask:"Catbox"},{href:"http://localhost",mask:"localhost"},{href:"https://www.dev.to/",mask:"DEV"}]}]};return f(()=>{setInterval(()=>{var e="",o=new Array("January","February","March","April","May","June","July","August","September","October","November","December"),r=new Date,n=new Date;e+=o[r.getMonth()]+" "+n.getDate()+", "+r.getFullYear()+" | "+("0"+n.getHours()).slice(-2)+":"+("0"+n.getMinutes()).slice(-2)+":"+("0"+n.getSeconds()).slice(-2),i.value=e},1e3)}),(e,o)=>{const r=x;return s(),a("div",N,[S,t("div",D,[M,t("div",A,c(k(i)),1),q,_(r,g(w(h)),null,16)])])}}});export{O as default};
