import{d as p,w as n}from"./index-ba4a39d3.js";import{a as d}from"./axios-bff3f665.js";const b=!0,A=b,I=0,y="admin",T="add_mode",L="edit_mode";function M(){const{subscribe:e,set:t}=n(!1);return{subscribe:e,set:t,openModal:()=>t(!0),closeModal:()=>t(!1)}}function w(){const e={itemId:"",itemName:"",categoryId:0,itemPrice:0,itemImage:""},{subscribe:t,set:s}=n({...e});return{subscribe:t,set:s,resetForm:()=>s({...e})}}function v(){const e={pageNumber:0},{subscribe:t,set:s,update:o}=n({...e});return{subscribe:t,nextPage:()=>{o(a=>(a.pageNumber=a.pageNumber+1,m.set(!0),R.set(!0),a))},resetPage:()=>{m.set(!0),s({...e})}}}function P(){const{subscribe:e,set:t}=n("");return{subscribe:e,onAddMode:()=>t(T),onEditMode:()=>t(L)}}function C(){const{subscribe:e,set:t}=n(I);return{subscribe:e,selectCategory:o=>{t(o),F.resetPage(),x.set(!0)}}}function S(){const e="",t=window.localStorage.getItem("token")??e,{subscribe:s,update:o,set:r}=n(t);return{subscribe:s,saveAuthToken:c=>{try{return localStorage.setItem("token",c.token),r(c.token),!0}catch(u){console.log(u)}},removeAuthToken:()=>r(""),checkToken:()=>{const c="";(window.localStorage.getItem("token")??c)||r("")}}}function V(){let e={_id:"",email:"",role:""},t={params:{authToken:""}};const{subscribe:s,set:o}=n({...e});return{subscribe:s,createAuth:async()=>{try{const a="",i=A?window.localStorage.getItem("token")??a:a;t.params.authToken=i;const u=(await d.get("/api/user/login/info",t)).data.data,f=u.id,k=u.email,h=u.role;o({_id:f,email:k,role:h});return}catch{g.removeAuthToken(),o({...e});return}},resetAuth:()=>{g.removeAuthToken(),o({...e})}}}function E(){return p(_,t=>t.role===y)}function N(){const{subscribe:e,update:t,set:s}=n();return{subscribe:e,getCategoryList:async()=>{try{const r=await d.get("/api/user/categories");s(r.data.data)}catch(r){console.log(r)}},update:t}}function D(){let e={page:0,size:10,itemName:"",categoryId:0};const{subscribe:t,update:s,set:o}=n();return{subscribe:t,getItemList:async(l,a,i)=>{try{a!=""&&a!=null?e.itemName=a:e.itemName="",l>0?(m.set(!0),e.page=l):e.page=0,i>0&&i!=null?e.categoryId=i:e.categoryId=0;const c=await d.get("/api/user/items",{params:e});o(c.data.data)}catch(c){console.log(c)}},update:s}}const z=n(!1),B=M(),W=w(),F=v(),m=n(!1),q=P(),G=C(),H=n(""),g=S(),_=V(),J=E(),x=n(!1),R=n(!1),K=N(),Q=D();export{I as A,L as E,g as a,Q as b,K as c,m as d,H as e,F as f,J as g,W as h,G as i,q as j,B as k,T as l,z as m,_ as n};
