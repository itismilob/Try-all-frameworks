import{a as d,t as C,c as O}from"../chunks/ClanTBNt.js";import{p as q,u as z,f as _,t as A,a as B,s as v,c as s,g as a,b as w,d as b,r}from"../chunks/H5THvfYN.js";import{s as E}from"../chunks/C7Gr8Hc1.js";import{i as F}from"../chunks/BmyBH7a9.js";import{e as G,C as K,s as L}from"../chunks/CyPug0FG.js";import{s as M}from"../chunks/zO6XoBfd.js";import{p as k}from"../chunks/DQ4Qeime.js";var P=C("<div>No contents</div>"),Q=C('<div><div><img alt="user profile"> <h1> </h1></div></div> <div class="contents-container default-shadow"><div class="contents-header"><h2>Contents</h2> <a href="/svelte/write"><img src="/public/pen.svg" alt="pen|"> write</a></div> <ol><!></ol></div>',1);function Z(x,y){q(y,!0);let o=w(void 0),c=w(void 0);const D=async()=>{let e=await fetch("/api/contents",{method:"get"});if(e.ok){const t=await e.json();b(c,k(t)),console.log(t)}};z(()=>{console.log("mounted");const e=sessionStorage.getItem("user");if(!e)return;const t=JSON.parse(e);b(o,k(t)),D()});const H=e=>{window.location.href=`/svelte/content/${e}`};var f=Q(),n=_(f),m=s(n),p=s(m),u=v(p,2),J=s(u,!0);r(u),r(m),r(n);var h=v(n,2),g=v(s(h),2),N=s(g);{var S=e=>{var t=O(),i=_(t);G(i,17,()=>a(c),l=>l.id,(l,I)=>{K(l,{get content(){return a(I)},cardClickHandler:H})}),d(e,t)},j=e=>{var t=P();d(e,t)};F(N,e=>{a(c)?e(S):e(j,!1)})}r(g),r(h),A(()=>{var e,t,i;L(n,`user-container ${((e=a(o))==null?void 0:e.framework)??""}-shadow`),M(p,"src",(t=a(o))==null?void 0:t.profile),E(J,(i=a(o))==null?void 0:i.username)}),d(x,f),B()}export{Z as component};
