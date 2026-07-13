import{t as e}from"./jsx-runtime-DUAcabCT.js";import{S as t,a as n,d as r,n as i,r as a,t as o,u as s}from"./utils-2n03A0c6.js";import{n as c,t as l}from"./container-gKfKl2FL.js";import{t as u}from"./truck--1Qaxv7d.js";import{ht as d,ut as f}from"./index-DX6MzG1F.js";import{a as p,i as m,n as h,r as g,t as _}from"./card-C5kIEzle.js";var v=s(`clock`,[[`circle`,{cx:`12`,cy:`12`,r:`10`,key:`1mglay`}],[`path`,{d:`M12 6v6l4 2`,key:`mmk7yg`}]]);t();var y=e(),b=r(`inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3`,{variants:{variant:{default:`bg-primary text-primary-foreground [a&]:hover:bg-primary/90`,secondary:`bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90`,destructive:`bg-destructive text-white focus-visible:ring-destructive/20 dark:bg-destructive/60 dark:focus-visible:ring-destructive/40 [a&]:hover:bg-destructive/90`,outline:`border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground`,ghost:`[a&]:hover:bg-accent [a&]:hover:text-accent-foreground`,link:`text-primary underline-offset-4 [a&]:hover:underline`}},defaultVariants:{variant:`default`}});function x({className:e,variant:t=`default`,asChild:r=!1,...i}){return(0,y.jsx)(r?n:`span`,{"data-slot":`badge`,"data-variant":t,className:o(b({variant:t}),e),...i})}var S={delivered:{label:`Livrat`,className:`bg-primary/10 text-primary border-primary/20`,icon:(0,y.jsx)(f,{className:`w-3.5 h-3.5`})},processing:{label:`În procesare`,className:`bg-muted text-muted-foreground border-border`,icon:(0,y.jsx)(v,{className:`w-3.5 h-3.5`})},shipped:{label:`Expediat`,className:`bg-accent text-accent-foreground border-border`,icon:(0,y.jsx)(u,{className:`w-3.5 h-3.5`})}},C=d(`/orders/`);function w(){let e=C.useLoaderData();return(0,y.jsx)(`main`,{className:`flex-1 min-h-screen`,children:(0,y.jsxs)(l,{className:`font-sans text-foreground`,children:[(0,y.jsxs)(`div`,{className:`mb-8`,children:[(0,y.jsxs)(`div`,{className:`text-xs text-muted-foreground mb-3 tracking-wide`,children:[`Acasă >`,` `,(0,y.jsx)(`span`,{className:`text-foreground font-medium`,children:`Comenzi`})]}),(0,y.jsx)(`h1`,{className:`text-2xl md:text-3xl font-semibold tracking-tight`,children:`Comenzile tale`}),(0,y.jsx)(`p`,{className:`text-sm text-muted-foreground mt-1`,children:`Gestionează și urmărește comenzile și configurațiile hardware recente.`})]}),(0,y.jsx)(`div`,{className:`flex flex-col gap-4`,children:e.map(e=>{let t=S.processing;return(0,y.jsx)(c,{to:`/orders/$id`,params:{id:String(e.id)},children:(0,y.jsxs)(_,{className:`\r
                                    border-border\r
                                    bg-card\r
                                    shadow-sm\r
                                    hover:border-primary/40\r
                                    transition-colors\r
                                    `,children:[(0,y.jsxs)(m,{className:`\r
                                        p-6 pb-4\r
                                        flex flex-col\r
                                        sm:flex-row\r
                                        sm:items-center\r
                                        sm:justify-between\r
                                        gap-4\r
                                        space-y-0\r
                                        `,children:[(0,y.jsxs)(`div`,{className:`space-y-1`,children:[(0,y.jsxs)(`div`,{className:`flex items-center gap-3`,children:[(0,y.jsxs)(p,{className:`text-base font-semibold`,children:[`Comanda #`,e.id]}),(0,y.jsxs)(x,{variant:`outline`,className:`
                                                    flex items-center gap-1.5
                                                    px-2.5 py-0.5
                                                    text-xs
                                                    font-medium
                                                    rounded-full
                                                    shadow-none
                                                    ${t.className}
                                                    `,children:[t.icon,t.label]})]}),(0,y.jsxs)(g,{children:[`Plasată în data de`,` `,e.createdAt.toLocaleDateString(`ro-RO`)]})]}),(0,y.jsxs)(`div`,{className:`sm:text-right`,children:[(0,y.jsx)(`span`,{className:`text-xs text-muted-foreground block`,children:`Valoare totală`}),(0,y.jsx)(`span`,{className:`text-lg font-bold`,children:i(Number(e.total))})]})]}),(0,y.jsx)(h,{className:`\r
                                        flex flex-col\r
                                        sm:flex-row\r
                                        sm:items-center\r
                                        sm:justify-between\r
                                        gap-6\r
                                        `,children:(0,y.jsx)(`div`,{className:`flex items-center gap-3 flex-wrap`,children:e.products.map((e,t)=>(0,y.jsx)(`div`,{className:`\r
                                                    w-12 h-12\r
                                                    bg-muted\r
                                                    border-border\r
                                                    border\r
                                                    rounded-lg\r
                                                    flex items-center\r
                                                    justify-center\r
                                                    overflow-hidden\r
                                                    `,children:(0,y.jsx)(`img`,{className:`object-cover w-full h-full`,src:a(e.variant.media[0].url||``)})},t))})})]})},e.id)})})]})})}function T(){return(0,y.jsx)(y.Fragment,{children:(0,y.jsx)(w,{})})}export{T as component};