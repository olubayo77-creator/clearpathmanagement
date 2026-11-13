const cfg=window.GS_CONFIG||{};
function track(name,detail={}){const event={name,detail,path:location.pathname,ts:new Date().toISOString()};window.dataLayer=window.dataLayer||[];window.dataLayer.push({event:name,...detail});try{const q=JSON.parse(localStorage.getItem("gs_events")||"[]");q.push(event);localStorage.setItem("gs_events",JSON.stringify(q.slice(-50)))}catch(e){}}
document.querySelectorAll("[data-track]").forEach(el=>el.addEventListener("click",()=>track(el.dataset.track)));
const form=document.getElementById("lead-form"),status=document.getElementById("form-status");
const params=new URLSearchParams(location.search);["utm_source","utm_medium","utm_campaign"].forEach(key=>{const field=document.getElementById(key);if(field)field.value=params.get(key)||""});
form.addEventListener("submit",e=>{if(!form.reportValidity()){e.preventDefault();return}status.textContent="Saving your place...";track("lead_submit_attempt",{source:params.get("utm_source")||"direct"})});
document.getElementById("checkout").addEventListener("click",()=>{track("checkout_interest");if(cfg.checkoutUrl){location.href=cfg.checkoutUrl;return}document.getElementById("email").focus();location.hash="challenge";status.textContent="Join the free challenge list and you will hear when the approved playbook checkout opens."});
track("page_view");

