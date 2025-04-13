"use strict";(self.webpackChunkgym_buddy=self.webpackChunkgym_buddy||[]).push([[901],{901:(e,a,l)=>{l.r(a),l.d(a,{default:()=>o});var t=l(43),r=l(447),s=l(472),d=l(948),n=l(579);const o=()=>{const{user:e,isAuthenticated:a}=(0,r.WB)(),[l,o]=(0,t.useState)("lbs"),[i,c]=(0,t.useState)("cm"),[u,m]=(0,t.useState)(!a),[b,g]=(0,t.useState)(""),[x,h]=(0,t.useState)("male"),[p,v]=(0,t.useState)(""),[y,j]=(0,t.useState)(""),[k,f]=(0,t.useState)(""),[N,w]=(0,t.useState)(""),[C,S]=(0,t.useState)("1.2"),[F,I]=(0,t.useState)(null),[H,M]=(0,t.useState)(""),[A,B]=(0,t.useState)(null),[W,E]=(0,t.useState)(""),[L,Y]=(0,t.useState)(""),[_,D]=(0,t.useState)("");(0,t.useEffect)((()=>{if(a&&e){(async()=>{try{const t=(0,s.H9)(d.A,"settings",e.sub),r=await(0,s.x7)(t);if(r.exists()){var a,l;const e=r.data();o(null!==(a=e.unit)&&void 0!==a?a:"lbs"),c(null!==(l=e.heightUnit)&&void 0!==l?l:"cm")}}catch(t){console.error("Failed to load settings:",t)}finally{m(!0)}})()}}),[a,e]);return u?(0,n.jsxs)("div",{className:"max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,n.jsxs)("div",{className:"bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-xl p-8",children:[(0,n.jsx)("h2",{className:"text-3xl font-bold text-center text-teal-600 mb-6",children:"Daily Calorie Needs"}),(0,n.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block font-medium text-teal-700 mb-1",children:"Age"}),(0,n.jsx)("input",{type:"number",value:b,onChange:e=>g(e.target.value),placeholder:"Years",className:"w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block font-medium text-teal-700 mb-1",children:"Gender"}),(0,n.jsxs)("select",{value:x,onChange:e=>h(e.target.value),className:"w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700",children:[(0,n.jsx)("option",{value:"male",children:"Male"}),(0,n.jsx)("option",{value:"female",children:"Female"})]})]}),(0,n.jsxs)("div",{children:[(0,n.jsxs)("label",{className:"block font-medium text-teal-700 mb-1",children:["Weight (",l,")"]}),(0,n.jsx)("input",{type:"number",value:p,onChange:e=>v(e.target.value),placeholder:"e.g. "+("lbs"===l?"154":"70"),className:"w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"})]}),"ft-in"===i?(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block font-medium text-teal-700 mb-1",children:"Height (ft & in)"}),(0,n.jsxs)("div",{className:"flex space-x-4",children:[(0,n.jsx)("input",{type:"number",placeholder:"Feet",value:y,onChange:e=>j(e.target.value),className:"w-1/2 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"}),(0,n.jsx)("input",{type:"number",placeholder:"Inches",value:k,onChange:e=>f(e.target.value),className:"w-1/2 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"})]})]}):(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block font-medium text-teal-700 mb-1",children:"Height (cm)"}),(0,n.jsx)("input",{type:"number",placeholder:"e.g. 175",value:N,onChange:e=>w(e.target.value),className:"w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"})]}),(0,n.jsxs)("div",{className:"md:col-span-2",children:[(0,n.jsx)("label",{className:"block font-medium text-teal-700 mb-1",children:"Activity Level"}),(0,n.jsxs)("select",{value:C,onChange:e=>S(e.target.value),className:"w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700",children:[(0,n.jsx)("option",{value:"1.2",children:"0-1 days a week"}),(0,n.jsx)("option",{value:"1.375",children:"1-3 days a week"}),(0,n.jsx)("option",{value:"1.55",children:"3-5 days a week"}),(0,n.jsx)("option",{value:"1.725",children:"6-7 days a week"}),(0,n.jsx)("option",{value:"1.9",children:"Every day"})]})]})]}),(0,n.jsx)("button",{onClick:()=>{if(!b||!p||!y&&!N)return;const e=parseFloat(p),a=parseInt(b);let t;t="ft-in"===i&&y&&k?30.48*parseInt(y)+2.54*parseInt(k):parseFloat(N);const r="kg"===l?e:.453592*e,s=("male"===x?10*r+6.25*t-5*a+5:10*r+6.25*t-5*a-161)*parseFloat(C);I(Math.round(s))},className:"w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md",children:"Calculate Calories"}),F&&(0,n.jsxs)("div",{className:"mt-6 text-xl font-semibold text-teal-700",children:[F," Calories"]})]}),(0,n.jsxs)("div",{className:"bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-xl shadow-xl p-8",children:[(0,n.jsx)("h2",{className:"text-3xl font-bold text-center text-teal-600 mb-6",children:"BMI Calculator"}),(0,n.jsxs)("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6",children:[(0,n.jsxs)("div",{children:[(0,n.jsxs)("label",{className:"block font-medium text-teal-700 mb-1",children:["Weight (",l,")"]}),(0,n.jsx)("input",{type:"number",placeholder:"e.g. "+("lbs"===l?"154":"70"),value:H,onChange:e=>M(e.target.value),className:"w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"})]}),"ft-in"===i?(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block font-medium text-teal-700 mb-1",children:"Height (ft & in)"}),(0,n.jsxs)("div",{className:"flex space-x-4",children:[(0,n.jsx)("input",{type:"number",placeholder:"Feet",value:W,onChange:e=>E(e.target.value),className:"w-1/2 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"}),(0,n.jsx)("input",{type:"number",placeholder:"Inches",value:L,onChange:e=>Y(e.target.value),className:"w-1/2 p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"})]})]}):(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"block font-medium text-teal-700 mb-1",children:"Height (cm)"}),(0,n.jsx)("input",{type:"number",placeholder:"e.g. 175",value:_,onChange:e=>D(e.target.value),className:"w-full p-3 border rounded-md dark:bg-gray-800 dark:border-gray-700"})]})]}),(0,n.jsx)("button",{onClick:()=>{if(!H||!W&&!_)return;const e="kg"===l?parseFloat(H):.453592*parseFloat(H);let a;a="ft-in"===i&&W&&L?.3048*parseInt(W)+.0254*parseInt(L):parseFloat(_)/100;B((e/(a*a)).toFixed(2))},className:"w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 px-6 rounded-md",children:"Calculate BMI"}),A&&(0,n.jsxs)("div",{className:"mt-6 text-xl font-semibold text-teal-700",children:["Your BMI is ",A,"."]})]})]}):(0,n.jsx)("div",{className:"text-center text-teal-600 mt-12",children:"Loading settings..."})}}}]);
//# sourceMappingURL=901.30912cc1.chunk.js.map