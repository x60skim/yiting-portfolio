(function () {
  if (window.__PORTFOLIO_TOUR_READY) return;
  window.__PORTFOLIO_TOUR_READY = true;

  var appKey = document.documentElement.getAttribute('data-portfolio-tour') ||
    (document.body && document.body.getAttribute('data-portfolio-tour')) || '';

  var qs = location.search || '';
  var inIframe = false;
  try { inIframe = window.self !== window.top; } catch (e) { inIframe = true; }
  var isEmbed = inIframe || qs.indexOf('embed=1') >= 0;
  var isAutoMode = qs.indexOf('tour=auto') >= 0;
  var reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var AUTO_DURATION = 4200;

  if (isEmbed) {
    document.body.classList.add('pt-embed');
  }

  function wait(ms) {
    return new Promise(function (resolve) { setTimeout(resolve, ms); });
  }

  function qsVisible(selector) {
    if (!selector) return null;
    var parts = selector.split(',');
    for (var i = 0; i < parts.length; i++) {
      var list = document.querySelectorAll(parts[i].trim());
      for (var j = 0; j < list.length; j++) {
        var el = list[j];
        var st = window.getComputedStyle(el);
        if (st.display === 'none' || st.visibility === 'hidden' || parseFloat(st.opacity) === 0) continue;
        var r = el.getBoundingClientRect();
        if (r.width > 4 && r.height > 4) return el;
      }
    }
    return null;
  }

  function clickSel(selector) {
    var el = qsVisible(selector) || document.querySelector(selector);
    if (el) {
      try { el.click(); return true; } catch (e) { }
    }
    return false;
  }

  /* Cleanup helpers per app so previous modals/sheets never collide */
  function cleanReconcile() {
    ['#sheetLog [data-close]', '#sheetMore [data-close]', '#sheetEndDay [data-close]',
      '#sheetDate [data-close]', '#sheetArr [data-close]', '#sheetImp [data-close]',
      '#sheetImpOps [data-close]', '#sheetClearZone [data-close]', '#pvModalClose', '#dClose'
    ].forEach(function (s) {
      var el = qsVisible(s);
      if (el) { try { el.click(); } catch (e) { } }
    });
  }

  function cleanZhxyOrder() {
    try { if (typeof window.closeActDetail === 'function') window.closeActDetail(); } catch (e) { }
    try { if (typeof window.closeModal === 'function') window.closeModal(); } catch (e) { }
    try { if (typeof window.closeConsentModal === 'function') window.closeConsentModal(); } catch (e) { }
    try { if (typeof window.closeQrcodeSheet === 'function') window.closeQrcodeSheet(); } catch (e) { }
    try { if (typeof window.closeAdmin === 'function') window.closeAdmin(); } catch (e) { }
    try { if (typeof window.closeAnnouncement === 'function') window.closeAnnouncement(); } catch (e) { }
    try { if (typeof window.clearSelection === 'function') window.clearSelection(); } catch (e) { }
  }

  function cleanZhxyConsole() {
    try { if (window.App && typeof window.App.closeAdminPortal === 'function') window.App.closeAdminPortal(); } catch (e) { }
    try { if (window.App && typeof window.App.closeSettings === 'function') window.App.closeSettings(); } catch (e) { }
    document.querySelectorAll('.modal.open, .modal-overlay.open, [id$="-modal"].open').forEach(function (m) {
      m.classList.remove('open');
    });
    var dr = document.getElementById('task-drawer-overlay');
    if (dr && dr.classList.contains('open')) {
      try { window.App && window.App.toggleTaskDrawer(); } catch (e) { dr.classList.remove('open'); }
    }
  }

  function cleanYiban() {
    try { if (typeof window.closeModals === 'function') window.closeModals(); } catch (e) { }
    document.querySelectorAll('.modal-bg.on').forEach(function (m) { m.classList.remove('on'); });
  }

  var TOURS = {
    'reconcile': {
      name: '广交会多端取餐核对台',
      hasBottomBar: true,
      cleanup: cleanReconcile,
      steps: [
        {
          tab: '余量看板',
          prepare: async function () {
            cleanReconcile();
            clickSel('.chip[data-f="all"]');
            window.scrollTo({ top: 0, behavior: 'instant' });
            await wait(160);
          },
          selector: '#strip',
          side: 'bottom',
          title: '6 种餐品实时余量看板',
          desc: '10 部现场手机实时同步多满分、真功夫、麦当劳、肯德基、清真餐和白饭的报餐、已取与备用余量。'
        },
        {
          tab: '跨日历',
          prepare: async function () {
            cleanReconcile();
            window.scrollTo({ top: 0, behavior: 'instant' });
            await wait(120);
          },
          selector: '#dateBtn',
          side: 'bottom',
          title: '33 天 95 场跨日历与异常标徽',
          desc: '切换 A区、B座与午晚餐，日历格直接标出待补餐券和问题餐券，方便跨展期复查。'
        },
        {
          tab: '需补餐券',
          prepare: async function () {
            cleanReconcile();
            clickSel('#chipVoucher');
            await wait(240);
            var chip = document.getElementById('chipVoucher');
            if (chip) chip.scrollIntoView({ behavior: 'instant', block: 'center' });
            await wait(120);
          },
          selector: '#chipVoucher',
          side: 'bottom',
          title: '筛选少取部门并核清待补餐券',
          desc: '筛出所有少取待补的部门，现场补发后核清记录，全展期 55 笔补餐券零错漏。'
        },
        {
          tab: '超领提醒',
          prepare: async function () {
            cleanReconcile();
            clickSel('.chip[data-f="all"]');
            await wait(220);
            clickSel('#list .dcard, #list .drow, #list [data-dept]');
            await wait(320);
          },
          selector: '#drawer .dpanel, #drawer',
          side: 'top',
          title: '超领标红拦截与跨品牌换餐',
          desc: '录入份数时自动比对报餐数，超领当场红框拦住；加餐或换品牌时两边余量自动算平。'
        },
        {
          tab: '取餐记录',
          prepare: async function () {
            cleanReconcile();
            await wait(180);
            clickSel('#logBtn');
            await wait(340);
          },
          selector: '#logTable .lcard, #sheetLog .sbody',
          side: 'bottom',
          title: '问题餐券拍照留底与误录撤销',
          desc: '按部门或记录类型筛选；拦下的涂改餐券拍照存底，误录可撤销并自动加回余量。'
        },
        {
          tab: '常用工具',
          prepare: async function () {
            cleanReconcile();
            await wait(180);
            clickSel('#moreBtn');
            await wait(320);
          },
          selector: '#sheetMore .sbody',
          side: 'top',
          title: '现场核对常用工具',
          desc: '集成实际到餐录入、金山文档自动同步、表格格式检查、WPS 结算列复制与错区数据转移。'
        },
        {
          tab: '日终转券',
          prepare: async function () {
            cleanReconcile();
            await wait(160);
            clickSel('#moreBtn');
            await wait(240);
            clickSel('.mrow[data-open="end-day"]');
            await wait(340);
          },
          selector: '#sheetEndDay .sbody, #sheetEndDay',
          side: 'top',
          title: '收工盘点与批量转待补餐券',
          desc: '结算时自动列出未取和少取部门并批量转为待补餐券。'
        },
        {
          tab: '断网导表',
          prepare: async function () {
            cleanReconcile();
            await wait(180);
          },
          selector: '#expBtn',
          side: 'top',
          title: '断网本机暂存与 Excel 导出',
          desc: '展馆断网时在手机本地继续记账，恢复后自动续传；导出标准 Excel 结算表，每天对账从 50 分钟降到 5 分钟。'
        }
      ]
    },

    'zhxy-order': {
      name: '智慧校园 3.0 活动代预约',
      hasBottomBar: true,
      cleanup: cleanZhxyOrder,
      steps: [
        {
          tab: '活动筛选',
          prepare: async function () {
            cleanZhxyOrder();
            clickSel('button[data-view="activities"]');
            await wait(160);
            clickSel('#chips button[data-f="online"], #chips .chip:nth-child(3)');
            window.scrollTo({ top: 0, behavior: 'instant' });
            await wait(160);
          },
          selector: '#chips',
          side: 'bottom',
          title: '1,225 场活动自动上架与筛选',
          desc: '后台同步校园新活动并整理综测加分项，按未浏览、线上、线下和空闲名额快速筛选。'
        },
        {
          tab: '活动详情',
          prepare: async function () {
            cleanZhxyOrder();
            clickSel('button[data-view="activities"]');
            await wait(160);
            clickSel('#grid .card-body');
            await wait(320);
          },
          selector: '#actDetailOverlay > div, #actDetailModal > div, #grid .card',
          side: 'top',
          title: '加分细则与校区要求解析',
          desc: '从长策划书里提取报名时间、对象限制、剩余名额和综测加分类别。'
        },
        {
          tab: '批量下单',
          prepare: async function () {
            cleanZhxyOrder();
            clickSel('button[data-view="activities"]');
            await wait(80);
            var boxes = document.querySelectorAll('#grid input.box');
            if (boxes[0] && !boxes[0].checked) boxes[0].click();
            if (boxes[1] && !boxes[1].checked) boxes[1].click();
            await wait(80);
            if (typeof window.openBatchModal === 'function') window.openBatchModal();
            else clickSel('#batchBar button[onclick="openBatchModal()"]');
            await wait(220);
          },
          selector: '#modalOverlay > div',
          side: 'top',
          title: '批量合并预约与首次短信验号',
          desc: '一次勾选多场活动提交，首次下单通过短信核验账号密码，过滤错密无效单并记住信息。'
        },
        {
          tab: '自助查单',
          prepare: async function () {
            cleanZhxyOrder();
            await wait(140);
            clickSel('button[data-view="my-orders"]');
            await wait(280);
            window.scrollTo({ top: 0, behavior: 'instant' });
          },
          selector: '#view-my-orders, .orders-wrap, main',
          side: 'top',
          title: '自助查单与开抢前取消',
          desc: '输入学号查看排队中、已报上与待结算状态，开抢前可自助取消预约。'
        },
        {
          tab: '互助占位',
          prepare: async function () {
            cleanZhxyOrder();
            await wait(140);
            if (typeof window.openConsentModal === 'function') window.openConsentModal(true);
            else clickSel('#btn-show-consent');
            await wait(320);
          },
          selector: '#consentModalOverlay > div',
          side: 'top',
          title: '空闲账号互助占位协议',
          desc: '签约后账号空闲时协助暂占热门名额，截止前无人接手自动取消，累计完成 216 次换位与 35 次免费赠送。'
        },
        {
          tab: '带图留言',
          prepare: async function () {
            cleanZhxyOrder();
            await wait(140);
            clickSel('button[data-view="tickets"]');
            await wait(280);
            window.scrollTo({ top: 0, behavior: 'instant' });
          },
          selector: '#view-tickets, button[data-view="tickets"]',
          side: 'top',
          title: '带图留言、群码与回复提醒',
          desc: '在线上传截图留言、查看活动微信群码和历史通知，后台回复后打开网页自动弹出提醒。'
        }
      ]
    },

    'zhxy-console': {
      name: '智慧校园 3.0 后端主控制台',
      hasBottomBar: false,
      cleanup: cleanZhxyConsole,
      steps: [
        {
          tab: '并发监控',
          prepare: async function () {
            cleanZhxyConsole();
            await wait(140);
          },
          selector: '.sidebar, #mode-scan',
          side: 'right',
          title: '双运行模式与后台监控',
          desc: '支持日常扫活动和接口直连抢报双模式，左侧实时显示后台运行状态、网络延迟和倒计时。'
        },
        {
          tab: '任务日志',
          prepare: async function () {
            cleanZhxyConsole();
            await wait(140);
          },
          selector: '#task-container .card, #task-container',
          side: 'bottom',
          title: '独立任务日志与人工接管',
          desc: '每个任务单独记录日志，遇到页面验证时可弹出对应登录态浏览器窗口接手处理。'
        },
        {
          tab: '订单后台',
          prepare: async function () {
            cleanZhxyConsole();
            await wait(140);
            if (window.App && window.App.openAdminPortal) window.App.openAdminPortal();
            await wait(320);
          },
          selector: '#admin-portal-modal .modal-content, #admin-portal-modal',
          side: 'top',
          title: '861 笔订单管理与账单收款',
          desc: '同步网页预约单，支持筛选待结算与核对不符订单，批量核真、生成账单图并标记收款。'
        },
        {
          tab: '名额换位',
          prepare: async function () {
            cleanZhxyConsole();
            await wait(160);
            if (window.App && window.App.openSlotManagerModal) window.App.openSlotManagerModal();
            else if (window.App && window.App.openSlotManager) window.App.openSlotManager();
            await wait(320);
          },
          selector: '#slot-manager-modal .modal-content, #slot-manager-modal',
          side: 'top',
          title: '216 次空闲账号换位调度',
          desc: '统一管理 38 个已验账号池与当前占位记录，自动调度空闲账号退位和客户接盘。'
        },
        {
          tab: '排期清单',
          prepare: async function () {
            cleanZhxyConsole();
            await wait(160);
            if (window.App && window.App.toggleTaskDrawer) window.App.toggleTaskDrawer();
            await wait(320);
          },
          selector: '#task-drawer-overlay .drawer-panel, #task-drawer-overlay',
          side: 'left',
          title: '活动排期跟进清单',
          desc: '按场次追踪进群、签到和综测加分到账进度。'
        },
        {
          tab: '客户留言',
          prepare: async function () {
            cleanZhxyConsole();
            await wait(160);
            if (window.App && window.App.openTicketsModal) window.App.openTicketsModal();
            await wait(320);
          },
          selector: '#tickets-modal .modal-content, #tickets-modal',
          side: 'top',
          title: '客户留言同步桌面端处理',
          desc: '前台网页提交的撤单、售后与群码反馈自动推送到控制台，回复后推回客户网页提醒。'
        }
      ]
    },

    'yiban': {
      name: '易班自动化桌面软件',
      hasBottomBar: false,
      cleanup: cleanYiban,
      steps: [
        {
          tab: '云端授权',
          prepare: async function () {
            cleanYiban();
            await wait(140);
            clickSel('#btnAuth');
            await wait(280);
          },
          selector: '#authModal .modal',
          side: 'bottom',
          title: '云端表格 Open API 一机一码授权',
          desc: '不租云服务器，联网读取云端表格核对设备硬件码与月卡有效期，实现 ¥0 / 月授权管理。'
        },
        {
          tab: '读取版块',
          prepare: async function () {
            cleanYiban();
            await wait(160);
            clickSel('#btnRead');
            await wait(260);
          },
          selector: '.box',
          side: 'bottom',
          title: '自动读取当前账号全部可发版块',
          desc: '在独立浏览器中抓取当前账号有权限的全部版块并写入本地缓存，下方附带防屏蔽选版块提示。'
        },
        {
          tab: '自定义词库',
          prepare: async function () {
            cleanYiban();
            await wait(140);
            clickSel('#btnLexicon');
            await wait(280);
          },
          selector: '#lexModal .modal',
          side: 'bottom',
          title: '自定义发帖与评论常用语',
          desc: '自由编辑日常互动语料，保存后通过本地接口同步至执行脚本，不用重启软件。'
        },
        {
          tab: '任务上限',
          prepare: async function () {
            cleanYiban();
            await wait(160);
            clickSel('#btnSaveLim');
            await wait(180);
          },
          selector: '.limit-box',
          side: 'top',
          title: '每日任务上限与云端更新检查',
          desc: '控制单次发帖、评论与点赞上限并配合随机间隔运行，内置云端版本更新检测。'
        },
        {
          tab: '自动执行',
          prepare: async function () {
            cleanYiban();
            await wait(140);
            clickSel('#btnPost');
            await wait(320);
          },
          selector: '#log',
          side: 'top',
          title: '自动执行与预计网薪统计',
          desc: '分设自动评论点赞和自动发帖入口，实时统计执行进度与预计网薪；线上售出 89 单、100% 好评。'
        }
      ]
    }
  };

  var cfg = TOURS[appKey];
  if (!cfg) return;

  if (cfg.hasBottomBar) {
    document.body.classList.add('pt-has-bottombar');
  }

  /* Create floating launcher pill */
  var fab = document.createElement('button');
  fab.id = 'pt-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', '开启功能亮点交互导览');
  function updateFabLabel() {
    if (isEmbed) {
      fab.innerHTML = '<span class="pt-spark">✦</span><span>恢复自动导览</span>';
    } else {
      fab.innerHTML = '<span class="pt-spark">✦</span><span>亮点导览</span>';
    }
  }
  updateFabLabel();
  document.body.appendChild(fab);

  var activeDriver = null;
  var activeIdx = 0;
  var moving = false;
  var autoPlaying = isAutoMode && !reducedMotion;
  var autoPaused = false;
  var parentVisible = !isEmbed;
  var autoTimer = null;

  function emitState() {
    if (!inIframe) return;
    try {
      var curStep = cfg.steps[activeIdx] || cfg.steps[0];
      window.parent.postMessage({
        type: 'pt-state',
        app: appKey,
        step: activeIdx,
        total: cfg.steps.length,
        active: !!activeDriver,
        autoPlaying: autoPlaying && !autoPaused && !!activeDriver,
        paused: autoPaused,
        title: curStep ? curStep.title : '',
        desc: curStep ? curStep.desc : '',
        steps: cfg.steps.map(function (s, i) {
          return { index: i, tab: s.tab || ('亮点 ' + (i + 1)), title: s.title };
        })
      }, '*');
    } catch (e) { }
  }

  function clearAutoTimer() {
    if (autoTimer) {
      clearTimeout(autoTimer);
      autoTimer = null;
    }
  }

  function attachAutoBar() {
    if (!isAutoMode || !activeDriver) return;
    var pop = document.querySelector('.driver-popover.pt-popover');
    if (!pop) return;
    var old = pop.querySelector('.pt-auto-track');
    if (old) old.remove();
    var track = document.createElement('div');
    track.className = 'pt-auto-track';
    var bar = document.createElement('div');
    bar.className = 'pt-auto-bar';
    bar.style.setProperty('--pt-dur', AUTO_DURATION + 'ms');
    track.appendChild(bar);
    pop.appendChild(track);
    if (autoPlaying && !autoPaused && parentVisible) {
      void bar.offsetWidth;
      bar.classList.add('run');
    } else {
      bar.classList.add('paused');
    }
  }

  function scheduleNext() {
    clearAutoTimer();
    attachAutoBar();
    if (!isAutoMode || !activeDriver || !autoPlaying || autoPaused || !parentVisible) return;
    autoTimer = setTimeout(function () {
      if (!activeDriver || !autoPlaying || autoPaused || !parentVisible) return;
      var next = (activeIdx + 1) % cfg.steps.length;
      goToStep(next);
    }, AUTO_DURATION);
  }

  async function goToStep(idx) {
    if (moving || !activeDriver) return;
    if (idx < 0 || idx >= cfg.steps.length) {
      if (isAutoMode) {
        idx = 0;
      } else {
        finishTour();
        return;
      }
    }
    clearAutoTimer();
    moving = true;
    activeIdx = idx;
    var step = cfg.steps[idx];
    try {
      if (step.prepare) await step.prepare();
    } catch (e) { }

    if (!activeDriver) {
      moving = false;
      return;
    }

    var target = qsVisible(step.selector);
    var isLast = idx === cfg.steps.length - 1;
    var isFirst = idx === 0;

    var stepConfig = {
      popover: {
        title: step.title,
        description: step.desc,
        side: step.side || 'bottom',
        align: 'center',
        showProgress: true,
        progressText: (isAutoMode ? '演示 ' : '导览 ') + (idx + 1) + ' / ' + cfg.steps.length,
        prevBtnText: isEmbed ? '自由操作' : '上一步',
        nextBtnText: isLast ? (isAutoMode ? '重播' : '开始体验') : '下一步',
        showButtons: isEmbed ? ['previous', 'next', 'close'] : (isFirst ? ['next', 'close'] : ['previous', 'next', 'close']),
        onNextClick: function () {
          if (isLast) {
            if (isAutoMode) goToStep(0);
            else finishTour();
          } else {
            goToStep(activeIdx + 1);
          }
        },
        onPrevClick: function () {
          if (isEmbed) {
            finishTour();
          } else if (activeIdx > 0) {
            goToStep(activeIdx - 1);
          }
        },
        onCloseClick: function () {
          finishTour();
        }
      }
    };
    if (target) {
      stepConfig.element = target;
    }

    try {
      activeDriver.highlight(stepConfig);
    } catch (e) {
      delete stepConfig.element;
      try { activeDriver.highlight(stepConfig); } catch (e2) { }
    }
    moving = false;
    emitState();
    scheduleNext();
  }

  function finishTour() {
    clearAutoTimer();
    if (activeDriver) {
      var d = activeDriver;
      activeDriver = null;
      try { d.destroy(); } catch (e) { }
    }
    try { if (cfg.cleanup) cfg.cleanup(); } catch (e) { }
    fab.classList.remove('pt-hidden');
    emitState();
  }

  function startTour(startIndex, enableAuto) {
    if (!window.driver || !window.driver.js || !window.driver.js.driver) return;
    if (typeof enableAuto === 'boolean') {
      autoPlaying = enableAuto && !reducedMotion;
      autoPaused = !enableAuto;
    } else if (isAutoMode) {
      autoPlaying = !reducedMotion;
      autoPaused = false;
    }
    if (activeDriver) {
      goToStep(typeof startIndex === 'number' ? startIndex : activeIdx);
      return;
    }
    fab.classList.add('pt-hidden');
    activeDriver = window.driver.js.driver({
      animate: !reducedMotion,
      allowClose: true,
      overlayClickBehavior: isEmbed ? 'close' : 'none',
      overlayColor: '#0E121B',
      overlayOpacity: isEmbed ? 0.44 : 0.62,
      stagePadding: isEmbed ? 5 : 6,
      stageRadius: 12,
      smoothScroll: true,
      popoverClass: 'pt-popover',
      popoverOffset: isEmbed ? 10 : 12,
      onDestroyStarted: function () {
        if (moving) return;
        clearAutoTimer();
        if (activeDriver) {
          var d = activeDriver;
          activeDriver = null;
          try { d.destroy(); } catch (e) { }
          try { if (cfg.cleanup) cfg.cleanup(); } catch (e) { }
          fab.classList.remove('pt-hidden');
          emitState();
        }
      }
    });
    goToStep(typeof startIndex === 'number' ? startIndex : 0);
  }

  fab.addEventListener('click', function () {
    startTour(0, isAutoMode ? true : false);
  });
  window.__startPortfolioTour = startTour;

  /* Parent iframe controller bridge */
  window.addEventListener('message', function (ev) {
    var d = ev.data;
    if (!d || d.type !== 'pt-cmd') return;
    if (d.cmd === 'play') {
      autoPaused = false;
      autoPlaying = !reducedMotion;
      if (!activeDriver) startTour(activeIdx, true);
      else { emitState(); scheduleNext(); }
    } else if (d.cmd === 'pause') {
      autoPaused = true;
      clearAutoTimer();
      var bar = document.querySelector('.pt-auto-bar');
      if (bar) bar.classList.add('paused');
      emitState();
    } else if (d.cmd === 'goto') {
      var targetIdx = typeof d.index === 'number' ? d.index : 0;
      if (!activeDriver) startTour(targetIdx, autoPlaying && !autoPaused);
      else goToStep(targetIdx);
    } else if (d.cmd === 'takeover') {
      finishTour();
    } else if (d.cmd === 'setVisible') {
      parentVisible = !!d.visible;
      if (parentVisible) {
        if (isAutoMode && !activeDriver && autoPlaying && !autoPaused) {
          startTour(activeIdx, true);
        } else if (activeDriver) {
          scheduleNext();
        }
      } else {
        clearAutoTimer();
        var b2 = document.querySelector('.pt-auto-bar');
        if (b2) b2.classList.add('paused');
      }
      emitState();
    }
  });

  /* Emit initial step list so parent can render tabs immediately */
  emitState();

  /* Auto-start in standalone ?tour=1 OR embedded ?tour=auto */
  if (qs.indexOf('notour=1') < 0) {
    if (!inIframe && qs.indexOf('tour=1') >= 0) {
      setTimeout(function () { startTour(0, false); }, 680);
    } else if (isAutoMode) {
      setTimeout(function () {
        if (parentVisible && !activeDriver && autoPlaying) {
          startTour(0, true);
        }
      }, 520);
    }
  }
})();
