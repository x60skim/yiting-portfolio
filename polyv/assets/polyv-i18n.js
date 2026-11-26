(function () {
  const I18N = {
    zh: {
      navP1: '01 取餐核对',
      navP2: '02 活动代预约',
      navP3: '03 易班软件',
      navP4: '04 外贸工作台',
      navTrade: '05 成绩与凭证',
      navCta: '下载简历',

      heroMeta1: '广东轻工职业技术大学 国际商务',
      heroMeta2: '2027 届 · 可提前全周实习',
      heroMeta3: '广东广州',
      heroTitle: '赖怡婷 Yiting Lai',
      heroRole: 'AI 业务工具开发 × 国际商务与出海运营',
      heroSub: '从一线业务里找出耗时环节，用 AI 独立做出可上线的网页和桌面工具；具备商务英语 98 分、全国外语翻译一等奖与海外平台全英文成单经验。',
      btnResume: '下载简历',
      btnPhone: '复制手机',
      btnEmail: '复制邮箱',

      qj1t: '广交会多端取餐核对台',
      qj1s: '10 部设备实时同步 · 每日对账从 50 分钟降到 5 分钟',
      qj2t: '智慧校园 3.0 活动代预约系统',
      qj2s: '自助下单网页 + 电脑端管理台 · 稳定处理 861 笔订单',
      qj3t: '易班自动化桌面软件',
      qj3s: '云端表格零服务器授权 · 售出 89 单 100% 好评',
      qj4t: '外贸 AI 询盘分诊与双语内容工作台',
      qj4s: '询盘结构化拆卡 · 报价红线拦截与拉美西语校对',
      qjGo: '查看',

      vidBtn: '看录屏',
      prevBtn: '项目预览',

      p1Meta: '2026.10 – 2026.11 · 广东广交会新大地会展服务有限公司 · 优秀实习生',
      p1Title: '广交会多端取餐核对台',
      p1Sum: '把展馆纸笔发餐台改造成手机端同步工具，自动读取金山文档报餐表，10 部设备实时核对余量，全展期 33 天 95 场零错漏。',
      p1m1b: '10 部', p1m1s: '现场同步设备',
      p1m2b: '33 天 / 95 场', p1m2s: '午晚餐零错漏',
      p1m3b: '70,042 份', p1m3s: '核对餐品总数',
      p1m4b: '50 至 5 分钟', p1m4s: '每日收工对账',
      p1pt1b: '金山文档自动读表',
      p1pt1d: '直接读取当日报餐表，自动识别红字标注和加换餐备注，省去人工抄表。',
      p1pt2b: 'Node.js 多端实时同步',
      p1pt2d: '余量变动同步到全部现场手机，超领当场红框拦住，跨品牌换餐自动算平库存。',
      p1pt3b: '断网暂存、拍照留底与导表',
      p1pt3d: '展馆断网时先存在手机本地，恢复后自动续传；问题餐券拍照留底，收工导出标准 Excel 或复制 WPS 结算列。',
      p1Stage: '广交会多端取餐核对台 · 交互演示',

      p2Meta: '2025.06 – 至今 · 独立开发与运营',
      p2Title: '智慧校园 3.0 活动代预约系统',
      p2Sum: '用 Python 电脑端、SQLite 与 Node.js 网页端替代微信手工接单和记账，覆盖活动抓取、自助下单、定时抢报、空闲账号换位与账单收款。',
      p2m1b: '1,225 场', p2m1s: '自动整理上架活动',
      p2m2b: '861 笔', p2m2s: '累计处理预约单',
      p2m3b: '38 个', p2m3s: '已验客户账号',
      p2m4b: '216 次', p2m4s: '空闲账号换位',
      p2TabWeb: '前端下单网站',
      p2TabCon: '后端主控制台',

      p3Meta: '2025.09 – 至今 · 独立开发与商业交付',
      p3Title: '易班自动化桌面软件',
      p3Sum: '不租云服务器，通过云端多维表格 Open API 和设备硬件码实现一机一码授权，打包为双击即装的 Windows 安装包，线上售出 89 单、100% 好评。',
      p3m1b: '89 单', p3m1s: '线上真实售出',
      p3m2b: '¥1,286', p3m2s: '软件成交额',
      p3m3b: '100% 好评', p3m3s: '全程 0 纠纷',
      p3m4b: '¥0 / 月', p3m4s: '云端表格授权成本',
      p3pt1b: '云端表格 Open API 授权',
      p3pt1d: '启动时核对设备硬件码与网络标准时间，防止修改电脑时间绕过有效期，配合发卡页远程管理激活码与封禁。',
      p3pt2b: '自动读取版块与词库热同步',
      p3pt2d: '自动读取当前账号有权限的全部版块并缓存到本地；修改常用语后直接同步到执行脚本，无需重启软件。',
      p3pt3b: '源码加密与双版安装包',
      p3pt3d: '核心脚本在内存中解密运行，打包为内置浏览器完整版和轻巧 Edge 版两个 Windows 安装包，启动时检查云端更新。',
      p3Stage: '易班自动化桌面软件 · 交互演示',

      p4Meta: '2026 · 面向外贸 AI 落地的自研工具',
      p4Title: '外贸 AI 询盘分诊与双语内容工作台',
      p4Sum: '针对外贸团队用 AI 接询盘时容易越权报价、聊天记录难归档、知识库过期以及拉美西语翻译失真的常见问题，粘贴任意英文或西语询盘即可实时拆卡、拦截价格与账期红线、体检知识库并生成双语分镜口播稿。',
      p4m1b: '红线拦截', p4m1s: '价格账期转人工复核',
      p4m2b: '实时拆卡', p4m2s: '提取字段与缺失清单',
      p4m3b: '知识体检', p4m3s: '超 30 天过期预警',
      p4m4b: '拉美西语', p4m4s: '术语校对与 CRM 导表',
      p4pt1b: '任意询盘实时拆卡与报价红线拦截',
      p4pt1d: '识别英文和西语买家消息里的数量、目的港、认证和电压参数，标出缺失字段；一旦涉及底价、账期或独家代理立即红灯转人工，只生成不越权的安全追问草稿。',
      p4pt2b: '产品知识库过期预警与字段检查',
      p4pt2d: '自动核算 MOQ、交期、参考价带与认证的维护时效，超过 30 天未核验即标黄预警，避免过期资料污染后续回复。',
      p4pt3b: '动态英西分镜口播与拉美西语校对',
      p4pt3d: '根据实时录入的产品参数生成英文与拉美工业西语 4 段分镜稿，校对 ustedes 与行业专有词，并导出标准 CRM 询盘 CSV。',
      p4Stage: '外贸 AI 询盘分诊与双语内容工作台 · 交互演示',

      trNo: '05 成绩与成交凭证',
      trTitle: '国际商务成绩、获奖证书与真实成交凭证',
      trLead: '核心专业课 90 至 99 分，获全国外语翻译大赛一等奖与校级二等奖学金；完成海外平台 G2G 全英文上架与 Payoneer 跨境收款，国内线上累计成交 350 单，综合纠纷率 0.35%。',
      ts1b: '99 分', ts1s: '数字贸易平台运营', ts1m: '核心专业课',
      ts2b: '98 分', ts2s: '商务英语', ts2m: '英语四级 · 全国翻译一等奖',
      ts3b: '95 分', ts3s: '海外新媒体营销', ts3m: '跨境内容与转化课程',
      ts4b: '90 分', ts4s: '国际贸易实务', ts4m: '均分 88.24 · GPA 3.81 / 5.0',

      pl0a_b: '官方成绩单高分课程摘录', pl0a_s: '均分 88.24 · GPA 3.81 · 教务部盖章原件摘录',
      pl0b_b: '2024–2025 学年校级二等奖学金', pl0b_s: '广东轻工职业技术大学官方证书原件',
      pl1b: 'G2G 全英文上架首单', pl1s: '成交 6.00 USD · 已发货完成',
      pl2b: 'Payoneer 跨境收款回单', pl2s: '扣佣净入账 5.40 USD · 折合 7,680 KRW',
      pl3b: '客户提建议当天改版追评', pl3s: '按用户反馈当晚更新版本',
      pl4b: '100% 客户好评', pl4s: '89 单自研工具零差评零纠纷',
      pl5b: '单店成交 261 单', pl5s: '成交额 ¥6,132.24 · 纠纷率 0.5%',
      pl6b: '工具售出 89 单', pl6s: '成交额 ¥1,286 · 0% 纠纷率',
      certT: '第三届全国外语翻译大赛 · 全国一等奖',
      certS: '深圳市翻译协会颁发 · 2026 年 7 月',
      pdfT: 'G2G 官方跨境收款单 PDF 原件',
      pdfS: '包含订单编号与海外平台结算明细',
      pdfBtn: '打开收款单 PDF',

      footLead: '可提前全周实习，广州番禺大学城就近到岗。',
      footMetaL: '赖怡婷 Yiting Lai · 广东轻工职业技术大学 国际商务'
    },
    en: {
      navP1: '01 Fair Ops',
      navP2: '02 Booking',
      navP3: '03 Desktop',
      navP4: '04 Trade Studio',
      navTrade: '05 Proof',
      navCta: 'Resume',

      heroMeta1: 'Guangdong Polytechnic University · Int’l Business',
      heroMeta2: 'Class of 2027 · Full-Time Intern Ready',
      heroMeta3: 'Guangzhou',
      heroTitle: 'Yiting Lai',
      heroRole: 'AI Business Tooling × International Business & Global Ops',
      heroSub: 'I turn repetitive frontline tasks into live web and desktop tools with AI, backed by 98/100 in Business English, a National 1st Prize in Translation, and verified cross-border orders.',
      btnResume: 'Download Resume',
      btnPhone: 'Copy Phone',
      btnEmail: 'Copy Email',

      qj1t: 'Canton Fair Multi-Device Meal Reconciler',
      qj1s: '10 live devices · Daily closing cut from 50 min to 5 min',
      qj2t: 'Smart Campus 3.0 Event Booking System',
      qj2s: 'Self-service web portal + desktop console · 861 orders handled',
      qj3t: 'Yiban Desktop Automation Software',
      qj3s: 'Zero-server cloud table licensing · 89 sales, 100% positive',
      qj4t: 'B2B AI Inquiry Triage & Bilingual Studio',
      qj4s: 'Live demand cards · Pricing red-line guard & LatAm Spanish',
      qjGo: 'View',

      vidBtn: 'Watch Video',
      prevBtn: 'Live Demo',

      p1Meta: '2026.10 – 2026.11 · Canton Fair Exhibition Services · Outstanding Intern',
      p1Title: 'Canton Fair Multi-Device Meal Reconciler',
      p1Sum: 'Replaced paper meal tallies with a real-time mobile web tool that reads WPS cloud sheets and syncs live stock across 10 devices with zero errors over 33 days.',
      p1m1b: '10 Devices', p1m1s: 'Synced on site',
      p1m2b: '33d / 95 Runs', p1m2s: 'Zero closing errors',
      p1m3b: '70,042 Meals', p1m3s: 'Verified across 6 brands',
      p1m4b: '50 to 5 min', p1m4s: 'Daily closing time',
      p1pt1b: 'Automated WPS Sheet Sync',
      p1pt1d: 'Reads daily order tables directly and parses red-text edits and meal swaps without manual copying.',
      p1pt2b: 'Node.js Live Multi-Device Sync',
      p1pt2d: 'Pushes balance updates to every on-site phone, blocks over-claiming in red, and balances cross-brand swaps.',
      p1pt3b: 'Offline Cache, Photo Proof & Export',
      p1pt3d: 'Saves entries locally during signal drops and resumes online; stores altered ticket photos and exports clean Excel or WPS columns.',
      p1Stage: 'Canton Fair Meal Reconciler · Interactive Demo',

      p2Meta: '2025.06 – Present · Solo Development & Operations',
      p2Title: 'Smart Campus 3.0 Event Booking System',
      p2Sum: 'Built a Python desktop console, SQLite store, and Node.js web portal to replace manual WeChat order taking, covering event scraping, timed booking, slot swaps, and billing.',
      p2m1b: '1,225 Events', p2m1s: 'Scraped automatically',
      p2m2b: '861 Orders', p2m2s: 'Handled end to end',
      p2m3b: '38 Accounts', p2m3s: 'SMS-verified pool',
      p2m4b: '216 Swaps', p2m4s: 'Idle-account handovers',
      p2TabWeb: 'Web Order Portal',
      p2TabCon: 'Desktop Console',

      p3Meta: '2025.09 – Present · Solo Development & Commercial Delivery',
      p3Title: 'Yiban Desktop Automation Software',
      p3Sum: 'Built serverless single-device licensing with Cloud Table Open API and hardware ID binding, shipped as Windows installers with 89 real sales and 100% positive reviews.',
      p3m1b: '89 Sales', p3m1s: 'Verified online orders',
      p3m2b: '¥1,286', p3m2s: 'Software revenue',
      p3m3b: '100% Positive', p3m3s: 'Zero disputes',
      p3m4b: '¥0 / mo', p3m4s: 'Cloud table auth cost',
      p3pt1b: 'Cloud Table Open API Licensing',
      p3pt1d: 'Checks hardware ID and network standard time on launch to stop clock tampering, paired with a remote key generator.',
      p3pt2b: 'Auto Board Discovery & Live Phrase Sync',
      p3pt2d: 'Reads all permitted posting channels into local cache and pushes phrase edits directly to the running script without restarting.',
      p3pt3b: 'Encrypted Packaging & Dual Installers',
      p3pt3d: 'Decrypts core scripts in memory, builds bundled-browser and lightweight Edge Windows installers, and checks cloud updates on launch.',
      p3Stage: 'Yiban Desktop Software · Interactive Demo',

      p4Meta: '2026 · B2B Export AI Operations Tool',
      p4Title: 'B2B AI Inquiry Triage & Bilingual Studio',
      p4Sum: 'Built to solve four real adoption gaps in export AI assistants: parses any English or Spanish buyer chat into structured demand cards, blocks unauthorized pricing or credit quotes, flags stale product docs over 30 days old, and generates dynamic EN and LatAm Spanish video scripts.',
      p4m1b: 'Red-Line Guard', p4m1s: 'Blocks auto price commits',
      p4m2b: 'Live Triage', p4m2s: 'Demand card & missing fields',
      p4m3b: 'KB Audit', p4m3s: '30-day staleness warning',
      p4m4b: 'LatAm ES', p4m4s: 'Glossary check & CRM CSV',
      p4pt1b: 'Real-Time Inquiry Triage & Commercial Red-Line Guard',
      p4pt1d: 'Extracts quantity, port, voltage, and certificates from any pasted chat while listing missing fields; flags pricing, credit terms, or exclusivity for human handoff and drafts safe follow-up questions.',
      p4pt2b: 'Product Knowledge Base Staleness Audit',
      p4pt2d: 'Checks MOQ, lead time, price bands, and compliance update dates, flagging records older than 30 days before stale facts reach buyers.',
      p4pt3b: 'Dynamic EN/LatAm ES Scripts & CRM CSV Export',
      p4pt3d: 'Rebuilds timed 4-scene English and Latin American Spanish voiceover scripts live from edited specs, enforces LatAm trade terminology, and exports CRM-ready CSV rows.',
      p4Stage: 'B2B AI Inquiry Triage & Bilingual Studio · Interactive Demo',

      trNo: '05 GRADES & PROOF',
      trTitle: 'Academic Grades, Awards & Verified Sales Proof',
      trLead: 'Scored 90–99 in core international business courses, won National 1st Prize in Translation and a Second-Class Scholarship, completed G2G cross-border delivery, and fulfilled 350 domestic orders at a 0.35% dispute rate.',
      ts1b: '99 / 100', ts1s: 'Digital Trade Operations', ts1m: 'Core major course',
      ts2b: '98 / 100', ts2s: 'Business English', ts2m: 'CET-4 · National 1st Prize',
      ts3b: '95 / 100', ts3s: 'Overseas Social Media', ts3m: 'Cross-border content',
      ts4b: '90 / 100', ts4s: 'Int’l Trade Practice', ts4m: 'Avg 88.24 · GPA 3.81 / 5.0',

      pl0a_b: 'Official Transcript Highlights', pl0a_s: 'Avg 88.24 · GPA 3.81 · Stamped Core Courses',
      pl0b_b: '2024–2025 Second-Class Scholarship', pl0b_s: 'Guangdong Polytechnic University Certificate',
      pl1b: 'G2G All-English First Order', pl1s: '6.00 USD · Delivered',
      pl2b: 'Payoneer Cross-Border Payout', pl2s: '5.40 USD net · 7,680 KRW',
      pl3b: 'Same-Day Update Follow-Up Review', pl3s: 'Shipped fix on the same evening',
      pl4b: '100% Positive Reviews', pl4s: '89 software orders, zero disputes',
      pl5b: '261 Single-Store Orders', pl5s: '¥6,132.24 GMV · 0.5% dispute rate',
      pl6b: '89 Software Orders', pl6s: '¥1,286 GMV · 0% dispute rate',
      certT: '3rd National Translation Competition · First Prize',
      certS: 'Shenzhen Translators Association · July 2026',
      pdfT: 'Official G2G Payment Advice PDF',
      pdfS: 'Order ID and cross-border settlement details',
      pdfBtn: 'Open Receipt PDF',

      footLead: 'Available full-time near Guangzhou Panyu University Town.',
      footMetaL: 'Yiting Lai · Guangdong Polytechnic University · International Business'
    }
  };

  let lang = 'zh';

  function applyLang(next) {
    lang = next === 'en' ? 'en' : 'zh';
    document.documentElement.lang = lang === 'en' ? 'en' : 'zh-CN';
    const dict = I18N[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) el.textContent = dict[key];
    });
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('on', btn.getAttribute('data-lang') === lang);
    });
    if (typeof window.__setTheaterLang === 'function') {
      window.__setTheaterLang(lang);
    }
    const segWrap = document.getElementById('p2Seg');
    if (segWrap && window.innerWidth >= 860) {
      requestAnimationFrame(() => {
        const activeBtn = segWrap.querySelector('.etab.active');
        const thumb = document.getElementById('p2Thumb');
        if (activeBtn && thumb) {
          thumb.style.width = activeBtn.offsetWidth + 'px';
          thumb.style.transform = 'translate3d(' + activeBtn.offsetLeft + 'px,0,0)';
        }
      });
    }
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });

  applyLang('zh');
})();
