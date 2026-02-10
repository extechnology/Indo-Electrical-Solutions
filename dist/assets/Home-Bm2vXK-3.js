import{c as d,r as m,j as e,R as g,u as b,a as f,S as v,b as j,g as w,L as N}from"./index-BUWpgmdL.js";import{u as y}from"./useBanners-D9-LvrnU.js";import{H as k}from"./heart-Dig-cOmC.js";import{u as C}from"./useProducts-Cg2AYk8A.js";import{S as _}from"./star-n6T16t1u.js";import{X as B}from"./x-Bt9MqY5l.js";import{u as M}from"./useBrands-eCJy91w5.js";const E=[["path",{d:"m15 18-6-6 6-6",key:"1wnfg3"}]],x=d("chevron-left",E);const L=[["path",{d:"m9 18 6-6-6-6",key:"mthhwq"}]],u=d("chevron-right",L);const S=[["path",{d:"M2 12h20",key:"9i4pu4"}],["path",{d:"M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8",key:"u0tga0"}],["path",{d:"m4 8 16-4",key:"16g0ng"}],["path",{d:"m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8",key:"12cejc"}]],A=d("cooking-pot",S);const D=[["path",{d:"M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",key:"1ptgy4"}],["path",{d:"M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",key:"1sl1rz"}]],$=d("droplets",D);const z=[["path",{d:"M10.827 16.379a6.082 6.082 0 0 1-8.618-7.002l5.412 1.45a6.082 6.082 0 0 1 7.002-8.618l-1.45 5.412a6.082 6.082 0 0 1 8.618 7.002l-5.412-1.45a6.082 6.082 0 0 1-7.002 8.618l1.45-5.412Z",key:"484a7f"}],["path",{d:"M12 12v.01",key:"u5ubse"}]],I=d("fan",z);const P=[["path",{d:"M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z",key:"1pdavp"}],["path",{d:"M20.054 15.987H3.946",key:"14rxg9"}]],F=d("laptop",P);const R=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]],T=d("lightbulb",R);const H=[["path",{d:"M12 22v-5",key:"1ega77"}],["path",{d:"M15 8V2",key:"18g5xt"}],["path",{d:"M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z",key:"1xoxul"}],["path",{d:"M9 8V2",key:"14iosj"}]],O=d("plug",H);const q=[["rect",{width:"14",height:"20",x:"5",y:"2",rx:"2",ry:"2",key:"1yt0o3"}],["path",{d:"M12 18h.01",key:"mhygvu"}]],V=d("smartphone",q);const W=[["path",{d:"m17 2-5 5-5-5",key:"16satq"}],["rect",{width:"20",height:"15",x:"2",y:"7",rx:"2",key:"1e6viu"}]],U=d("tv",W);const Y=[["path",{d:"M3 6h3",key:"155dbl"}],["path",{d:"M17 6h.01",key:"e2y6kg"}],["rect",{width:"18",height:"20",x:"3",y:"2",rx:"2",key:"od3kk9"}],["circle",{cx:"12",cy:"13",r:"5",key:"nlbqau"}],["path",{d:"M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5",key:"17lach"}]],G=d("washing-machine",Y),K=()=>{const{data:a}=y(),[s,o]=m.useState(0),[c,l]=m.useState(!1);m.useEffect(()=>{const t=window.matchMedia("(max-width: 767px)"),r=()=>l(t.matches);return r(),t.addEventListener("change",r),()=>t.removeEventListener("change",r)},[]);const i=m.useMemo(()=>{const t=c?"HERO_MOBILE":"HERO",r=(a||[]).filter(n=>n.banner_type===t&&n.is_active).sort((n,h)=>(n.sort_order??0)-(h.sort_order??0));return r.length===0?[{id:"fallback-1",title:"INDO Electric Mart",subtitle:"Premium Electrical & Sanitary Products",image:"/banner1.jpg",ctaText:"Explore Products",ctaLink:"/products"}]:r.map(n=>({id:String(n.id),title:n.title??"",subtitle:n.description??"",image:n.image||"/banner1.jpg",ctaText:"Explore Products",ctaLink:"/products"}))},[a,c]);return m.useEffect(()=>{o(0)},[i.length]),m.useEffect(()=>{if(i.length<=1)return;const t=setInterval(()=>{o(r=>(r+1)%i.length)},2500);return()=>clearInterval(t)},[i.length]),e.jsxs("section",{className:"relative h-[calc(100vh-64px)] w-full overflow-hidden",children:[e.jsx("div",{className:"absolute inset-0",children:i.map((t,r)=>{const n=r===s;return e.jsxs("div",{className:`absolute inset-0 transition-opacity duration-700 ease-in-out ${n?"opacity-100":"opacity-0"}`,children:[e.jsx("img",{src:t.image,alt:t.title,className:"h-full w-full object-cover",draggable:!1,loading:r===0?"eager":"lazy"}),t.title?.trim()&&e.jsx("div",{className:"absolute inset-0 flex items-center justify-center px-4",children:e.jsxs("div",{className:"rounded-xl bg-black/40 px-6 py-4 backdrop-blur-sm",children:[e.jsx("h2",{className:"text-center text-2xl font-semibold text-white sm:text-4xl",children:t.title}),t.subtitle?.trim()&&e.jsx("p",{className:"mt-2 text-center text-sm text-white/80 sm:text-base",children:t.subtitle})]})}),e.jsx("div",{className:"absolute inset-0",children:e.jsx("div",{className:"absolute -top-40 -left-40 h-full w-full rounded-full bg-[#E02C2C]/20 blur-3xl"})})]},t.id)})}),e.jsx("div",{className:"relative z-10 mx-auto flex h-full max-w-7xl px-4",children:e.jsx("div",{className:"flex w-full items-center"})})]})},Q=a=>{const s=a?.slug.toLowerCase(),o=a?.name.toLowerCase(),c=(a.full_path||"").toLowerCase();return s.includes("electrical")||c.includes("electrical")?e.jsx(O,{className:"w-6 h-6"}):s.includes("lighting")||s.includes("led")||o.includes("bulb")?e.jsx(T,{className:"w-6 h-6"}):s.includes("fan")||o.includes("fan")?e.jsx(I,{className:"w-6 h-6"}):s.includes("mobile")||s.includes("phone")?e.jsx(V,{className:"w-6 h-6"}):s.includes("kitchen")?e.jsx(A,{className:"w-6 h-6"}):s.includes("tv")||s.includes("audio")||s.includes("video")?e.jsx(U,{className:"w-6 h-6"}):s.includes("wash")?e.jsx(G,{className:"w-6 h-6"}):s.includes("sanitary")||s.includes("bidet")||c.includes("wash basins")?e.jsx($,{className:"w-6 h-6"}):s.includes("laptop")||s.includes("computer")?e.jsx(F,{className:"w-6 h-6"}):s.includes("beauty")||s.includes("health")?e.jsx(k,{className:"w-6 h-6"}):e.jsx(v,{className:"w-6 h-6"})},X=a=>{const s=a?.slug.toLowerCase(),o=(a?.full_path||"").toLowerCase();return s.includes("electrical")||o.includes("electrical")?"from-blue-500/20 to-blue-600/10":s.includes("lighting")||s.includes("led")?"from-yellow-500/20 to-yellow-600/10":s.includes("fan")?"from-purple-500/20 to-purple-600/10":s.includes("sanitary")||s.includes("bidet")?"from-teal-500/20 to-teal-600/10":s.includes("mobile")||s.includes("phone")?"from-indigo-500/20 to-indigo-600/10":"from-slate-500/20 to-slate-600/10"},Z=()=>{const[a,s]=m.useState(0),o=g.useRef(null),c=b(),{data:l}=f(),i=m.useMemo(()=>(Array.isArray(l)?l:[]).filter(n=>n?.is_active&&n?.category_type==="LEAF"),[l]);console.log(i,"main");const t=r=>{if(!o.current)return;const n=300,h=r==="left"?a-n:a+n;o.current.scrollTo({left:h,behavior:"smooth"}),s(h)};return e.jsxs("section",{className:"w-full bg-linear-to-br from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] py-14 md:py-10 relative overflow-hidden",children:[e.jsxs("div",{className:"absolute inset-0 opacity-20",children:[e.jsx("div",{className:"absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse"}),e.jsx("div",{className:"absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse",style:{animationDelay:"1s"}})]}),e.jsxs("div",{className:"mx-auto max-w-7xl px-4 sm:px-6 lg:px-4 relative z-10",children:[e.jsxs("div",{className:"flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-white font-medium text-xl sm:text-2xl lg:text-2xl tracking-tight",children:"Shop by Category"}),e.jsx("p",{className:"text-slate-400 text-sm sm:text-base mt-2",children:"Discover our curated collection"})]}),e.jsxs("div",{className:"hidden lg:flex gap-2",children:[e.jsx("button",{onClick:()=>t("left"),className:"p-2 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 group","aria-label":"Scroll left",children:e.jsx(x,{className:"w-5 h-5 text-slate-400 group-hover:text-white transition-colors"})}),e.jsx("button",{onClick:()=>t("right"),className:"p-2 rounded-full bg-slate-800/50 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 transition-all duration-300 group","aria-label":"Scroll right",children:e.jsx(u,{className:"w-5 h-5 text-slate-400 group-hover:text-white transition-colors"})})]})]}),e.jsx("div",{ref:o,className:"overflow-x-auto overflow-y-hidden py-1 scrollbar-hide",style:{scrollbarWidth:"none",msOverflowStyle:"none",WebkitOverflowScrolling:"touch"},children:e.jsx("div",{className:"flex gap-3 lg:gap-5 w-max px-1",children:i.map((r,n)=>{const h=X(r);return e.jsx("button",{onClick:()=>c(`/filter/${r?.slug}`),className:`\r
    group\r
    relative\r
    shrink-0\r
    w-[88px] h-[104px]\r
    sm:w-[108px] sm:h-[124px]\r
    lg:w-[128px] lg:h-[144px]\r
    focus:outline-none\r
  `,style:{animation:`fadeInUp 0.45s cubic-bezier(.22,.61,.36,1) ${n*.07}s both`},children:e.jsxs("div",{className:`\r
      relative h-full w-full\r
      rounded-3xl\r
      bg-linear-to-br from-slate-800/50 to-slate-900/60\r
      border border-slate-700/50\r
      backdrop-blur-md\r
      shadow-lg\r
      transition-all duration-300\r
      group-hover:scale-[1.04]\r
      group-hover:border-blue-500/50\r
      group-hover:shadow-blue-500/25\r
      overflow-hidden\r
      flex flex-col items-center justify-center\r
      px-3 py-4\r
    `,children:[e.jsx("div",{className:`absolute inset-0 bg-linear-to-br ${h} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}),e.jsx("div",{className:"pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300",children:e.jsx("div",{className:"absolute inset-y-0 left-0 w-1/2 bg-linear-to-r from-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"})}),e.jsxs("div",{className:"relative z-10 flex flex-col items-center gap-2 text-center",children:[e.jsx("div",{className:`\r
          relative\r
          h-20 w-20\r
          sm:h-16 sm:w-16\r
          lg:h-20 lg:w-20\r
          rounded-2xl\r
          bg-slate-800/60\r
          border border-slate-700/50\r
          shadow-md\r
          flex items-center justify-center\r
          overflow-hidden\r
          transition-transform duration-300\r
          group-hover:scale-110 group-hover:rotate-2  \r
        `,children:r?.image?e.jsxs(e.Fragment,{children:[e.jsx("img",{src:r?.image,alt:r?.name,loading:"lazy",className:`\r
                h-full w-full\r
                object-contain\r
                transition-transform duration-300\r
                group-hover:scale-105\r
              `}),e.jsx("div",{className:"absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-300"})]}):e.jsx("div",{className:"text-slate-300 group-hover:text-white transition-colors duration-300 scale-110",children:Q(r)})}),e.jsx("p",{className:`\r
          text-[11px] sm:text-xs\r
          font-medium\r
          text-slate-200\r
          group-hover:text-white\r
          transition-colors duration-300\r
          leading-snug\r
          line-clamp-2\r
          max-w-28\r
        `,children:r.name})]}),e.jsx("div",{className:"absolute top-0 right-0 h-12 w-12 bg-linear-to-br from-blue-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"})]})},r.id)})})}),e.jsxs("div",{className:"lg:hidden flex items-center justify-center gap-2 mt-6 text-slate-500 text-xs animate-pulse",children:[e.jsx(x,{className:"w-4 h-4"}),e.jsx("span",{children:"Swipe to explore more"}),e.jsx(u,{className:"w-4 h-4"})]})]}),e.jsx("style",{children:`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `})]})},p=a=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(a),J=()=>{const{data:a=[],isLoading:s}=C(),o=b(),c="featured-products-scroll",l=t=>{const r=document.getElementById(c);if(!r)return;const n=320;r.scrollBy({left:t==="left"?-n:n,behavior:"smooth"})},i=m.useMemo(()=>a.filter(t=>t.is_active&&t.is_featured).map(t=>({id:t.id,name:t.name,slug:t.slug,image:t.image||"/placeholder.png",categorySlug:t.category?.slug||"",price:Number(t.price||0),oldPrice:t.old_price?Number(t.old_price):void 0,rating:typeof t.rating=="number"?t.rating:4,description:t.description||"",brandName:t.brand?.name||"Brand",stock:t.stock,min_order_quantity:t.min_order_quantity})),[a]);return console.log(i,"featured"),e.jsx("section",{className:"w-full bg-[#0B0B0D] py-10",children:e.jsxs("div",{className:"mx-auto max-w-7xl px-4",children:[e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-white text-xl sm:text-2xl font-medium",children:"Featured Products"}),e.jsx("p",{className:"mt-1 text-sm text-[#9AA3AF]",children:"Hand-picked products with best value deals"})]}),e.jsxs("div",{className:"hidden sm:flex items-center gap-2",children:[e.jsx("button",{onClick:()=>l("left"),className:"rounded-full border border-[#2A2C33] bg-[#121216] p-2 text-white hover:border-[#E02C2C] transition","aria-label":"Scroll left",type:"button",children:e.jsx(x,{className:"h-5 w-5"})}),e.jsx("button",{onClick:()=>l("right"),className:"rounded-full border border-[#2A2C33] bg-[#121216] p-2 text-white hover:border-[#E02C2C] transition","aria-label":"Scroll right",type:"button",children:e.jsx(u,{className:"h-5 w-5"})})]})]}),s&&e.jsx("div",{className:"mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center",children:e.jsx("p",{className:"text-sm text-white/70",children:"Loading featured products..."})}),!s&&i.length===0&&e.jsx("div",{className:"mt-6 rounded-2xl border border-white/10 bg-white/5 p-8 text-center",children:e.jsx("p",{className:"text-lg font-bold",children:"No featured products found"})}),!s&&i.length>0&&e.jsx("div",{id:c,className:`\r
              mt-6\r
              flex gap-4 overflow-x-auto pb-3\r
              sm:grid sm:overflow-visible sm:pb-0\r
              sm:grid-cols-2 cursor-pointer lg:grid-cols-3 xl:grid-cols-4\r
              scrollbar-hide\r
            `,style:{scrollbarWidth:"none",msOverflowStyle:"none"},children:i.map(t=>e.jsxs("div",{className:`\r
                  group relative\r
                  w-[260px] shrink-0\r
                  sm:w-auto\r
                  rounded-md\r
                  border border-[#2A2C33]\r
                  bg-[#121216]\r
                  overflow-hidden\r
                  transition\r
                  hover:border-[#E02C2C]\r
                  hover:shadow-2xl hover:shadow-black/50\r
                `,onClick:()=>o(`/filter/${t?.categorySlug}`),children:[e.jsxs("div",{className:"relative h-[210px] w-full bg-white flex items-center justify-center",children:[e.jsx("img",{src:t.image,alt:t.name,className:"h-full w-full object-contain p-6 transition duration-500 group-hover:scale-[1.03]",draggable:!1,loading:"lazy"}),e.jsx("div",{className:"absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/35"})]}),e.jsxs("div",{className:"p-4",children:[e.jsx("p",{className:"text-[11px] text-white/60 font-semibold",children:t.brandName}),e.jsx("h3",{className:"mt-1 text-white font-extrabold text-sm leading-snug line-clamp-2",children:t.name}),e.jsx("p",{className:"mt-1 text-white font-light text-xs leading-snug line-clamp-2",children:t.description}),t?.price&&e.jsxs("div",{className:"mt-3 flex items-end gap-2",children:[e.jsx("p",{className:"text-white font-bold text-lg",children:p(t.price)}),t.oldPrice&&e.jsx("p",{className:"text-sm text-white/40 line-through",children:p(t.oldPrice)})]}),e.jsx("div",{children:e.jsxs("p",{className:"mt-1 text-white font-light text-xs leading-snug line-clamp-2",children:["Minimum Order : ",t.min_order_quantity]})}),e.jsxs("div",{className:"mt-3 flex items-center gap-1",children:[Array.from({length:5}).map((r,n)=>{const h=n+1<=Math.round(t.rating);return e.jsx(_,{className:`h-4 w-4 ${h?"fill-[#E02C2C] text-[#E02C2C]":"text-white/25"}`},n)}),e.jsx("span",{className:"ml-2 text-xs text-[#9AA3AF]",children:t.rating.toFixed(1)})]}),e.jsx("button",{onClick:r=>{r.stopPropagation(),o(`/filter/${t?.categorySlug}`)},className:`\r
                      mt-4 w-full\r
                      rounded-xl\r
                      cursor-pointer\r
                      bg-[#0B0B0D]\r
                      border border-[#2A2C33]\r
                      px-4 py-2.5\r
                      text-sm font-bold text-white\r
                      hover:border-[#E02C2C]\r
                      hover:bg-white/5\r
                      transition\r
                    `,type:"button",children:"View Product"})]})]},t.id))}),!s&&i.length>0&&e.jsx("p",{className:"mt-4 text-xs text-[#9AA3AF] sm:hidden",children:"Swipe horizontally to view more products"})]})})},ee=()=>j({queryKey:["latest-launches"],queryFn:()=>w()}),te=a=>a?a.split("#").map(s=>s.replace(/\r?\n/g,"").trim()).filter(Boolean):[],se=({title:a,items:s,onClose:o})=>e.jsxs("div",{className:"fixed inset-0 z-50 flex items-center justify-center",children:[e.jsx("div",{className:"absolute inset-0 bg-black/70 backdrop-blur-sm",onClick:o}),e.jsxs("div",{className:"relative z-10 w-full max-w-xl rounded-2xl bg-[#121216] border border-white/10 p-6 text-white shadow-2xl",children:[e.jsxs("div",{className:"flex items-start justify-between",children:[e.jsx("h3",{className:"text-lg font-bold",children:a}),e.jsx("button",{onClick:o,className:"rounded-lg p-1 hover:bg-white/10",children:e.jsx(B,{size:18})})]}),e.jsx("ul",{className:"mt-4 space-y-3 text-sm text-white/80",children:s.map((c,l)=>e.jsxs("li",{className:"flex gap-3",children:[e.jsx("span",{className:"mt-1 h-1.5 w-1.5 rounded-full bg-[#E02C2C]"}),e.jsx("span",{children:c})]},l))})]})]}),re=()=>{const{data:a}=ee(),[s,o]=g.useState(null),c=m.useMemo(()=>{const l=(a??[]).filter(i=>i.is_active);return console.log(l,"active launch"),l.map((i,t)=>({id:i.id,title:i.title,subtitle:"New Arrival",description:i.description||"",cta:"Shop now",image:i.image||"/banner1.jpg",bgType:t%2===0?"light":"dark"}))},[a]);return e.jsxs("section",{className:"w-full bg-[#0B0B0D] py-10",children:[e.jsxs("div",{className:"mx-auto max-w-7xl px-4",children:[e.jsx("div",{className:"flex items-center justify-between",children:e.jsx("h2",{className:"text-white text-xl sm:text-2xl font-medium",children:"Latest Launches"})}),e.jsxs("div",{className:"mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2",children:[c.map(l=>e.jsxs("div",{className:`\r
                relative overflow-hidden rounded-md\r
                border border-[#2A2C33]\r
                bg-[#121216]\r
                min-h-[230px]\r
                sm:min-h-[260px]\r
                lg:min-h-[280px]\r
                transition\r
                hover:border-[#E02C2C]\r
                hover:shadow-2xl hover:shadow-black/60\r
              `,children:[l.bgType==="light"?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute inset-0 bg-linear-to-r from-white/80 via-white/60 to-white/30"}),e.jsx("div",{className:"absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent"})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"absolute inset-0 bg-linear-to-r from-[#0B0B0D] via-[#121216] to-[#1B1C22]"}),e.jsx("div",{className:"absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent"})]}),e.jsx("div",{className:"absolute -left-20 -top-20 h-60 w-60 rounded-full bg-[#E02C2C]/15 blur-3xl"}),e.jsxs("div",{className:"relative z-10 flex h-full w-full items-center justify-between gap-4 p-6 sm:p-8",children:[e.jsxs("div",{className:"max-w-[60%]",children:[e.jsx("p",{className:`text-xs font-semibold tracking-wide ${l.bgType==="light"?"text-black/60":"text-white/60"}`,children:"INDO MART"}),e.jsx("h3",{className:`mt-2 text-2xl sm:text-3xl font-extrabold leading-tight ${l.bgType==="light"?"text-black":"text-white"}`,children:l.title}),e.jsx("p",{className:`mt-1 text-sm sm:text-base font-semibold ${l.bgType==="light"?"text-black/70":"text-white/75"}`,children:l.subtitle}),l.description&&(()=>{const i=te(l.description),t=i.slice(0,2),r=i.length>2;return e.jsxs("div",{className:`mt-3 text-sm ${l.bgType==="light"?"text-black/70":"text-white/70"}`,children:[e.jsx("ul",{className:"space-y-1",children:t.map((n,h)=>e.jsxs("li",{className:"flex gap-2",children:[e.jsx("span",{className:"text-[#E02C2C]",children:"•"}),e.jsx("span",{children:n})]},h))}),r&&e.jsx("button",{onClick:()=>o({title:l.title,items:i}),className:"mt-2 inline-flex items-center gap-1 text-xs font-bold text-[#E02C2C] hover:underline",children:"View more →"})]})})(),e.jsx(N,{to:"/exclusive",className:`\r
                      mt-5 inline-flex items-center justify-center\r
                      rounded-xl bg-[#E02C2C]\r
                      px-5 py-2.5 text-sm font-bold text-white\r
                      hover:bg-[#B91C1C] transition\r
                    `,children:l.cta})]}),e.jsx("div",{className:"relative w-[40%] h-full flex items-center justify-end",children:e.jsx("img",{src:l.image,alt:l.title,className:`\r
                      h-[170px] sm:h-[190px] lg:h-[210px]\r
                      w-auto object-contain\r
                      drop-shadow-2xl\r
                      transition duration-500\r
                      hover:scale-[1.03]\r
                    `,draggable:!1,loading:"lazy"})})]})]},l.id)),c.length===0&&e.jsx("div",{className:"rounded-xl border border-white/10 bg-white/5 p-6 text-white/70",children:"No latest launches available right now."})]})]}),s&&e.jsx(se,{title:s.title,items:s.items,onClose:()=>o(null)})]})},ae=()=>{const{data:a=[]}=M(),s=[...a,...a];return e.jsxs("section",{className:"bg-linear-to-br from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D] max-w-7xl  mx-auto relative overflow-hidden py-14",children:[e.jsx("div",{className:"pointer-events-none absolute inset-y-0 left-0 w-24 bg-linear-to-r "}),e.jsx("div",{className:"pointer-events-none absolute inset-y-0 right-0 w-24 bg-linear-to-l "}),e.jsx("div",{className:"relative ",children:e.jsx("div",{className:"flex w-max animate-brand-scroll gap-14 px-10",children:s.map((o,c)=>e.jsx("div",{className:`flex items-center justify-center\r
                         grayscale opacity-60\r
                         transition-all duration-300\r
                         hover:grayscale-0 hover:opacity-100`,children:e.jsx("img",{src:o.logo,alt:o.name,className:"h-10 md:h-12 lg:h-25 w-auto object-contain"})},`${o.id}-${c}`))})})]})},me=()=>e.jsxs("div",{children:[e.jsx(K,{}),e.jsx(Z,{}),e.jsx(J,{}),e.jsx("div",{className:"bg-linear-to-br from-[#0B0B0D] via-[#0B0B0D] to-[#0B0B0D]",children:e.jsx(ae,{})}),e.jsx(re,{})]});export{me as default};
