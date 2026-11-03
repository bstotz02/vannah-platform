/* Vannah 1.7 — business dashboard + real-estate preview.
   Does not write Supabase data, mutate stored invoices, or change RLS policies. */
(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const money = value => new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(Number(value)||0);
  const parseMoney = id => {
    const raw = ($(id)?.textContent || '').replace(/[^\d.\-]/g,'');
    const n = Number(raw); return Number.isFinite(n) ? n : 0;
  };
  const getCount = id => {const n=parseInt(($(id)?.textContent||'').replace(/[^\d]/g,''),10);return Number.isFinite(n)?n:0};
  const safe = str => {const e=document.createElement('span');e.textContent=String(str??'');return e.innerHTML};
  window.addEventListener('load', () => {
    if(new URLSearchParams(location.search).get('demo')==='1') return;
    const workspace=$('cloudCompanyArea'), preview=$('businessPreview');
    if(!workspace||!preview) return;
    document.body.classList.add('vannah-business');
    $('modeBusiness')?.click();
    // Allow the 1.6 script to set up its own sidebar and overview first.
    let overview=$('cloudOverviewArea');
    if(!overview){
      overview=document.createElement('section');overview.id='cloudOverviewArea';overview.className='panel';
      workspace.insertBefore(overview,workspace.firstChild);
    }
    overview.classList.add('v17-overview');
    overview.innerHTML=`<div class="v17-shell">
      <div class="v17-banner"><div><div class="v17-eyebrow">Vannah 1.7 / Private business beta</div><h2>Good to have you here.</h2><p id="v17-subtitle">A connected view of the information recorded in this workspace.</p></div><div class="v17-toolbar"><a href="home.html" class="v17-btn">Vannah website</a><a href="demo.html" class="v17-btn" target="_blank" rel="noopener">Public demo</a></div></div>
      <div class="v17-grid">
        <div class="v17-metric"><small>CRM contacts</small><strong id="v17-contacts">—</strong><span>Cloud records</span></div>
        <div class="v17-metric"><small>Active projects</small><strong id="v17-projects">—</strong><span>Not completed or on hold</span></div>
        <div class="v17-metric"><small>Outstanding invoices</small><strong id="v17-outstanding">—</strong><span>Reported invoice balance</span></div>
        <div class="v17-metric"><small>Open work orders</small><strong id="v17-orders">—</strong><span>Still requiring attention</span></div>
      </div>
      <div class="v17-two">
       <div class="v17-card"><h3>Finance at a glance</h3><p>These are manual, all-time beta summaries from the visible records—not verified revenue, bank balances, or profit.</p>
        <div class="v17-grid" style="grid-template-columns:repeat(2,minmax(0,1fr))">
        <div class="v17-metric"><small>Invoice receipts recorded</small><strong id="v17-receipts">—</strong></div>
        <div class="v17-metric"><small>Other income recorded</small><strong id="v17-income">—</strong></div>
        <div class="v17-metric"><small>Expenses recorded</small><strong id="v17-expenses">—</strong></div>
        <div class="v17-metric"><small>Net recorded movement</small><strong id="v17-net">—</strong></div></div>
        <div class="v17-warning" style="margin-top:14px">Invoice receipts do not have individual payment dates; duplicate manual income entries can distort totals. Results may exclude records beyond the current loaded batch.</div>
       </div>
       <div class="v17-card"><h3>Jump into your workspace</h3><p>Your business tools, accessible from the full sidebar.</p><div class="v17-actions">
       <button class="v17-action" data-v17-target="cloudContactArea">CRM<small>Contacts and customers</small></button>
       <button class="v17-action" data-v17-target="cloudProjectArea">Projects<small>Manage active work</small></button>
       <button class="v17-action" data-v17-target="cloudInvoiceArea">Invoices<small>Payments and balances</small></button>
       <button class="v17-action" data-v17-target="cloudFinanceArea">Finance<small>Manual transactions</small></button>
       <button class="v17-action" data-v17-target="cloudOperationsSection">Operations<small>Work orders</small></button>
       <button class="v17-action" data-v17-target="cloudRealEstateArea">Real Estate<small>Industry preview</small></button>
       </div></div>
      </div>
      <div class="v17-two"><div class="v17-card"><h3>Latest visible records</h3><p>Recent items shown by the currently loaded module lists, not a complete audit log.</p><div class="v17-rows" id="v17-recent"><div class="v17-empty">Sign in and load a company to see activity.</div></div></div>
      <div class="v17-card"><h3>Launch readiness</h3><div class="v17-check"><span class="v17-dot ok"></span><div>Functional business navigation<em>Existing modules retained</em></div></div>
      <div class="v17-check"><span class="v17-dot warn"></span><div>Database security audit pending<em>Row-level security and cross-company isolation must be tested</em></div></div>
      <div class="v17-check"><span class="v17-dot warn"></span><div>Accounting reconciliation pending<em>Transactions and invoice payments not yet automatically reconciled</em></div></div>
      <div class="v17-check"><span class="v17-dot warn"></span><div>Live customer onboarding pending<em>Use fictional information until verified</em></div></div></div></div>
    </div>`;

    // Industry preview intentionally reuses existing cloud modules; no false promise of a property database.
    let real=$('cloudRealEstateArea');
    if(!real){real=document.createElement('section');real.id='cloudRealEstateArea';real.className='panel';workspace.appendChild(real)}
    real.classList.add('hidden');
    real.innerHTML=`<div class="v17-shell"><div class="v17-banner"><div><div class="v17-eyebrow">Industry solution / Early preview</div><h2>Commercial Real Estate</h2><p>Bring client relationships, projects, vendor management, work orders, invoices and contract dates into one connected workflow.</p></div><span class="v17-tag">Functional modules + concept features</span></div>
      <div class="v17-example"><div><small>Existing module</small><strong>Work orders</strong><p class="muted">Coordinate inspections, repairs and service requests.</p></div><div><small>Existing module</small><strong>Contracts</strong><p class="muted">Track agreements and renewal dates.</p></div><div><small>Existing module</small><strong>Vendors</strong><p class="muted">Manage maintenance partners and suppliers.</p></div></div>
      <div class="v17-card"><h3>Commercial property workflow</h3><p>Try the existing cloud modules below using fictional test data.</p><div class="v17-toolbar">
      <button class="v17-btn primary" data-v17-target="cloudOperationsSection">Open work orders</button><button class="v17-btn" data-v17-target="cloud-contracts">Open contracts</button><button class="v17-btn" data-v17-target="cloud-vendors">Open vendors</button><button class="v17-btn" data-v17-target="cloud-scheduling">Open scheduling</button></div></div>
      <div class="v17-warning"><strong>Not yet included:</strong> dedicated property and unit databases, tenant portals, rent collection, lease document storage, notifications, and bank integrations. This preview does not represent those features as operational.</div></div>`;

    const sidebar=document.querySelector('.sidebar .nav');
    if(sidebar && !$('v17-nav-real-estate')){
      const b=document.createElement('button');b.id='v17-nav-real-estate';b.type='button';b.innerHTML='<span class="symbol">▣</span> Real Estate';
      (sidebar.querySelector('#navProjects') || sidebar.lastElementChild)?.insertAdjacentElement('afterend',b);
      b.addEventListener('click',e=>{e.preventDefault();e.stopImmediatePropagation();show('cloudRealEstateArea')},true);
    }
    // The 1.6 sidebar handler only knows legacy sections; hide this new preview on legacy navigation.
    document.addEventListener('click', event => {
      const oldTab=event.target.closest('.sidebar .nav button');
      if(oldTab && oldTab.id !== 'v17-nav-real-estate') real.classList.add('hidden');
    }, true);
    const ids=['cloudOverviewArea','cloudContactArea','cloudProjectArea','cloudInvoiceArea','cloudFinanceArea','cloudOperationsSection','cloud-vendors','cloud-contracts','cloud-scheduling','cloud-inventory','cloudRealEstateArea'];
    function show(id){
      ids.forEach(key=>$(key)?.classList.toggle('hidden',key!==id));
      document.querySelectorAll('.sidebar .nav button').forEach(b=>b.classList.toggle('active',b.id==='v17-nav-real-estate'&&id==='cloudRealEstateArea'));
      if(id==='cloudOverviewArea') $('navOverview')?.classList.add('active');
      if(id!=='cloudOverviewArea'&&id!=='cloudRealEstateArea') {
        const map={'cloudContactArea':'navCRM','cloudProjectArea':'navProjects','cloudInvoiceArea':'navInvoices','cloudFinanceArea':'navFinance','cloudOperationsSection':'navOperations','cloud-vendors':'navVendors','cloud-contracts':'navContracts','cloud-scheduling':'navScheduling','cloud-inventory':'navInventory'};
        $(map[id])?.classList.add('active');
      }
      if(id==='cloudOverviewArea') render();
    }
    overview.addEventListener('click',e=>{const b=e.target.closest('[data-v17-target]');if(b)show(b.dataset.v17Target)});
    real.addEventListener('click',e=>{const b=e.target.closest('[data-v17-target]');if(b)show(b.dataset.v17Target)});
    // Existing 1.6 controls the sidebar. Preserve that behavior for everything except the new industry tab.
    const m=$('cloudCompanySelect');
    const watcherIds=['cloudContactList','cloudProjectList','cloudInvoiceList','cloudFinanceList','cloudOrderList',
      'cloudInvoiceOutstanding','cloudInvoiceReceipts','cloudManualIncome','cloudManualExpense','cloudOrdersOpen'];
    let pending=false;
    function queue(){if(pending)return;pending=true;requestAnimationFrame(()=>{pending=false;render()})}
    const observer=new MutationObserver(queue);
    watcherIds.forEach(id=>{const el=$(id);if(el) observer.observe(el,{childList:true,characterData:true,subtree:true})});
    m?.addEventListener('change',()=>{['v17-contacts','v17-projects','v17-outstanding','v17-orders','v17-receipts','v17-income','v17-expenses','v17-net'].forEach(id=>{if($(id)) $(id).textContent='Updating…'});setTimeout(render,500)});
    $('cloudRefresh')?.addEventListener('click',()=>setTimeout(render,500));
    function render(){
      if(!$('cloudSignedIn') || $('cloudSignedIn').classList.contains('hidden') || workspace.classList.contains('hidden'))return;
      const contacts=$('cloudContactList')?.querySelectorAll('article').length||0;
      const projects=[...($('cloudProjectList')?.querySelectorAll('article')||[])];
      const active=projects.filter(el=>!/(completed|on hold)/i.test(el.textContent)).length;
      const outstanding=parseMoney('cloudInvoiceOutstanding'),receipts=parseMoney('cloudInvoiceReceipts');
      const income=parseMoney('cloudManualIncome'),expenses=parseMoney('cloudManualExpense');
      const set=(id,val)=>{if($(id))$(id).textContent=val};
      set('v17-contacts',contacts);set('v17-projects',active);
      set('v17-outstanding',money(outstanding));set('v17-orders',getCount('cloudOrdersOpen'));
      set('v17-receipts',money(receipts));set('v17-income',money(income));set('v17-expenses',money(expenses));set('v17-net',money(receipts+income-expenses));
      set('v17-subtitle',`A connected snapshot of ${m?.selectedOptions?.[0]?.textContent?.trim()||'your company'} — based on the records currently loaded.`);
      const recent=[];
      [['Invoices','cloudInvoiceList'],['Projects','cloudProjectList'],['Work orders','cloudOrderList']].forEach(([label,id])=>{
        const elements=[...($(id)?.querySelectorAll('article')||[])].slice(0,2);
        elements.forEach(el=>recent.push({label,detail:(el.querySelector('strong,h3,b')?.textContent||el.textContent||'Record').trim().slice(0,110)}));
      });
      $('v17-recent').innerHTML=recent.length?recent.slice(0,6).map(x=>`<div class="v17-row"><span>${safe(x.detail)}</span><small>${safe(x.label)}</small></div>`).join(''):'<div class="v17-empty">No loaded records yet. Add fictional records in CRM, Projects, or Invoices.</div>';
    }
    // Render after the original application's asynchronous record loads.
    render();setTimeout(render,1000);
  });
})();
