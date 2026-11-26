(function () {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const theaters = new Map();
  let curLang = 'zh';

  function createTheater(cfg) {
    const root = document.getElementById(cfg.rootId);
    const curEl = document.getElementById(cfg.cursorId);
    if (!root || !curEl) return null;

    const stageEl = root.querySelector('.ss-stage');
    const beatsWrap = root.querySelector('.ss-beats');
    const beatBtns = [...root.querySelectorAll('.ss-beat')];
    const prevBtn = root.querySelector('.ss-prev');
    const nextBtn = root.querySelector('.ss-next');
    const ctlBtn = root.querySelector('.ss-ctl');
    const narrT = root.querySelector('.ss-narr-t');
    const narrD = root.querySelector('.ss-narr-d');
    const narrS = root.querySelector('.ss-narr-s');
    const panes = [...root.querySelectorAll('.ss-pane')];

    let cur = 0, paused = reducedMotion, inView = false, runId = 0, timers = [];

    function clearTimers() { timers.forEach(t => clearTimeout(t)); timers = []; }
    function later(ms, fn, id) {
      const t = setTimeout(() => { if (id === runId) fn(); }, ms);
      timers.push(t);
    }

    function showPane(paneId) {
      panes.forEach(p => p.classList.toggle('active', p.id === paneId));
      if (cfg.rootId === 'theater-zhxy-console') {
        const navMap = { 't3-p0': 0, 't3-p1': 0, 't3-p2': 1, 't3-p3': 1, 't3-p4': 2, 't3-p5': 4 };
        const activeNav = navMap[paneId] ?? 0;
        root.querySelectorAll('.t3-nav-i').forEach((n, idx) => n.classList.toggle('on', idx === activeNav));
      }
    }

    function moveTo(sel, fx, fy) {
      const target = root.querySelector(sel);
      if (!target || !stageEl) return;
      const sr = stageEl.getBoundingClientRect();
      const tr = target.getBoundingClientRect();
      if (tr.width < 2 || sr.width < 2) return;
      const x = Math.round(tr.left - sr.left + tr.width * (fx ?? 0.74));
      const y = Math.round(tr.top - sr.top + tr.height * (fy ?? 0.58));
      curEl.style.opacity = '1';
      curEl.style.transform = `translate3d(${x}px,${y}px,0)`;
    }

    function parkCursor() {
      if (!stageEl) return;
      const sr = stageEl.getBoundingClientRect();
      curEl.style.opacity = '0.72';
      curEl.style.transform = `translate3d(${Math.round(sr.width * 0.85)}px,${Math.round(sr.height * 0.14)}px,0)`;
    }

    function tap(id, cb) {
      curEl.classList.remove('ripple');
      void curEl.offsetWidth;
      curEl.classList.add('press', 'ripple');
      later(150, () => { curEl.classList.remove('press'); if (cb) cb(); }, id);
    }

    const act = { showPane, moveTo, parkCursor, later, tap, root };

    function renderTextOnly() {
      const b = cfg.beats[cur];
      beatBtns.forEach((btn, i) => {
        const bd = cfg.beats[i];
        if (bd && bd.tab) btn.textContent = bd.tab[curLang] || bd.tab.zh;
      });
      if (ctlBtn) ctlBtn.textContent = paused ? (curLang === 'en' ? 'Play' : '继续') : (curLang === 'en' ? 'Pause' : '暂停');
      if (narrT) narrT.textContent = curLang === 'en' && b.titleEn ? b.titleEn : b.title;
      if (narrD) narrD.textContent = curLang === 'en' && b.descEn ? b.descEn : b.desc;
      if (narrS) narrS.textContent = `${cur + 1} / ${cfg.beats.length}`;
    }

    function setBeat(idx) {
      runId++;
      clearTimers();
      cur = (idx + cfg.beats.length) % cfg.beats.length;
      const b = cfg.beats[cur];
      beatBtns.forEach((btn, i) => {
        const on = i === cur;
        btn.classList.toggle('active', on);
        btn.setAttribute('aria-selected', on ? 'true' : 'false');
        if (on && beatsWrap && beatsWrap.scrollWidth > beatsWrap.clientWidth) {
          const left = btn.offsetLeft - (beatsWrap.clientWidth - btn.offsetWidth) / 2;
          beatsWrap.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
        }
      });
      renderTextOnly();

      try {
        b.run(act, runId);
      } catch (err) {
        if (window.console && console.error) console.error('[stageshow]', cfg.rootId, cur, err);
      }
      if (inView && !paused && root.offsetParent !== null) {
        later(b.duration || 3600, () => setBeat(cur + 1), runId);
      }
    }

    beatBtns.forEach((btn, i) => btn.addEventListener('click', () => {
      inView = true; paused = false; setBeat(i);
    }));
    if (prevBtn) prevBtn.addEventListener('click', () => {
      inView = true; paused = false; setBeat(cur - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      inView = true; paused = false; setBeat(cur + 1);
    });
    if (ctlBtn) ctlBtn.addEventListener('click', () => {
      paused = !paused;
      renderTextOnly();
      if (paused) { runId++; clearTimers(); }
      else { inView = true; setBeat(cur); }
    });

    setBeat(0);
    const ctrl = {
      setVisible(v) {
        inView = v;
        if (v && !paused) {
          requestAnimationFrame(() => { if (inView && !paused && root.offsetParent !== null) setBeat(cur); });
        } else if (!v) {
          runId++; clearTimers();
        }
      },
      jumpTo(i) { inView = true; paused = false; setBeat(i); },
      refreshLang() { renderTextOnly(); }
    };
    theaters.set(cfg.rootId, ctrl);
    return ctrl;
  }

  /* 01 广交会多端取餐核对台 */
  createTheater({
    rootId: 'theater-reconcile',
    cursorId: 'cur-t1',
    beats: [
      {
        tab: { zh: '1 同步报餐', en: '1 Sync Sheet' },
        title: '金山文档自动读表与多端实时同步',
        desc: '读取当日报餐与实到数，通过 Node.js 服务把 6 种餐品余量实时同步到全部现场手机。',
        titleEn: 'Automated WPS Sheet Sync & Live Stock Updates',
        descEn: 'Reads daily orders and arrivals from WPS sheets and syncs remaining stock across 6 brands to all on-site phones.',
        duration: 3600,
        run(a, id) {
          a.showPane('t1-p0');
          const net = a.root.querySelector('#t1-net');
          const btn = a.root.querySelector('#t1-sync-btn');
          const dm = a.root.querySelector('#t1-dm');
          const st = a.root.querySelector('#t1-sync-txt');
          net.textContent = '多端实时同步'; net.classList.remove('offline');
          btn.textContent = '同步报餐表'; btn.classList.remove('ok');
          dm.textContent = '10'; dm.classList.remove('bump');
          st.textContent = '待同步：10月16日 B座 午餐';
          a.parkCursor();
          a.later(420, () => a.moveTo('[data-t="t1-sync"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            btn.classList.add('ok');
            dm.textContent = '8'; dm.classList.add('bump');
            st.textContent = '已同步 287 份报餐与 12 份备用餐，6 种餐品余量已更新';
            a.later(260, () => dm.classList.remove('bump'), id);
          }), id);
        }
      },
      {
        tab: { zh: '2 跨日查账', en: '2 Date Check' },
        title: '跨日期场次日历与异常标徽',
        desc: '切换 A区、B座与午晚餐，日历格直接标出待补餐券和问题餐券，方便跨日复查。',
        titleEn: 'Cross-Date Session Calendar & Issue Flags',
        descEn: 'Switches halls and meal sessions while flagging owed vouchers and problem tickets directly on the calendar.',
        duration: 3400,
        run(a, id) {
          a.showPane('t1-p1');
          const net = a.root.querySelector('#t1-net'); net.textContent = '多端实时同步'; net.classList.remove('offline');
          const d16 = a.root.querySelector('#t1-d16');
          const d17 = a.root.querySelector('#t1-d17');
          const info = a.root.querySelector('#t1-cal-info');
          d16.classList.add('on'); d17.classList.remove('on');
          info.textContent = '10月16日 B座 午餐 · 2 个部门待补券 · 1 张问题餐券';
          a.later(380, () => a.moveTo('[data-t="t1-d17"]', 0.55, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            d16.classList.remove('on'); d17.classList.add('on');
            info.textContent = '10月17日 A区 晚餐 · 当场全部核对完毕';
          }), id);
        }
      },
      {
        tab: { zh: '3 超领换餐', en: '3 Swap Alert' },
        title: '超领红框拦截与跨品牌换餐平账',
        desc: '实取超过报餐数当场标红提醒；现场加餐或更换品牌时，两边库存一起算平。',
        titleEn: 'Over-Claim Alert & Cross-Brand Balancing',
        descEn: 'Highlights excess quantities in red immediately and recalculates both meal brands automatically during swaps.',
        duration: 4200,
        run(a, id) {
          a.showPane('t1-p2');
          const net = a.root.querySelector('#t1-net'); net.textContent = '多端实时同步'; net.classList.remove('offline');
          const val = a.root.querySelector('#t1-dval');
          const al = a.root.querySelector('#t1-alert');
          const cfm = a.root.querySelector('#t1-cfm');
          const swap = a.root.querySelector('#t1-swap-note');
          val.textContent = '2'; val.style.color = '#15181F';
          al.classList.remove('on');
          cfm.textContent = '确认发餐'; cfm.classList.remove('ok');
          swap.textContent = '临时换餐时，两个品牌的余量同步增减';
          a.later(300, () => a.moveTo('[data-t="t1-plus"]', 0.5, 0.5), id);
          a.later(860, () => a.tap(id, () => {
            val.textContent = '4'; val.style.color = '#DC2626'; al.classList.add('on');
          }), id);
          a.later(1650, () => a.moveTo('[data-t="t1-swap"]', 0.62, 0.55), id);
          a.later(2250, () => a.tap(id, () => {
            al.classList.remove('on'); val.textContent = '2+2换'; val.style.color = '#059669';
            swap.textContent = '已登记 2 份换餐，两个品牌余量已算平';
            cfm.classList.add('ok');
          }), id);
        }
      },
      {
        tab: { zh: '4 留底撤销', en: '4 Proof & Undo' },
        title: '问题餐券拍照留底与误录撤销',
        desc: '涂改或重复餐券当场拍照留底；误录可随时撤销，对应餐品余量自动加回。',
        titleEn: 'Ticket Photo Evidence & Entry Undo',
        descEn: 'Stores photos of altered vouchers for review and restores stock automatically when a wrong entry is undone.',
        duration: 3800,
        run(a, id) {
          a.showPane('t1-p3');
          const net = a.root.querySelector('#t1-net'); net.textContent = '多端实时同步'; net.classList.remove('offline');
          const undo = a.root.querySelector('#t1-undo');
          const logSt = a.root.querySelector('#t1-log-st');
          undo.textContent = '撤销记录'; undo.classList.remove('ok');
          logSt.textContent = '问题餐券已拍照留底，可查看原图';
          a.later(420, () => a.moveTo('[data-t="t1-undo"]', 0.65, 0.55), id);
          a.later(1040, () => a.tap(id, () => {
            undo.classList.add('ok');
            logSt.textContent = '该笔误录已撤销，多满分余量已加回 2 份';
          }), id);
        }
      },
      {
        tab: { zh: '5 收工转券', en: '5 Owed Vouchers' },
        title: '收工列出少取部门并核清待补餐券',
        desc: '结算时自动列出未取和少取部门转为待补餐券，现场补发后核清归档。',
        titleEn: 'Closing Settlement & Owed Voucher Clearing',
        descEn: 'Converts uncollected meals into owed vouchers at closing and clears them once delivered.',
        duration: 3800,
        run(a, id) {
          a.showPane('t1-p4');
          const net = a.root.querySelector('#t1-net'); net.textContent = '多端实时同步'; net.classList.remove('offline');
          const endBtn = a.root.querySelector('#t1-end-btn');
          const vBtn = a.root.querySelector('#t1-v-ok');
          const vMeta = a.root.querySelector('#t1-v-meta');
          endBtn.textContent = '转为待补餐券'; endBtn.classList.remove('ok');
          vBtn.textContent = '确认已补'; vBtn.classList.remove('ok');
          vMeta.textContent = '外联**处 · 少取真功夫 2 份、麦当劳 1 份';
          a.later(340, () => a.moveTo('[data-t="t1-end"]', 0.65, 0.55), id);
          a.later(940, () => a.tap(id, () => {
            endBtn.classList.add('ok');
            vMeta.textContent = '已生成 2 笔待补餐券 · 待现场补发';
            a.later(460, () => a.moveTo('[data-t="t1-vok"]', 0.62, 0.55), id);
            a.later(1060, () => a.tap(id, () => {
              vBtn.classList.add('ok');
              vMeta.textContent = '外联**处 · 3 份补餐券已核清';
            }), id);
          }), id);
        }
      },
      {
        tab: { zh: '6 断网导表', en: '6 Offline Export' },
        title: '断网本机暂存与 WPS、Excel 导出',
        desc: '展馆无信号时先存在本机，联网后自动续传；内置格式检查、错区转移与 Excel 导出。',
        titleEn: 'Offline Local Cache & Excel Export',
        descEn: 'Saves entries locally when offline and resumes syncing once reconnected, with clean WPS and Excel export.',
        duration: 3800,
        run(a, id) {
          a.showPane('t1-p5');
          const net = a.root.querySelector('#t1-net');
          const exp = a.root.querySelector('#t1-exp-btn');
          const tWps = a.root.querySelector('#t1-tool-wps');
          net.textContent = '断网本机暂存'; net.classList.add('offline');
          exp.textContent = '导出 Excel'; exp.classList.remove('ok');
          tWps.classList.remove('on');
          a.later(340, () => a.moveTo('[data-t="t1-wps"]', 0.65, 0.55), id);
          a.later(920, () => a.tap(id, () => {
            tWps.classList.add('on');
            a.later(420, () => a.moveTo('[data-t="t1-exp"]', 0.65, 0.55), id);
            a.later(1000, () => a.tap(id, () => {
              exp.classList.add('ok');
              net.textContent = '已导出标准表格';
              net.classList.remove('offline');
            }), id);
          }), id);
        }
      }
    ]
  });

  /* 02-A 智慧校园前端下单网站 */
  createTheater({
    rootId: 'theater-zhxy-web',
    cursorId: 'cur-t2',
    beats: [
      {
        tab: { zh: '1 筛选活动', en: '1 Filter' },
        title: '活动自动上架与条件筛选',
        desc: '后台持续同步校园新活动，标出加分项和校区要求，支持按未浏览、线上与有空位筛选。',
        titleEn: 'Auto Event Feed & Filters',
        descEn: 'Syncs new campus events with credit tags and eligibility rules, filterable by unread, online, or open seats.',
        duration: 3400,
        run(a, id) {
          a.showPane('t2-p0');
          const cAll = a.root.querySelector('#t2-c-all');
          const cOn = a.root.querySelector('#t2-c-on');
          const off = a.root.querySelector('#t2-off');
          cAll.classList.add('on'); cOn.classList.remove('on'); off.classList.remove('gone');
          a.parkCursor();
          a.later(380, () => a.moveTo('[data-t="t2-on"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            cAll.classList.remove('on'); cOn.classList.add('on'); off.classList.add('gone');
          }), id);
        }
      },
      {
        tab: { zh: '2 详情群码', en: '2 Rules & QR' },
        title: '提炼加分规则与活动群二维码',
        desc: '把长策划书拆成报名时间、校区限制和加分细则，同时归档活动咨询群二维码。',
        titleEn: 'Parsed Credit Rules & Group QR',
        descEn: 'Extracts registration time, campus limits, and credit rules from long notices alongside group QR codes.',
        duration: 3400,
        run(a, id) {
          a.showPane('t2-p1');
          const qrBtn = a.root.querySelector('#t2-qr-btn');
          const qrTxt = a.root.querySelector('#t2-qr-txt');
          qrBtn.textContent = '查看群码'; qrTxt.textContent = '活动咨询群二维码已归档，扫码进群';
          a.later(420, () => a.moveTo('[data-t="t2-qr"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            qrTxt.textContent = '高清群码已展开，群码过期时同学也可提交新码';
          }), id);
        }
      },
      {
        tab: { zh: '3 批量验号', en: '3 SMS Verify' },
        title: '批量下单与首次短信验号',
        desc: '一次勾选多场活动提交，首次下单通过短信核验账号密码，过滤无效单并自动记住信息。',
        titleEn: 'Batch Checkout & SMS Verification',
        descEn: 'Verifies student credentials by SMS on first checkout to block wrong passwords and remember future orders.',
        duration: 4000,
        run(a, id) {
          a.showPane('t2-p2');
          const sms = a.root.querySelector('#t2-sms-st');
          const sub = a.root.querySelector('#t2-sub-btn');
          sms.textContent = '待短信验证'; sms.className = 's-pill amber';
          sub.textContent = '验证并提交预约'; sub.classList.remove('ok');
          a.later(360, () => a.moveTo('[data-t="t2-sub"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            sms.textContent = '账号已验证 · 预约已提交'; sms.className = 's-pill green';
            sub.classList.add('ok');
          }), id);
        }
      },
      {
        tab: { zh: '4 查单取消', en: '4 Self Cancel' },
        title: '输学号查进度与开抢前自助取消',
        desc: '排队中、已报上与待结算状态实时同步，开抢前临时不去可自助取消预约。',
        titleEn: 'Order Status Lookup & Pre-Start Cancel',
        descEn: 'Shows live queue and settlement status by student ID with self-service cancellation before booking opens.',
        duration: 3600,
        run(a, id) {
          a.showPane('t2-p3');
          const cBtn = a.root.querySelector('#t2-cancel-btn');
          const oSt = a.root.querySelector('#t2-order-st');
          cBtn.textContent = '取消预约'; cBtn.classList.remove('ok');
          oSt.textContent = '排队中'; oSt.className = 's-pill blue';
          a.later(420, () => a.moveTo('[data-t="t2-cancel"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            cBtn.classList.add('ok');
            oSt.textContent = '已取消'; oSt.className = 's-pill muted';
          }), id);
        }
      },
      {
        tab: { zh: '5 互助占位', en: '5 Slot Pool' },
        title: '空闲账号互助占位与到期释放',
        desc: '签约后账号空闲时协助暂占热门名额，截止前无人接手自动取消，不影响本人记录。',
        titleEn: 'Opt-In Idle Slot Pooling & Auto Release',
        descEn: 'Idle verified accounts hold seats temporarily and release unclaimed slots automatically before registration closes.',
        duration: 3600,
        run(a, id) {
          a.showPane('t2-p4');
          const agree = a.root.querySelector('#t2-agree-btn');
          const badge = a.root.querySelector('#t2-consent-st');
          agree.textContent = '参与互助占位'; agree.classList.remove('ok');
          badge.textContent = '未参与'; badge.className = 's-pill amber';
          a.later(420, () => a.moveTo('[data-t="t2-agree"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            agree.classList.add('ok');
            badge.textContent = '已参与'; badge.className = 's-pill green';
          }), id);
        }
      },
      {
        tab: { zh: '6 留言提醒', en: '6 Ticket Push' },
        title: '带图提交留言与回复弹窗提醒',
        desc: '自动压缩截图上传问题留言，后台回复或更新群码后，客户再次进入网页弹出提醒。',
        titleEn: 'Screenshot Tickets & Reply Alerts',
        descEn: 'Compresses screenshot tickets for upload and pushes pop-up alerts once the admin replies or updates group QR codes.',
        duration: 3800,
        run(a, id) {
          a.showPane('t2-p5');
          const tkBtn = a.root.querySelector('#t2-tk-btn');
          const notice = a.root.querySelector('#t2-notice');
          tkBtn.textContent = '提交带图留言'; tkBtn.classList.remove('ok');
          notice.classList.remove('on');
          a.later(380, () => a.moveTo('[data-t="t2-tk"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            tkBtn.classList.add('ok');
            a.later(420, () => notice.classList.add('on'), id);
          }), id);
        }
      }
    ]
  });

  /* 02-B 智慧校园后端主控制台 */
  createTheater({
    rootId: 'theater-zhxy-console',
    cursorId: 'cur-t3',
    beats: [
      {
        tab: { zh: '1 接口抢报', en: '1 Direct Book' },
        title: '无浏览器接口直连与提前量校准',
        desc: '复用已验登录凭证跳过页面渲染直接发包抢报，并按历史耗时校准提前发起时间。',
        titleEn: 'Headless Direct Booking & Timing Calibration',
        descEn: 'Reuses verified sessions to send booking requests directly without rendering pages, calibrated by past latency.',
        duration: 3800,
        run(a, id) {
          a.showPane('t3-p0');
          const mBtn = a.root.querySelector('#t3-mode-http');
          const log = a.root.querySelector('#t3-http-log');
          mBtn.classList.remove('on');
          log.innerHTML = '<div><span class="info">[状态]</span> 后台运行正常 · 延迟 29ms · 开抢前自动唤醒</div>';
          a.parkCursor();
          a.later(380, () => a.moveTo('[data-t="t3-http"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            mBtn.classList.add('on');
            log.innerHTML =
              '<div><span class="info">[直连]</span> 复用已验证登录凭证，跳过页面渲染直接请求</div>' +
              '<div><span class="warn">[抢报]</span> 提前 0.12 秒预热，到点同时提交 6 个预约</div>' +
              '<div><span class="ok">[成功]</span> 2025****348 / 2025****343 已报上 · 84ms</div>';
          }), id);
        }
      },
      {
        tab: { zh: '2 弹出接手', en: '2 Takeover' },
        title: '多账号独立会话与人工弹出接手',
        desc: '多个任务在独立浏览器会话中运行互不干扰，遇到页面验证时可弹出对应窗口人工处理。',
        titleEn: 'Isolated Sessions & Manual Takeover',
        descEn: 'Runs concurrent tasks in isolated browser sessions and opens the exact window whenever manual verification appears.',
        duration: 3600,
        run(a, id) {
          a.showPane('t3-p1');
          const popBtn = a.root.querySelector('#t3-pop-br');
          const st = a.root.querySelector('#t3-br-st');
          popBtn.textContent = '弹出浏览器'; popBtn.classList.remove('green');
          st.textContent = '运行中 · 多账号独立会话隔离，互不干扰';
          a.later(420, () => a.moveTo('[data-t="t3-pop"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            popBtn.classList.add('green');
            st.textContent = '已拉起该账号独立浏览窗口，可直接人工处理';
          }), id);
        }
      },
      {
        tab: { zh: '3 订单核真', en: '3 Verify' },
        title: '收款前筛选未结算并批量查真伪',
        desc: '筛选未付款订单后自动登录学校系统复核真实报名结果，确认报上再收款。',
        titleEn: 'Batch Registration Check Before Billing',
        descEn: 'Filters unpaid orders and checks the official campus portal automatically before sending any bill.',
        duration: 3800,
        run(a, id) {
          a.showPane('t3-p2');
          const flt = a.root.querySelector('#t3-flt');
          const rev = a.root.querySelector('#t3-rev');
          const paidRow = a.root.querySelector('#t3-paid-row');
          const vTag = a.root.querySelector('#t3-rev-tag');
          flt.classList.remove('on'); rev.textContent = '核对订单'; rev.classList.remove('green');
          paidRow.style.display = ''; vTag.textContent = '未核对'; vTag.className = 's-pill amber';
          a.later(300, () => a.moveTo('[data-t="t3-flt"]', 0.65, 0.55), id);
          a.later(860, () => a.tap(id, () => {
            flt.classList.add('on'); paidRow.style.display = 'none';
            a.later(420, () => a.moveTo('[data-t="t3-rev"]', 0.65, 0.55), id);
            a.later(980, () => a.tap(id, () => {
              rev.classList.add('green');
              vTag.textContent = '核对属实'; vTag.className = 's-pill green';
            }), id);
          }), id);
        }
      },
      {
        tab: { zh: '4 生图收款', en: '4 Bill Image' },
        title: '批量生成账单图与手机画廊收款',
        desc: '为未付款客户批量生成明细账单图，手机打开局域网画廊存图发微信，收款后批量结清。',
        titleEn: 'Batch Bill Snapshots & Mobile Gallery',
        descEn: 'Renders itemized bill images in batch and serves them over a local gallery for fast WeChat settlement.',
        duration: 4000,
        run(a, id) {
          a.showPane('t3-p3');
          const bBtn = a.root.querySelector('#t3-bill');
          const sBtn = a.root.querySelector('#t3-settle');
          const sat = a.root.querySelector('#t3-sat');
          const satTag = a.root.querySelector('#t3-sat-tag');
          bBtn.textContent = '生成账单图'; sBtn.textContent = '标记已收款';
          sat.classList.remove('on'); satTag.textContent = '待发送';
          a.later(300, () => a.moveTo('[data-t="t3-bill"]', 0.65, 0.55), id);
          a.later(880, () => a.tap(id, () => {
            sat.classList.add('on'); satTag.textContent = '账单图已生成';
            a.later(520, () => a.moveTo('[data-t="t3-settle"]', 0.65, 0.55), id);
            a.later(1120, () => a.tap(id, () => {
              satTag.textContent = '已结清';
            }), id);
          }), id);
        }
      },
      {
        tab: { zh: '5 互助换位', en: '5 Auto Swap' },
        title: '空闲账号退位与下单客户自动接盘',
        desc: '热门活动满员后，后台调度空闲账号退位并由下单客户顺势报上，截止前自动释放余位。',
        titleEn: 'Automated Idle Release & Seat Handover',
        descEn: 'Coordinates seat release from idle accounts and claims the freed slot for waiting customer orders.',
        duration: 4000,
        run(a, id) {
          a.showPane('t3-p4');
          const n1 = a.root.querySelector('#t3-n1');
          const n2 = a.root.querySelector('#t3-n2');
          const n3 = a.root.querySelector('#t3-n3');
          const btn = a.root.querySelector('#t3-swap-btn');
          [n1, n2, n3].forEach(n => n.classList.remove('on'));
          btn.textContent = '开始换位'; btn.classList.remove('green');
          a.later(320, () => a.moveTo('[data-t="t3-swap"]', 0.65, 0.55), id);
          a.later(920, () => a.tap(id, () => {
            n1.classList.add('on');
            a.later(360, () => n2.classList.add('on'), id);
            a.later(760, () => { n3.classList.add('on'); btn.classList.add('green'); }, id);
          }), id);
        }
      },
      {
        tab: { zh: '6 排期回复', en: '6 Reply & Ops' },
        title: '活动排期跟进与留言回复推送',
        desc: '逐场追踪进群、签到和加分进度；在桌面端回复客户留言并推回前台提醒。',
        titleEn: 'Session Checklist & Ticket Replies',
        descEn: 'Tracks group entry, check-in, and credit confirmation while pushing admin replies back to the web portal.',
        duration: 3600,
        run(a, id) {
          a.showPane('t3-p5');
          const rBtn = a.root.querySelector('#t3-reply-btn');
          const rSt = a.root.querySelector('#t3-tk-st');
          rBtn.textContent = '回复客户'; rBtn.classList.remove('green');
          rSt.textContent = '待回复'; rSt.className = 's-pill amber';
          a.later(420, () => a.moveTo('[data-t="t3-reply"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            rBtn.classList.add('green');
            rSt.textContent = '已回复 · 已推提醒'; rSt.className = 's-pill green';
          }), id);
        }
      }
    ]
  });

  /* 03 易班自动化桌面软件 */
  createTheater({
    rootId: 'theater-yiban',
    cursorId: 'cur-t4',
    beats: [
      {
        tab: { zh: '1 授权核对', en: '1 License Auth' },
        title: '云端多维表格 Open API 授权与网络校时',
        desc: '启动时核对设备硬件码、卡密有效期和网络标准时间，防止修改系统时间绕过授权。',
        titleEn: 'Cloud Table Open API Auth & Time Check',
        descEn: 'Verifies hardware ID, license expiry, and network standard time on startup with zero server cost.',
        duration: 3600,
        run(a, id) {
          a.showPane('t4-p0');
          const pill = a.root.querySelector('#t4-auth-p');
          const btn = a.root.querySelector('#t4-v-btn');
          const st = a.root.querySelector('#t4-auth-st');
          pill.classList.add('hi'); btn.textContent = '核对授权';
          st.textContent = '待核对云端表格授权记录与网络标准时间';
          a.parkCursor();
          a.later(380, () => a.moveTo('[data-t="t4-verify"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            st.textContent = '设备硬件码校验通过，月卡在有效期内';
          }), id);
        }
      },
      {
        tab: { zh: '2 读取版块', en: '2 Load Boards' },
        title: '自动读取账号全部可发版块',
        desc: '在独立浏览器中抓取当前账号有权限的全部发布范围与版块，缓存到本地并附带防屏蔽提示。',
        titleEn: 'Auto Permitted-Channel Discovery',
        descEn: 'Fetches every posting channel permitted for the logged-in account into local cache with safe-channel guidance.',
        duration: 3600,
        run(a, id) {
          a.showPane('t4-p1');
          const pill = a.root.querySelector('#t4-auth-p'); pill.classList.remove('hi');
          const btn = a.root.querySelector('#t4-read-btn');
          const val = a.root.querySelector('#t4-board-val');
          btn.textContent = '读取版块'; btn.classList.remove('ok');
          val.textContent = '尚未读取账号版块';
          a.later(380, () => a.moveTo('[data-t="t4-read"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            btn.classList.add('ok');
            val.textContent = '已同步全部可发版块：广东轻工职业技术大学 / 校园大杂烩';
          }), id);
        }
      },
      {
        tab: { zh: '3 词库同步', en: '3 Phrase Sync' },
        title: '自定义随机词库与本地热同步',
        desc: '编辑日常发帖和评论常用语后，通过本地接口直接推送到执行脚本，不用重启软件。',
        titleEn: 'Custom Phrase Library Live Sync',
        descEn: 'Pushes edited posting and comment phrases straight to the running browser script without restarting.',
        duration: 3600,
        run(a, id) {
          a.showPane('t4-p2');
          const lex = a.root.querySelector('#t4-lex-p');
          const btn = a.root.querySelector('#t4-lex-btn');
          const st = a.root.querySelector('#t4-lex-st');
          lex.classList.add('hi'); btn.textContent = '保存词库';
          st.textContent = '共 4 条常用语，保存后直接生效';
          a.later(380, () => a.moveTo('[data-t="t4-lex"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            st.textContent = '已同步到执行脚本，下一条发帖与评论立即采用新词库';
          }), id);
        }
      },
      {
        tab: { zh: '4 自动执行', en: '4 Auto Run' },
        title: '配置每日上限与随机间隔执行',
        desc: '自由设定发帖、评论和点赞上限，按随机间隔运行并实时统计进度与预计网薪。',
        titleEn: 'Daily Caps & Randomized Pacing',
        descEn: 'Runs posting, commenting, and liking with randomized intervals and live progress counters.',
        duration: 4200,
        run(a, id) {
          a.showPane('t4-p3');
          a.root.querySelector('#t4-lex-p').classList.remove('hi');
          const btn = a.root.querySelector('#t4-run-btn');
          const k1 = a.root.querySelector('#t4-k1'), k2 = a.root.querySelector('#t4-k2'), k3 = a.root.querySelector('#t4-k3');
          const lines = [...a.root.querySelectorAll('#t4-p3 .t4-line')];
          btn.textContent = '开始执行';
          k1.textContent = '0 / 20'; k2.textContent = '0 / 30'; k3.textContent = '+0';
          lines.forEach((l, i) => l.classList.toggle('on', i === 0));
          a.later(320, () => a.moveTo('[data-t="t4-run"]', 0.65, 0.55), id);
          a.later(900, () => a.tap(id, () => {
            lines[1] && lines[1].classList.add('on');
            a.later(450, () => { lines[2] && lines[2].classList.add('on'); k1.textContent = '2 / 20'; k2.textContent = '4 / 30'; k3.textContent = '+30'; }, id);
            a.later(950, () => { lines[3] && lines[3].classList.add('on'); k1.textContent = '3 / 20'; k2.textContent = '6 / 30'; k3.textContent = '+48'; }, id);
          }), id);
        }
      },
      {
        tab: { zh: '5 加密更新', en: '5 Packaging' },
        title: '源码加密打包与双版 Windows 安装包',
        desc: '核心脚本在内存中解密运行，构建内置浏览器完整版和轻巧 Edge 版安装包，支持云端更新检测。',
        titleEn: 'Encrypted Packaging & Dual Windows Installers',
        descEn: 'Decrypts scripts in memory, builds full and lightweight Edge installers, and checks cloud updates.',
        duration: 3800,
        run(a, id) {
          a.showPane('t4-p4');
          const btn = a.root.querySelector('#t4-upd-btn');
          const steps = [...a.root.querySelectorAll('#t4-p4 .t4-pstep')];
          btn.textContent = '检查更新';
          steps.forEach((s, i) => s.classList.toggle('on', i === 0));
          a.later(340, () => a.moveTo('[data-t="t4-upd"]', 0.65, 0.55), id);
          a.later(920, () => a.tap(id, () => {
            steps.forEach((s, i) => a.later(i * 140, () => s.classList.add('on'), id));
          }), id);
        }
      }
    ]
  });

  /* 04 外贸视频脚本与多语种询盘工作台 */
  createTheater({
    rootId: 'theater-trade',
    cursorId: 'cur-t5',
    beats: [
      {
        tab: { zh: '1 参数拆解', en: '1 Spec Parse' },
        title: '中文产品参数拆成标准外贸字段',
        desc: '提取电芯寿命、快充耗时、起订量、交期与出口认证，省去人工反复改写。',
        titleEn: 'Structured B2B Spec Extraction',
        descEn: 'Extracts cycle life, fast charge, MOQ, lead time, and export certifications into clean B2B fields.',
        duration: 3500,
        run(a, id) {
          a.showPane('t5-p0');
          const btn = a.root.querySelector('#t5-gen-btn');
          const st = a.root.querySelector('#t5-parse-st');
          btn.textContent = '生成口播稿'; btn.classList.remove('ok');
          st.textContent = '待拆解：1200W 磷酸铁锂便携储能电源 · MOQ 50 台';
          a.parkCursor();
          a.later(380, () => a.moveTo('[data-t="t5-gen"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            btn.classList.add('ok');
            st.textContent = '已生成 38s 双语 4 段分镜、5 项术语与报价回复';
          }), id);
        }
      },
      {
        tab: { zh: '2 双语分镜', en: '2 EN/ES Script' },
        title: '切换英文与西语 4 段分镜口播稿',
        desc: '按场景开场、实测参数、清关认证与询盘引导排好秒数，控制单句词数适配配音节奏。',
        titleEn: 'English & Spanish 4-Scene Voiceover Scripts',
        descEn: 'Structures opening hook, test proof, certifications, and CTA with natural spoken pacing.',
        duration: 3800,
        run(a, id) {
          a.showPane('t5-p1');
          const enB = a.root.querySelector('#t5-en-btn');
          const esB = a.root.querySelector('#t5-es-btn');
          const txt = a.root.querySelector('#t5-shot-txt');
          enB.className = 's-pill blue'; esB.className = 's-pill muted';
          txt.textContent = 'Built with automotive-grade LiFePO4 cells rated for 3,500 cycles, recharging to 80% in 50 minutes.';
          a.later(420, () => a.moveTo('[data-t="t5-es"]', 0.6, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            enB.className = 's-pill muted'; esB.className = 's-pill blue';
            txt.textContent = 'Equipada con celdas LiFePO4 de grado automotriz de 3,500 ciclos, carga al 80% en 50 minutos.';
          }), id);
        }
      },
      {
        tab: { zh: '3 术语锁定', en: '3 Term Lock' },
        title: '配音和字幕前锁定外贸专有术语',
        desc: '固定电芯体系、危险品运输鉴定和贸易术语标准译法，减少机器直译出错。',
        titleEn: 'Pre-Dubbing Trade Glossary Lock',
        descEn: 'Locks LiFePO4, UN38.3, and FOB translations across English and Spanish before dubbing.',
        duration: 3500,
        run(a, id) {
          a.showPane('t5-p2');
          const btn = a.root.querySelector('#t5-term-btn');
          const st = a.root.querySelector('#t5-term-st');
          btn.textContent = '复制术语表'; btn.classList.remove('ok');
          if (st) st.textContent = '共锁定 5 项外贸与技术术语';
          a.later(400, () => a.moveTo('[data-t="t5-term"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            btn.classList.add('ok');
            if (st) st.textContent = '5 项术语对照表已复制到剪贴板';
          }), id);
        }
      },
      {
        tab: { zh: '4 报价回复', en: '4 Quote Reply' },
        title: '生成 WhatsApp 报价回复并导出 CSV 台账',
        desc: '带入起订量、FOB 价格带、认证文件说明和交期，复制即可发送，同时导出 CSV 跟进表。',
        titleEn: 'WhatsApp Quote Draft & CSV Export',
        descEn: 'Fills MOQ, FOB range, compliance notes, and lead time ready for WhatsApp or CSV export.',
        duration: 3600,
        run(a, id) {
          a.showPane('t5-p3');
          const btn = a.root.querySelector('#t5-wa-btn');
          const st = a.root.querySelector('#t5-wa-st');
          btn.textContent = '复制报价回复'; btn.classList.remove('ok');
          if (st) st.textContent = '含实测视频钩子';
          a.later(400, () => a.moveTo('[data-t="t5-wa"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            btn.classList.add('ok');
            if (st) st.textContent = '已复制到剪贴板';
          }), id);
        }
      }
    ]
  });

  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => {
        const ctrl = theaters.get(en.target.id);
        if (ctrl) ctrl.setVisible(en.isIntersecting && en.target.offsetParent !== null);
      });
    }, { threshold: 0.02 });
    theaters.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  window.__STAGESHOW_THEATERS = theaters;
  window.__setTheaterLang = function (lang) {
    curLang = lang === 'en' ? 'en' : 'zh';
    theaters.forEach(ctrl => ctrl.refreshLang());
  };
})();
