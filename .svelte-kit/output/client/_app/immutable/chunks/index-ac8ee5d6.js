function $(){}function z(t,n){for(const e in n)t[e]=n[e];return t}function D(t){return t()}function C(){return Object.create(null)}function y(t){t.forEach(D)}function L(t){return typeof t=="function"}function ct(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}function F(t){return Object.keys(t).length===0}function G(t,...n){if(t==null)return $;const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function lt(t,n,e){t.$$.on_destroy.push(G(n,e))}function st(t,n,e,i){if(t){const r=k(t,n,e,i);return t[0](r)}}function k(t,n,e,i){return t[1]&&i?z(e.ctx.slice(),t[1](i(n))):e.ctx}function ut(t,n,e,i){if(t[2]&&i){const r=t[2](i(e));if(n.dirty===void 0)return r;if(typeof r=="object"){const o=[],c=Math.max(n.dirty.length,r.length);for(let u=0;u<c;u+=1)o[u]=n.dirty[u]|r[u];return o}return n.dirty|r}return n.dirty}function ot(t,n,e,i,r,o){if(r){const c=k(n,e,i,o);t.p(c,r)}}function ft(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}let w=!1;function I(){w=!0}function J(){w=!1}function K(t,n,e,i){for(;t<n;){const r=t+(n-t>>1);e(r)<=i?t=r+1:n=r}return t}function R(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let s=0;s<n.length;s++){const a=n[s];a.claim_order!==void 0&&l.push(a)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let r=0;for(let l=0;l<n.length;l++){const s=n[l].claim_order,a=(r>0&&n[e[r]].claim_order<=s?r+1:K(1,r,g=>n[e[g]].claim_order,s))-1;i[l]=e[a]+1;const f=a+1;e[f]=l,r=Math.max(f,r)}const o=[],c=[];let u=n.length-1;for(let l=e[r]+1;l!=0;l=i[l-1]){for(o.push(n[l-1]);u>=l;u--)c.push(n[u]);u--}for(;u>=0;u--)c.push(n[u]);o.reverse(),c.sort((l,s)=>l.claim_order-s.claim_order);for(let l=0,s=0;l<c.length;l++){for(;s<o.length&&c[l].claim_order>=o[s].claim_order;)s++;const a=s<o.length?o[s]:null;t.insertBefore(c[l],a)}}function W(t,n){if(w){for(R(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function at(t,n,e){w&&!e?W(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function Q(t){t.parentNode&&t.parentNode.removeChild(t)}function U(t){return document.createElement(t)}function A(t){return document.createTextNode(t)}function _t(){return A(" ")}function dt(){return A("")}function ht(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function mt(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function V(t){return Array.from(t.childNodes)}function X(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function B(t,n,e,i,r=!1){X(t);const o=(()=>{for(let c=t.claim_info.last_index;c<t.length;c++){const u=t[c];if(n(u)){const l=e(u);return l===void 0?t.splice(c,1):t[c]=l,r||(t.claim_info.last_index=c),u}}for(let c=t.claim_info.last_index-1;c>=0;c--){const u=t[c];if(n(u)){const l=e(u);return l===void 0?t.splice(c,1):t[c]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=c,u}}return i()})();return o.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,o}function Y(t,n,e,i){return B(t,r=>r.nodeName===n,r=>{const o=[];for(let c=0;c<r.attributes.length;c++){const u=r.attributes[c];e[u.name]||o.push(u.name)}o.forEach(c=>r.removeAttribute(c))},()=>i(n))}function pt(t,n,e){return Y(t,n,e,U)}function Z(t,n){return B(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>A(n),!0)}function yt(t){return Z(t," ")}function gt(t,n){n=""+n,t.wholeText!==n&&(t.data=n)}function xt(t,n){t.value=n??""}function bt(t,n,e,i){e===null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function $t(t,n,e){t.classList[e?"add":"remove"](n)}function wt(t,n){const e=[];let i=0;for(const r of n.childNodes)if(r.nodeType===8){const o=r.textContent.trim();o===`HEAD_${t}_END`?(i-=1,e.push(r)):o===`HEAD_${t}_START`&&(i+=1,e.push(r))}else i>0&&e.push(r);return e}function vt(t,n){return new t(n)}let p;function m(t){p=t}function H(){if(!p)throw new Error("Function called outside component initialization");return p}function Et(t){H().$$.on_mount.push(t)}function Nt(t){H().$$.after_update.push(t)}const h=[],T=[],x=[],M=[],O=Promise.resolve();let E=!1;function P(){E||(E=!0,O.then(q))}function At(){return P(),O}function N(t){x.push(t)}const v=new Set;let d=0;function q(){if(d!==0)return;const t=p;do{try{for(;d<h.length;){const n=h[d];d++,m(n),tt(n.$$)}}catch(n){throw h.length=0,d=0,n}for(m(null),h.length=0,d=0;T.length;)T.pop()();for(let n=0;n<x.length;n+=1){const e=x[n];v.has(e)||(v.add(e),e())}x.length=0}while(h.length);for(;M.length;)M.pop()();E=!1,v.clear(),m(t)}function tt(t){if(t.fragment!==null){t.update(),y(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(N)}}const b=new Set;let _;function St(){_={r:0,c:[],p:_}}function jt(){_.r||y(_.c),_=_.p}function nt(t,n){t&&t.i&&(b.delete(t),t.i(n))}function Ct(t,n,e,i){if(t&&t.o){if(b.has(t))return;b.add(t),_.c.push(()=>{b.delete(t),i&&(e&&t.d(1),i())}),t.o(n)}else i&&i()}function Tt(t){t&&t.c()}function Mt(t,n){t&&t.l(n)}function et(t,n,e,i){const{fragment:r,after_update:o}=t.$$;r&&r.m(n,e),i||N(()=>{const c=t.$$.on_mount.map(D).filter(L);t.$$.on_destroy?t.$$.on_destroy.push(...c):y(c),t.$$.on_mount=[]}),o.forEach(N)}function it(t,n){const e=t.$$;e.fragment!==null&&(y(e.on_destroy),e.fragment&&e.fragment.d(n),e.on_destroy=e.fragment=null,e.ctx=[])}function rt(t,n){t.$$.dirty[0]===-1&&(h.push(t),P(),t.$$.dirty.fill(0)),t.$$.dirty[n/31|0]|=1<<n%31}function Dt(t,n,e,i,r,o,c,u=[-1]){const l=p;m(t);const s=t.$$={fragment:null,ctx:[],props:o,update:$,not_equal:r,bound:C(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(n.context||(l?l.$$.context:[])),callbacks:C(),dirty:u,skip_bound:!1,root:n.target||l.$$.root};c&&c(s.root);let a=!1;if(s.ctx=e?e(t,n.props||{},(f,g,...S)=>{const j=S.length?S[0]:g;return s.ctx&&r(s.ctx[f],s.ctx[f]=j)&&(!s.skip_bound&&s.bound[f]&&s.bound[f](j),a&&rt(t,f)),g}):[],s.update(),a=!0,y(s.before_update),s.fragment=i?i(s.ctx):!1,n.target){if(n.hydrate){I();const f=V(n.target);s.fragment&&s.fragment.l(f),f.forEach(Q)}else s.fragment&&s.fragment.c();n.intro&&nt(t.$$.fragment),et(t,n.target,n.anchor,n.customElement),J(),q()}m(l)}class Lt{$destroy(){it(this,1),this.$destroy=$}$on(n,e){if(!L(e))return $;const i=this.$$.callbacks[n]||(this.$$.callbacks[n]=[]);return i.push(e),()=>{const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}$set(n){this.$$set&&!F(n)&&(this.$$.skip_bound=!0,this.$$set(n),this.$$.skip_bound=!1)}}export{At as A,$ as B,G as C,y as D,L as E,st as F,wt as G,W as H,ot as I,ft as J,ut as K,lt as L,ht as M,$t as N,xt as O,Lt as S,_t as a,at as b,yt as c,jt as d,dt as e,nt as f,St as g,Q as h,Dt as i,Nt as j,U as k,pt as l,V as m,mt as n,Et as o,bt as p,A as q,Z as r,ct as s,Ct as t,gt as u,vt as v,Tt as w,Mt as x,et as y,it as z};
