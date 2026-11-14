const form=document.getElementById('cinematic-inquiry');
const status=document.getElementById('form-status');
const params=new URLSearchParams(location.search);
['utm_source','utm_medium','utm_campaign'].forEach(key=>{const field=document.getElementById(key);if(field)field.value=params.get(key)||''});
if(form)form.addEventListener('submit',event=>{if(!form.reportValidity()){event.preventDefault();return}status.textContent='Sending your inquiry…'});

