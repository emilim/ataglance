var f=Object.defineProperty,p=Object.defineProperties;var u=Object.getOwnPropertyDescriptors;var n=Object.getOwnPropertySymbols;var d=Object.prototype.hasOwnProperty,_=Object.prototype.propertyIsEnumerable;var i=(o,e,t)=>e in o?f(o,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):o[e]=t,m=(o,e)=>{for(var t in e||(e={}))d.call(e,t)&&i(o,t,e[t]);if(n)for(var t of n(e))_.call(e,t)&&i(o,t,e[t]);return o},l=(o,e)=>p(o,u(e));import{S as h,i as $,s as g,k as x,w as y,Y as v,d as c,m as w,x as N,g as C,y as q,E as Y,q as b,o as A,B as E}from"../../chunks/index-91d33c8b.js";import{g as P}from"../../chunks/navigation-0e6511d1.js";import{A as S,a as k,P as B,b as D}from"../../chunks/firebase-c7a26db2.js";import{N as U}from"../../chunks/note-form-a634ea2c.js";import"../../chunks/singletons-d1fb5791.js";import"../../chunks/HeaderSearch.svelte_svelte_type_style_lang-3d3e62a8.js";import"../../chunks/index-e1227db7.js";import"../../chunks/Button-41ba37ef.js";import"../../chunks/Form-29ef86bb.js";function j(o){let e,t,r;return t=new U({props:{title:"Your title here",summary:"Your summary here",description:'<div class="container"><flex style="height: 100%;" class="h"><flex-element color="rgb(199, 100, 39)" text="" flex="" /></flex></div>'}}),t.$on("sendNoteDetails",o[0]),{c(){e=x(),y(t.$$.fragment),this.h()},l(a){v('[data-svelte="svelte-ivpsrg"]',document.head).forEach(c),e=w(a),N(t.$$.fragment,a),this.h()},h(){document.title="Create Note"},m(a,s){C(a,e,s),q(t,a,s),r=!0},p:Y,i(a){r||(b(t.$$.fragment,a),r=!0)},o(a){A(t.$$.fragment,a),r=!1},d(a){a&&c(e),E(t,a)}}}function z(o){async function e(t){await S(D,l(m({},t.detail),{owner:k.currentUser.uid,timestamp:B()})),await P("/admin")}return[e]}class R extends h{constructor(e){super();$(this,e,z,j,g,{})}}export{R as default};
