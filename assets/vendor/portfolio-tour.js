(function () {
  if (window.__PORTFOLIO_TOUR_READY) return;
  window.__PORTFOLIO_TOUR_READY = true;

  var appKey = document.documentElement.getAttribute('data-portfolio-tour') ||
               (document.body && document.body.getAttribute('data-portfolio-tour')) || '';

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
      try { el.click(); return true; } catch (e) {}
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
      if (el) { try { el.click(); } catch (e) {} }
    });
  }

  function cleanZhxyOrder() {
    try { if (typeof window.closeActDetail === 'function') window.closeActDetail(); } catch (e) {}
    try { if (typeof window.closeModal === 'function') window.closeModal(); } catch (e) {}
    try { if (typeof window.closeConsentModal === 'function') window.closeConsentModal(); } catch (e) {}
    try { if (typeof window.closeQrcodeSheet === 'function') window.closeQrcodeSheet(); } catch (e) {}
    try { if (typeof window.closeAdmin === 'function') window.closeAdmin(); } catch (e) {}
    try { if (typeof window.closeAnnouncement === 'function') window.closeAnnouncement(); } catch (e) {}
    try { if (typeof window.clearSelection === 'function') window.clearSelection(); } catch (e) {}
  }

  function cleanZhxyConsole() {
    try { if (window.App && typeof window.App.closeAdminPortal === 'function') window.App.closeAdminPortal(); } catch (e) {}
    try { if (window.App && typeof window.App.closeSettings === 'function') window.App.closeSettings(); } catch (e) {}
    document.querySelectorAll('.modal.open, .modal-overlay.open, [id$="-modal"].open').forEach(function (m) {
      m.classList.remove('open');
    });
    var dr = document.getElementById('task-drawer-overlay');
    if (dr && dr.classList.contains('open')) {
      try { window.App && window.App.toggleTaskDrawer(); } catch (e) { dr.classList.remove('open'); }
    }
  }

  function cleanYiban() {
    try { if (typeof window.closeModals === 'function') window.closeModals(); } catch (e) {}
    document.querySelectorAll('.modal-bg.on').forEach(function (m) { m.classList.remove('on'); });
  }

  var TOURS = {
    'reconcile': {
      name: '广交会取餐核对台',
      hasBottomBar: true,
      cleanup: cleanReconcile,
      steps: [
        {
          prepare: async function () {
            cleanReconcile();
            clickSel('.chip[data-f="all"]');
            window.scrollTo({ top: 0, behavior: 'instant' });
            await wait(160);
          },
          selector: '#strip',
          side: 'bottom',
          title: '5 大品牌实时余量与备餐看板',
          desc: '10 部手机现场实时协作，自动联动多满分、真功夫、麦当劳、肯德基与清真餐的报餐、已取与备用餐余量，高峰期一眼看清库存。'
        },
        {
          prepare: async function () {
            cleanReconcile();
            window.scrollTo({ top: 0, behavior: 'instant' });
            await wait(120);
          },
          selector: '#dateBtn',
          side: 'bottom',
          title: '33 天 95 场跨日历与异常标徽',
          desc: '支持随时切换 A区 / B座 与午 / 晚餐；日期栏自动标出「补」（待补餐券）与红色「!」（问题餐券），跨展期复查零遗漏。'
        },
        {
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
          title: '需补餐券挂账部门一键筛选核销',
          desc: '一键滤出所有少取待补的挂账部门，现场核对补发后直接点选核销，整个展期 55 笔补餐券全部闭环零错漏。'
        },
        {
          prepare: async function () {
            cleanReconcile();
            clickSel('.chip[data-f="all"]');
            await wait(220);
            clickSel('#list .dcard, #list .drow, #list [data-dept]');
            await wait(320);
          },
          selector: '#drawer .dpanel, #drawer',
          side: 'top',
          title: '部门发餐防呆、加餐与跨品牌换餐',
          desc: '点选录入自动比对报餐与实取份数，超领漏领当场标红拦住；临时加餐与跨品牌换餐自动算平两头余量，告别人工算错账。'
        },
        {
          prepare: async function () {
            cleanReconcile();
            await wait(180);
            clickSel('#logBtn');
            await wait(340);
          },
          selector: '#logTable .lcard, #sheetLog .sbody',
          side: 'bottom',
          title: '问题餐券涂改留证 + 换餐 / 加餐 / 撤销全流水',
          desc: '支持按部门、有效、加换餐与「问题餐券」多维筛选；现场拦下涂改餐券可直接拍照存档、点击查看大图证据，误录一键撤销回滚。'
        },
        {
          prepare: async function () {
            cleanReconcile();
            await wait(180);
            clickSel('#moreBtn');
            await wait(320);
          },
          selector: '#sheetMore .sbody',
          side: 'top',
          title: '9 项全能操作工具箱',
          desc: '内置实到录入、表格粘贴导入、金山文档自动同步、历史核对表格式稽核、一键复制 WPS 结算数据与导错区一键转移。'
        },
        {
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
          title: '收工一键盘点并批量转待补餐券',
          desc: '点击「完成今日结算」，系统自动列出全部未取、少取部门并批量转为待补餐券，收工核对一步到位。'
        },
        {
          prepare: async function () {
            cleanReconcile();
            await wait(180);
          },
          selector: '#expBtn',
          side: 'top',
          title: '离线容错本地暂存与标准 Excel 导出',
          desc: '展馆断网也能在手机本地完整记账不丢单，一键导出标准 Excel 结算表，将每天 50 分钟纸笔对账压缩至 5 分钟。'
        }
      ]
    },

    'zhxy-order': {
      name: '智慧校园 3.0 活动代预约',
      hasBottomBar: true,
      cleanup: cleanZhxyOrder,
      steps: [
        {
          prepare: async function () {
            cleanZhxyOrder();
            clickSel('button[data-view="activities"]');
            await wait(220);
            window.scrollTo({ top: 0, behavior: 'instant' });
            await wait(120);
          },
          selector: '#chips',
          side: 'bottom',
          title: '1,225 场校园活动自动同步与精准筛选',
          desc: '后端持续抓取校园新活动并自动补全综测加分项，支持按「未浏览 / 线上 / 线下 / 空闲名额」一键筛选，替代翻微信群找活动。'
        },
        {
          prepare: async function () {
            cleanZhxyOrder();
            clickSel('button[data-view="activities"]');
            await wait(180);
            clickSel('#grid .card-body');
            await wait(320);
          },
          selector: '#actDetailOverlay > div, #actDetailModal > div, #grid .card',
          side: 'top',
          title: '活动详情、校区限制与综测加分解析',
          desc: '自动整理报名时间、校区限制、当前名额与综测加分类别，客户一目了然，点击底部即可立即预约报名。'
        },
        {
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
            await wait(180);
          },
          selector: '#modalOverlay > div',
          side: 'top',
          title: '多场批量合并预约与首次短信验号',
          desc: '一次勾选多场活动合并下单，替代微信逐条抄单；首次提交自动短信校验学号密码，杜绝无效错密单并支持下次自动填充。'
        },
        {
          prepare: async function () {
            cleanZhxyOrder();
            await wait(160);
            clickSel('button[data-view="my-orders"]');
            await wait(280);
            window.scrollTo({ top: 0, behavior: 'instant' });
          },
          selector: '#view-my-orders, .orders-wrap, main',
          side: 'top',
          title: '客户自助透明查单与状态同步',
          desc: '输入学号随时查看排队中、已抢到与待结算状态，支持开抢前自助撤销或一键联系管理员，大幅减少微信咨询工作量。'
        },
        {
          prepare: async function () {
            cleanZhxyOrder();
            await wait(160);
            if (typeof window.openConsentModal === 'function') window.openConsentModal(true);
            else clickSel('#btn-show-consent');
            await wait(320);
          },
          selector: '#consentModalOverlay > div',
          side: 'top',
          title: '互助占位征用协议与免费热门掉落',
          desc: '37 位客户签约出借空闲名额参与互助占位，换取热门活动免费随机掉落，累计完成 216 次名额置换与 35 次免费掉落。'
        },
        {
          prepare: async function () {
            cleanZhxyOrder();
            await wait(160);
            clickSel('button[data-view="tickets"]');
            await wait(280);
            window.scrollTo({ top: 0, behavior: 'instant' });
          },
          selector: '#view-tickets, button[data-view="tickets"]',
          side: 'top',
          title: '带图售后工单、群码直达与公告提醒',
          desc: '支持在线提交带图异常工单、查询活动微信群码与历史公告，后台回复处理后前台同步弹窗提醒，形成完整售后闭环。'
        }
      ]
    },

    'zhxy-console': {
      name: '智慧校园 3.0 后端主控制台',
      hasBottomBar: false,
      cleanup: cleanZhxyConsole,
      steps: [
        {
          prepare: async function () {
            cleanZhxyConsole();
            await wait(160);
          },
          selector: '.sidebar, #mode-scan',
          side: 'right',
          title: '双引擎模式与守护进程实时监控',
          desc: '支持「智能活动助手」与「抢活动高并发接口直连」双模式，左侧持续监控守护线程、网络延迟与开抢倒计时。'
        },
        {
          prepare: async function () {
            cleanZhxyConsole();
            await wait(160);
          },
          selector: '#task-container .card, #task-container',
          side: 'bottom',
          title: '多任务隔离日志与浏览器一键接管',
          desc: '每个抢票与名额置换任务独立输出实时日志流，需要人工确认时可直接点击「弹出浏览器」拉起对应登录态页面。'
        },
        {
          prepare: async function () {
            cleanZhxyConsole();
            await wait(160);
            if (window.App && window.App.openAdminPortal) window.App.openAdminPortal();
            await wait(340);
          },
          selector: '#admin-portal-modal .modal-content, #admin-portal-modal',
          side: 'top',
          title: '861 笔订单集中履约后台',
          desc: '实时同步网站自助订单，支持「只看待结算」「复核不符」精准筛选，全选待结算客户一键「批量生图」发对账账单、批量复核与结算。'
        },
        {
          prepare: async function () {
            cleanZhxyConsole();
            await wait(180);
            if (window.App && window.App.openSlotManagerModal) window.App.openSlotManagerModal();
            else if (window.App && window.App.openSlotManager) window.App.openSlotManager();
            await wait(340);
          },
          selector: '#slot-manager-modal .modal-content, #slot-manager-modal',
          side: 'top',
          title: '216 次互助占位与免费掉落调度中心',
          desc: '统一管理 38 个已验账号池、副号当前占位与名额置换记录，自动调度副号让位与客户接盘，并可一键触发热门免费掉落。'
        },
        {
          prepare: async function () {
            cleanZhxyConsole();
            await wait(180);
            if (window.App && window.App.toggleTaskDrawer) window.App.toggleTaskDrawer();
            await wait(340);
          },
          selector: '#task-drawer-overlay .drawer-panel, #task-drawer-overlay',
          side: 'left',
          title: '全流程活动任务排期清单',
          desc: '按活动场次集中追踪建群、签到打卡与综测加分确认进度，确保每一笔订单从抢票到拿分全程可控。'
        },
        {
          prepare: async function () {
            cleanZhxyConsole();
            await wait(180);
            if (window.App && window.App.openTicketsModal) window.App.openTicketsModal();
            await wait(340);
          },
          selector: '#tickets-modal .modal-content, #tickets-modal',
          side: 'top',
          title: '客户工单同步桌面端集中处理',
          desc: '前台网页提交的撤单、售后与群码反馈自动推送到桌面控制台，回复结单后客户前台实时收到通知。'
        }
      ]
    },

    'yiban': {
      name: '易班自动化桌面软件',
      hasBottomBar: false,
      cleanup: cleanYiban,
      steps: [
        {
          prepare: async function () {
            cleanYiban();
            await wait(140);
            clickSel('#btnAuth');
            await wait(280);
          },
          selector: '#authModal .modal',
          side: 'bottom',
          title: '飞书多维表格零成本一机一码授权',
          desc: '不租云服务器，直接联网读取飞书表格校验设备硬件码（HWID）与月卡有效期，实现 ¥0 / 月商业授权与远程风控管理。'
        },
        {
          prepare: async function () {
            cleanYiban();
            await wait(180);
            clickSel('#btnRead');
            await wait(260);
          },
          selector: '.box',
          side: 'bottom',
          title: '自动读取 5 个范围 / 36 个可发版块',
          desc: '一键拉起独立浏览器抓取当前账号权限版块并写入本地缓存，配合下方实战防封号、防屏蔽选版块指引，新手双击即用。'
        },
        {
          prepare: async function () {
            cleanYiban();
            await wait(160);
            clickSel('#btnLexicon');
            await wait(280);
          },
          selector: '#lexModal .modal',
          side: 'bottom',
          title: '本地可视化自定义随机发帖与评论词库',
          desc: '支持自由编辑多条校园互动语料，保存后通过本地接口实时同步至浏览器悬浮窗脚本，随机组合防重复。'
        },
        {
          prepare: async function () {
            cleanYiban();
            await wait(180);
          },
          selector: '.limit-box',
          side: 'top',
          title: '防风控任务上限配置与云端更新检查',
          desc: '灵活控制单次发帖、评论与点赞上限，配合随机间隔避免风控；内置云端更新检测，付费客户提建议当天即可改完发新版。'
        },
        {
          prepare: async function () {
            cleanYiban();
            await wait(140);
            clickSel('#btnPost');
            await wait(320);
          },
          selector: '#log',
          side: 'top',
          title: '实机自动执行与实时网薪收益日志',
          desc: '提供自动评论点赞与自动发帖双入口，实时统计已发帖、已评论与预计网薪收益；线上实售 89 单保持 100% 好评零纠纷。'
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
  fab.innerHTML = '<span class="pt-spark">✦</span><span>亮点导览</span><span class="pt-cnt">' + cfg.steps.length + '步</span>';
  document.body.appendChild(fab);

  var activeDriver = null;
  var activeIdx = 0;
  var moving = false;

  async function goToStep(idx) {
    if (moving || !activeDriver) return;
    if (idx < 0 || idx >= cfg.steps.length) {
      finishTour();
      return;
    }
    moving = true;
    activeIdx = idx;
    var step = cfg.steps[idx];
    try {
      if (step.prepare) await step.prepare();
    } catch (e) {}

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
        progressText: '亮点 ' + (idx + 1) + ' / ' + cfg.steps.length,
        prevBtnText: '上一步',
        nextBtnText: isLast ? '自由体验' : '下一亮点 →',
        showButtons: isFirst ? ['next', 'close'] : ['previous', 'next', 'close'],
        onNextClick: function () {
          if (isLast) finishTour();
          else goToStep(activeIdx + 1);
        },
        onPrevClick: function () {
          if (activeIdx > 0) goToStep(activeIdx - 1);
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
      /* Fallback to centered popover if element couldn't be highlighted */
      delete stepConfig.element;
      try { activeDriver.highlight(stepConfig); } catch (e2) {}
    }
    moving = false;
  }

  function finishTour() {
    if (activeDriver) {
      var d = activeDriver;
      activeDriver = null;
      try { d.destroy(); } catch (e) {}
    }
    try { if (cfg.cleanup) cfg.cleanup(); } catch (e) {}
    fab.classList.remove('pt-hidden');
  }

  function startTour() {
    if (!window.driver || !window.driver.js || !window.driver.js.driver) return;
    if (activeDriver) finishTour();
    fab.classList.add('pt-hidden');
    activeDriver = window.driver.js.driver({
      animate: true,
      allowClose: true,
      overlayClickBehavior: 'none',
      overlayColor: '#0E121B',
      overlayOpacity: 0.62,
      stagePadding: 6,
      stageRadius: 12,
      smoothScroll: true,
      popoverClass: 'pt-popover',
      popoverOffset: 12,
      onDestroyStarted: function () {
        if (moving) return;
        if (activeDriver) {
          var d = activeDriver;
          activeDriver = null;
          try { d.destroy(); } catch (e) {}
          try { if (cfg.cleanup) cfg.cleanup(); } catch (e) {}
          fab.classList.remove('pt-hidden');
        }
      }
    });
    goToStep(0);
  }

  fab.addEventListener('click', startTour);
  window.__startPortfolioTour = startTour;

  /* Auto-start only when opened with ?tour=1 (never inside video-recorder iframes or ?notour=1) */
  var qs = location.search || '';
  var inIframe = false;
  try { inIframe = window.self !== window.top; } catch (e) { inIframe = true; }
  if (!inIframe && qs.indexOf('tour=1') >= 0 && qs.indexOf('notour=1') < 0) {
    setTimeout(startTour, 720);
  }
})();
