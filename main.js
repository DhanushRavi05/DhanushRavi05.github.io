// ===== mobile nav toggle =====
document.addEventListener('DOMContentLoaded', function(){
  const toggle = document.getElementById('navtoggle');
  const links = document.getElementById('navlinks');
  if(toggle && links){
    toggle.addEventListener('click', ()=> links.classList.toggle('open'));
    links.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> links.classList.remove('open')));
  }

  // ===== highlight current page in nav =====
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('[data-nav]').forEach(a=>{
    const href = a.getAttribute('href');
    if(href === current || (current === '' && href === 'index.html')){
      a.classList.add('active');
    }
  });
});

// ===== typing terminal effect =====
function typeInto(container, lines, gap, onDone){
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  lines.forEach((l,i)=>{
    const div = document.createElement('div');
    div.className='line';
    div.innerHTML = l.html;
    div.style.animationDelay = reduced ? '0s' : (i*gap)+'s';
    container.appendChild(div);
  });
  const total = reduced ? 0 : lines.length*gap*1000 + 500;
  setTimeout(onDone, total);
}

// ===== certificates loading (certifications.html) =====
function loadCertificates(){
  fetch('certificates.json').then(r=>r.json()).then(renderCerts).catch(()=>renderCerts([]));
}

function renderCerts(certs){
  const courses = certs.filter(c=> c.category !== 'internship');
  const interns = certs.filter(c=> c.category === 'internship');
  const courseGrid = document.getElementById('certGridCourse');
  const internGrid = document.getElementById('certGridIntern');
  if(courseGrid) courseGrid.innerHTML = courses.length ? courses.map(certCard).join('') : '<div class="cert-empty">No course certificates added yet.</div>';
  if(internGrid) internGrid.innerHTML = interns.length ? interns.map(certCard).join('') : '<div class="cert-empty">No internship certificates added yet.</div>';
}

function certCard(c){
  return `<div class="cert-card">
    <div class="cert-name">${c.name}</div>
    <div class="cert-issuer">${c.issuer}</div>
    <div class="cert-year">${c.year}${c.link ? ' &middot; <a class="cert-link" href="'+c.link+'" target="_blank">view</a>' : ''}</div>
  </div>`;
}

// ===== owner-only certificate upload (certifications.html) =====
const GH_OWNER = 'DhanushRavi05';
const GH_REPO = 'DhanushRavi05.github.io';

