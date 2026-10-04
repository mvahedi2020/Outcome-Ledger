export type Scenario = 'compatible' | 'missing' | 'wrong'
export type Choice = 'continue' | 'investigate' | 'change'
export type Baseline = {id:string; minutes:number; population:string; unit:string; exposure:string; window:string}
export const LIMIT=12
export const KEY='outcome-ledger-v1'
export const population='Cedar support team · 20 weekly handoffs'
export const exposure='20 handoffs across one complete five-day week'
export const measure='minutes/week'
export const window='2026-09-21 through 2026-09-25'
export const fixtures:Record<Scenario,{label:string; baseline:Baseline|null}>={
 compatible:{label:'Compatible baseline',baseline:{id:'B1',minutes:200,population,unit:measure,exposure,window:'2026-09-07 through 2026-09-11'}},
 missing:{label:'Missing baseline',baseline:null},
 wrong:{label:'Incompatible baseline',baseline:{id:'B2',minutes:300,population:'Elm support team · 30 weekly handoffs',unit:measure,exposure:'30 handoffs across one complete five-day week',window:'2026-09-07 through 2026-09-11'}}
}
export const atoms=[{id:'routing',name:'Route owner',assumption:'20 handoffs × assumed 1.5 minutes of routing avoided',minutes:30,claims:['A']},{id:'lookup',name:'Look up handoff context',assumption:'20 handoffs × assumed 0.5 minutes of lookup avoided',minutes:10,claims:['A','B']},{id:'reentry',name:'Re-enter context',assumption:'20 handoffs × assumed 1 minute of re-entry avoided',minutes:20,claims:['B']}]
export const claims=[{id:'A',name:'Routing guide',output:'Guide delivered · September 14',owner:'Nia · Support lead',adoption:'16 of 20 handoffs used the guide',minutes:40},{id:'B',name:'Context card',output:'Card delivered · September 14',owner:'Eli · Enablement lead',adoption:'12 of 20 handoffs used the card',minutes:30}]
export const causalLimit='Descriptive comparison only. No control group; staffing, case mix and seasonality may explain changes. Delivery and adoption do not establish causation.'
export function observation(scenario:Scenario){
 const b=fixtures[scenario].baseline
 if(!b)return {eligible:false,amount:null,reason:'Baseline missing. A 140-minute observation cannot establish a change without a comparable starting point.'}
 if(b.population!==population||b.unit!==measure||b.exposure!==exposure)return {eligible:false,amount:null,reason:'Baseline population and exposure differ. Elm’s 30 handoffs cannot be compared with Cedar’s 20 handoffs.'}
 return {eligible:true,amount:b.minutes-140,reason:'Comparable population, unit and complete five-day exposure. The earlier baseline and later observation are separate, explicit periods.'}
}
export function reconcile(){
 const sum=claims.reduce((n,c)=>n+c.minutes,0)
 const unique=atoms.reduce((n,a)=>n+a.minutes,0)
 return {gross:sum,shared:sum-unique,net:unique,unit:measure,population,window,kind:'Hypothetical forecast' as const,rule:'Union of workflow atoms: routing 30 + lookup 10 + re-entry 20. Shared lookup is counted once; 40 + 30 − 10 = 60.'}
}
export type Evidence=ReturnType<typeof snapshot>
export function snapshot(scenario:Scenario){return {version:'cedar-evidence-1',estimateVersion:'workflow-atoms-1',scenario,baseline:fixtures[scenario].baseline,observation:{id:'O1',minutes:140,population,unit:measure,exposure,window},eligibility:observation(scenario),claims,adoptionWindow:window,overlap:{...reconcile(),atoms},references:['D1: delivered guide and card, 2026-09-14','A1: Cedar adoption log, '+window,'O1: handoff timing log, '+window,fixtures[scenario].baseline?.id=== 'B1'?'B1: Cedar timing baseline, 2026-09-07 through 2026-09-11':fixtures[scenario].baseline?'B2: Elm timing baseline, 2026-09-07 through 2026-09-11':'Baseline absent'],causalLimit}}
export type Review={id:string;at:string;choice:Choice;owner:string;rationale:string;questions:string;evidence:Evidence}
export type Withdrawal={id:string;reviewId:string;at:string;reason:string}
export type Ledger={schema:1;revision:number;scenario:Scenario;reviews:Review[];withdrawals:Withdrawal[]}
export const fresh=():Ledger=>({schema:1,revision:0,scenario:'compatible',reviews:[],withdrawals:[]})
const object=(v:unknown):v is Record<string,unknown>=>typeof v==='object'&&v!==null&&!Array.isArray(v)
const bounded=(v:unknown,max:number)=>typeof v==='string'&&v.trim().length>0&&v.length<=max
export function valid(v:unknown):v is Ledger {
 if(!object(v)||v.schema!==1||!Number.isSafeInteger(v.revision)||Number(v.revision)<0||!['compatible','missing','wrong'].includes(String(v.scenario))||!Array.isArray(v.reviews)||!Array.isArray(v.withdrawals)||v.reviews.length>LIMIT||v.withdrawals.length>LIMIT)return false
 const ids=new Set<string>()
 for(const r of v.reviews){if(!object(r)||!bounded(r.id,80)||ids.has(String(r.id))||!bounded(r.owner,100)||!bounded(r.rationale,1500)||!bounded(r.questions,1500)||!['continue','investigate','change'].includes(String(r.choice))||typeof r.at!=='string'||!Number.isFinite(Date.parse(r.at))||!object(r.evidence)||!['compatible','missing','wrong'].includes(String(r.evidence.scenario)))return false
 // Known version snapshots must match the complete canonical fixture, preventing fabricated saved evidence.
 if(JSON.stringify(r.evidence)!==JSON.stringify(snapshot(r.evidence.scenario as Scenario)))return false
 ids.add(String(r.id))}
 const withdrawn=new Set<string>(); const eventIds=new Set<string>()
 for(const w of v.withdrawals){if(!object(w)||!bounded(w.id,80)||eventIds.has(String(w.id))||!ids.has(String(w.reviewId))||withdrawn.has(String(w.reviewId))||!bounded(w.reason,1500)||typeof w.at!=='string'||!Number.isFinite(Date.parse(w.at)))return false; withdrawn.add(String(w.reviewId));eventIds.add(String(w.id))}
 return true
}
export function report(ledger:Ledger){return {title:'Outcome Ledger — fictional Cedar benefit review',exportedAt:new Date().toISOString(),boundary:'Fictional learning prototype. No certified ROI or automatic causal attribution.',currentEvidence:snapshot(ledger.scenario),ledger}}
