import{S as Q,i as X,s as x,e as w,w as P,c as b,a as E,x as z,d as f,b as V,g as $,y as T,q as A,o as F,B as U,Z as te,V as H,a4 as M,k,m as q,a5 as R,t as C,h as G,L as _,j as se,Y as ne}from"../../chunks/index-91d33c8b.js";import{L as ae}from"../../chunks/Link-b69fdce7.js";import"../../chunks/HeaderSearch.svelte_svelte_type_style_lang-3d3e62a8.js";import{B as ee}from"../../chunks/Button-41ba37ef.js";import{F as ie}from"../../chunks/Form-29ef86bb.js";import{T as re,P as le}from"../../chunks/PasswordInput-d7b33f09.js";import{g as oe,a as Y,E as Z,f as J,G as W,h as ue,i as fe}from"../../chunks/firebase-c7a26db2.js";import{g as K}from"../../chunks/navigation-0e6511d1.js";import"../../chunks/index-e1227db7.js";import"../../chunks/singletons-d1fb5791.js";function ce(l){let t;return{c(){t=C("Sign In")},l(s){t=G(s,"Sign In")},m(s,i){$(s,t,i)},d(s){s&&f(t)}}}function me(l){let t,s,i,n,o,r,u,p,m,g,c,I;function D(e){l[3](e)}let B={type:"email",labelText:"Email",placeholder:"Enter your email",name:"email"};l[0]!==void 0&&(B.value=l[0]),t=new re({props:B}),H.push(()=>M(t,"value",D));function v(e){l[4](e)}let L={labelText:"Password",placeholder:"Enter password",tooltipAlignment:"start",tooltipPosition:"left",name:"password"};return l[1]!==void 0&&(L.value=l[1]),r=new le({props:L}),H.push(()=>M(r,"value",v)),c=new ee({props:{size:"small",$$slots:{default:[ce]},$$scope:{ctx:l}}}),c.$on("click",l[2]),{c(){P(t.$$.fragment),i=k(),n=w("div"),o=k(),P(r.$$.fragment),p=k(),m=w("div"),g=k(),P(c.$$.fragment),this.h()},l(e){z(t.$$.fragment,e),i=q(e),n=b(e,"DIV",{class:!0}),E(n).forEach(f),o=q(e),z(r.$$.fragment,e),p=q(e),m=b(e,"DIV",{class:!0}),E(m).forEach(f),g=q(e),z(c.$$.fragment,e),this.h()},h(){V(n,"class","space svelte-4vzryv"),V(m,"class","space svelte-4vzryv")},m(e,a){T(t,e,a),$(e,i,a),$(e,n,a),$(e,o,a),T(r,e,a),$(e,p,a),$(e,m,a),$(e,g,a),T(c,e,a),I=!0},p(e,a){const d={};!s&&a&1&&(s=!0,d.value=e[0],R(()=>s=!1)),t.$set(d);const h={};!u&&a&2&&(u=!0,h.value=e[1],R(()=>u=!1)),r.$set(h);const y={};a&64&&(y.$$scope={dirty:a,ctx:e}),c.$set(y)},i(e){I||(A(t.$$.fragment,e),A(r.$$.fragment,e),A(c.$$.fragment,e),I=!0)},o(e){F(t.$$.fragment,e),F(r.$$.fragment,e),F(c.$$.fragment,e),I=!1},d(e){U(t,e),e&&f(i),e&&f(n),e&&f(o),U(r,e),e&&f(p),e&&f(m),e&&f(g),U(c,e)}}}function pe(l){let t,s,i;return s=new ie({props:{$$slots:{default:[me]},$$scope:{ctx:l}}}),{c(){t=w("div"),P(s.$$.fragment),this.h()},l(n){t=b(n,"DIV",{class:!0});var o=E(t);z(s.$$.fragment,o),o.forEach(f),this.h()},h(){V(t,"class","form-container svelte-4vzryv")},m(n,o){$(n,t,o),T(s,t,null),i=!0},p(n,[o]){const r={};o&67&&(r.$$scope={dirty:o,ctx:n}),s.$set(r)},i(n){i||(A(s.$$.fragment,n),i=!0)},o(n){F(s.$$.fragment,n),i=!1},d(n){n&&f(t),U(s)}}}function $e(l,t,s){let i,n;const o=te();function r(){o("login",{email:i,password:n})}function u(m){i=m,s(0,i)}function p(m){n=m,s(1,n)}return[i,n,r,u,p]}class de extends Q{constructor(t){super();X(this,t,$e,pe,x,{})}}function O(l){let t,s,i;return{c(){t=w("div"),s=w("p"),i=C(l[0]),this.h()},l(n){t=b(n,"DIV",{class:!0});var o=E(t);s=b(o,"P",{class:!0});var r=E(s);i=G(r,l[0]),r.forEach(f),o.forEach(f),this.h()},h(){V(s,"class","svelte-1d6wgqq"),V(t,"class","notification-block svelte-1d6wgqq")},m(n,o){$(n,t,o),_(t,s),_(s,i)},p(n,o){o&1&&se(i,n[0])},d(n){n&&f(t)}}}function _e(l){let t;return{c(){t=C("Sign In with google")},l(s){t=G(s,"Sign In with google")},m(s,i){$(s,t,i)},d(s){s&&f(t)}}}function ge(l){let t;return{c(){t=C("Sign Up")},l(s){t=G(s,"Sign Up")},m(s,i){$(s,t,i)},d(s){s&&f(t)}}}function ve(l){let t,s,i,n,o,r,u,p,m,g,c,I,D,B,v,L,e=l[0]&&O(l);return m=new de({}),m.$on("login",l[1]),c=new ee({props:{size:"small",$$slots:{default:[_e]},$$scope:{ctx:l}}}),c.$on("click",l[2]),v=new ae({props:{href:"/auth/register",$$slots:{default:[ge]},$$scope:{ctx:l}}}),{c(){t=k(),s=w("div"),i=w("div"),n=w("h4"),o=C("Login"),r=k(),u=w("div"),e&&e.c(),p=k(),P(m.$$.fragment),g=k(),P(c.$$.fragment),I=k(),D=w("div"),B=C("Don't have an account? "),P(v.$$.fragment),this.h()},l(a){ne('[data-svelte="svelte-1bel8ov"]',document.head).forEach(f),t=q(a),s=b(a,"DIV",{});var h=E(s);i=b(h,"DIV",{class:!0});var y=E(i);n=b(y,"H4",{class:!0});var j=E(n);o=G(j,"Login"),j.forEach(f),y.forEach(f),r=q(h),u=b(h,"DIV",{class:!0});var S=E(u);e&&e.l(S),p=q(S),z(m.$$.fragment,S),g=q(S),z(c.$$.fragment,S),I=q(S),D=b(S,"DIV",{});var N=E(D);B=G(N,"Don't have an account? "),z(v.$$.fragment,N),N.forEach(f),S.forEach(f),h.forEach(f),this.h()},h(){document.title="Login",V(n,"class","svelte-1d6wgqq"),V(i,"class","header svelte-1d6wgqq"),V(u,"class","signin-form svelte-1d6wgqq")},m(a,d){$(a,t,d),$(a,s,d),_(s,i),_(i,n),_(n,o),_(s,r),_(s,u),e&&e.m(u,null),_(u,p),T(m,u,null),_(u,g),T(c,u,null),_(u,I),_(u,D),_(D,B),T(v,D,null),L=!0},p(a,[d]){a[0]?e?e.p(a,d):(e=O(a),e.c(),e.m(u,p)):e&&(e.d(1),e=null);const h={};d&8&&(h.$$scope={dirty:d,ctx:a}),c.$set(h);const y={};d&8&&(y.$$scope={dirty:d,ctx:a}),v.$set(y)},i(a){L||(A(m.$$.fragment,a),A(c.$$.fragment,a),A(v.$$.fragment,a),L=!0)},o(a){F(m.$$.fragment,a),F(c.$$.fragment,a),F(v.$$.fragment,a),L=!1},d(a){a&&f(t),a&&f(s),e&&e.d(),U(m),U(c),U(v)}}}function he(l,t,s){let{errors:i}=t;async function n(r){try{let u=await oe(Y,r.detail.email,r.detail.password);await Z(J(Y.currentUser.uid),{username:u.user.displayName,email:u.user.email}),await K("/admin")}catch(u){console.log("error signin in",u)}}function o(){try{const r=new W,u=ue();fe(u,r).then(async p=>{const g=W.credentialFromResult(p).accessToken,c=p.user;await Z(J(u.currentUser.uid),{username:c.displayName,email:c.email}),await K("/admin")}).catch(p=>{const m=p.code,g=p.message,c=p.customData.email,I=W.credentialFromError(p)})}catch(r){console.log(r)}}return l.$$set=r=>{"errors"in r&&s(0,i=r.errors)},[i,n,o]}class Le extends Q{constructor(t){super();X(this,t,he,ve,x,{errors:0})}}export{Le as default};
