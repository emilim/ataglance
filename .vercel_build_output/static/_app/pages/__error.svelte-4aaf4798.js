import{S as k,i as q,s as x,e as f,t as g,k as E,c as d,a as m,h as y,d as u,m as j,b as C,g as D,L as i,j as S,E as b}from"../chunks/index-91d33c8b.js";function H(s){let e,r,l,o,t,_=s[1].message+"",c,h;return{c(){e=f("div"),r=f("h2"),l=g(s[0]),o=E(),t=f("p"),c=g(_),h=E(),this.h()},l(n){e=d(n,"DIV",{class:!0});var a=m(e);r=d(a,"H2",{});var p=m(r);l=y(p,s[0]),p.forEach(u),o=j(a),t=d(a,"P",{});var v=m(t);c=y(v,_),v.forEach(u),h=j(a),a.forEach(u),this.h()},h(){C(e,"class","full-page svelte-11jutet")},m(n,a){D(n,e,a),i(e,r),i(r,l),i(e,o),i(e,t),i(t,c),i(e,h)},p(n,[a]){a&1&&S(l,n[0]),a&2&&_!==(_=n[1].message+"")&&S(c,_)},i:b,o:b,d(n){n&&u(e)}}}function P({error:s,status:e}){return{props:{error:s,status:e}}}function I(s,e,r){let{status:l,error:o}=e;return s.$$set=t=>{"status"in t&&r(0,l=t.status),"error"in t&&r(1,o=t.error)},[l,o]}class V extends k{constructor(e){super();q(this,e,I,H,x,{status:0,error:1})}}export{V as default,P as load};
