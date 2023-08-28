const i=({parents:t,id:a})=>((t?t.join("/")+"/":"")+a).replace(/\./g,"/"),n=(t="")=>({originByData:(a,o)=>`${t}/static/origin/${a}/${i(o)}`,pathByData:i});export{n as default};
