"use strict";(self.webpackChunkgym_buddy=self.webpackChunkgym_buddy||[]).push([[816],{435:(e,t,r)=>{r.r(t),r.d(t,{default:()=>d});var s=r(43),a=r(447),l=r(472),o=r(948),i=r(579);const d=function(){const{user:e,isAuthenticated:t,isLoading:r}=(0,a.WB)(),[d,n]=(0,s.useState)(""),[c,u]=(0,s.useState)(""),[m,h]=(0,s.useState)(""),[x,g]=(0,s.useState)(""),[b,p]=(0,s.useState)(""),[y,w]=(0,s.useState)("kg"),[k,j]=(0,s.useState)([]),[f,v]=(0,s.useState)(!1);return(0,s.useEffect)((()=>{(async()=>{if(t&&e){v(!0);try{const t=(0,l.P)((0,l.rJ)(o.A,"workouts"),(0,l._M)("userId","==",e.sub),(0,l.My)("timestamp","desc")),r=(await(0,l.GG)(t)).docs.map((e=>e.data()));j(r)}catch(r){console.error("Error fetching workouts: ",r),alert("There was an error fetching your workouts. Please try again.")}finally{v(!1)}}})(),(async()=>{if(t&&e)try{const t=(0,l.H9)(o.A,"settings",e.sub),r=await(0,l.x7)(t);if(r.exists()){const e=r.data();w(e.unit||"kg")}}catch(r){console.error("Error fetching user settings:",r)}})()}),[t,e]),r?(0,i.jsx)("p",{className:"text-center text-gray-500",children:"Checking authentication..."}):(0,i.jsxs)("div",{className:"max-w-2xl mx-auto p-4",children:[(0,i.jsxs)("div",{className:"bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-lg p-6 transition-all",children:[!t&&(0,i.jsxs)("div",{className:"bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4 mb-4 rounded-md",children:[(0,i.jsx)("p",{className:"font-semibold",children:"You are not logged in."}),(0,i.jsx)("p",{className:"text-sm",children:"Workouts will not be saved after you close this tab."})]}),(0,i.jsx)("h2",{className:"text-2xl font-bold text-teal-600 mb-4 text-center",children:"Workout Logger"}),(0,i.jsx)("div",{className:(t?"":"opacity-50 pointer-events-none select-none")+" space-y-4",children:(0,i.jsxs)("form",{onSubmit:async r=>{r.preventDefault();const s="Other"===d?c.trim():d;if(!s||!m||!x||!b)return;const a={exercise:s,sets:m,reps:x,weight:b,weightUnit:y,timestamp:Date.now(),userId:(null===e||void 0===e?void 0:e.sub)||null};if(t&&e)try{await(0,l.gS)((0,l.rJ)(o.A,"workouts"),a),j((e=>[a,...e]))}catch(i){console.error("Error saving workout:",i),alert("There was an error saving your workout. Please try again.")}n(""),u(""),h(""),g(""),p("")},children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"exercise",className:"block font-medium text-teal-600 mb-1",children:"Exercise"}),(0,i.jsxs)("select",{id:"exercise",className:"w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700",value:d,onChange:e=>n(e.target.value),required:!0,children:[(0,i.jsx)("option",{value:"",disabled:!0,children:"Select an exercise..."}),(0,i.jsx)("option",{value:"Bench",children:"Bench"}),(0,i.jsx)("option",{value:"Squat",children:"Squat"}),(0,i.jsx)("option",{value:"Deadlift",children:"Deadlift"}),(0,i.jsx)("option",{value:"Other",children:"Other"})]})]}),"Other"===d&&(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"customExercise",className:"block font-medium text-teal-600 mb-1",children:"Custom Exercise"}),(0,i.jsx)("input",{id:"customExercise",type:"text",className:"w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700",value:c,onChange:e=>u(e.target.value),placeholder:"Enter exercise name",required:!0})]}),(0,i.jsxs)("div",{className:"grid grid-cols-3 gap-4",children:[(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"sets",className:"block font-medium text-teal-600 mb-1",children:"Sets"}),(0,i.jsx)("input",{id:"sets",type:"number",min:"1",className:"w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700",value:m,onChange:e=>h(e.target.value),required:!0})]}),(0,i.jsxs)("div",{children:[(0,i.jsx)("label",{htmlFor:"reps",className:"block font-medium text-teal-600 mb-1",children:"Reps"}),(0,i.jsx)("input",{id:"reps",type:"number",min:"1",className:"w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700",value:x,onChange:e=>g(e.target.value),required:!0})]}),(0,i.jsxs)("div",{children:[(0,i.jsxs)("label",{htmlFor:"weight",className:"block font-medium text-teal-600 mb-1",children:["Weight (",y,")"]}),(0,i.jsx)("input",{id:"weight",type:"number",min:"1",className:"w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700",value:b,onChange:e=>p(e.target.value),required:!0})]})]}),(0,i.jsx)("button",{type:"submit",disabled:!t,className:"w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 px-4 rounded-md transition-all "+(t?"":"cursor-not-allowed"),children:"Save Workout"})]})}),(0,i.jsx)("button",{onClick:()=>{n(""),u(""),h(""),g(""),p("")},className:"w-full mt-4 bg-gray-400 hover:bg-gray-500 text-white font-semibold py-2 px-4 rounded-md transition-all",children:"Reset"}),t&&k.length>0&&(0,i.jsx)("button",{onClick:async()=>{if(window.confirm("Are you sure you want to delete all workout logs?")&&e)try{const t=(0,l.P)((0,l.rJ)(o.A,"workouts"),(0,l._M)("userId","==",e.sub)),r=(await(0,l.GG)(t)).docs.map((e=>(0,l.kd)((0,l.H9)(o.A,"workouts",e.id))));await Promise.all(r),j([])}catch(t){console.error("Error deleting workout logs:",t),alert("Error deleting workout logs.")}},className:"w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md transition-all",children:"Clear All Logs"})]}),(0,i.jsxs)("div",{className:"mt-8",children:[(0,i.jsx)("h3",{className:"text-xl font-semibold text-teal-600 mb-4",children:"Workout Log"}),f?(0,i.jsx)("p",{className:"text-center text-teal-600",children:"Loading..."}):0===k.length?(0,i.jsx)("p",{className:"text-gray-500",children:"No workouts logged yet!"}):(0,i.jsx)("ul",{className:"space-y-4",children:k.map(((e,t)=>(0,i.jsxs)("li",{className:"bg-gray-100 dark:bg-gray-800 p-4 rounded-lg shadow-md",children:[(0,i.jsx)("p",{className:"text-teal-700 dark:text-teal-300 font-semibold",children:e.exercise}),(0,i.jsxs)("p",{className:"text-teal-500 dark:text-teal-400",children:["Sets: ",e.sets," | Reps: ",e.reps]}),(0,i.jsxs)("p",{className:"text-teal-500 dark:text-teal-400",children:["Weight: ",e.weight," ",e.weightUnit]}),(0,i.jsx)("p",{className:"text-sm text-gray-500 mt-1",children:new Date(e.timestamp).toLocaleString()})]},t)))})]})]})}}}]);
//# sourceMappingURL=816.fca1df10.chunk.js.map