(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))m(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const l of i.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&m(l)}).observe(document,{childList:!0,subtree:!0});function a(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function m(n){if(n.ep)return;n.ep=!0;const i=a(n);fetch(n.href,i)}})();document.addEventListener("DOMContentLoaded",function(){const u=document.querySelector(".hamburger"),c=document.querySelector(".nav-menu");u.addEventListener("click",function(){u.classList.toggle("active"),c.classList.toggle("active")}),document.querySelectorAll(".nav-link").forEach(e=>{e.addEventListener("click",function(){u.classList.remove("active"),c.classList.remove("active")})}),document.querySelectorAll('a[href^="#"]').forEach(e=>{e.addEventListener("click",function(t){t.preventDefault();const r=document.querySelector(this.getAttribute("href"));if(r){const o=r.offsetTop-80;window.scrollTo({top:o,behavior:"smooth"})}})});const a=document.querySelector(".profile-image");a&&(a.style.opacity="0",a.style.transform="translateY(30px)",a.style.transition="opacity 0.6s ease, transform 0.6s ease",setTimeout(()=>{a.style.opacity="1",a.style.transform="translateY(0)"},500));const m=document.querySelectorAll("section"),n=document.querySelectorAll(".nav-link");function i(){let e="";m.forEach(t=>{const r=t.offsetTop-100,o=t.clientHeight;scrollY>=r&&scrollY<r+o&&(e=t.getAttribute("id"))}),n.forEach(t=>{t.classList.remove("active"),t.getAttribute("href")===`#${e}`&&t.classList.add("active")})}window.addEventListener("scroll",i);const l=document.querySelector(".navbar");window.addEventListener("scroll",function(){window.scrollY>50?l.style.background="rgba(26, 26, 26, 0.95)":l.style.background="rgba(26, 26, 26, 0.9)"});const p=document.getElementById("contactForm");p.addEventListener("submit",function(e){e.preventDefault();const t=new FormData(p),r=t.get("name"),o=t.get("email"),s=t.get("message");if(!r||!o||!s){f("Please fill in all fields","error");return}if(!y(o)){f("Please enter a valid email address","error");return}fetch("https://formspree.io/f/xzzvaggk",{method:"POST",body:new FormData(p),headers:{Accept:"application/json"}}).then(d=>{d.ok?(f("Thank you for your message! I'll get back to you soon.","success"),p.reset()):f("Error sending message. Please try again later.","error")}).catch(d=>{f("An error occurred. Please check your internet connection and try again.","error")})});function y(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function f(e,t="info"){const r=document.querySelector(".notification");r&&r.remove();const o=document.createElement("div");o.className=`notification notification-${t}`,o.innerHTML=`
            <div class="notification-content">
                <span class="notification-message">${e}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;const s=document.createElement("style");s.textContent=`
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: var(--card-bg);
                border: 1px solid var(--border-color);
                border-radius: 10px;
                padding: 1rem;
                backdrop-filter: blur(10px);
                z-index: 1001;
                max-width: 400px;
                animation: slideIn 0.3s ease;
            }
            
            .notification-success {
                border-left: 4px solid #4CAF50;
            }
            
            .notification-error {
                border-left: 4px solid #f44336;
            }
            
            .notification-info {
                border-left: 4px solid var(--primary-color);
            }
            
            .notification-content {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 1rem;
            }
            
            .notification-message {
                color: var(--text-color);
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: var(--text-secondary);
                font-size: 1.2rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            
            .notification-close:hover {
                color: var(--text-color);
            }
            
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `,document.querySelector("style[data-notification]")||(s.setAttribute("data-notification","true"),document.head.appendChild(s)),document.body.appendChild(o),o.querySelector(".notification-close").addEventListener("click",()=>{o.remove()}),setTimeout(()=>{o.parentNode&&o.remove()},5e3)}const g={threshold:.1,rootMargin:"0px 0px -50px 0px"},h=new IntersectionObserver(function(e){e.forEach(t=>{t.isIntersecting&&(t.target.style.opacity="1",t.target.style.transform="translateY(0)")})},g);document.querySelectorAll(".project-card, .skill-item, .experience-item, .achievement-item").forEach(e=>{e.style.opacity="0",e.style.transform="translateY(30px)",e.style.transition="opacity 0.6s ease, transform 0.6s ease",h.observe(e)});const v=document.querySelector(".hero-title");function b(e,t,r=100){e.innerHTML="";let o=0;function s(){if(o<t.length){if(t.charAt(o)==="<"){const d=t.indexOf(">",o),x=t.substring(o,d+1);e.innerHTML+=x,o=d+1}else e.innerHTML+=t.charAt(o),o++;setTimeout(s,r)}}s()}setTimeout(()=>{b(v,"Hi, I'm <span class='highlight'>Tejaswini</span>",150)},1e3),window.addEventListener("scroll",function(){const e=window.pageYOffset;document.querySelectorAll(".element").forEach((r,o)=>{const s=.5+o*.1;r.style.transform=`translateY(${e*s}px) rotate(${e*.1}deg)`})}),window.addEventListener("load",function(){document.body.classList.add("loaded");const e=document.createElement("style");e.textContent=`
            body {
                opacity: 0;
                transition: opacity 0.5s ease;
            }
            
            body.loaded {
                opacity: 1;
            }
        `,document.head.appendChild(e)})});
