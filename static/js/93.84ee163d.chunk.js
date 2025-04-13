"use strict";(self.webpackChunkgym_buddy=self.webpackChunkgym_buddy||[]).push([[28,93,435],{28:(e,t,s)=>{s.r(t),s.d(t,{default:()=>l});var r=s(43),a=s(579);const l=e=>{let{isOpen:t,onClose:s,children:l}=e;return(0,r.useEffect)((()=>{const e=e=>{"modal-backdrop"===e.target.id&&s()},r=e=>{"Escape"===e.key&&s()};return t&&(document.addEventListener("click",e),document.addEventListener("keydown",r)),()=>{document.removeEventListener("click",e),document.removeEventListener("keydown",r)}}),[t,s]),t?(0,a.jsx)("div",{id:"modal-backdrop",className:"fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300",children:(0,a.jsxs)("div",{className:"relative bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-8 rounded-xl shadow-xl max-w-lg w-full transition-all duration-300 transform",children:[(0,a.jsx)("button",{onClick:s,className:"absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-red-500 transition",children:"\u2715"}),(0,a.jsx)("div",{className:"space-y-4",children:l})]})}):null}},93:(e,t,s)=>{s.r(t),s.d(t,{default:()=>d});var r=s(43),a=s(447),l=s(662),i=s(28),n=s(816),o=s(579);const d=()=>{const{user:e,isAuthenticated:t,loginWithRedirect:s}=(0,a.WB)(),d=(0,l.Zp)(),[c,u]=(0,r.useState)(!1),g=[{title:"\ud83c\udfcb\ufe0f Workouts",description:"Track and log your training sessions.",route:"/workouts"},{title:"\ud83d\udcc5 Schedule",description:"Plan workouts and rest days on a calendar.",route:"/schedule"},{title:"\ud83d\udd25 Calories",description:"Calculate your daily calorie needs.",route:"/calories"},{title:"\ud83d\udcc8 Progress",description:"Visualize your fitness journey.",route:"/progress"},{title:"\ud83d\udcaa Personal Record",description:"Track your PRs and milestones.",route:"/personal-record"},{title:"\u2699\ufe0f Settings",description:"Adjust your preferences and units.",route:null,onClick:()=>u(!0)}];return(0,o.jsxs)("section",{className:"max-w-7xl mx-auto mt-6 px-4",children:[(0,o.jsxs)("div",{className:"bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row items-center justify-between",children:[(0,o.jsxs)("div",{children:[(0,o.jsx)("h1",{className:"text-3xl font-bold mb-2",children:t?`Hey ${e.name.split(" ")[0]} \ud83d\udc4b`:"Welcome to Gym Buddy \ud83d\udcaa"}),(0,o.jsx)("p",{className:"text-sm text-teal-100",children:t?"Welcome back! Ready to hit your goals today?":"Start your fitness journey with personalized tracking and tools."})]}),t?(0,o.jsxs)("div",{className:"flex items-center gap-4 mt-4 md:mt-0",children:[(0,o.jsx)("img",{src:e.picture,alt:"User avatar",className:"w-20 h-20 rounded-full border-2 border-white shadow"}),(0,o.jsx)("div",{children:(0,o.jsxs)("p",{className:"text-sm",children:["\ud83d\udce7 ",e.email]})})]}):(0,o.jsx)("button",{onClick:()=>s(),className:"mt-4 md:mt-0 bg-white text-teal-700 font-semibold px-5 py-2 rounded shadow hover:bg-teal-100 transition",children:"Log In to Get Started"})]}),(0,o.jsx)("div",{className:"mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:g.map(((e,r)=>(0,o.jsxs)("div",{className:"bg-white dark:bg-gray-800 p-5 rounded-md shadow hover:shadow-lg transition cursor-pointer border dark:border-gray-700",onClick:()=>{var r;!t&&e.route?s():e.route?d(e.route):null===(r=e.onClick)||void 0===r||r.call(e)},children:[(0,o.jsx)("h3",{className:"text-teal-600 font-semibold text-lg mb-1",children:e.title}),(0,o.jsx)("p",{className:"text-sm text-gray-600 dark:text-gray-300",children:e.description})]},r)))}),(0,o.jsx)("div",{className:"mt-10 text-center text-gray-500 text-sm italic",children:"\u201cYou better be grinding\u201d"}),(0,o.jsx)(i.default,{isOpen:c,onClose:()=>u(!1),children:(0,o.jsx)(n.default,{})})]})}},816:(e,t,s)=>{s.r(t),s.d(t,{default:()=>o});var r=s(43),a=s(447),l=s(472),i=s(948),n=s(579);const o=function(){const{user:e,isAuthenticated:t}=(0,a.WB)(),[s,o]=(0,r.useState)(!1),[d,c]=(0,r.useState)("lbs"),[u,g]=(0,r.useState)("cm"),[m,x]=(0,r.useState)({message:"",type:""});return(0,r.useEffect)((()=>{const s=localStorage.getItem("gymapp_settings");if(s){var r,a,n;const e=JSON.parse(s);o(null!==(r=e.darkMode)&&void 0!==r&&r),c(null!==(a=e.unit)&&void 0!==a?a:"lbs"),g(null!==(n=e.heightUnit)&&void 0!==n?n:"cm")}if(t&&e){(async()=>{try{const a=(0,l.H9)(i.A,"settings",e.sub),n=await(0,l.x7)(a);if(n.exists()){var t,s,r;const e=n.data();o(null!==(t=e.darkMode)&&void 0!==t&&t),c(null!==(s=e.unit)&&void 0!==s?s:"lbs"),g(null!==(r=e.heightUnit)&&void 0!==r?r:"cm"),localStorage.setItem("gymapp_settings",JSON.stringify(e))}}catch(a){console.error("Error loading settings from Firestore:",a)}})()}}),[t,e]),(0,n.jsxs)("div",{className:"max-w-xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md mt-8 space-y-6",children:[m.message&&(0,n.jsx)("div",{className:("success"===m.type?"bg-green-500":"bg-red-500")+" text-white p-4 rounded-lg mb-6",children:m.message}),(0,n.jsx)("h2",{className:"text-2xl font-bold text-teal-600",children:"Settings"}),(0,n.jsxs)("div",{className:"flex items-center justify-between",children:[(0,n.jsx)("label",{className:"text-teal-700",children:"Dark Mode"}),(0,n.jsx)("input",{type:"checkbox",checked:s,onChange:()=>o(!s)})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"text-teal-700 block mb-1",children:"Preferred Units"}),(0,n.jsxs)("select",{value:d,onChange:e=>c(e.target.value),className:"w-full border rounded p-2 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600",children:[(0,n.jsx)("option",{value:"lbs",children:"Pounds (lbs)"}),(0,n.jsx)("option",{value:"kg",children:"Kilograms (kg)"})]})]}),(0,n.jsxs)("div",{children:[(0,n.jsx)("label",{className:"text-teal-700 block mb-1",children:"Preferred Height Unit"}),(0,n.jsxs)("select",{value:u,onChange:e=>g(e.target.value),className:"w-full border rounded p-2 bg-white text-gray-900 dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600",children:[(0,n.jsx)("option",{value:"cm",children:"Centimeters (cm)"}),(0,n.jsx)("option",{value:"ft-in",children:"Feet (ft)"})]})]}),(0,n.jsx)("button",{onClick:async()=>{const r={darkMode:s,unit:d,heightUnit:u};if(localStorage.setItem("gymapp_settings",JSON.stringify(r)),t&&e)try{await(0,l.BN)((0,l.H9)(i.A,"settings",e.sub),r,{merge:!0}),x({message:"Settings saved successfully!",type:"success"})}catch(a){console.error("Error saving settings:",a),x({message:"Error saving settings.",type:"error"})}else x({message:"Settings saved locally only.",type:"success"})},className:"w-full bg-teal-600 text-white p-2 rounded",children:"Save Settings"})]})}}}]);
//# sourceMappingURL=93.84ee163d.chunk.js.map