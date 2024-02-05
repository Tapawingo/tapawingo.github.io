var U=Object.defineProperty;var Y=(t,e,s)=>e in t?U(t,e,{enumerable:!0,configurable:!0,writable:!0,value:s}):t[e]=s;var l=(t,e,s)=>(Y(t,typeof e!="symbol"?e+"":e,s),s);import{z as S,A as z,B as G,r as M,C as K,d as I,o as R,k as p,l as m,m as n,t as T,q as y,v as E,F as O,D as P,j as q,E as L,G as D,H as k,I as Q}from"./entry.9857394d.js";import{I as A}from"./iconify.e289ad74.js";import{u as J}from"./index.1a28a685.js";class j{constructor(e,s="#D80000",i=.75){l(this,"canvas");l(this,"ctx");l(this,"radius");l(this,"x");l(this,"y");l(this,"xSpeed");l(this,"ySpeed");l(this,"color");l(this,"opacity",1);l(this,"draw",()=>{this.ctx.fillStyle=this.color,this.ctx.globalAlpha=this.opacity,this.ctx.beginPath(),this.ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,!1),this.ctx.closePath(),this.ctx.fill()});l(this,"update",()=>{this.x+=this.xSpeed,this.y+=this.ySpeed,this.x+this.radius>this.canvas.width&&(this.x=this.canvas.width-this.radius,this.xSpeed=-this.xSpeed),this.x<this.radius&&(this.x=this.radius,this.xSpeed=-this.xSpeed),this.y+this.radius>this.canvas.height&&(this.y=this.canvas.height-this.radius,this.ySpeed=-this.ySpeed),this.y<this.radius&&(this.y=this.radius,this.ySpeed=-this.ySpeed)});this.canvas=e,this.ctx=e.getContext("2d"),this.radius=i,this.x=(e.width-2)*Math.random(),this.y=(e.height-2)*Math.random(),this.xSpeed=Math.min(Math.random()-Math.random(),.1),this.ySpeed=Math.min(Math.random()-Math.random(),.1),this.color=s}}function Z(t){return z()?(G(t),!0):!1}function H(t){return typeof t=="function"?t():S(t)}const tt=typeof window<"u"&&typeof document<"u",et=Object.prototype.toString,st=t=>et.call(t)==="[object Object]",it=()=>{};function nt(t){var e;const s=H(t);return(e=s==null?void 0:s.$el)!=null?e:s}const N=tt?window:void 0;function $(...t){let e,s,i,a;if(typeof t[0]=="string"||Array.isArray(t[0])?([s,i,a]=t,e=N):[e,s,i,a]=t,!e)return it;Array.isArray(s)||(s=[s]),Array.isArray(i)||(i=[i]);const h=[],x=()=>{h.forEach(u=>u()),h.length=0},_=(u,o,r,g)=>(u.addEventListener(o,r,g),()=>u.removeEventListener(o,r,g)),d=K(()=>[nt(e),H(a)],([u,o])=>{if(x(),!u)return;const r=st(o)?{...o}:o;h.push(...s.flatMap(g=>i.map(v=>_(u,g,v,r))))},{immediate:!0,flush:"post"}),f=()=>{d(),x()};return Z(f),f}const ot={page:t=>[t.pageX,t.pageY],client:t=>[t.clientX,t.clientY],screen:t=>[t.screenX,t.screenY],movement:t=>t instanceof Touch?null:[t.movementX,t.movementY]};function W(t={}){const{type:e="page",touch:s=!0,resetOnTouchEnds:i=!1,initialValue:a={x:0,y:0},window:h=N,target:x=h,scroll:_=!0,eventFilter:d}=t;let f=null;const u=M(a.x),o=M(a.y),r=M(null),g=typeof e=="function"?e:ot[e],v=c=>{const C=g(c);f=c,C&&([u.value,o.value]=C,r.value="mouse")},w=c=>{if(c.touches.length>0){const C=g(c.touches[0]);C&&([u.value,o.value]=C,r.value="touch")}},b=()=>{if(!f||!h)return;const c=g(f);f instanceof MouseEvent&&c&&(u.value=c[0]+h.scrollX,o.value=c[1]+h.scrollY)},F=()=>{u.value=a.x,o.value=a.y},B=d?c=>d(()=>v(c),{}):c=>v(c),V=d?c=>d(()=>w(c),{}):c=>w(c),X=d?()=>d(()=>b(),{}):()=>b();if(x){const c={passive:!0};$(x,["mousemove","dragover"],B,c),s&&e!=="movement"&&($(x,["touchstart","touchmove"],V,c),i&&$(x,"touchend",F,c)),_&&e==="page"&&$(h,"scroll",X,{passive:!0})}return{x:u,y:o,sourceType:r}}class at{constructor(e,s=[],i={}){l(this,"frameN",0);l(this,"fps",0);l(this,"entities",[]);l(this,"canvas");l(this,"ctx");l(this,"particles");l(this,"mouseInput");l(this,"debugEnabled",!1);l(this,"connections",!1);l(this,"render",()=>{this.ctx&&(this.frameN++,this.ctx.canvas.width=window.innerWidth,this.ctx.canvas.height=window.innerHeight,this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.update(),this.draw(),this.debugEnabled&&this.debug(),window.requestAnimationFrame(this.render))});this.canvas=e,this.ctx=e.getContext("2d"),this.particles=s,this.updateFps(),this.mouseInput=i.mouseInput?i.mouseInput:W({target:window}),this.debugEnabled=i.debug?i.debug:!1,this.connections=i.connections?i.connections:!0,window.requestAnimationFrame(this.render)}draw(){if(!this.ctx)return;this.entities=[];const e=this.mouseInput.x.value,s=this.mouseInput.y.value;this.particles.forEach(a=>{if(!this.ctx)return;let h=Math.abs(e-a.x),x=Math.abs(s-a.y),_=.394*(h+x+.554*Math.max(h,x));_<600&&(a.opacity=(600-Math.min(_,600))/600,a.draw(),this.entities.push(a),_<200&&this.connections&&(_<75&&(this.ctx.globalAlpha=1,this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y),this.ctx.lineTo(e,s),this.ctx.strokeStyle="#34a1eb",this.ctx.lineWidth=(200-Math.min(_,200))/800,this.ctx.stroke()),this.particles.forEach(d=>{if(!this.ctx)return;let f=Math.abs(e-d.x),u=Math.abs(s-d.y),o=.394*(f+u+.554*Math.max(f,u)),r=Math.abs(a.x-d.x),g=Math.abs(a.y-d.y),v=.394*(r+g+.554*Math.max(r,g));o<200&&v<100&&(this.ctx.globalAlpha=1,this.ctx.beginPath(),this.ctx.moveTo(a.x,a.y),this.ctx.lineTo(d.x,d.y),this.ctx.strokeStyle="#34a1eb",this.ctx.lineWidth=(200-Math.min(o,200))/800,this.ctx.stroke())})))});let i=new j(this.canvas,"#6289ea",1.5);i.opacity=1,i.x=this.mouseInput.x.value,i.y=this.mouseInput.y.value,i.draw()}update(){this.ctx&&this.particles.forEach(e=>{e.update()})}debug(){this.ctx&&(this.ctx.font="12px serif",this.ctx.fillStyle="white",this.ctx.globalAlpha=1,this.ctx.fillText(`particles: ${this.particles.length}`,10,20),this.ctx.fillText(`frame number: ${this.frameN}`,10,40),this.ctx.fillText(`runtime: ${performance.now()/1e3}s`,10,60),this.ctx.fillText(`fps: ${this.fps}fps`,10,80),this.ctx.fillText(`mouse: ${this.mouseInput.x.value}, ${this.mouseInput.y.value}`,10,100),this.ctx.fillText(`entities: ${this.entities.length}`,10,120))}updateFps(){var e=0;setInterval(()=>{this.fps=this.frameN-e,e=this.frameN},1e3)}}const rt=I({__name:"ParticleBackground",props:{options:{type:Object,default:{}}},setup(t){const e=t,s=M(null);return R(()=>{const i=[];if(s.value){s.value.getContext("2d").canvas.width=window.innerWidth,s.value.getContext("2d").canvas.height=window.innerHeight;var a=Math.floor(window.innerWidth*window.innerHeight)/6912;for(let h=1;h<a;h++)i[h]=new j(s.value,Math.random()<.8?"#6289ea":"#ea6962",Math.random()*(1.35-.5)+.75);new at(s.value,i,e.options)}}),(i,a)=>(p(),m("canvas",{class:"background",ref_key:"canvas",ref:s,width:"1920",height:"1080"},"Particle Network",512))}}),lt={class:"profile"},ct=n("div",{class:"profile-picture"},null,-1),ut={class:"profile-text"},ht=I({__name:"Profile",props:{description:{type:String,default:""}},setup(t){return(e,s)=>(p(),m("div",lt,[ct,n("p",ut,T(t.description),1)]))}}),dt={class:"skills"},pt={class:"skills-languages"},mt={class:"skills-tools"},ft={class:"skills-frameworks"},gt=I({__name:"Skills",props:{languages:{type:Array,default:[]},tools:{type:Array,default:[]},technology:{type:Array,default:[]}},setup(t){return(e,s)=>(p(),m("div",dt,[n("div",pt,[n("h3",null,[y(S(A),{icon:"mdi:code"}),E(" Languages")]),n("ul",null,[(p(!0),m(O,null,P(t.languages,i=>(p(),m("li",null,T(i),1))),256))])]),n("div",mt,[n("h3",null,[y(S(A),{icon:"mdi:hammer-wrench"}),E(" Tools")]),n("ul",null,[(p(!0),m(O,null,P(t.tools,i=>(p(),m("li",null,T(i),1))),256))])]),n("div",ft,[n("h3",null,[y(S(A),{icon:"mdi:cube-outline"}),E(" Technologies")]),n("ul",null,[(p(!0),m(O,null,P(t.technology,i=>(p(),m("li",null,T(i),1))),256))])])]))}}),xt={class:"project"},_t={class:"project-info"},vt=["href"],yt=I({__name:"Projects",props:{projects:{type:Array,default:[]}},setup(t){return(e,s)=>(p(!0),m(O,null,P(t.projects,i=>(p(),m("div",xt,[n("div",_t,[n("h3",null,T(i.title),1),n("p",null,T(i.description),1),n("a",{href:i.link,target:"_blank"},"Learn More",8,vt)])]))),256))}}),wt=""+globalThis.__publicAssetsURL("icon-mail.svg"),bt={href:"https://github.com/Tapawingo"},kt={href:"https://www.linkedin.com/in/eirikdt/"},St=n("a",{href:"mailto:eirik@dalseggteppen.no"},[n("img",{src:wt,alt:""})],-1),Mt=n("div",null,"Eirik Teppen © 2023",-1),Tt=I({__name:"Footer",setup(t){return(e,s)=>(p(),m("footer",null,[n("div",null,[n("a",bt,[y(S(A),{icon:"mdi:github"})]),n("a",kt,[y(S(A),{icon:"mdi:linkedin"})]),St]),Mt]))}});const At={class:"header"},It=n("div",{class:"heading"},[n("span",{class:"linebreak"},[E("Hey, I’m "),n("span",null,"Eirik"),E(".")]),n("span",{class:"linebreak"},"I'm a full stack developer.")],-1),Ct={class:"about"},Et=n("h2",null,"About",-1),Ot={class:"about-content"},$t={class:"projects"},Pt=n("h2",null,"Projects",-1),Ft={class:"project-container"},Lt={class:"contact"},Dt=n("h2",null,"Contact",-1),jt=n("p",null,"Have a question or want to work together? Leave your details and I'll get back to you as soon as possible.",-1),Ht=n("input",{type:"text",name:"name",class:"contact-form-name",placeholder:"Name"},null,-1),Nt=n("input",{type:"mail",name:"mail",class:"contact-form-mail",placeholder:"Email"},null,-1),Wt=n("textarea",{cols:"30",name:"message",rows:"10",class:"contact-text",placeholder:"Message"},"(Backend is WIP)",-1),Bt=n("input",{type:"submit",value:"Submit",class:"contact-submit"},null,-1),Vt=[jt,Ht,Nt,Wt,Bt],Gt=I({__name:"index",setup(t){const e=M(null),s=M(0),i={options:{debug:!1,connections:!0,mouseInput:W({target:e})}},a={description:"I’m a full stack developer with a deep passion for anything            computers. I’m experienced in both web and software development            and love learning new technologies. When I’m not at my computer            I go on hikes, collect militaria and play airsoft."},h={languages:["C","C++","Python","Assembly","JavaScript","TypeScript","HTML5","CSS3","SASS","PHP","LUA"],tools:["Git","Arduino","Raspberry Pi","Linux","Windows","Unreal Engine","Gimp"],technology:["OpenGL","DirectX12","Vulkan","DearImGui","QT","Vue.js","Nuxt.js","Node.js","Node.js","Discord.js","Express.js","MySQL","MongoDB","SQLite","Tailwind"]},x=[{title:"FreeTakServer",description:"FTS is a Python3 implementation of a TAK Server for devices like ATAK, WinTAK, and                 ITAK, it is cross-platform and runs from a multi node installation on AWS down to the Android edition.                It's free and open source.",link:"https://freetakteam.github.io/FreeTAKServer-User-Docs/"},{title:"Cluster Mission Framework (CMF3)",description:"CMF3 is an effort by the Cluster Community Mod Team to enhance the                 individual experience of our playerbase. It is an Arma 3 Mission Framework aiming to simplify                the mission development process for mission creators and to enhance the realism and immersion of                 the individual players.",link:"https://github.com/clustermod/CMF3"},{title:"Cluster Community Homepage",description:"The homepage for Cluster Community. Cluster Community is a online                video-game community mainly focusing creating realistic, immersive                experiences on Arma 3.",link:"https://cluster-community.com/"}],_=o=>{s.value=o.target.scrollTop},d=(o,r=0,g=0)=>{const{top:v,bottom:w}=o.getBoundingClientRect(),{innerHeight:b}=window;return v>0&&v+r<b||w+g>0&&w<b},f={mounted:(o,r)=>{setInterval(()=>{d(o,r.value.topOffset,r.value.bottomOffset)?(o.classList.remove("transition-fade-out"),o.classList.add("transition-fade-in")):(o.classList.remove("transition-fade-in"),o.classList.add("transition-fade-out"))},5)}},u={mounted:(o,r)=>{setInterval(()=>{d(o,r.value.topOffset,r.value.bottomOffset)?(o.classList.remove("transition-slide-out"),o.classList.add("transition-slide-in")):(o.classList.remove("transition-slide-in"),o.classList.add("transition-slide-out"))},5)}};return q({htmlAttrs:{lang:"en"},link:[{rel:"apple-touch-icon",type:"image/png",sizes:"180x180",href:"/icon/apple-touch-icon.png"},{rel:"icon",type:"image/png",sizes:"32x32",href:"/icon/favicon-32x32.png"},{rel:"icon",type:"image/png",sizes:"16x16",href:"/icon/favicon-16x16.png"},{rel:"mask-icon",href:"/icon/safari-pinned-tab.svg",color:"#ea6962"},{rel:"manifest",href:"/site.webmanifest"}],meta:[{name:"msapplication-TileColor",content:"#2b5797"},{name:"theme-color",content:"#ffffff"}]}),J({ogUrl:"eirik.dalseggteppen.no",title:"Eirik | Full Stack Developer",ogTitle:"Eirik | Full Stack Developer",description:'Homepage of Eirik "Tapawingo".',ogDescription:'Homepage of Eirik "Tapawingo".',ogImage:"/icon/og-image.png",twitterCard:"summary",twitterTitle:"Eirik | Full Stack Developer",twitterDescription:'Homepage of Eirik "Tapawingo".',twitterImage:"/icon/favicon.png"}),(o,r)=>{const g=rt,v=ht,w=gt,b=yt,F=Tt;return p(),m(O,null,[y(g,L(D(i)),null,16),n("main",{ref_key:"mainElement",ref:e,onScroll:_},[k((p(),m("section",At,[It,y(S(A),{icon:"bi:chevron-down"})])),[[f,{topOffset:0,bottomOffset:-800}]]),k((p(),m("section",Ct,[Et,n("div",Ot,[k(y(v,L(D(a)),null,16),[[u,{topOffset:400,bottomOffset:-300}]]),k(y(w,L(D(h)),null,16),[[u,{topOffset:400,bottomOffset:-400}]])])])),[[f,{topOffset:300,bottomOffset:-0}]]),k((p(),m("section",$t,[Pt,k((p(),m("div",Ft,[y(b,{projects:x})])),[[u,{topOffset:300,bottomOffset:-300}]])])),[[f,{topOffset:300,bottomOffset:0}]]),k((p(),m("section",Lt,[Dt,n("form",{class:"contact-form",onSubmit:r[0]||(r[0]=Q(()=>{},["prevent"]))},Vt,32)])),[[f,{topOffset:300,bottomOffset:0}]]),y(F)],544)],64)}}});export{Gt as default};
