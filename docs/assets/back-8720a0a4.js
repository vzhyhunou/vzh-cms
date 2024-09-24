import{q as u,f as p,_ as v,a as y}from"./index-d4997d91.js";import{g as _,b as E}from"./back-0e5f36d1.js";const D=({basename:i=""}={})=>{const d=({parents:e,id:a})=>((e?e.join("/")+"/":"")+a).replace(/\./g,"/"),n={pathByData:(e,a,r,t)=>`${i}/static/${e}/${a}/${d(r)}/${t}`,originByData:(e,a,r)=>n.pathByData("origin",e,a,r)};return n},s="/api",L=({localeProvider:{getLocale:i},authProvider:{getToken:d}})=>{const n=(e,a={})=>Promise.all([i(),d()]).then(([r,t])=>({...a,headers:new Headers({Accept:"application/json","Accept-Language":r}),...t?{user:{authenticated:!0,token:`Bearer ${t}`}}:{}})).then(r=>p(e,r));return{getList:(e,{pagination:a,sort:r,filter:t,options:o})=>{const{page:c,perPage:g}=a,{field:$,order:l}=r,m={page:c-1,size:g,sort:`${$},${l}`,...t};return n(`${s}/${e}/search/list?${u.stringify(m)}`,o).then(({json:h})=>({data:h.content||[],total:h.page.totalElements}))},getOne:(e,{id:a,options:r})=>n(`${s}/${e}/${a}`,r).then(({json:t})=>({data:t})),getMany:(e,{ids:a,options:r})=>n(`${s}/${e}/search/findByIdIn?${u.stringify({ids:a})}`,r).then(({json:t})=>({data:t.content||[]})),getManyReference:(e,{pagination:a,sort:r,filter:t,target:o,id:c,options:g})=>{const{page:$,perPage:l}=a,{field:m,order:h}=r,f={page:$-1,size:l,sort:`${m},${h}`,...t,[o]:c};return n(`${s}/${e}/search/list?${u.stringify(f)}`,g).then(({json:P})=>({data:P.content||[],total:P.page.totalElements}))},update:(e,{id:a,data:r,options:t})=>n(`${s}/${e}/${a}`,{method:"PUT",body:JSON.stringify(r),...t}).then(({json:o})=>({data:o})),updateMany:(e,{data:a,options:r})=>Promise.all(a.map(({id:t,...o})=>n(`${s}/${e}/${t}`,{method:"PATCH",body:JSON.stringify(o),...r}))).then(t=>({data:t.map(o=>o.json)})),create:(e,{data:a,options:r})=>n(`${s}/${e}`,{method:"POST",body:JSON.stringify(a),...r}).then(({json:t})=>({data:{...a,id:t.id}})),delete:(e,{id:a,options:r})=>n(`${s}/${e}/${a}`,{method:"DELETE",...r}).then(({json:t})=>({data:t})),deleteMany:(e,{ids:a,options:r})=>Promise.all(a.map(t=>n(`${s}/${e}/${t}`,{method:"DELETE",...r}))).then(t=>({data:t.map(o=>o.json)})),exchange:({path:e,query:a,data:r,options:t})=>n((e.startsWith("/")?e:`${s}/${e}`)+(a?`?${u.stringify(a)}`:""),r?{body:JSON.stringify(r),...t}:t).then(({json:o})=>({data:o}))}},b={getLocaleProvider:_,getFuncProvider:D,getAuthProvider:E,getDataProvider:L},T=i=>{const{getLocaleProvider:d,getFuncProvider:n,getAuthProvider:e,getDataProvider:a}=b,t=d({getLocaleMessages:$=>v(Object.assign({"./messages/en.js":()=>y(()=>import("./en-8bc2de92.js"),["assets/en-8bc2de92.js","assets/index-d4997d91.js"]),"./messages/ru.js":()=>y(()=>import("./ru-8654b378.js"),[])}),`./messages/${$}.js`).then(l=>l.default),...i}),o=n(i),c=e(i),g=a({localeProvider:t,authProvider:c,...i});return{localeProvider:t,funcProvider:o,authProvider:c,dataProvider:g}};export{T as default};
