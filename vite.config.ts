import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({base:'/Outcome-Ledger/',plugins:[react()],server:{host:'127.0.0.1',port:4195,strictPort:true},preview:{host:'127.0.0.1',port:4195,strictPort:true}})
