// Local visual QA fallback when the integrated browser is unavailable.
// Start headless Edge on localhost:9223 and the project server on :4173 first.
import { writeFile, mkdir } from 'node:fs/promises';
const tabs=await (await fetch('http://127.0.0.1:9223/json')).json();
const ws=new WebSocket(tabs.find(t=>t.type==='page').webSocketDebuggerUrl);
await new Promise(resolve=>ws.addEventListener('open',resolve,{once:true}));
let serial=0;const pending=new Map();
ws.addEventListener('message',event=>{const data=JSON.parse(event.data);if(pending.has(data.id)){const {resolve,reject}=pending.get(data.id);pending.delete(data.id);data.error?reject(data.error):resolve(data.result)}});
const call=(method,params={})=>new Promise((resolve,reject)=>{const id=++serial;pending.set(id,{resolve,reject});ws.send(JSON.stringify({id,method,params}))});
await call('Page.enable');
await mkdir('test-results',{recursive:true});
const results=[];
const integrated=process.argv.includes('--app');
for(const width of [390,1440]){
  await call('Emulation.setDeviceMetricsOverride',{width,height:1100,deviceScaleFactor:1,mobile:width<600});
  for(const game of ['memory','whatDidYouSee','word','image','odd','sequence','routine','findObject','tapOnly','association','situations','sentence']){
    await call('Page.navigate',{url:integrated?`http://127.0.0.1:4173/?review=${game}-${width}#/jogo/${game}`:`http://127.0.0.1:4173/scripts/art-review.html?game=${game}&phase=${game==='sequence'?1:3}`});
    let ready=false;
    for(let n=0;n<60;n++){
      await new Promise(r=>setTimeout(r,100));
      const state=await call('Runtime.evaluate',{expression:integrated?"!!document.querySelector('#start-activity')":"document.body?.dataset.ready === 'true'"});
      if(state.result.value){ready=true;break}
    }
    if(!ready)throw new Error(`Page did not finish: ${game}`);
    if(integrated){
      await call('Runtime.evaluate',{expression:"document.querySelector('#start-activity').click()"});
      await new Promise(r=>setTimeout(r,800));
      if(game==='memory')await call('Runtime.evaluate',{expression:"document.querySelector('.memory-card').click()"});
      await new Promise(r=>setTimeout(r,500));
    }
    const {result}=await call('Runtime.evaluate',{expression:"JSON.stringify({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,images:document.querySelectorAll('.object-picture use').length,report:document.querySelector('#report')?.textContent||document.querySelector('h1')?.textContent})"});
    results.push({game,...JSON.parse(result.value)});
    const {data}=await call('Page.captureScreenshot',{format:'png',captureBeyondViewport:true});
    await writeFile(`test-results/${integrated?'app-':''}${game}-${width}.png`,Buffer.from(data,'base64'));
  }
}
await writeFile(`test-results/${integrated?'app-':''}art-layout.json`,JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));ws.close();
