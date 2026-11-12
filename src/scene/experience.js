import * as THREE from 'three'
import { buildBouquet } from './rose.js'

export function start() {
  try { const c = document.createElement('canvas'); if (!(c.getContext('webgl2') || c.getContext('webgl'))) throw 0 } catch (e) { return fallback() }
const $=s=>document.querySelector(s),cl=(x,a=0,b=1)=>x<a?a:x>b?b:x,sm=x=>{x=cl(x);return x*x*(3-2*x)},mx=(a,b,t)=>a+(b-a)*t,ph=(t,a,b)=>cl((t-a)/(b-a));
let sd=11;const rnd=()=>{sd=(sd*1664525+1013904223)>>>0;return sd/4294967296};
const BIN="01001001 00100000 01101000 01101111 01110000 01100101 00100000 01110100 01101000 01101001 01110011 00100000 01110011 01101101 01101001 01101100 01100101 00100000 01110010 01100101 01100001 01100011 01101000 01100101 01110011 00100000 01111001 01101111 01110101";
const low=(navigator.hardwareConcurrency||4)<=4||(navigator.deviceMemory||4)<=3,mob=matchMedia('(pointer:coarse)').matches||innerWidth<700,Q={low,N:low?3500:mob?5500:9000,GN:low?40:mob?52:64,pr:Math.min(devicePixelRatio,low?1:mob?1.75:2)};
const ren=new THREE.WebGLRenderer({antialias:Q.pr<2,powerPreference:'high-performance'});ren.setPixelRatio(Q.pr);ren.setSize(innerWidth,innerHeight);document.body.prepend(ren.domElement);
const scn=new THREE.Scene(),cam=new THREE.PerspectiveCamera(50,innerWidth/innerHeight,.1,100);
addEventListener('resize',()=>{ren.setSize(innerWidth,innerHeight);cam.aspect=innerWidth/innerHeight;cam.updateProjectionMatrix()});
const spr=(()=>{const c=document.createElement('canvas');c.width=c.height=64;const g=c.getContext('2d'),r=g.createRadialGradient(32,32,0,32,32,32);r.addColorStop(0,'#fff');r.addColorStop(.25,'rgba(255,255,255,.55)');r.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=r;g.fillRect(0,0,64,64);return new THREE.CanvasTexture(c)})();
const mk=(n,size)=>{const g=new THREE.BufferGeometry(),p=new Float32Array(n*3),c=new Float32Array(n*3);g.setAttribute('position',new THREE.BufferAttribute(p,3));g.setAttribute('color',new THREE.BufferAttribute(c,3));const o=new THREE.Points(g,new THREE.PointsMaterial({size,map:spr,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,vertexColors:true}));o.frustumCulled=false;scn.add(o);o.p=p;o.c=c;o.g=g;return o};
const upd=o=>{o.g.attributes.position.needsUpdate=true;o.g.attributes.color.needsUpdate=true};
const V=(x,y,z)=>new THREE.Vector3(x,y,z),UP=V(0,1,0);

/* ---------- Scenes 1-2: the algorithm ---------- */
const MAXL=700,LP=new Float32Array(MAXL*6),lg=new THREE.BufferGeometry();lg.setAttribute('position',new THREE.BufferAttribute(LP,3));
const lines=new THREE.LineSegments(lg,new THREE.LineBasicMaterial({color:0xffffff,transparent:true,opacity:.5,blending:THREE.AdditiveBlending,depthWrite:false}));lines.frustumCulled=false;scn.add(lines);
const nodes=mk(150,.055),main=mk(4,.2),seedP=mk(1,.3);
const C0=V(0,1.2,0),A=[V(0,0,0),V(0,0,0),V(0,0,0)],T3=[V(0,0,0),V(0,0,0),V(0,0,0)];let nl=0;
const seg=(a,b)=>{if(nl>=MAXL)return;const i=nl++*6;LP[i]=a.x;LP[i+1]=a.y;LP[i+2]=a.z;LP[i+3]=b.x;LP[i+4]=b.y;LP[i+5]=b.z};
const hash=x=>{const s=Math.sin(x*127.1)*43758.5453;return s-Math.floor(s)};
function algo(t,k,col){
 const s=1-sm(col);nl=0;
 for(let i=0;i<3;i++){const a=t*.45+i*2.094+Math.sin(t*.7+i)*.4,r=(1.9+.5*Math.sin(t*.8+i*2.1))*s;A[i].set(Math.cos(a)*r,Math.sin(a)*r*.8+Math.sin(t*.5+i)*.3*s,Math.sin(a*.7+i)*r*.5).add(C0)}
 const cen=A[0].clone().add(A[1]).add(A[2]).multiplyScalar(1/3),slot=Math.floor(t*2.4);
 const m=k>0?7:1+Math.floor(hash(slot)*7),m2=k>0?0:Math.floor(hash(slot+9)*8);
 for(let i=0;i<3;i++){if(m>>i&1)seg(A[i],A[(i+1)%3]);if(m2>>i&1)seg(A[i],cen)}
 const nc=Math.floor(k*46);let nn=0;
 for(let j=1;j<=nc;j++){const u=j/46;for(let i=0;i<3;i++)T3[i].lerpVectors(A[i],A[(i+1)%3],u);seg(T3[0],T3[1]);seg(T3[1],T3[2]);seg(T3[2],T3[0]);
  if(j%2==0&&nn<48)for(let i=0;i<3;i++){nodes.p.set([T3[i].x,T3[i].y,T3[i].z],nn++*3)}}
 for(let i=0;i<150;i++){const v=i<nn?.7:0;nodes.c.set([v,v,v],i*3)}
 const cf=sm(ph(k,.35,.95));
 if(cf>0){const N=200,kk=3+Math.sin(t*.25)*.6;let px,py,pz;for(let i=0;i<=N*cf;i++){const th=i/N*12.566,r=1.7*s*Math.cos(kk*th/2),x=C0.x+r*Math.cos(th),y=C0.y+r*Math.sin(th)*.85,z=r*Math.sin(th*1.5)*.3;if(i)seg({x:px,y:py,z:pz},{x,y,z});px=x;py=y;pz=z}}
 lg.setDrawRange(0,nl*2);lg.attributes.position.needsUpdate=true;lines.material.opacity=.5*(1-ph(col,.8,1));
 const mb=1-ph(col,.7,1);for(let i=0;i<3;i++){main.p.set([A[i].x,A[i].y,A[i].z],i*3);main.c.set([mb,mb,mb],i*3)}
 main.p.set([cen.x,cen.y,cen.z],9);const cb=.5*mb*(m2||k>0?1:0);main.c.set([cb,cb,cb],9);
 upd(nodes);upd(main);
}

/* ---------- Scene 3: seed, droplet, ripples ---------- */
const DN=500,DS=new Float32Array(DN*3),DT=new Float32Array(DN*3),DV=new Float32Array(DN*3),DB=new Float32Array(DN).fill(.9),dropP=mk(DN,.05);
for(let i=0;i<DN;i++){const u=rnd(),rad=.24*Math.sin(Math.PI*Math.pow(u,.55))*(.85+.15*rnd()),a=rnd()*6.283,q=1.2+rnd()*1.6,th=rnd()*6.283,p2=Math.acos(2*rnd()-1);
 DT.set([Math.cos(a)*rad,(u-.35)*.8,Math.sin(a)*rad],i*3);DS.set([q*Math.sin(p2)*Math.cos(th),q*Math.cos(p2),q*Math.sin(p2)*Math.sin(th)],i*3)}
const GN=Q.GN,gnd=mk(GN*GN,.075*64/GN),GX=new Float32Array(GN*GN*2);
for(let i=0;i<GN;i++)for(let j=0;j<GN;j++){GX[(i*GN+j)*2]=(i/(GN-1)-.5)*16+(rnd()-.5)*.1;GX[(i*GN+j)*2+1]=(j/(GN-1)-.5)*16+(rnd()-.5)*.1}
const imp=[{t:22,x:0,z:0,A:.3,G:1}],G=5.84;let impacted=false;
function ground(t){
 const gf=sm(ph(t,19.5,22.5));
 for(let n=0;n<GN*GN;n++){const x=GX[n*2],z=GX[n*2+1];let h=0,gl=0;
  for(const m of imp){const age=t-m.t;if(age<0)continue;const d=Math.hypot(x-m.x,z-m.z),e=d-age*2.8;
   h+=m.A*Math.cos(e*4.5)*Math.exp(-e*e*.5)*Math.exp(-age*.3)/(1+d*.5);
   gl+=m.G*sm(age*1.2-d*.35)*Math.exp(-age*.03)/(1+d*d*.12)}
  const I=(.07*Math.exp(-(x*x+z*z)/50)+gl*.5+Math.abs(h)*1.6)*gf;
  gnd.p[n*3]=x;gnd.p[n*3+1]=-2+h;gnd.p[n*3+2]=z;gnd.c[n*3]=I*.8;gnd.c[n*3+1]=I;gnd.c[n*3+2]=I*.95}
 upd(gnd);
}

/* ---------- Scenes 4-5: L-system plant ---------- */
const PS=[],JN=[],tips=[];
const add=(a,b,bt,c)=>PS.push({a,b,bt,c});
function leaf(p,d,bt){const s=.14+rnd()*.1,side=V(rnd()-.5,0,rnd()-.5).normalize(),ld=d.clone().add(side.multiplyScalar(1.1)).normalize(),tip=p.clone().addScaledVector(ld,s),mid=p.clone().addScaledVector(ld,s*.5),w=new THREE.Vector3().crossVectors(ld,UP).normalize().multiplyScalar(s*.25),c=[.25,.9,.5],m1=mid.clone().add(w),m2=mid.clone().sub(w);add(p,m1,bt,c);add(m1,tip,bt,c);add(tip,m2,bt,c);add(m2,p,bt,c)}
function shoot(p,d,len,dep,b0,maxD){
 const n=4,sl=len/n,dur=.06+.01*(maxD-dep);let cur=p.clone(),dir=d.clone();
 for(let i=0;i<n;i++){dir.x+=(rnd()-.5)*.5;dir.z+=(rnd()-.5)*.5;dir.y+=.12;dir.normalize();
  const nx=cur.clone().addScaledVector(dir,sl),bt=b0+(i+1)/n*dur,th=dep/maxD,c=th<.35?[.85,.72,.5]:th<.7?[.55,.8,.5]:[.3,.85,.5];
  add(cur,nx,bt,c);
  if(dep<=1)for(const o of[[.012,0],[0,.012],[-.012,-.008]]){const f=V(o[0],0,o[1]);add(cur.clone().add(f),nx.clone().add(f),bt,c)}
  if(dep>=3&&rnd()<.4)leaf(nx,dir,bt+.03);cur=nx}
 JN.push(cur);
 if(dep>=maxD){tips.push({p:cur.clone(),d:dir.clone()});return}
 const cc=dep==0?3:(rnd()<.25?3:2);
 for(let k=0;k<cc;k++){const ax=new THREE.Vector3().crossVectors(dir,V(rnd()-.5,rnd()-.5,rnd()-.5)).normalize();shoot(cur,dir.clone().applyAxisAngle(ax,.35+rnd()*.5),len*(.7+rnd()*.08),dep+1,b0+dur*.9,maxD)}
}
function root(p,d,len,dep,b0){
 const n=3,sl=len/n,dur=.05;let cur=p.clone(),dir=d.clone();
 for(let i=0;i<n;i++){dir.x+=(rnd()-.5)*.6;dir.z+=(rnd()-.5)*.6;dir.y-=.1;dir.normalize();const nx=cur.clone().addScaledVector(dir,sl);add(cur,nx,b0+(i+1)/n*dur,[.75,.62,.42]);cur=nx}
 if(dep>=5)return;
 for(let k=0,cc=2+(rnd()<.3?1:0);k<cc;k++)root(cur,V((rnd()-.5)*2,-.35-rnd()*.5,(rnd()-.5)*2).normalize(),len*.75,dep+1,b0+dur*.85)}
for(let k=0;k<4;k++)root(V(0,0,0),V(Math.cos(k*1.57),-.8,Math.sin(k*1.57)).normalize(),1.1,0,0);
shoot(V(0,0,0),V(0,1,0),1.5,0,.25,6);
PS.sort((a,b)=>a.bt-b.bt);
const PP=new Float32Array(PS.length*6),PC=new Float32Array(PS.length*6);
PS.forEach((s,i)=>{PP.set([s.a.x,s.a.y,s.a.z,s.b.x,s.b.y,s.b.z],i*6);const c=s.c;PC.set([c[0]*.8,c[1]*.8,c[2]*.8,c[0]*.8,c[1]*.8,c[2]*.8],i*6)});
const pg=new THREE.BufferGeometry();pg.setAttribute('position',new THREE.BufferAttribute(PP,3));pg.setAttribute('color',new THREE.BufferAttribute(PC,3));
const pmat=new THREE.LineBasicMaterial({vertexColors:true,transparent:true,opacity:.9,blending:THREE.AdditiveBlending,depthWrite:false});
const plant=new THREE.LineSegments(pg,pmat);plant.frustumCulled=false;plant.position.y=-2;plant.visible=false;scn.add(plant);let ptr=0;

/* roses = particles that organise onto phyllotaxis cups at the branch tips */

const bq=buildBouquet(THREE,scn,Q.low?4:6),N=Q.N,nR=bq.heads.length,PER=Math.floor(N*.6/nR),NR=nR*PER;
const TG=new Float32Array(N*3),SS=new Float32Array(N*3),RC=new Float32Array(N*3),AM=new Float32Array(N*3),SL=new Float32Array(N*3),SCc=new Float32Array(N*3),OR=new Float32Array(N),OA=new Float32Array(N),OH=new Float32Array(N);
for(let i=0;i<N;i++){
 const o=i*3;
 if(i<NR){const j=(i/PER)|0,H=bq.heads[j],q=1+rnd()*.5,th=rnd()*6.283,p2=Math.acos(2*rnd()-1);
  TG.set([H.x+.5*q*Math.sin(p2)*Math.cos(th),H.y-2+.4*q*Math.cos(p2),H.z+.5*q*Math.sin(p2)*Math.sin(th)],o);
  const vv=.6+.4*rnd();RC.set([.8*vv,.04*vv,.07*vv],o);SS.set([(rnd()-.5)*3,(rnd()-.5)*3,(rnd()-.5)*3],o)}
 else{AM.set([(rnd()-.5)*7,rnd(),(rnd()-.5)*5],o);RC.set([.35,.28,.3],o)}
 OR[i]=.5+rnd()*3;OA[i]=rnd()*6.283;OH[i]=rnd()-.5;
 /* scroll target shape (axis along x) */
 const f=rnd();let x,y,z,c;
 if(f<.1){const sg=rnd()<.5?-1:1,a=rnd()*6.283,r=.13*rnd()+.05;x=sg*(1.3+.14*rnd());y=Math.sin(a)*r*2;z=Math.cos(a)*r*2;c=[1,.8,.35]}
 else if(f<.24){x=(rnd()*2-1)*1.2;y=-.28;z=.2+rnd()*.6;c=[.9,.75,.5]}
 else{const s=rnd(),p=s*14,rr=.06+.22*s;x=(rnd()*2-1)*1.2;y=Math.sin(p)*rr;z=Math.cos(p)*rr;c=[.95,.8,.52]}
 const b=(.5+.5*rnd())*.75;SL.set([x,y,z],o);SCc.set([c[0]*b,c[1]*b,c[2]*b],o)}
const pp=mk(N,.05);pp.visible=false;

/* ---------- state, scroll physics ---------- */
const S={y:1,vy:0,tilt:.5,roll:0,wr:1.3};let state='run',rested=0,openT=0,OF=0;
function updP(t,dt){
 const u7=t-64,e1=sm(ph(u7,0,3)),e2=sm(ph(u7,8.5,13.5)),th=t<64?Math.sin(t*.9)*.014:0,orb=t>=64,
  cT=Math.cos(S.tilt),sT=Math.sin(S.tilt),cR=Math.cos(S.roll),sR=Math.sin(S.roll),fd=1-OF;
 for(let i=0;i<N;i++){
  const o=i*3;let x,y,z,b,r,g,bl;
  if(i<NR){const j=(i/PER)|0,h=(i%97)/97,e=sm(ph(t,42+j*.9+h,46.8+j*.9+h*1.2)),sw=Math.sin(Math.PI*e)*.6;
   x=TG[o]+SS[o]*(1-e)+SS[o+2]*sw*.5;y=TG[o+1]+SS[o+1]*(1-e);z=TG[o+2]+SS[o+2]*(1-e)-SS[o]*sw*.5;b=Math.sqrt(e)*.5*(1-sm(ph(t,50,56)));
   x-=(y+2)*th;
   if(i%60==0&&t>54){const f=(t*.28+i*.173)%1;x+=Math.sin(f*5+i)*.5*f;y-=f*3.2;z+=Math.cos(f*4+i)*.5*f;b=Math.sin(Math.PI*f)*.9*sm(ph(t,54,57))}}
  else{x=AM[o]+Math.sin(t*.4+i)*.3;y=-1.5+((AM[o+1]+t*.05)%1)*5;z=AM[o+2]+Math.cos(t*.3+i)*.3;b=sm(ph(t,46,50))*.7}
  r=RC[o];g=RC[o+1];bl=RC[o+2];
  if(orb){const ro=OR[i]*(1-.5*sm(ph(u7,6,10))),tau=.3*u7+.1*u7*u7,an=OA[i]+tau*(2/(.6+OR[i]*.5)),ox=ro*Math.cos(an),oy=OH[i]*.5*ro,oz=ro*Math.sin(an),X=ox*.94-oy*.34,Y=ox*.34+oy*.94;
   x=mx(x,X,e1);y=mx(y,.6+Y,e1);z=mx(z,oz,e1);b=mx(b,1,e1);
   const ly=SL[o+1],lz=SL[o+2],ry=ly*cR-lz*sR,rz=ly*sR+lz*cR,sx=SL[o]*cT-ry*sT,sy=SL[o]*sT+ry*cT+S.y;
   x=mx(x,sx,e2);y=mx(y,sy,e2);z=mx(z,rz,e2);r=mx(r,SCc[o],e2);g=mx(g,SCc[o+1],e2);bl=mx(bl,SCc[o+2],e2)}
  pp.p[o]=x;pp.p[o+1]=y;pp.p[o+2]=z;b*=fd;pp.c[o]=r*b;pp.c[o+1]=g*b;pp.c[o+2]=bl*b}
 upd(pp)}

/* ---------- camera ---------- */
const cp=V(0,1.6,10),cl_=V(0,.9,0);
function camera(t){
 let p,l;
 if(t<18){p=[0,1.6,10];l=[0,.9,0]}else if(t<28){p=[0,1.4,9];l=[0,-.3,0]}
 else if(t<42){const a=Math.sin(t*.06)*.4;p=[Math.sin(a)*10.5,1.6,Math.cos(a)*10.5];l=[0,.9,0]}
 else if(t<64){const D=Math.max(6.2,3.4/(.93*cam.aspect)),a=Math.sin(t*.06)*.25;p=[Math.sin(a)*D,.6,Math.cos(a)*D];l=[0,-.1,0]}
 else if(t<78){p=[0,1.2,9];l=[0,.5,0]}else{p=[0,.4,8.5];l=[0,-.8,0]}
 const zf=t>=42&&t<64?1:Math.max(1,.85/cam.aspect),L=V(...l),P=V(...p).sub(L).multiplyScalar(zf).add(L);
 cp.lerp(P,.03);cl_.lerp(L,.03);cam.position.copy(cp);cam.lookAt(cl_)}

/* ---------- main loop ---------- */
let t0=performance.now(),last=t0,fa=.016,lastAdj=0;
function frame(now){
 const dt=Math.min(.05,(now-last)/1000),t=(now-t0)/1000;last=now;fa=fa*.95+dt*.05;if(t>6&&fa>.03&&Q.pr>1&&now-lastAdj>3000){Q.pr=Math.max(1,Q.pr-.25);ren.setPixelRatio(Q.pr);lastAdj=now}
 camera(t);
 const vis=t<18.1;lines.visible=nodes.visible=main.visible=vis;
 if(vis){const u2=t-8,k=sm(ph(u2,.5,6.5)),col=ph(u2,7.2,10);algo(t,t<8?0:k,t<8?0:col);const sb=ph(col,.5,1);seedP.c.set([sb,.92*sb,.7*sb]);seedP.p.set([C0.x,C0.y,C0.z]);upd(seedP)}
 if(t>=18){
  const u=t-18,cy=u<3?C0.y:Math.max(-1.72,C0.y-.5*G*(u-3)**2),sb=u<4?1:1-sm(ph(u,4,5.2));
  seedP.p.set([0,cy-(u>4?ph(u,4,5)*.25:0),0]);seedP.c.set([sb,.92*sb,.7*sb]);upd(seedP);
  if(u<4){const e=sm(ph(u,.6,2.6)),bb=sm(ph(u,.3,1.2))*.9,st=1+(u>3?(u-3)*.2:0);
   for(let i=0;i<DN;i++){const o=i*3;dropP.p[o]=DS[o]*(1-e)+DT[o]*e;dropP.p[o+1]=cy+DS[o+1]*(1-e)+DT[o+1]*e*st;dropP.p[o+2]=DS[o+2]*(1-e)+DT[o+2]*e;dropP.c[o]=bb*.7;dropP.c[o+1]=bb*.9;dropP.c[o+2]=bb}}
  else{if(!impacted){impacted=true;for(let i=0;i<DN;i++){const o=i*3,dx=DT[o],dz=DT[o+2],d=Math.hypot(dx,dz)||1,sp=.5+rnd()*2.2;DV.set([dx/d*sp,1.5+rnd()*4,dz/d*sp],o)}}
   for(let i=0;i<DN;i++){const o=i*3;if(DB[i]<=0){dropP.c[o]=dropP.c[o+1]=dropP.c[o+2]=0;continue}
    DV[o+1]-=9*dt;dropP.p[o]+=DV[o]*dt;dropP.p[o+1]+=DV[o+1]*dt;dropP.p[o+2]+=DV[o+2]*dt;
    if(dropP.p[o+1]<-2){dropP.p[o+1]=-2;DV[o]=DV[o+1]=DV[o+2]=0;DB[i]-=dt*.45}
    dropP.c[o]=DB[i]*.7;dropP.c[o+1]=DB[i]*.9;dropP.c[o+2]=DB[i]}}
  upd(dropP);dropP.visible=t<34;
 }else{seedP.visible=true;dropP.visible=false}
 gnd.visible=t>=19;if(gnd.visible)ground(t);
 if(t>=28){plant.visible=t<50;const g=ph(t,28,42);while(ptr<PS.length&&PS[ptr].bt<=g)ptr++;pg.setDrawRange(0,ptr*2);pmat.opacity=.9*(1-sm(ph(t,41,49)));plant.rotation.z=t<64?-Math.sin(t*.9)*.014:0}
 bq.update(t);if(t>=42){pp.visible=true;
  if(t>=78){const gr=S.y<=-1.72;S.vy-=9*dt;S.y+=S.vy*dt;
   if(S.y<-1.72){S.y=-1.72;if(Math.abs(S.vy)>.7){S.vy*=-.32;if(!S.hit){S.hit=1;imp.push({t,x:0,z:0,A:.12,G:.8})}}else S.vy=0}
   S.tilt+=(0-S.tilt)*Math.min(1,dt*2.2);S.roll+=S.wr*dt;if(gr)S.wr*=Math.pow(.35,dt);
   if(S.y<=-1.72&&S.vy===0&&Math.abs(S.wr)<.05){rested+=dt;if(rested>1.2&&state==='run'){state='rest';$('#hint').style.opacity=1}}}
  else if(t>=64){S.y=1+.15*Math.sin(t*.8);S.roll=.5*(t-64);S.tilt=.5}
  if(openT)OF=ph(t,openT,openT+1.5);
  updP(t,dt)}
 ren.render(scn,cam);requestAnimationFrame(frame)}
requestAnimationFrame(frame);

/* ---------- Scenes 8-10: scroll, poem, secret ---------- */
function open(){
 state='open';openT=(performance.now()-t0)/1000;$('#hint').style.opacity=0;
 const sc=$('#sc');sc.style.display='flex';void sc.offsetWidth;setTimeout(()=>$('#paper').classList.add('open'),700);
 const vs=[...document.querySelectorAll('.v')];vs.forEach((v,i)=>setTimeout(()=>v.classList.add('on'),3600+i*2600));
 setTimeout(()=>{const n=$('#next');n.style.display='block';void n.offsetWidth;n.style.opacity=1},3600+vs.length*2600+1500)}
ren.domElement.addEventListener('pointerdown',()=>{if(state==='rest')open()});
$('#hint').style.pointerEvents='none';
$('#next').onclick=()=>{
 $('#next').style.opacity=0;$('#paper').classList.remove('open');
 setTimeout(()=>{$('#fade').style.opacity=1},2600);
 setTimeout(()=>{$('#sc').style.display='none';$('#next').style.display='none';ren.domElement.style.display='none';state='end';
  $('#fin').style.display='flex';let i=0;const el=$('#bin'),iv=setInterval(()=>{el.textContent=BIN.slice(0,++i);if(i>=BIN.length){clearInterval(iv);setTimeout(()=>$('#cp').style.opacity=1,900)}},45)},5000)};
async function copy(){try{await navigator.clipboard.writeText(BIN)}catch(e){const a=document.createElement('textarea');a.value=BIN;document.body.appendChild(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}$('#ok').textContent='✓'}
$('#cp').onclick=copy;$('#bin').onclick=()=>{const m=$('#mean');m.textContent='أتمنى أن تصلكِ هذه الابتسامة';m.style.opacity=1};

}

// Safety net for phones without WebGL: skip the 3D part and go straight to the poem.
function fallback() {
  const $ = s => document.querySelector(s), BIN = "01001001 00100000 01101000 01101111 01110000 01100101 00100000 01110100 01101000 01101001 01110011 00100000 01110011 01101101 01101001 01101100 01100101 00100000 01110010 01100101 01100001 01100011 01101000 01100101 01110011 00100000 01111001 01101111 01110101"
  const sc = $('#sc'); sc.style.display = 'flex'; void sc.offsetWidth; setTimeout(() => $('#paper').classList.add('open'), 400)
  const vs = [...document.querySelectorAll('.v')]; vs.forEach((v, i) => setTimeout(() => v.classList.add('on'), 2400 + i * 2400))
  setTimeout(() => { const n = $('#next'); n.style.display = 'block'; void n.offsetWidth; n.style.opacity = 1 }, 2400 + vs.length * 2400 + 1500)
  $('#next').onclick = () => {
    $('#next').style.opacity = 0; $('#paper').classList.remove('open'); setTimeout(() => { $('#fade').style.opacity = 1 }, 2600)
    setTimeout(() => { sc.style.display = 'none'; $('#next').style.display = 'none'; $('#fin').style.display = 'flex'; let i = 0; const el = $('#bin'), iv = setInterval(() => { el.textContent = BIN.slice(0, ++i); if (i >= BIN.length) { clearInterval(iv); setTimeout(() => $('#cp').style.opacity = 1, 900) } }, 45) }, 5000)
  }
  const copy = async () => { try { await navigator.clipboard.writeText(BIN) } catch (e) {} $('#ok').textContent = '✓' }
  $('#cp').onclick = copy; $('#bin').onclick = () => { const m = $('#mean'); m.textContent = 'أتمنى أن تصلكِ هذه الابتسامة'; m.style.opacity = 1 }
}
