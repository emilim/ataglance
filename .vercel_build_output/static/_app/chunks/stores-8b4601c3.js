import{R as e}from"./index-91d33c8b.js";const t=()=>{const s=e("__svelte__");return{page:{subscribe:s.page.subscribe},navigating:{subscribe:s.navigating.subscribe},get preloading(){return console.error("stores.preloading is deprecated; use stores.navigating instead"),{subscribe:s.navigating.subscribe}},session:s.session,updated:s.updated}},n={subscribe(s){return t().navigating.subscribe(s)}};export{t as g,n};