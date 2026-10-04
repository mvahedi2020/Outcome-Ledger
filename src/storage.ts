import {fresh,KEY,valid,type Ledger} from './domain'
export function safeStorage():Pick<Storage,'getItem'|'setItem'>{try{return window.localStorage}catch{return {getItem:()=>{throw Error('Storage unavailable')},setItem:()=>{throw Error('Storage unavailable')}}}}
export type Read={kind:'empty'|'compatible'|'invalid'|'unreadable';raw:string|null;value:Ledger}
export function read(storage:Pick<Storage,'getItem'>):Read{
 let raw:string|null
 try{raw=storage.getItem(KEY)}catch{return {kind:'unreadable',raw:null,value:fresh()}}
 if(raw===null)return {kind:'empty',raw,value:fresh()}
 try{const value:unknown=JSON.parse(raw);if(valid(value))return {kind:'compatible',raw,value}}catch{/* Preserve invalid bytes. */}
 return {kind:'invalid',raw,value:fresh()}
}
export type Save={ok:boolean;read:Read;notice:string}
export function write(storage:Pick<Storage,'getItem'|'setItem'>,expected:Read,value:Ledger):Save{
 const current=read(storage)
 if(expected.kind==='unreadable'){
  if(current.kind!=='unreadable')return {ok:false,read:current,notice:'Storage became readable. Load saved state before reviewing again.'}
  return {ok:true,read:expected,notice:'Storage is unreadable. Working in memory only; refresh or closing this page loses this change. Unseen saved bytes were not written.'}
 }
 if(current.kind==='unreadable'||current.raw!==expected.raw)return {ok:false,read:current,notice:'Saved state changed or became unreadable. No change made. Load saved state and review again.'}
 if(current.kind==='invalid')return {ok:false,read:current,notice:'Invalid saved data preserved. Export current work, then preview reset to replace those bytes.'}
 try{storage.setItem(KEY,JSON.stringify(value));return {ok:true,read:{kind:'compatible',raw:JSON.stringify(value),value},notice:'Saved locally in this browser.'}}catch{return {ok:true,read:expected,notice:'Saving failed. Working in memory only; refresh or closing this page loses unsaved changes.'}}
}
export function reset(storage:Pick<Storage,'getItem'|'setItem'>,expected:Read):Save{
 const current=read(storage)
 if(expected.kind==='unreadable'||current.kind==='unreadable'||current.raw!==expected.raw)return {ok:false,read:current,notice:'Reset rejected: saved bytes changed or cannot be read. No saved data was replaced.'}
 const value=fresh()
 try{storage.setItem(KEY,JSON.stringify(value));return {ok:true,read:{kind:'compatible',raw:JSON.stringify(value),value},notice:'Reset complete. Reviewed history was removed as previewed.'}}catch{return {ok:false,read:current,notice:'Reset failed. Saved history and current work were preserved.'}}
}