function initOwnerUpload(){
  const ownerToggle = document.getElementById('ownerToggle');
  if(!ownerToggle) return;

  let ownerKey = localStorage.getItem('ownerKey') || '';
  const ownerPanel = document.getElementById('ownerPanel');
  const keyGate = document.getElementById('keyGate');
  const uploadFormEl = document.getElementById('uploadForm');
  const keyStatus = document.getElementById('keyStatus');

  function setStatus(el, type, msg){
    el.className = 'owner-status' + (type ? ' '+type : '');
    el.textContent = msg;
  }

  async function validateKey(key){
    try{
      const res = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/certificates.json`, { headers:{ Authorization:`token ${key}` } });
      return res.ok;
    }catch(e){ return false; }
  }

  ownerToggle.addEventListener('click', async ()=>{
    ownerPanel.classList.toggle('open');
    if(ownerPanel.classList.contains('open') && ownerKey){
      setStatus(keyStatus,'loading','Checking saved key...');
      const ok = await validateKey(ownerKey);
      if(ok){
        keyGate.style.display='none';
        uploadFormEl.style.display='block';
        setStatus(keyStatus,'','');
      } else {
        localStorage.removeItem('ownerKey');
        ownerKey='';
        setStatus(keyStatus,'err','Saved key no longer works, enter it again.');
      }
    }
  });

  window.unlockOwner = async function(){
    const input = document.getElementById('ownerKey').value.trim();
    if(!input){ setStatus(keyStatus,'err','Paste your owner key first.'); return; }
    setStatus(keyStatus,'loading','Checking...');
    const ok = await validateKey(input);
    if(ok){
      ownerKey = input;
      localStorage.setItem('ownerKey', input);
      keyGate.style.display='none';
      uploadFormEl.style.display='block';
      setStatus(keyStatus,'','');
    } else {
      setStatus(keyStatus,'err','That key did not work. Check it and try again.');
    }
  };

  window.ownerLogout = function(){
    localStorage.removeItem('ownerKey');
    ownerKey='';
    uploadFormEl.style.display='none';
    keyGate.style.display='block';
    document.getElementById('ownerKey').value='';
    setStatus(keyStatus,'','Logged out on this device.');
  };

  function fileToBase64(file){
    return new Promise((resolve,reject)=>{
      const reader = new FileReader();
      reader.onload = ()=> resolve(reader.result.split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  window.uploadCertificate = async function(){
    const name = document.getElementById('certName').value.trim();
    const issuer = document.getElementById('certIssuer').value.trim();
    const category = document.getElementById('certCategory').value;
    const year = document.getElementById('certYear').value.trim();
    const file = document.getElementById('certFile').files[0];
    const uploadStatus = document.getElementById('uploadStatus');
    const btn = document.getElementById('uploadBtn');

    if(!name || !issuer || !year){ setStatus(uploadStatus,'err','Name, issuer and year are required.'); return; }

    btn.disabled = true;
    try{
      let link = '';
      if(file){
        setStatus(uploadStatus,'loading','Uploading file...');
        const base64 = await fileToBase64(file);
        const safeName = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.\-_]/g,'_');
        const filePath = `certs/${safeName}`;
        const putFileRes = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/${filePath}`, {
          method:'PUT',
          headers:{ Authorization:`token ${ownerKey}`, 'Content-Type':'application/json' },
          body: JSON.stringify({ message:`Add certificate file: ${file.name}`, content: base64, branch:'main' })
        });
        if(!putFileRes.ok){ const e = await putFileRes.json().catch(()=>({})); throw new Error(e.message || 'File upload failed'); }
        link = filePath;
      }

      setStatus(uploadStatus,'loading','Saving certificate details...');
      const getRes = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/certificates.json`, { headers:{ Authorization:`token ${ownerKey}` } });
      if(!getRes.ok) throw new Error('Could not read certificates.json');
      const fileData = await getRes.json();
      const currentContent = JSON.parse(decodeURIComponent(escape(atob(fileData.content))));
      currentContent.push({ name, issuer, category, year, link });
      const newContentB64 = btoa(unescape(encodeURIComponent(JSON.stringify(currentContent, null, 2))));
      const putRes = await fetch(`https://api.github.com/repos/${GH_OWNER}/${GH_REPO}/contents/certificates.json`, {
        method:'PUT',
        headers:{ Authorization:`token ${ownerKey}`, 'Content-Type':'application/json' },
        body: JSON.stringify({ message:`Add certificate: ${name}`, content:newContentB64, sha:fileData.sha, branch:'main' })
      });
      if(!putRes.ok){ const e = await putRes.json().catch(()=>({})); throw new Error(e.message || 'Update failed'); }

      setStatus(uploadStatus,'ok','Added! It will appear on this page within a minute (refresh to see it).');
      document.getElementById('certName').value='';
      document.getElementById('certIssuer').value='';
      document.getElementById('certYear').value='';
      document.getElementById('certFile').value='';
    }catch(err){
      setStatus(uploadStatus,'err','Error: ' + err.message);
    }finally{
      btn.disabled = false;
    }
  };
}

// ===== intro animation + friend request (index.html only) =====
function initIntro(){
  const introOverlay = document.getElementById('introOverlay');
  if(!introOverlay) return;

  const introLines = [
    {html:'<span class="prompt">$</span> <span class="key">./boot_portfolio.sh</span>'},
    {html:'<span class="key">loading</span>       : <span class="val">education, skills, projects</span>'},
    {html:'<span class="key">candidate</span>     : <span class="val">Dhanush R</span>'},
    {html:'<span class="key">status</span>        : <span class="val">initializing UI</span> <span class="tag">[ok]</span>'},
    {html:'<span class="prompt">$</span> ready<span class="cursor"></span>'}
  ];

  function dismissIntro(){
    introOverlay.classList.add('fade-out');
    document.body.classList.remove('locked');
    setTimeout(()=>{ introOverlay.style.display='none'; }, 650);
  }

  typeInto(document.getElementById('introBody'), introLines, 0.32, dismissIntro);

  const friendBtn = document.getElementById('friendBtn');
  const friendModal = document.getElementById('friendModal');
  const friendCancel = document.getElementById('friendCancel');

  if(friendBtn && friendModal){
    friendBtn.addEventListener('click', ()=> friendModal.classList.add('open'));
    friendCancel.addEventListener('click', ()=> friendModal.classList.remove('open'));

    window.sendFriendRequest = function(){
      const name = document.getElementById('friendName').value.trim() || 'Someone';
      const message = document.getElementById('friendMessage').value.trim();
      const subject = encodeURIComponent(`Friend request from ${name}`);
      const body = encodeURIComponent(`Hi Dhanush,\n\n${name} would like to connect with you.\n\nMessage: ${message || '(no message)'}\n`);
      window.location.href = `mailto:dhanushravi1485@gmail.com?subject=${subject}&body=${body}`;
      friendModal.classList.remove('open');
    };
  }
}

document.addEventListener('DOMContentLoaded', function(){
  initIntro();
  loadCertificates();
  initOwnerUpload();
});
