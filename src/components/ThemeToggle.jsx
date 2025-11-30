import { useEffect, useState } from 'react';


export default function ThemeToggle(){
const [isDark, setIsDark] = useState(false);
useEffect(()=>{
const stored = localStorage.getItem('theme');
if(stored === 'dark'){
document.documentElement.classList.add('dark');
setIsDark(true);
} else if(stored === 'light'){
document.documentElement.classList.remove('dark');
setIsDark(false);
} else {
const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
if(prefers){ document.documentElement.classList.add('dark'); setIsDark(true); }
}
},[]);
function toggle(){
if(document.documentElement.classList.contains('dark')){
document.documentElement.classList.remove('dark');
localStorage.setItem('theme','light');
setIsDark(false);
} else {
document.documentElement.classList.add('dark');
localStorage.setItem('theme','dark');
setIsDark(true);
}
}
return (
<button onClick={toggle} aria-label="Toggle theme" className="p-2 rounded border">
{isDark ? '🌙' : '☀️'}
</button>
);
}