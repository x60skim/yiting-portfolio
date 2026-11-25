(function () {
  const I18N = {
    zh: {
      navP1: '01 取餐',
      navP2: '02 代预约',
      navP3: '03 易班',
      navP4: '04 外贸工具',
      navTrade: '05 实绩',
      navCta: '下载简历',

      heroMeta1: '广东轻工职业技术大学 国际商务',
      heroMeta2: '2027 届 · 可提前全周实习',
      heroMeta3: '广东广州',
      heroTitle: '赖怡婷 Yiting Lai',
      heroRole: 'AI 业务工具开发 × 国际商务与出海运营',
      heroSub: '习惯从真实业务现场拆出重复耗时环节，结合 AI 独立完成前后端开发、异常兜底与客户交付；同时具备商务英语 98 分、全国外语翻译一等奖与海外平台全英文成单经验。',
      btnResume: '下载简历 PDF',
      btnPhone: '复制手机',
      btnEmail: '复制邮箱',

      qj1t: '广交会多端实时取餐核对台',
      qj1s: '10 部设备同步 · 33 天 95 场 70,042 份零错漏',
      qj2t: '智慧校园 3.0 活动代预约系统',
      qj2s: '前后端双端架构 · 1,225 场活动与 861 笔真实订单',
      qj3t: '易班自动化桌面软件',
      qj3s: '云端表格零成本一机一码 · 售出 89 单 100% 好评',
      qj4t: '外贸视频脚本与多语种询盘工作台',
      qj4s: '英文西语分镜口播稿 · 专有术语锁定与秒回报价',
      qjGo: '演示',

      vidBtn: '完整录屏',
      prevBtn: '项目预览',

      p1Meta: '2026.10 – 2026.11 · 广东广交会新大地会展服务有限公司 · 优秀实习生',
      p1Title: '广交会多端实时取餐核对台',
      p1Sum: '把展馆容易算错的纸笔发餐台搬上手机：自动读取金山文档报餐表，10 部现场设备毫秒同步余量，每日收工核对从 50 分钟压到 5 分钟，全展期 33 天 95 场零错漏。',
      p1m1b: '10 部', p1m1s: '现场同时在线设备',
      p1m2b: '33 天 / 95 场', p1m2s: '全展期午晚餐零错漏',
      p1m3b: '70,042 份', p1m3s: '6 种餐品准确核对总数',
      p1m4b: '50 至 5 分钟', p1m4s: '每日收工对账用时',
      p1pt1b: '金山表格 AirScript 自动同步',
      p1pt1d: '调用文档脚本接口读取当日报餐表，自动解析红字标注与加换餐备注，消除人工抄表偏差',
      p1pt2b: 'Node.js SSE 多端广播 + FRP HTTPS 穿透',
      p1pt2d: '服务端事件流实时推送余量与流水，超领当场红框拦截，跨品牌换餐自动算平库存',
      p1pt3b: 'LocalStorage 断网暂存 + 拍照存证与导出',
      p1pt3d: '展馆弱网断网自动切本地存储，问题餐券拍照上传留底，一键复制 WPS 结算列或导出 Excel',
      p1Stage: '广交会取餐核对台 · 操作演示',

      p2Meta: '2025.06 – 至今 · 独立全栈开发与运营',
      p2Title: '智慧校园 3.0 活动代预约系统',
      p2Sum: '构建 Python 桌面主控 ⇄ SQLite ⇄ Node.js 网页服务端双端系统，覆盖活动自动抓取、自助批量下单、无浏览器 HTTP 加密直连抢报、空闲账号换位调度与账单图收款，稳定处理 861 笔真实订单。',
      p2m1b: '1,225 场', p2m1s: '自动抓取整理的活动',
      p2m2b: '861 笔', p2m2s: '系统处理的预约订单',
      p2m3b: '38 个', p2m3s: '验证通过的客户账号',
      p2m4b: '216 次', p2m4s: '空闲账号退位与接盘',
      p2TabWeb: '前端下单网站',
      p2TabCon: '后端主控制台',

      p3Meta: '2025.09 – 至今 · 独立开发、加密打包交付与售后升级',
      p3Title: '易班自动化桌面软件',
      p3Sum: '不租云服务器，直接通过云端多维表格 Open API 与设备硬件码实现一机一码授权，打包为双击即装的 Windows 安装包，线上真实售出 89 单、100% 好评零纠纷。',
      p3m1b: '89 单', p3m1s: '线上真实售出记录',
      p3m2b: '¥1,286', p3m2s: '单店软件成交额',
      p3m3b: '100% 好评', p3m3s: '全程 0 纠纷客诉',
      p3m4b: '¥0 / 月', p3m4s: '云端表格零成本授权',
      p3pt1b: '云端多维表格 Open API + HWID 硬件绑定',
      p3pt1d: '采集设备硬件码并对接网络标准校时防止篡改本地时间，搭配发卡页远程管理激活码与封禁',
      p3pt2b: '自动采集可发版块 + 本地 HTTP 接口热同步',
      p3pt2d: '自动抓取账号全部权限版块缓存至本地 JSON；自定义词库保存后实时推送至浏览器执行脚本',
      p3pt3b: 'XOR 内存解密 + PyArmor 与 Inno Setup 双版打包',
      p3pt3d: '核心脚本内存解密注入独立浏览器目录，自动构建内置浏览器完整版与轻巧 Edge 版并支持云端更新检测',
      p3Stage: '易班自动化桌面软件 · 操作演示',

      p4Meta: '2026 · 结合国际商务专业开发的 B2B 出海提效工具',
      p4Title: '外贸视频脚本与多语种询盘工作台',
      p4Sum: '针对工厂产品出海拍短视频与跨时区接询盘的高频环节，把中文产品参数一键拆成英文与西语分镜口播稿，提前锁定外贸专有术语，并同步生成 WhatsApp 秒回消息与标准报价跟进表。',
      p4m1b: '英 / 西双语', p4m1s: '按镜头时长生成口播稿',
      p4m2b: '术语锁定', p4m2s: '防机器直译错翻行业词',
      p4m3b: '秒回模板', p4m3s: 'WhatsApp 与正式报价邮件',
      p4m4b: 'CSV 导表', p4m4s: '一键导出客户跟进台账',
      p4pt1b: '产品参数结构化提炼与配音词数控制',
      p4pt1d: '提取 MOQ、交期、FOB 价格带与清关认证，按 35–40 秒黄金完播时长自动切分 4 段分镜口播词',
      p4pt2b: '国际贸易与技术专有词预锁定',
      p4pt2d: '在生成多语种脚本与字幕前固定 LiFePO4、UN38.3、FOB、OEM 等标准译法，避免外行翻法损耗信任',
      p4pt3b: '跨时区首轮询盘回复与 CSV 台账导出',
      p4pt3d: '结合海外买家具体提问生成带实测视频钩子的 WhatsApp 短消息与邮件报价单，一键导出跟进表格',
      p4Stage: '外贸视频与询盘工作台 · 操作演示',

      trNo: '05 · TRADE & DELIVERY RECORD',
      trTitle: '国际商务成绩、英文获奖与真实成交凭证',
      trLead: '核心专业课均在 90–99 分区间，获全国外语翻译大赛一等奖；独立跑通海外平台 G2G 全英文上架与 Payoneer 跨境收款，国内线上累计真实成交 350 单，综合纠纷率低至 0.35%。',
      ts1b: '99 分', ts1s: '数字贸易平台运营', ts1m: '核心专业课成绩',
      ts2b: '98 分', ts2s: '商务英语', ts2m: '英语四级 + 全国翻译一等奖',
      ts3b: '95 分', ts3s: '海外新媒体营销', ts3m: '熟悉海外内容转化逻辑',
      ts4b: '90 分', ts4s: '国际贸易实务', ts4m: '均分 88.24 · GPA 3.81 / 5.0',

      pl0a_b: '官方教务成绩单高分课程摘录', pl0a_s: '均分 88.24 · 绩点 3.81 · 教务部盖章原件摘录',
      pl0b_b: '广东轻工职业技术大学二等奖学金', pl0b_s: '2024–2025 学年校级荣誉证书原件',
      pl1b: '海外平台 G2G 全英文独立上架首单', pl1s: '订单金额 6.00 USD · 已发货交付完成',
      pl2b: 'Payoneer 官方跨境收款回单', pl2s: '扣佣净入账 5.40 USD · 折合 7,680 KRW',
      pl3b: '客户提建议当天改版获追评', pl3s: '真实软件交付与快速响应口碑',
      pl4b: '100% 真实客户好评', pl4s: '89 单自研工具零差评零纠纷',
      pl5b: '单店成交 261 单', pl5s: '成交额 ¥6,132.24 · 纠纷率 0.5%',
      pl6b: '累计成交 350 单 / ¥7,418.24', pl6s: '自研工具 89 单 + 电商 261 单',
      certT: '第三届全国外语翻译大赛 · 全国一等奖',
      certS: '深圳市翻译协会颁发 · 点击放大查看证书原件',
      pdfT: 'G2G 官方跨境收款单 PDF 原件',
      pdfS: '可直接打开核验海外平台结算明细',
      pdfBtn: '查看收款单 PDF',

      footLead: '可提前全周实习，广州番禺大学城就近到岗，欢迎下载简历或直接联系沟通。',
      footMetaL: '赖怡婷 Yiting Lai · 广东轻工职业技术大学 国际商务'
    },
    en: {
      navP1: '01 Fair',
      navP2: '02 Campus',
      navP3: '03 Desktop',
      navP4: '04 B2B Tool',
      navTrade: '05 Proof',
      navCta: 'Resume',

      heroMeta1: 'Guangdong Polytechnic University · Int’l Business',
      heroMeta2: 'Class of 2027 · Full-Time Available',
      heroMeta3: 'Guangzhou',
      heroTitle: 'Yiting Lai',
      heroRole: 'AI Workflow Tooling × International Business & Global Ops',
      heroSub: 'I turn repetitive operational bottlenecks into reliable web and desktop software with AI, backed by 98 in Business English, a National 1st Prize in Translation, and verified cross-border delivery.',
      btnResume: 'Download Resume PDF',
      btnPhone: 'Copy Phone',
      btnEmail: 'Copy Email',

      qj1t: 'Canton Fair Multi-Device Meal Reconciler',
      qj1s: '10 live devices · 70,042 items verified across 95 sessions with 0 errors',
      qj2t: 'Smart Campus 3.0 Event Booking System',
      qj2s: 'Python + SQLite + Node.js · 1,225 events & 861 real student orders',
      qj3t: 'Yiban Desktop Automation Client',
      qj3s: 'Zero-server cloud table HWID licensing · 89 orders & 100% positive reviews',
      qj4t: 'B2B Video Script & Multilingual Inquiry Studio',
      qj4s: 'Timed EN/ES voiceover shots · Trade glossary lock & fast WhatsApp quotes',
      qjGo: 'Demo',

      vidBtn: 'Full Video',
      prevBtn: 'Live Preview',

      p1Meta: '2026.10 – 2026.11 · Canton Fair Exhibition Services · Outstanding Intern',
      p1Title: 'Canton Fair Multi-Device Meal Reconciler',
      p1Sum: 'Replaced error-prone paper tallies with a real-time mobile web system: auto-reads Kingsoft Cloud sheets and syncs live balances across 10 devices, cutting daily reconciliation from 50 minutes to 5 with zero errors across 95 sessions.',
      p1m1b: '10 Units', p1m1s: 'Concurrent on-site devices',
      p1m2b: '33d / 95 Runs', p1m2s: 'Zero errors across full fair',
      p1m3b: '70,042 Meals', p1m3s: 'Verified across 6 brands',
      p1m4b: '50m → 5m', p1m4s: 'Daily closing reconciliation',
      p1pt1b: 'Kingsoft Sheet AirScript Auto-Sync',
      p1pt1d: 'Pulls daily meal orders via AirScript and parses red-text remarks automatically to eliminate manual transcription errors.',
      p1pt2b: 'Node.js SSE Broadcast + FRP HTTPS Tunnel',
      p1pt2d: 'Streams millisecond inventory updates to all devices, blocks over-claiming in red, and balances cross-brand swaps.',
      p1pt3b: 'LocalStorage Offline Cache + Photo Proof & Excel Export',
      p1pt3d: 'Falls back to local persistence during signal drops, stores photo proof of altered tickets, and exports clean WPS/Excel sheets.',
      p1Stage: 'Canton Fair Reconciler · Interactive Demo',

      p2Meta: '2025.06 – Present · Full-Stack Solo Development & Operations',
      p2Title: 'Smart Campus 3.0 Event Booking System',
      p2Sum: 'Built a dual-end Python desktop controller ⇄ SQLite ⇄ Node.js web server handling event scraping, batch student orders, headless encrypted HTTP sniping, 38-account slot handover, and automated LAN bill image delivery across 861 real orders.',
      p2m1b: '1,225 Events', p2m1s: 'Scraped & structured automatically',
      p2m2b: '861 Orders', p2m2s: 'Processed end-to-end',
      p2m3b: '38 Accounts', p2m3s: 'SMS-verified account pool',
      p2m4b: '216 Swaps', p2m4s: 'Automated idle-account handovers',
      p2TabWeb: 'Student Web Portal',
      p2TabCon: 'Backend Master Console',

      p3Meta: '2025.09 – Present · Commercial Desktop Packaging & Support',
      p3Title: 'Yiban Desktop Automation Software',
      p3Sum: 'Engineered serverless single-device licensing using Cloud Table Open API + hardware ID binding, packaged into one-click Windows installers with 89 real sales and 100% positive ratings.',
      p3m1b: '89 Sales', p3m1s: 'Verified commercial orders',
      p3m2b: '¥1,286', p3m2s: 'Single-product revenue',
      p3m3b: '100% Rating', p3m3s: 'Zero customer disputes',
      p3m4b: '¥0 / mo', p3m4s: 'Serverless cloud licensing',
      p3pt1b: 'Cloud Table Open API + HWID Binding',
      p3pt1d: 'Verifies hardware fingerprint and network time on startup to prevent local clock tampering without renting a server.',
      p3pt2b: 'Auto Board Discovery + Local HTTP Live Sync',
      p3pt2d: 'Caches all permitted posting boards to local JSON and pushes custom phrase updates to the browser script over local HTTP.',
      p3pt3b: 'XOR In-Memory Decryption + PyArmor & Inno Setup',
      p3pt3d: 'Decrypts core scripts in memory inside isolated browser profiles and builds both full and lightweight Edge installers.',
      p3Stage: 'Yiban Desktop Client · Interactive Demo',

      p4Meta: '2026 · B2B Export Workflow Tool Built on Trade Coursework',
      p4Title: 'B2B Video Script & Multilingual Inquiry Studio',
      p4Sum: 'Built for export product videos and cross-timezone buyer follow-ups: structures Chinese factory specs into timed English and Spanish voiceover shots, locks domain trade terms, and drafts instant WhatsApp quotes plus CSV logs.',
      p4m1b: 'EN & ES', p4m1s: 'Timed 4-shot voiceover scripts',
      p4m2b: 'Term Lock', p4m2s: 'Prevents spec mistranslation',
      p4m3b: 'Fast Quote', p4m3s: 'WhatsApp & formal email replies',
      p4m4b: 'CSV Export', p4m4s: 'Standardized buyer lead sheet',
      p4pt1b: 'Structured Buyer Spec Parsing & Pacing Control',
      p4pt1d: 'Extracts MOQ, lead time, FOB range, and certifications into 35–40s 4-scene scripts calibrated for natural voiceover speed.',
      p4pt2b: 'Pre-Translation Trade & Technical Glossary Lock',
      p4pt2d: 'Fixes standard translations for LiFePO4, UN38.3, FOB, and OEM before dubbing or subtitling to preserve buyer trust.',
      p4pt3b: 'Cross-Timezone Inquiry Templates & CSV Lead Log',
      p4pt3d: 'Generates WhatsApp replies with factory test-video hooks and formal quotation emails ready for one-click CSV export.',
      p4Stage: 'B2B Video & Inquiry Studio · Interactive Demo',

      trNo: '05 · TRADE & DELIVERY RECORD',
      trTitle: 'International Business Grades, Translation Award & Sales Proof',
      trLead: 'Scored 90–99 across core trade and English courses, won National 1st Prize in Translation, completed independent all-English export delivery via G2G & Payoneer, and fulfilled 350 online orders at a 0.35% dispute rate.',
      ts1b: '99 / 100', ts1s: 'Digital Trade Operations', ts1m: 'Core major coursework',
      ts2b: '98 / 100', ts2s: 'Business English', ts2m: 'CET-4 + National 1st Prize Translation',
      ts3b: '95 / 100', ts3s: 'Overseas Social Media', ts3m: 'Cross-border content & conversion',
      ts4b: '90 / 100', ts4s: 'Int’l Trade Practice', ts4m: 'Avg 88.24 · GPA 3.81 / 5.0',

      pl0a_b: 'Official Academic Transcript Excerpt', pl0a_s: 'Avg 88.24 · GPA 3.81 · Stamped Core Courses',
      pl0b_b: 'University Second-Class Scholarship', pl0b_s: '2024–2025 Academic Year Official Certificate',
      pl1b: 'G2G Overseas All-English First Order', pl1s: '6.00 USD order · Delivered & completed',
      pl2b: 'Official Payoneer Cross-Border Payout', pl2s: '5.40 USD net settled · 7,680 KRW',
      pl3b: 'Same-Day Update Follow-Up Review', pl3s: 'Fast iteration on user feedback',
      pl4b: '100% Positive Customer Reviews', pl4s: '89 software orders with zero disputes',
      pl5b: '261 Single-Store Orders', pl5s: '¥6,132.24 GMV · 0.5% dispute rate',
      pl6b: '350 Total Orders / ¥7,418.24', pl6s: '89 software sales + 261 e-commerce orders',
      certT: '3rd National Translation Competition · First Prize',
      certS: 'Issued by Shenzhen Translators Association · Tap to zoom',
      pdfT: 'Official G2G Cross-Border Payment Advice PDF',
      pdfS: 'Open original settlement statement in PDF',
      pdfBtn: 'Open Receipt PDF',

      footLead: 'Available full-time near Guangzhou Panyu University Town. Download my resume or reach out directly.',
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
