/** Palette quantization and a portable woven SVG. All image work is local. */
export const SAMPLE_COLORS=['#bbc9cb','#5b828b','#d0b798','#869277','#f0d8a9'];
export const escapeXml=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&apos;'}[c]));
const hex=rgb=>'#'+rgb.map(c=>Math.max(0,Math.min(255,Math.round(c))).toString(16).padStart(2,'0')).join('');
export function palette(pixels,count=5){
 if(!pixels||pixels.length%4||pixels.length>4*256*256||count!==5)throw Error('Expected a small RGBA image and five colors.');
 const buckets=new Map();for(let i=0;i<pixels.length;i+=4){if(pixels[i+3]<128)continue;const rgb=[pixels[i],pixels[i+1],pixels[i+2]],key=rgb.map(v=>v>>4).join(',');let b=buckets.get(key);if(!b){b={n:0,sum:[0,0,0]};buckets.set(key,b);}b.n++;for(let j=0;j<3;j++)b.sum[j]+=rgb[j];}
 const points=[...buckets.values()].map(b=>({rgb:b.sum.map(v=>v/b.n),n:b.n})).sort((a,b)=>b.n-a.n);if(!points.length)throw Error('The image has no visible pixels.');
 const selected=[points[0]];while(selected.length<Math.min(count,points.length)){let best=null,score=-1;for(const p of points){if(selected.includes(p))continue;const dist=Math.min(...selected.map(q=>p.rgb.reduce((s,v,i)=>s+(v-q.rgb[i])**2,0)));const s=dist*Math.sqrt(p.n);if(s>score){score=s;best=p;}}selected.push(best);}
 const result=selected.map(p=>hex(p.rgb));while(result.length<count)result.push(result[result.length%selected.length]);return result;
}
export function shuffled(colors,seed){const result=[...colors];if(seed===0)return result;let n=seed>>>0;for(let i=result.length-1;i>0;i--){n=(Math.imul(n,1664525)+1013904223)>>>0;const j=n%(i+1);[result[i],result[j]]=[result[j],result[i]];}return result;}
export function woven(colors,{title='a walk by the sea',density=9,seed=0,print=false}={}){
 if(!Array.isArray(colors)||colors.length!==5||colors.some(c=>!/^#[0-9a-f]{6}$/i.test(c))||!Number.isInteger(density)||density<6||density>16||typeof title!=='string')throw Error('Invalid weave options.');
 const threads=shuffled(colors,seed),steps=Math.floor(540/density),offset=print?60:0;let paths='';
 paths+='<rect x="38" y="7" width="215" height="546" fill="#514c3d" opacity=".06"/>';
 for(let c=0;c<10;c++)paths+=`<path d="M${30+c*21} 0v${555+(c%3)*8}" stroke="${threads[c%5]}" stroke-width="18"/>`;
 for(let r=0;r<steps;r++){const y=r*density+5,thread=threads[Math.floor(r/(steps/5))%5];paths+=`<path d="M21 ${y}h217" stroke="${thread}" stroke-width="${Math.max(3,density*.54)}"/>`;for(let c=0;c<10;c++)if((r+c)%2===0)paths+=`<path d="M${30+c*21} ${y-density*.45}v${density*.85}" stroke="${threads[c%5]}" stroke-width="14"/>`;}
 return `<svg xmlns="http://www.w3.org/2000/svg" width="${print?1000:265}" height="${print?2200:590}" viewBox="${print?'-20 -40 305 671':'0 0 265 590'}" role="img" aria-label="Woven color keepsake">${print?'<rect x="-20" y="-40" width="305" height="671" fill="#f0eadf"/>':''}${paths}${print?`<text x="132" y="598" text-anchor="middle" fill="#334f41" font-family="Georgia,serif" font-style="italic" font-size="${title.length>35?8:12}">${escapeXml([...title].slice(0,65).join(''))}</text><text x="132" y="616" text-anchor="middle" fill="#647464" font-family="monospace" font-size="5">RIBBON / WOVEN FROM A MOMENT</text>`:''}</svg>`;
}
