var F=Object.defineProperty,G=Object.defineProperties;var J=Object.getOwnPropertyDescriptors;var T=Object.getOwnPropertySymbols;var K=Object.prototype.hasOwnProperty,M=Object.prototype.propertyIsEnumerable;var U=(l,e,t)=>e in l?F(l,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):l[e]=t,Y=(l,e)=>{for(var t in e||(e={}))K.call(e,t)&&U(l,t,e[t]);if(T)for(var t of T(e))M.call(e,t)&&U(l,t,e[t]);return l},A=(l,e)=>G(l,J(e));import{S as N,i as O,s as Q,k as E,e as h,t as H,Y as R,d as u,m as k,c as p,a as m,h as q,b as w,g as b,L as f,E as j,a2 as W,a3 as X,j as P}from"../../../chunks/index-91d33c8b.js";import{v as Z,d as $}from"../../../chunks/firebase-c7a26db2.js";function g(l){let e,t,s=l[0].title+"",o,c,r,i=l[0].summary+"",a,_,v,D=l[0].description+"",I,S,y,V=l[0].description+"",z;return{c(){e=h("div"),t=h("h2"),o=H(s),c=E(),r=h("p"),a=H(i),_=E(),v=h("p"),I=H(D),S=E(),y=new W,z=E(),this.h()},l(n){e=p(n,"DIV",{});var d=m(e);t=p(d,"H2",{contenteditable:!0});var B=m(t);o=q(B,s),B.forEach(u),c=k(d),r=p(d,"P",{contenteditable:!0});var C=m(r);a=q(C,i),C.forEach(u),_=k(d),v=p(d,"P",{class:!0});var L=m(v);I=q(L,D),L.forEach(u),d.forEach(u),S=k(n),y=X(n),z=k(n),this.h()},h(){w(t,"contenteditable","true"),w(r,"contenteditable","true"),w(v,"class","description svelte-1ubllvz"),y.a=z},m(n,d){b(n,e,d),f(e,t),f(t,o),f(e,c),f(e,r),f(r,a),f(e,_),f(e,v),f(v,I),b(n,S,d),y.m(V,n,d),b(n,z,d)},p(n,d){d&1&&s!==(s=n[0].title+"")&&P(o,s),d&1&&i!==(i=n[0].summary+"")&&P(a,i),d&1&&D!==(D=n[0].description+"")&&P(I,D),d&1&&V!==(V=n[0].description+"")&&y.p(V)},d(n){n&&u(e),n&&u(S),n&&y.d(),n&&u(z)}}}function x(l){let e,t,s,o;return{c(){e=h("div"),t=h("h2"),s=H("note does not exist or has been deleted"),o=E(),this.h()},l(c){e=p(c,"DIV",{class:!0});var r=m(e);t=p(r,"H2",{});var i=m(t);s=q(i,"note does not exist or has been deleted"),i.forEach(u),r.forEach(u),o=k(c),this.h()},h(){w(e,"class","center svelte-1ubllvz")},m(c,r){b(c,e,r),f(e,t),f(t,s),b(c,o,r)},p:j,d(c){c&&u(e),c&&u(o)}}}function ee(l){let e,t,s,o;document.title=e=l[0].title?l[0].title:"notegy";function c(a,_){return a[0]==null?x:g}let r=c(l),i=r(l);return{c(){t=E(),s=h("div"),i.c(),o=H("\xCE"),this.h()},l(a){R('[data-svelte="svelte-1akq75z"]',document.head).forEach(u),t=k(a),s=p(a,"DIV",{class:!0});var v=m(s);i.l(v),o=q(v,"\xCE"),v.forEach(u),this.h()},h(){w(s,"class","container-note-detail svelte-1ubllvz")},m(a,_){b(a,t,_),b(a,s,_),i.m(s,null),f(s,o)},p(a,[_]){_&1&&e!==(e=a[0].title?a[0].title:"notegy")&&(document.title=e),r===(r=c(a))&&i?i.p(a,_):(i.d(1),i=r(a),i&&(i.c(),i.m(s,o)))},i:j,o:j,d(a){a&&u(t),a&&u(s),i.d()}}}async function ie({params:l}){const e=await Z($(l.id));return e.exists()?{status:200,props:{note:A(Y({},e.data()),{id:e.id})}}:{status:404,props:{note:null}}}function te(l,e,t){let{note:s}=e;return l.$$set=o=>{"note"in o&&t(0,s=o.note)},[s]}class ne extends N{constructor(e){super();O(this,e,te,ee,Q,{note:0})}}export{ne as default,ie as load};