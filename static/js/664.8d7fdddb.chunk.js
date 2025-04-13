"use strict";(self.webpackChunkgym_buddy=self.webpackChunkgym_buddy||[]).push([[664],{664:(e,s,t)=>{t.r(s),t.d(s,{default:()=>o});var r=t(43),a=t(447),l=t(472),d=t(948),c=t(579);const o=function(){const{user:e,isAuthenticated:s}=(0,a.WB)(),[t,o]=(0,r.useState)(""),[n,i]=(0,r.useState)(""),[u,m]=(0,r.useState)(""),[h,x]=(0,r.useState)([]);(0,r.useEffect)((()=>{if(s&&e)p();else{const e=localStorage.getItem("personalRecords");e&&x(JSON.parse(e))}}),[s,e]);const p=async()=>{const s=(0,l.rJ)(d.A,"personal_records"),t=(0,l.P)(s,(0,l._M)("userId","==",e.sub),(0,l.My)("timestamp","desc")),r=await(0,l.GG)(t),a=[];r.forEach((e=>{a.push({id:e.id,...e.data()})})),x(a)};return(0,c.jsxs)("div",{className:"max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8 space-y-6",children:[(0,c.jsx)("h2",{className:"text-2xl font-bold text-teal-600",children:"Personal Record"}),(0,c.jsxs)("div",{className:"space-y-4",children:[(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{className:"text-teal-700 block mb-1",children:"Exercise"}),(0,c.jsx)("input",{type:"text",value:t,onChange:e=>{const s=e.target.value;/^[a-zA-Z\s]*$/.test(s)&&o(s)},className:"w-full border rounded p-2",placeholder:"e.g., Bench Press"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{className:"text-teal-700 block mb-1",children:"Weight (lbs or kg)"}),(0,c.jsx)("input",{type:"number",value:n,onChange:e=>i(e.target.value),className:"w-full border rounded p-2",placeholder:"e.g., 150"})]}),(0,c.jsxs)("div",{children:[(0,c.jsx)("label",{className:"text-teal-700 block mb-1",children:"Reps"}),(0,c.jsx)("input",{type:"number",value:u,onChange:e=>m(e.target.value),className:"w-full border rounded p-2",placeholder:"e.g., 12"})]}),(0,c.jsx)("button",{onClick:async()=>{const r={exercise:t,weight:n,reps:u,timestamp:new Date};if(s&&e)try{const s=await(0,l.gS)((0,l.rJ)(d.A,"personal_records"),{...r,userId:e.sub});x((e=>[{id:s.id,...r},...e]))}catch(a){console.error("Error saving record:",a),alert("Error saving record.")}else{const e=[{id:Date.now(),...r},...h];x(e),localStorage.setItem("personalRecords",JSON.stringify(e))}o(""),i(""),m("")},className:"w-full bg-teal-600 text-white p-2 rounded",children:"Save Record"})]}),(0,c.jsxs)("div",{children:[(0,c.jsxs)("div",{className:"flex justify-between items-center",children:[(0,c.jsx)("h3",{className:"text-xl font-semibold text-teal-600",children:"Saved Records"}),h.length>0&&(0,c.jsx)("button",{onClick:async()=>{if(window.confirm("Are you sure you want to delete all personal records?"))if(s&&e)try{const s=(0,l.P)((0,l.rJ)(d.A,"personal_records"),(0,l._M)("userId","==",e.sub)),t=(await(0,l.GG)(s)).docs.map((e=>(0,l.kd)((0,l.H9)(d.A,"personal_records",e.id))));await Promise.all(t),x([])}catch(t){console.error("Error deleting records:",t),alert("Error deleting records.")}else localStorage.removeItem("personalRecords"),x([])},className:"text-sm text-red-500 hover:underline",children:"Clear All"})]}),(0,c.jsx)("div",{className:"space-y-4 mt-4",children:h.length>0?h.map((e=>{var s;return(0,c.jsxs)("div",{className:"bg-gray-100 p-4 rounded-lg shadow-md",children:[(0,c.jsx)("div",{className:"text-teal-700 font-semibold",children:e.exercise}),(0,c.jsxs)("div",{className:"text-teal-500",children:["Weight: ",e.weight," | Reps: ",e.reps]}),(0,c.jsx)("div",{className:"text-sm text-gray-500",children:new Date(null!==(s=e.timestamp)&&void 0!==s&&s.seconds?1e3*e.timestamp.seconds:e.timestamp).toLocaleString()})]},e.id)})):(0,c.jsx)("p",{children:"No records found"})})]})]})}}}]);
//# sourceMappingURL=664.8d7fdddb.chunk.js.map