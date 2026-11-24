(function () {
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const theaters = new Map();

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
      if (narrT) narrT.textContent = b.title;
      if (narrD) narrD.textContent = b.desc;
      if (narrS) narrS.textContent = `${cur + 1} / ${cfg.beats.length}`;

      b.run(act, runId);
      if (inView && !paused && root.offsetParent !== null) {
        later(b.duration || 3600, () => setBeat(cur + 1), runId);
      }
    }

    beatBtns.forEach((btn, i) => btn.addEventListener('click', () => {
      paused = false; if (ctlBtn) ctlBtn.textContent = '暂停'; setBeat(i);
    }));
    if (prevBtn) prevBtn.addEventListener('click', () => {
      paused = false; if (ctlBtn) ctlBtn.textContent = '暂停'; setBeat(cur - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      paused = false; if (ctlBtn) ctlBtn.textContent = '暂停'; setBeat(cur + 1);
    });
    if (ctlBtn) ctlBtn.addEventListener('click', () => {
      paused = !paused;
      ctlBtn.textContent = paused ? '继续' : '暂停';
      if (paused) { runId++; clearTimers(); }
      else setBeat(cur);
    });

    setBeat(0);
    const ctrl = {
      setVisible(v) {
        inView = v;
        if (v && !paused) setBeat(cur);
        else if (!v) { runId++; clearTimers(); }
      },
      jumpTo(i) { paused = false; if (ctlBtn) ctlBtn.textContent = '暂停'; setBeat(i); }
    };
    theaters.set(cfg.rootId, ctrl);
    return ctrl;
  }

  /* ========================================================================
     01 广交会取餐核对台 (6 步人话产品演示)
     ======================================================================== */
  createTheater({
    rootId: 'theater-reconcile',
    cursorId: 'cur-t1',
    beats: [
      {
        title: '金山表格 AirScript 同步 + Node.js SSE 多端实时广播',
        desc: '自动读取金山文档当日报餐与实到数，服务端通过 SSE 长连接把 6 种餐品余量毫秒同步到现场设备',
        duration: 3600,
        run(a, id) {
          a.showPane('t1-p0');
          const net = a.root.querySelector('#t1-net');
          const btn = a.root.querySelector('#t1-sync-btn');
          const dm = a.root.querySelector('#t1-dm');
          const st = a.root.querySelector('#t1-sync-txt');
          net.textContent = '● 多端设备同步中'; net.classList.remove('offline');
          btn.textContent = '读取金山文档'; btn.classList.remove('ok');
          dm.textContent = '10'; dm.classList.remove('bump');
          st.textContent = '准备读取 10月16日 B座 午餐报餐表';
          a.parkCursor();
          a.later(420, () => a.moveTo('[data-t="t1-sync"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            btn.textContent = '已更新 6 种餐品 ✓'; btn.classList.add('ok');
            dm.textContent = '8'; dm.classList.add('bump');
            st.textContent = '已读取 287 份报餐 · 备用餐 +12 份 · 多端已同步';
            a.later(260, () => dm.classList.remove('bump'), id);
          }), id);
        }
      },
      {
        title: '跨日期场次日历，异常场次一眼标出',
        desc: '随时切换 A区 / B座 与午 / 晚餐；日期格上自动标出「补」（少取待补）和「!」（问题餐券），方便跨日复查',
        duration: 3400,
        run(a, id) {
          a.showPane('t1-p1');
          const net = a.root.querySelector('#t1-net'); net.textContent = '● 多端设备同步中'; net.classList.remove('offline');
          const d16 = a.root.querySelector('#t1-d16');
          const d17 = a.root.querySelector('#t1-d17');
          const info = a.root.querySelector('#t1-cal-info');
          d16.classList.add('on'); d17.classList.remove('on');
          info.textContent = '10月16日 B座 午餐 · 2 个部门待补券 · 1 张问题餐券';
          a.later(380, () => a.moveTo('[data-t="t1-d17"]', 0.55, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            d16.classList.remove('on'); d17.classList.add('on');
            info.textContent = '已切到 10月17日 A区 晚餐 · 当场全部核对清楚';
          }), id);
        }
      },
      {
        title: '多领超数当场标红提醒，跨品牌换餐自动算平',
        desc: '点选份数超过报餐数立刻标红拦住；现场临时加餐或换别的品牌，系统两边一起算平余量，不用心算',
        duration: 4200,
        run(a, id) {
          a.showPane('t1-p2');
          const net = a.root.querySelector('#t1-net'); net.textContent = '● 多端设备同步中'; net.classList.remove('offline');
          const val = a.root.querySelector('#t1-dval');
          const al = a.root.querySelector('#t1-alert');
          const cfm = a.root.querySelector('#t1-cfm');
          const swap = a.root.querySelector('#t1-swap-note');
          val.textContent = '2'; val.style.color = '#15181F';
          al.classList.remove('on');
          cfm.textContent = '确认发餐'; cfm.classList.remove('ok');
          swap.textContent = '临时换餐：比如把多满分换成真功夫，两边余量一起调整';
          a.later(300, () => a.moveTo('[data-t="t1-plus"]', 0.5, 0.5), id);
          a.later(860, () => a.tap(id, () => {
            val.textContent = '4'; val.style.color = '#DC2626'; al.classList.add('on');
          }), id);
          a.later(1650, () => a.moveTo('[data-t="t1-swap"]', 0.62, 0.55), id);
          a.later(2250, () => a.tap(id, () => {
            al.classList.remove('on'); val.textContent = '2+2换'; val.style.color = '#059669';
            swap.textContent = '✓ 已记下 2 份换餐，两个品牌的余量都已自动算平';
            cfm.textContent = '已登记发餐 ✓'; cfm.classList.add('ok');
          }), id);
        }
      },
      {
        title: '问题餐券现场拍照存证，点错可以一键撤销',
        desc: '拦下涂改或重复的餐券当场拍照存下来备查；每一笔记录都能按部门和类型筛选，录错一键撤销，余量自动加回来',
        duration: 3800,
        run(a, id) {
          a.showPane('t1-p3');
          const net = a.root.querySelector('#t1-net'); net.textContent = '● 多端设备同步中'; net.classList.remove('offline');
          const undo = a.root.querySelector('#t1-undo');
          const logSt = a.root.querySelector('#t1-log-st');
          undo.textContent = '撤销这条'; undo.classList.remove('ok');
          logSt.textContent = '问题餐券已拍照存证（日期涂改），随时点开看原图';
          a.later(420, () => a.moveTo('[data-t="t1-undo"]', 0.65, 0.55), id);
          a.later(1040, () => a.tap(id, () => {
            undo.textContent = '已撤销 ✓'; undo.classList.add('ok');
            logSt.textContent = '✓ 这笔误录已取消，对应餐品余量已自动加回 2 份';
          }), id);
        }
      },
      {
        title: '收工一键列出少取部门转补券，补发完直接勾掉',
        desc: '点一下「完成今日结算」，系统自动把没取或少取的部门记为待补餐券；补发时当场点「确认已补」完成核清',
        duration: 3800,
        run(a, id) {
          a.showPane('t1-p4');
          const net = a.root.querySelector('#t1-net'); net.textContent = '● 多端设备同步中'; net.classList.remove('offline');
          const endBtn = a.root.querySelector('#t1-end-btn');
          const vBtn = a.root.querySelector('#t1-v-ok');
          const vMeta = a.root.querySelector('#t1-v-meta');
          endBtn.textContent = '收工一键转待补餐券'; endBtn.classList.remove('ok');
          vBtn.textContent = '确认已补'; vBtn.classList.remove('ok');
          vMeta.textContent = '外联**处 · 少取真功夫 2 份、麦当劳 1 份';
          a.later(340, () => a.moveTo('[data-t="t1-end"]', 0.65, 0.55), id);
          a.later(940, () => a.tap(id, () => {
            endBtn.textContent = '已整理出 2 笔待补 ✓'; endBtn.classList.add('ok');
            a.later(460, () => a.moveTo('[data-t="t1-vok"]', 0.62, 0.55), id);
            a.later(1060, () => a.tap(id, () => {
              vBtn.textContent = '已补完 ✓'; vBtn.classList.add('ok');
              vMeta.textContent = '外联**处 · 3 份补餐券已核清';
            }), id);
          }), id);
        }
      },
      {
        title: '展馆断网照常记账，一键复制到 WPS 或导 Excel',
        desc: '没信号时自动暂存在手机里不丢单；还内置表格格式检查、误导错区转移、一键复制 WPS 结算列与导出 Excel',
        duration: 3800,
        run(a, id) {
          a.showPane('t1-p5');
          const net = a.root.querySelector('#t1-net');
          const exp = a.root.querySelector('#t1-exp-btn');
          const tWps = a.root.querySelector('#t1-tool-wps');
          net.textContent = '● 断网本机暂存'; net.classList.add('offline');
          exp.textContent = '导出今日 Excel'; exp.classList.remove('ok');
          tWps.classList.remove('on');
          a.later(340, () => a.moveTo('[data-t="t1-wps"]', 0.65, 0.55), id);
          a.later(920, () => a.tap(id, () => {
            tWps.classList.add('on');
            a.later(420, () => a.moveTo('[data-t="t1-exp"]', 0.65, 0.55), id);
            a.later(1000, () => a.tap(id, () => {
              exp.textContent = '已导出标准表格 ✓'; exp.classList.add('ok');
            }), id);
          }), id);
        }
      }
    ]
  });

  /* ========================================================================
     02-A 智慧校园前端下单网站 (6 步人话产品演示)
     ======================================================================== */
  createTheater({
    rootId: 'theater-zhxy-web',
    cursorId: 'cur-t2',
    beats: [
      {
        title: '活动自动同步上架，按线上与空闲名额筛选',
        desc: '后台持续同步校园新活动，自动标出加分项和校区要求；按「未看 / 线上 / 有空位」一键筛选',
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
        title: '点开看清加分细则与校区要求，还能直接找微信群码',
        desc: '把长篇策划书整理成报名时间、对象限制和加分规则，省得翻群问人；还能直接查看或更新活动群二维码',
        duration: 3400,
        run(a, id) {
          a.showPane('t2-p1');
          const qrBtn = a.root.querySelector('#t2-qr-btn');
          const qrTxt = a.root.querySelector('#t2-qr-txt');
          qrBtn.textContent = '查看群码'; qrTxt.textContent = '已整理活动咨询群二维码，点一下就能扫码进群';
          a.later(420, () => a.moveTo('[data-t="t2-qr"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            qrBtn.textContent = '已展开 ✓';
            qrTxt.textContent = '✓ 已显示高清群码，群码过期时同学也能随时提交新码';
          }), id);
        }
      },
      {
        title: '一次勾选多场下单，首次提交自动短信验号',
        desc: '替代微信逐条抄录学号；首次下单自动发短信核验账号与密码，过滤错密无效单，后续预约自动填充',
        duration: 4000,
        run(a, id) {
          a.showPane('t2-p2');
          const sms = a.root.querySelector('#t2-sms-st');
          const sub = a.root.querySelector('#t2-sub-btn');
          sms.textContent = '待短信验证'; sms.className = 's-pill amber';
          sub.textContent = '验证并提交 2 场预约'; sub.classList.remove('ok');
          a.later(360, () => a.moveTo('[data-t="t2-sub"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            sms.textContent = '✓ 账号已验证'; sms.className = 's-pill green';
            sub.textContent = '已收到，等待开抢 ✓'; sub.classList.add('ok');
          }), id);
        }
      },
      {
        title: '输学号自己查进度，开抢前随时取消',
        desc: '排队中、已抢到还是待结算一目了然；临时不想去了，开抢前自己点一下就能取消，少了很多微信来回问询',
        duration: 3600,
        run(a, id) {
          a.showPane('t2-p3');
          const cBtn = a.root.querySelector('#t2-cancel-btn');
          const oSt = a.root.querySelector('#t2-order-st');
          cBtn.textContent = '取消预约'; cBtn.classList.remove('ok');
          oSt.textContent = '排队中'; oSt.className = 's-pill blue';
          a.later(420, () => a.moveTo('[data-t="t2-cancel"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            cBtn.textContent = '已取消预约 ✓'; cBtn.classList.add('ok');
            oSt.textContent = '已取消'; oSt.className = 's-pill muted';
          }), id);
        }
      },
      {
        title: '自愿签约互助占位，换取热门活动免费名额',
        desc: '客户自愿在账号空闲时协助占名额，截止前没人要会自动取消不影响本人；多余热门名额随机免费掉落给参与同学',
        duration: 3600,
        run(a, id) {
          a.showPane('t2-p4');
          const agree = a.root.querySelector('#t2-agree-btn');
          const badge = a.root.querySelector('#t2-consent-st');
          agree.textContent = '同意参与 · 享免费热门掉落'; agree.classList.remove('ok');
          badge.textContent = '未参与'; badge.className = 's-pill amber';
          a.later(420, () => a.moveTo('[data-t="t2-agree"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            agree.textContent = '已同意并加入互助 ✓'; agree.classList.add('ok');
            badge.textContent = '已参与'; badge.className = 's-pill green';
          }), id);
        }
      },
      {
        title: '有问题直接发图留言，处理完打开网页立刻弹窗提醒',
        desc: '遇到撤单、群码失效或加分疑问可以直接传截图提问，后台回复或发通知后，客户再次进入网站会自动弹出提醒',
        duration: 3800,
        run(a, id) {
          a.showPane('t2-p5');
          const tkBtn = a.root.querySelector('#t2-tk-btn');
          const notice = a.root.querySelector('#t2-notice');
          tkBtn.textContent = '提交带图留言'; tkBtn.classList.remove('ok');
          notice.classList.remove('on');
          a.later(380, () => a.moveTo('[data-t="t2-tk"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            tkBtn.textContent = '已发给管理员 ✓'; tkBtn.classList.add('ok');
            a.later(420, () => notice.classList.add('on'), id);
          }), id);
        }
      }
    ]
  });

  /* ========================================================================
     02-B 智慧校园后端主控制台 (6 步人话产品演示)
     ======================================================================== */
  createTheater({
    rootId: 'theater-zhxy-console',
    cursorId: 'cur-t3',
    beats: [
      {
        title: '无浏览器 HTTP 加密直连发包 + 抢报耗时节奏校准',
        desc: '复用已验证 Session 与请求体加密跳过网页渲染直接发包抢报，并按历史耗时数据自动校准提前发起毫秒数',
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
              '<div><span class="ok">[成功]</span> 2025****348 / 2025****343 已抢到（用时 84ms）</div>';
          }), id);
        }
      },
      {
        title: '每个任务独立记日志，需要人工确认时一键弹出对应窗口',
        desc: '多个抢报和换位任务同时跑互不干扰；万一遇到页面验证，点一下「弹出浏览器」就能直接接手当前账号页面',
        duration: 3600,
        run(a, id) {
          a.showPane('t3-p1');
          const popBtn = a.root.querySelector('#t3-pop-br');
          const st = a.root.querySelector('#t3-br-st');
          popBtn.textContent = '弹出浏览器'; popBtn.classList.remove('green');
          st.textContent = '运行中 · 多账号独立环境隔离，互不干扰';
          a.later(420, () => a.moveTo('[data-t="t3-pop"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            popBtn.textContent = '已打开窗口 ✓'; popBtn.classList.add('green');
            st.textContent = '✓ 已拉起该账号的独立浏览窗口，可直接人工处理';
          }), id);
        }
      },
      {
        title: '订单集中管理，一键筛选未付款并批量查真伪',
        desc: '网页下单实时同步进入后台；收款前可勾选订单自动登录学校系统复核报名状态，确认报上再收款',
        duration: 3800,
        run(a, id) {
          a.showPane('t3-p2');
          const flt = a.root.querySelector('#t3-flt');
          const rev = a.root.querySelector('#t3-rev');
          const paidRow = a.root.querySelector('#t3-paid-row');
          const vTag = a.root.querySelector('#t3-rev-tag');
          flt.classList.remove('on'); rev.textContent = '核对选中订单'; rev.classList.remove('green');
          paidRow.style.display = ''; vTag.textContent = '未核对'; vTag.className = 's-pill amber';
          a.later(300, () => a.moveTo('[data-t="t3-flt"]', 0.65, 0.55), id);
          a.later(860, () => a.tap(id, () => {
            flt.classList.add('on'); paidRow.style.display = 'none';
            a.later(420, () => a.moveTo('[data-t="t3-rev"]', 0.65, 0.55), id);
            a.later(980, () => a.tap(id, () => {
              rev.textContent = '全部属实 ✓'; rev.classList.add('green');
              vTag.textContent = '确认报上 ✓'; vTag.className = 's-pill green';
            }), id);
          }), id);
        }
      },
      {
        title: '一键批量生成账单图，手机直接存图发微信收款',
        desc: '选中未付款客户一键出好明细账单图，手机扫局域网画廊就能存图发给客户，收到钱再一键批量标成已结算',
        duration: 4000,
        run(a, id) {
          a.showPane('t3-p3');
          const bBtn = a.root.querySelector('#t3-bill');
          const sBtn = a.root.querySelector('#t3-settle');
          const sat = a.root.querySelector('#t3-sat');
          const satTag = a.root.querySelector('#t3-sat-tag');
          bBtn.textContent = '批量生成账单图'; sBtn.textContent = '批量标记已收款';
          sat.classList.remove('on'); satTag.textContent = '手机画廊已可保存';
          a.later(300, () => a.moveTo('[data-t="t3-bill"]', 0.65, 0.55), id);
          a.later(880, () => a.tap(id, () => {
            bBtn.textContent = '账单图已生成 ✓'; sat.classList.add('on');
            a.later(520, () => a.moveTo('[data-t="t3-settle"]', 0.65, 0.55), id);
            a.later(1120, () => a.tap(id, () => {
              sBtn.textContent = '已全部结清 ✓'; satTag.textContent = '已收款 ✓';
            }), id);
          }), id);
        }
      },
      {
        title: '互助占位自动换位：空闲账号退位，客户立刻接盘',
        desc: '热门活动满员后，后台调度空闲互助账号退位并由下单客户顺势接盘；剩余未售名额自动转为免费掉落',
        duration: 4000,
        run(a, id) {
          a.showPane('t3-p4');
          const n1 = a.root.querySelector('#t3-n1');
          const n2 = a.root.querySelector('#t3-n2');
          const n3 = a.root.querySelector('#t3-n3');
          const btn = a.root.querySelector('#t3-swap-btn');
          [n1, n2, n3].forEach(n => n.classList.remove('on'));
          btn.textContent = '开始自动换位'; btn.classList.remove('green');
          a.later(320, () => a.moveTo('[data-t="t3-swap"]', 0.65, 0.55), id);
          a.later(920, () => a.tap(id, () => {
            n1.classList.add('on');
            a.later(360, () => n2.classList.add('on'), id);
            a.later(760, () => { n3.classList.add('on'); btn.textContent = '换位完成 · 余位已送出 ✓'; btn.classList.add('green'); }, id);
          }), id);
        }
      },
      {
        title: '活动排期跟进到拿到加分，留言回复自动推回网页',
        desc: '每场活动从进群、签到到最后加分到账都有清单跟进；客户在网页发的留言在桌面就能回复并推送提醒',
        duration: 3600,
        run(a, id) {
          a.showPane('t3-p5');
          const rBtn = a.root.querySelector('#t3-reply-btn');
          const rSt = a.root.querySelector('#t3-tk-st');
          rBtn.textContent = '回复并通知客户'; rBtn.classList.remove('green');
          rSt.textContent = '待回复'; rSt.className = 's-pill amber';
          a.later(420, () => a.moveTo('[data-t="t3-reply"]', 0.65, 0.55), id);
          a.later(1020, () => a.tap(id, () => {
            rBtn.textContent = '已回复并通知 ✓'; rBtn.classList.add('green');
            rSt.textContent = '已处理 · 客户已收到提醒'; rSt.className = 's-pill green';
          }), id);
        }
      }
    ]
  });

  /* ========================================================================
     03 易班自动化桌面软件 (5 步人话产品演示)
     ======================================================================== */
  createTheater({
    rootId: 'theater-yiban',
    cursorId: 'cur-t4',
    beats: [
      {
        title: '云端多维表格 Open API 一机一码授权 + 网络校时防篡改',
        desc: '启动时校验设备硬件码（HWID）、卡密有效期与网络标准时间，防止篡改系统时间绕过',
        duration: 3600,
        run(a, id) {
          a.showPane('t4-p0');
          const pill = a.root.querySelector('#t4-auth-p');
          const btn = a.root.querySelector('#t4-v-btn');
          const st = a.root.querySelector('#t4-auth-st');
          pill.classList.add('hi'); btn.textContent = '联网核对授权';
          st.textContent = '正在核对云端表格里的授权记录与标准时间...';
          a.parkCursor();
          a.later(380, () => a.moveTo('[data-t="t4-verify"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            btn.textContent = '验证通过 · 月卡有效 ✓';
            st.textContent = '✓ 设备硬件码校验通过 · 月卡有效期正常';
          }), id);
        }
      },
      {
        title: '一键自动读取账号全部可发版块，附带防屏蔽提示',
        desc: '自动拉起独立浏览器抓取当前账号有权限的全部发布范围与版块并写入本地缓存，下方内置选版块防屏蔽提示',
        duration: 3600,
        run(a, id) {
          a.showPane('t4-p1');
          const pill = a.root.querySelector('#t4-auth-p'); pill.classList.remove('hi');
          const btn = a.root.querySelector('#t4-read-btn');
          const val = a.root.querySelector('#t4-board-val');
          btn.textContent = '自动读取可发版块'; btn.classList.remove('ok');
          val.textContent = '还没有读取账号版块...';
          a.later(380, () => a.moveTo('[data-t="t4-read"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            btn.textContent = '已同步账号全部可发版块 ✓'; btn.classList.add('ok');
            val.textContent = '广东轻工职业技术大学 → 校园大杂烩（已保存到本地）';
          }), id);
        }
      },
      {
        title: '自定义随机词库 → 本地 HTTP 接口实时同步脚本',
        desc: '编辑多条日常互动语料后，由客户端内置本地 HTTP 接口实时下发到浏览器执行脚本，无需重启即可生效',
        duration: 3600,
        run(a, id) {
          a.showPane('t4-p2');
          const lex = a.root.querySelector('#t4-lex-p');
          const btn = a.root.querySelector('#t4-lex-btn');
          const st = a.root.querySelector('#t4-lex-st');
          lex.classList.add('hi'); btn.textContent = '保存词库';
          st.textContent = '共 4 条常用语，改完不用重启软件就能直接用';
          a.later(380, () => a.moveTo('[data-t="t4-lex"]', 0.65, 0.55), id);
          a.later(980, () => a.tap(id, () => {
            btn.textContent = '已保存并同步 ✓';
            st.textContent = '✓ 已同步到执行窗口，下一条发帖和评论就会用新话术';
          }), id);
        }
      },
      {
        title: '设定每日任务上限，随机间隔稳妥执行',
        desc: '发帖、评论与点赞上限可自由配置；在独立浏览器中按随机间隔执行，实时统计完成进度与预计网薪收益',
        duration: 4200,
        run(a, id) {
          a.showPane('t4-p3');
          a.root.querySelector('#t4-lex-p').classList.remove('hi');
          const btn = a.root.querySelector('#t4-run-btn');
          const k1 = a.root.querySelector('#t4-k1'), k2 = a.root.querySelector('#t4-k2'), k3 = a.root.querySelector('#t4-k3');
          const lines = [...a.root.querySelectorAll('#t4-p3 .t4-line')];
          btn.textContent = '开始自动发帖 / 评论点赞';
          k1.textContent = '0 / 20'; k2.textContent = '0 / 30'; k3.textContent = '+0';
          lines.forEach((l, i) => l.classList.toggle('on', i === 0));
          a.later(320, () => a.moveTo('[data-t="t4-run"]', 0.65, 0.55), id);
          a.later(900, () => a.tap(id, () => {
            btn.textContent = '正在按随机间隔执行...';
            lines[1] && lines[1].classList.add('on');
            a.later(450, () => { lines[2] && lines[2].classList.add('on'); k1.textContent = '2 / 20'; k2.textContent = '4 / 30'; k3.textContent = '+30'; }, id);
            a.later(950, () => { lines[3] && lines[3].classList.add('on'); k1.textContent = '3 / 20'; k2.textContent = '6 / 30'; k3.textContent = '+48'; btn.textContent = '本轮已跑完 ✓'; }, id);
          }), id);
        }
      },
      {
        title: 'XOR 内存解密 + PyArmor & Inno Setup 自动化双版打包',
        desc: '脚本内存解密防明文泄露、主程序 PyArmor 加密，自动产出完整版与轻巧 Edge 版安装包；内置云端更新检测',
        duration: 3800,
        run(a, id) {
          a.showPane('t4-p4');
          const btn = a.root.querySelector('#t4-upd-btn');
          const steps = [...a.root.querySelectorAll('#t4-p4 .t4-pstep')];
          btn.textContent = '检查软件更新';
          steps.forEach((s, i) => s.classList.toggle('on', i === 0));
          a.later(340, () => a.moveTo('[data-t="t4-upd"]', 0.65, 0.55), id);
          a.later(920, () => a.tap(id, () => {
            btn.textContent = '当前已是最新版本 v3.2 ✓';
            steps.forEach((s, i) => a.later(i * 140, () => s.classList.add('on'), id));
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
    }, { threshold: 0.16 });
    theaters.forEach((_, id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
  }

  window.__STAGESHOW_THEATERS = theaters;
})();
