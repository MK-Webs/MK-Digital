(function () {
  'use strict';

  const LANG_KEY = 'mk_lang';
  const SUPPORTED = ['en', 'zh', 'ja', 'es'];
  const CONTACT_EMAIL = 'rothschild535@gmail.com';

  const T = {
    en: {
      nav: { offer:'Offer', process:'Process', included:'Included', pricing:'Pricing', contact:'Contact', home:'Home', cta:'Get a free preview ↗', open:'Open menu', close:'Close menu', language:'Language' },
      footer: { tagline:'Independent studio · Showcase websites · No ongoing fees', email:'Email' },
      home: {
        metaTitle:'MK Digital — Professional showcase websites',
        metaDesc:'MK Digital builds polished, mobile-first showcase websites for businesses. Free live preview first.',
        kicker:'MK Digital · Independent studio',
        headline:'People check your website',
        headlineAccent:'before they call you.',
        subcopy:'I build clean, mobile-first websites that make small businesses look established, credible and easy to contact — without the bloat of a giant platform.',
        typed1:'clean, professional websites', typed2:'mobile-first experiences', typed3:'high-converting landing pages', typed4:'websites people remember',
        cta:'Get a free preview ↗', pricingCta:'See pricing →',
        meta1:'Free live preview first', meta2:'0 monthly fees', meta3:'Files you own',
        browser:'mkdigital.site', responsive:'Responsive preview', live:'Live concept', starting:'Starting at', liveChip:'Live preview first', phoneStart:'Get started', phoneExplore:'Explore', phoneFeature:'Built for real people.', phoneFeatureSub:'Fast · Clear · Credible',
        nextLabel:'Next step', nextTitle:'See the full service, without the one-page scroll.', nextCopy:'Each important part now has its own focused page, while the navigation stays one click away.', nextCta:'Explore the offer ↗'
      },
      offer: {
        title:'Offer — MK Digital', label:'01 · The offer', heading:'What you get,', accent:'without the fluff.', intro:'A compact, professional website package built around clarity, speed and ownership. No bloated builder stack. No subscription trap.',
        c1:'Mobile-first HTML', d1:'Designed around real phone screens first, then expanded to tablets, laptops and wide displays. Clean code keeps the experience light and dependable.',
        c2:'Free preview first', d2:'You see a working concept before paying. The goal is to make the decision easy: the preview either feels right or you walk away.',
        c3:'No lock-in', d3:'You receive the complete HTML, CSS and JavaScript files. Host them anywhere, hand them to another developer and keep control.',
        c4:'International-ready', d4:'AUD bank transfer is supported, with crypto available for overseas clients: Bitcoin, Ethereum and Solana.',
        ctaTitle:'Ready to make your business look the part?', ctaCopy:'Start with a free preview and decide after you see the direction.', ctaBtn:'Start my preview ↗'
      },
      process: {
        title:'Process — MK Digital', label:'02 · How it works', heading:'Three steps.', accent:'No pressure.', intro:'The process is intentionally simple: understand the business, show a real direction, then decide whether you want to continue.',
        s1:'Tell me about your business', sd1:'Share what you do, who you serve, what matters most and any websites or visual references you like. A few good details are enough to start.',
        s2:'Review a free live mockup', sd2:'I turn the information into a working concept so you can judge the actual visual direction rather than a vague sketch or sales pitch.',
        s3:'Pay only if you are happy', sd3:'If the preview feels right, we finish the project together. If it does not, you can stop there without paying for a site you did not want.',
        ctaTitle:'Good websites should feel easy to buy.', ctaCopy:'That is why the preview comes before the commitment.', ctaBtn:'Request a preview ↗'
      },
      included: {
        title:'Included — MK Digital', label:'03 · Included', heading:'Everything the site', accent:'actually needs.', intro:'The purpose is not to cram in features. It is to make the important things feel considered, useful and easy to use.',
        i1:'Responsive layout', id1:'Carefully spaced experiences across phones, tablets, laptops and wide screens.',
        i2:'Conversion-focused structure', id2:'Strong hierarchy, clear calls to action, trust-building details and an obvious enquiry path.',
        i3:'Search & sharing basics', id3:'Meaningful page titles, descriptions, semantic HTML and social metadata foundations.',
        i4:'Accessible interaction', id4:'Keyboard focus states, reduced-motion support, clear labels and sensible form behaviour.',
        i5:'Easy handover', id5:'Straightforward HTML/CSS/JS files with no platform subscription required.',
        i6:'A site with a point of view', id6:'Typography, spacing, movement and visual details tuned to feel like a real brand, not a template.',
        ctaTitle:'Professional should be the baseline.', ctaCopy:'The design details are where the difference starts to show.', ctaBtn:'Tell me what you need ↗'
      },
      pricing: {
        title:'Pricing — MK Digital', label:'04 · Pricing', heading:'Clear pricing.', accent:'No monthly surprise.', intro:'The current showcase website range is intentionally simple, with scope negotiated before work starts.',
        showcase:'Showcase website', price:'$250–$450', currency:'AUD · approximately ¥1,150–¥2,100 CNY', b1:'The finished HTML files are yours to keep', b2:'No monthly platform fees or subscriptions', b3:'AUD bank transfer accepted', b4:'Bitcoin, Ethereum and Solana available for overseas clients', why:'Why this range?', whyCopy:'I am currently building a portfolio of strong, real client projects, so the pricing sits below a typical agency engagement while keeping the same focus on polish and usability.', closing:'A clean website is often one of the first signals a potential customer uses to decide whether a business feels credible.', pricingBtn:'Get a free preview ↗', qLabel:'Questions', qTitle:'Before you ask',
        q1:'Do I need to buy a domain or hosting separately?', a1:'Yes. The website itself is separate from your domain and hosting. Those are inexpensive ongoing services, and I can point you in the right direction.',
        q2:'What if I do not like the free preview?', a2:'Then we stop there. No charge and no obligation. The preview exists so you only pay for something you actually want.',
        q3:'Can I get extra pages or more languages?', a3:'Yes. Both are possible. Additional scope is quoted before work starts so there are no surprises.',
        q4:'How do international clients pay?', a4:'AUD bank transfer is supported, and overseas clients can use Bitcoin, Ethereum or Solana.',
        ctaTitle:'Prefer to see something real first?', ctaCopy:'That is exactly what the free preview is for.', ctaBtn:'Request preview ↗'
      },
      contact: {
        title:'Contact — MK Digital', label:'05 · Get in touch', heading:'Tell me about your', accent:'business.', intro:'Share a few details and I will use them to shape a free preview concept for you.',
        start:'Start here', cardTitle:'A real preview before a real commitment.', p1:'The first step is simply understanding what you do and who you want to reach. You do not need to write a perfect brief.', p2:'Tell me what matters, what you want the website to achieve, and anything you already know about the style you want.', email:'Or email directly:', name:'Name', emailField:'Email', business:'Business name', optional:'(optional)', budget:'Approximate budget', choose:'Select a range', message:'Message', placeholder:'What does your business do, who are your customers, and what should the website achieve?', submit:'Send message ↗', note:'Your details are only used to reply to this enquiry. No mailing list or sales sequence.', sending:'Sending…', budget1:'$250–$450 AUD', budget2:'$450–$800 AUD', budget3:'$800+ AUD', budget4:'Not sure yet', success:'Message sent. I’ll get back to you at the email you provided.', error:'Could not send automatically. Opening your email app instead.', thanks:'Thanks — I’ll be in touch.'
      }
    },
    zh: {
      nav: { offer:'服务', process:'流程', included:'包含', pricing:'价格', contact:'联系', home:'首页', cta:'获取免费预览 ↗', open:'打开菜单', close:'关闭菜单', language:'语言' },
      footer: { tagline:'独立工作室 · 展示型网站 · 无持续月费', email:'邮箱' },
      home: { metaTitle:'MK Digital — 专业展示型网站', metaDesc:'MK Digital 为企业打造精致、移动优先的展示型网站，并提供免费实时预览。', kicker:'MK Digital · 独立工作室', headline:'客户联系你之前，会先看你的网站', headlineAccent:'然后才会联系你。', subcopy:'我制作简洁、移动优先的网站，让小企业显得更成熟、更可信、更容易联系，而且不需要臃肿的平台。', typed1:'简洁专业的网站', typed2:'移动优先的体验', typed3:'高转化落地页', typed4:'让人记住的网站', cta:'获取免费预览 ↗', pricingCta:'查看价格 →', meta1:'先免费实时预览', meta2:'0 月费', meta3:'文件归你所有', browser:'mkdigital.site', responsive:'响应式预览', live:'实时概念', starting:'起价', liveChip:'先看实时预览', phoneStart:'开始', phoneExplore:'探索', phoneFeature:'为真实用户而设计。', phoneFeatureSub:'快速 · 清晰 · 可信', nextLabel:'下一步', nextTitle:'查看完整服务，不必再在一张长页面里滚动。', nextCopy:'每个重要部分都有独立页面，同时导航始终一步可达。', nextCta:'查看服务内容 ↗' },
      offer: { title:'服务 — MK Digital', label:'01 · 服务内容', heading:'你将获得', accent:'真正重要的东西。', intro:'一套围绕清晰、速度与所有权打造的专业网站方案。没有臃肿建站工具，也没有订阅陷阱。', c1:'移动优先 HTML', d1:'先围绕真实手机屏幕设计，再扩展到平板、笔记本和大屏。干净的代码让体验轻快而可靠。', c2:'先看免费预览', d2:'付款前先看到可工作的概念版本。预览合适就继续，不合适就停止。', c3:'无绑定', d3:'完整交付 HTML、CSS 和 JavaScript 文件，可自行托管，也可交给其他开发者维护。', c4:'支持国际客户', d4:'支持澳元银行转账，海外客户也可使用比特币、以太坊和 Solana。', ctaTitle:'准备让你的企业看起来更专业了吗？', ctaCopy:'先免费查看预览，再决定是否继续。', ctaBtn:'开始我的预览 ↗' },
      process: { title:'流程 — MK Digital', label:'02 · 工作流程', heading:'三个步骤。', accent:'没有压力。', intro:'流程保持简单：了解业务、展示方向，然后再决定是否继续。', s1:'告诉我你的业务', sd1:'告诉我你做什么、服务谁、最重要的重点，以及喜欢的网站或视觉参考。几条有用的信息就够开始。', s2:'查看免费实时预览', sd2:'我会把信息转化为可工作的概念，让你看到真实的视觉方向，而不是模糊的草图。', s3:'满意后再付款', sd3:'如果预览符合期待，我们一起完成；如果不合适，可以直接停止，不必为不想要的网站付费。', ctaTitle:'好的网站应该让购买感觉很简单。', ctaCopy:'所以预览总是在承诺之前。', ctaBtn:'申请预览 ↗' },
      included: { title:'包含内容 — MK Digital', label:'03 · 包含', heading:'网站真正需要的', accent:'全部细节。', intro:'目的不是堆砌功能，而是让重要的部分都经过认真考虑，真正有用、易用。', i1:'响应式布局', id1:'在手机、平板、笔记本和大屏上都保持舒适间距。', i2:'以转化为导向的结构', id2:'清晰层级、明确 CTA、建立信任的信息和直接的咨询路径。', i3:'搜索与分享基础', id3:'有意义的页面标题、描述、语义化 HTML 和社交分享基础。', i4:'无障碍交互', id4:'键盘焦点、减少动画支持、清晰标签和合理的表单行为。', i5:'轻松交付', id5:'直接交付 HTML/CSS/JS 文件，无需平台订阅。', i6:'真正有品牌感的设计', id6:'字体、间距、动效与视觉细节经过统一调整，不像模板。', ctaTitle:'专业应该只是起点。', ctaCopy:'真正拉开差距的，是设计细节。', ctaBtn:'告诉我你的需求 ↗' },
      pricing: { title:'价格 — MK Digital', label:'04 · 价格', heading:'价格清晰。', accent:'没有月费惊喜。', intro:'目前展示型网站的价格区间保持简单，具体范围会在开始前确认。', showcase:'展示型网站', price:'$250–$450', currency:'澳元 · 约合 ¥1,150–¥2,100 CNY', b1:'完整 HTML 文件归你所有', b2:'没有平台月费或订阅', b3:'支持澳元银行转账', b4:'海外客户可使用比特币、以太坊或 Solana', why:'为什么是这个价格区间？', whyCopy:'我目前正在积累优秀的真实项目作品，因此价格低于典型代理机构项目，同时仍保持对品质和易用性的重视。', closing:'干净、专业的网站往往是潜在客户判断一家企业是否可信的第一个信号。', pricingBtn:'获取免费预览 ↗', qLabel:'常见问题', qTitle:'你可能想先了解', q1:'域名或主机需要单独购买吗？', a1:'需要。网站制作与域名、主机是分开的，它们是价格不高的持续服务。我也可以为你提供方向建议。', q2:'如果我不喜欢免费预览怎么办？', a2:'那就停止。没有费用，也没有义务。免费预览的目的就是让你只为真正想要的内容付款。', q3:'可以增加页面或更多语言吗？', a3:'可以。两者都能实现，额外范围会在开始前报价。', q4:'海外客户如何付款？', a4:'澳元支持银行转账，海外客户也可使用比特币、以太坊或 Solana。', ctaTitle:'想先看一个真实版本？', ctaCopy:'免费预览就是为这个目的准备的。', ctaBtn:'申请预览 ↗' },
      contact: { title:'联系 — MK Digital', label:'05 · 联系我', heading:'告诉我你的', accent:'业务。', intro:'分享一些信息，我会根据这些内容为你规划免费的预览概念。', start:'从这里开始', cardTitle:'先看真实预览，再决定是否继续。', p1:'第一步只是了解你做什么、想触达谁。不需要写完美的需求文档。', p2:'告诉我最重要的事情、网站想达成什么，以及你已经知道的风格方向。', email:'或直接发邮件：', name:'姓名', emailField:'邮箱', business:'企业名称', optional:'（选填）', budget:'大致预算', choose:'选择范围', message:'留言', placeholder:'你的企业做什么、客户是谁，以及网站需要实现什么？', submit:'发送消息 ↗', note:'你的信息只用于回复本次咨询，不会加入营销邮件列表。', sending:'发送中……', budget1:'$250–$450 澳元', budget2:'$450–$800 澳元', budget3:'$800+ 澳元', budget4:'还不确定', success:'消息已发送。我会通过你提供的邮箱与你联系。', error:'无法自动发送，正在打开你的邮件应用。', thanks:'谢谢，我会尽快联系你。' }
    },
    ja: {
      nav: { offer:'サービス', process:'進め方', included:'含まれる内容', pricing:'料金', contact:'お問い合わせ', home:'ホーム', cta:'無料プレビュー ↗', open:'メニューを開く', close:'メニューを閉じる', language:'言語' },
      footer: { tagline:'独立系スタジオ · ショーケースサイト · 継続月額なし', email:'メール' },
      home: { metaTitle:'MK Digital — プロフェッショナルなショーケースサイト', metaDesc:'MK Digital は、洗練されたモバイルファーストのショーケースサイトを制作します。まず無料ライブプレビュー。', kicker:'MK Digital · 独立系スタジオ', headline:'お客様は連絡する前に、まずあなたのウェブサイトを見ます', headlineAccent:'そして連絡します。', subcopy:'小さな企業でも、より確立された印象、信頼感、連絡のしやすさを持てるように、シンプルでモバイルファーストなサイトを制作しています。', typed1:'クリーンでプロフェッショナルなサイト', typed2:'モバイルファーストの体験', typed3:'成果につながるランディングページ', typed4:'記憶に残るウェブサイト', cta:'無料プレビューを依頼 ↗', pricingCta:'料金を見る →', meta1:'まず無料ライブプレビュー', meta2:'月額費用 0', meta3:'ファイルはお客様のもの', browser:'mkdigital.site', responsive:'レスポンシブプレビュー', live:'ライブコンセプト', starting:'開始価格', liveChip:'まずライブプレビュー', nextLabel:'次のステップ', nextTitle:'長い1ページをスクロールせず、サービスを分けて確認できます。', nextCopy:'重要な内容をそれぞれ独立ページにし、ナビゲーションから1クリックで移動できます。', nextCta:'サービスを見る ↗' },
      offer: { title:'サービス — MK Digital', label:'01 · サービス', heading:'受け取るものを', accent:'シンプルに。', intro:'明確さ、速度、所有権を中心に設計したプロフェッショナルなサイト制作。重いビルダーもサブスク縛りもありません。', c1:'モバイルファーストHTML', d1:'まず実際のスマートフォン画面を基準に設計し、タブレットやPCへ展開します。', c2:'まず無料プレビュー', d2:'支払い前に動作するコンセプトを確認。方向性が合えば続け、合わなければ終了できます。', c3:'縛りなし', d3:'HTML、CSS、JavaScriptのファイル一式をお渡しします。どこでもホスティングできます。', c4:'海外対応', d4:'豪ドル銀行振込に加え、海外のお客様はBitcoin、Ethereum、Solanaをご利用いただけます。', ctaTitle:'ビジネスにふさわしい見た目を作りませんか？', ctaCopy:'まず無料プレビューを見てから決めてください。', ctaBtn:'プレビューを始める ↗' },
      process: { title:'進め方 — MK Digital', label:'02 · 進め方', heading:'3つのステップ。', accent:'プレッシャーなし。', intro:'事業を理解し、方向性を見せ、その後に続けるかを決めるシンプルな流れです。', s1:'事業内容を教える', sd1:'何をしているか、誰に届けるか、大切なこと、参考サイトなどを共有してください。', s2:'無料ライブプレビューを確認', sd2:'情報を実際に動くコンセプトへ変換し、曖昧なスケッチではなく本当の方向性をご覧いただきます。', s3:'満足した場合のみ支払い', sd3:'方向性が合えば一緒に完成させ、合わなければ費用なしで終了できます。', ctaTitle:'良いサイトは、購入するのも簡単に感じるべきです。', ctaCopy:'だからこそ、プレビューが先です。', ctaBtn:'プレビューを依頼 ↗' },
      included: { title:'含まれる内容 — MK Digital', label:'03 · 含まれる内容', heading:'サイトに本当に必要な', accent:'すべて。', intro:'機能を詰め込むのではなく、大切な部分を丁寧に、使いやすく仕上げます。', i1:'レスポンシブ設計', id1:'スマートフォン、タブレット、ノートPC、ワイド画面まで快適に。', i2:'コンバージョン重視の構成', id2:'明確な階層、CTA、信頼情報、問い合わせ導線。', i3:'検索・共有の基本', id3:'ページタイトル、説明、セマンティックHTML、SNS共有の基礎。', i4:'アクセシブルな操作', id4:'キーボード操作、動きの軽減、明確なラベル、分かりやすいフォーム。', i5:'簡単な引き渡し', id5:'HTML/CSS/JS一式をそのまま納品し、プラットフォーム契約は不要。', i6:'ブランドらしいデザイン', id6:'書体、余白、動き、細部まで整え、テンプレート感をなくします。', ctaTitle:'プロフェッショナルは最低ライン。', ctaCopy:'差が出るのは細部のデザインです。', ctaBtn:'必要な内容を伝える ↗' },
      pricing: { title:'料金 — MK Digital', label:'04 · 料金', heading:'料金は明確に。', accent:'月額サプライズなし。', intro:'ショーケースサイトの料金帯はシンプルに設定し、開始前に内容と範囲を確認します。', showcase:'ショーケースサイト', price:'$250–$450', currency:'AUD · 約 ¥1,150–¥2,100 CNY', b1:'完成したHTMLファイルはお客様のもの', b2:'月額のプラットフォーム費用なし', b3:'豪ドル銀行振込に対応', b4:'海外のお客様はBitcoin、Ethereum、Solanaも利用可能', why:'なぜこの価格帯？', whyCopy:'現在、実績となる本格的な案件を増やしているため、一般的な制作会社より低い価格で、品質と使いやすさは妥協しません。', closing:'クリーンなサイトは、見込み客がそのビジネスを信頼できるか判断する最初のサインになることがよくあります。', pricingBtn:'無料プレビューを依頼 ↗', qLabel:'質問', qTitle:'お問い合わせの前に', q1:'ドメインやホスティングは別途必要ですか？', a1:'はい。サイト制作とは別にドメインとホスティングが必要です。比較的安価で、選び方もご案内できます。', q2:'無料プレビューが気に入らなかったら？', a2:'そこで終了できます。費用も義務もありません。', q3:'ページ追加や多言語対応はできますか？', a3:'はい。どちらも可能です。追加範囲は開始前に見積もります。', q4:'海外のお客様はどう支払いますか？', a4:'豪ドルは銀行振込、海外のお客様はBitcoin、Ethereum、Solanaにも対応しています。', ctaTitle:'まず実際のものを見たい？', ctaCopy:'そのための無料プレビューです。', ctaBtn:'プレビューを依頼 ↗' },
      contact: { title:'お問い合わせ — MK Digital', label:'05 · お問い合わせ', heading:'事業内容を', accent:'教えてください。', intro:'簡単な情報を共有いただければ、無料プレビューの方向性を組み立てます。', start:'ここから開始', cardTitle:'本気の契約の前に、まず本物のプレビューを。', p1:'最初は何をしているか、誰に届けたいかを理解するだけです。完璧な依頼書は必要ありません。', p2:'大切なこと、サイトで達成したいこと、希望するスタイルなどを教えてください。', email:'または直接メール：', name:'お名前', emailField:'メールアドレス', business:'事業者名', optional:'（任意）', budget:'おおよその予算', choose:'範囲を選択', message:'メッセージ', placeholder:'事業内容、顧客、ウェブサイトで達成したいことを教えてください。', submit:'送信する ↗', note:'入力情報はこのお問い合わせへの返信のみに使用し、マーケティングリストには追加しません。', sending:'送信中……', budget1:'$250–$450 AUD', budget2:'$450–$800 AUD', budget3:'$800+ AUD', budget4:'未定', success:'送信しました。入力いただいたメールアドレスへご連絡します。', error:'自動送信できないため、メールアプリを開きます。', thanks:'ありがとうございます。ご連絡します。' }
    },
    es: {
      nav: { offer:'Servicio', process:'Proceso', included:'Incluido', pricing:'Precio', contact:'Contacto', home:'Inicio', cta:'Solicitar vista previa ↗', open:'Abrir menú', close:'Cerrar menú', language:'Idioma' },
      footer: { tagline:'Estudio independiente · Sitios de presentación · Sin cuotas mensuales', email:'Email' },
      home: { metaTitle:'MK Digital — Sitios web profesionales', metaDesc:'MK Digital crea sitios web de presentación pulidos y optimizados para móvil. Primero, vista previa en vivo gratis.', kicker:'MK Digital · Estudio independiente', headline:'Antes de llamarte, revisan tu sitio web', headlineAccent:'y luego te contactan.', subcopy:'Creo sitios web limpios y pensados para móvil que hacen que pequeños negocios se vean establecidos, creíbles y fáciles de contactar, sin la carga de una plataforma gigante.', typed1:'sitios web limpios y profesionales', typed2:'experiencias mobile-first', typed3:'landing pages de alta conversión', typed4:'sitios que la gente recuerda', cta:'Solicitar vista previa gratis ↗', pricingCta:'Ver precios →', meta1:'Vista previa en vivo gratis', meta2:'0 cuotas mensuales', meta3:'Archivos de tu propiedad', browser:'mkdigital.site', responsive:'Vista previa responsive', live:'Concepto en vivo', starting:'Desde', liveChip:'Primero, vista previa', phoneStart:'Empezar', phoneExplore:'Explorar', phoneFeature:'Hecho para personas reales.', phoneFeatureSub:'Rápido · Claro · Creíble', nextLabel:'Siguiente paso', nextTitle:'Explora todo el servicio sin una sola página interminable.', nextCopy:'Cada parte importante tiene ahora su propia página, mientras la navegación sigue a un clic.', nextCta:'Explorar el servicio ↗' },
      offer: { title:'Servicio — MK Digital', label:'01 · El servicio', heading:'Lo que recibes,', accent:'sin relleno.', intro:'Un paquete web profesional y compacto centrado en claridad, velocidad y propiedad. Sin constructores pesados ni trampas de suscripción.', c1:'HTML pensado para móvil', d1:'Diseñado primero alrededor de pantallas reales de teléfono y luego ampliado a tablets, portátiles y pantallas grandes.', c2:'Vista previa gratis primero', d2:'Ves un concepto funcional antes de pagar. Si se siente bien, seguimos; si no, puedes parar.', c3:'Sin ataduras', d3:'Recibes todos los archivos HTML, CSS y JavaScript. Aloja donde quieras y mantén el control.', c4:'Preparado para clientes internacionales', d4:'Transferencia bancaria en AUD y, para clientes internacionales, Bitcoin, Ethereum y Solana.', ctaTitle:'¿Listo para que tu negocio esté a la altura?', ctaCopy:'Empieza con una vista previa gratis y decide después.', ctaBtn:'Empezar mi vista previa ↗' },
      process: { title:'Proceso — MK Digital', label:'02 · Cómo funciona', heading:'Tres pasos.', accent:'Sin presión.', intro:'Entender el negocio, mostrar una dirección real y después decidir si quieres continuar.', s1:'Cuéntame sobre tu negocio', sd1:'Comparte qué haces, a quién sirves, qué importa más y cualquier referencia visual que te guste.', s2:'Revisa una maqueta en vivo', sd2:'Convierto la información en un concepto funcional para que juzgues la dirección real.', s3:'Pagas solo si estás conforme', sd3:'Si la vista previa funciona para ti, terminamos juntos. Si no, no pagas por algo que no quieres.', ctaTitle:'Los buenos sitios deberían sentirse fáciles de comprar.', ctaCopy:'Por eso la vista previa viene antes del compromiso.', ctaBtn:'Solicitar vista previa ↗' },
      included: { title:'Incluido — MK Digital', label:'03 · Incluido', heading:'Todo lo que el sitio', accent:'realmente necesita.', intro:'No se trata de acumular funciones, sino de hacer que las partes importantes sean útiles, claras y fáciles de usar.', i1:'Diseño responsive', id1:'Espaciado cuidado en móviles, tablets, portátiles y pantallas grandes.', i2:'Estructura enfocada en conversión', id2:'Jerarquía clara, CTA, señales de confianza y un camino evidente para contactar.', i3:'Bases de búsqueda y compartir', id3:'Títulos, descripciones, HTML semántico y fundamentos para compartir en redes.', i4:'Interacción accesible', id4:'Foco de teclado, soporte de movimiento reducido, etiquetas claras y formularios sensatos.', i5:'Entrega sencilla', id5:'HTML/CSS/JS directos, sin suscripción de plataforma.', i6:'Diseño con personalidad', id6:'Tipografía, espacio, movimiento y detalles ajustados para que no parezca una plantilla.', ctaTitle:'Lo profesional debería ser el punto de partida.', ctaCopy:'La diferencia empieza en los detalles.', ctaBtn:'Cuéntame qué necesitas ↗' },
      pricing: { title:'Precio — MK Digital', label:'04 · Precio', heading:'Precio claro.', accent:'Sin sorpresas mensuales.', intro:'El rango actual para un sitio de presentación es sencillo y se acuerda el alcance antes de empezar.', showcase:'Sitio de presentación', price:'$250–$450', currency:'AUD · aproximadamente ¥1.150–¥2.100 CNY', b1:'Los archivos HTML terminados son tuyos', b2:'Sin cuotas mensuales de plataforma', b3:'Transferencia bancaria en AUD', b4:'Bitcoin, Ethereum y Solana para clientes internacionales', why:'¿Por qué este rango?', whyCopy:'Estoy construyendo un portafolio de proyectos reales y sólidos, por eso el precio está por debajo de una agencia típica sin sacrificar detalle ni usabilidad.', closing:'Un sitio limpio suele ser una de las primeras señales que usa un posible cliente para decidir si un negocio parece creíble.', pricingBtn:'Solicitar vista previa gratis ↗', qLabel:'Preguntas', qTitle:'Antes de escribir', q1:'¿Necesito comprar dominio y hosting aparte?', a1:'Sí. El sitio es independiente del dominio y hosting. Son servicios continuos económicos y puedo orientarte.', q2:'¿Y si no me gusta la vista previa?', a2:'Nos detenemos ahí. Sin cargo y sin compromiso.', q3:'¿Puedo añadir páginas o más idiomas?', a3:'Sí. Ambos son posibles y se cotizan antes de comenzar.', q4:'¿Cómo pagan los clientes internacionales?', a4:'Transferencia bancaria para AUD y Bitcoin, Ethereum o Solana para clientes internacionales.', ctaTitle:'¿Prefieres ver algo real primero?', ctaCopy:'Para eso existe la vista previa gratuita.', ctaBtn:'Solicitar vista previa ↗' },
      contact: { title:'Contacto — MK Digital', label:'05 · Hablemos', heading:'Cuéntame sobre tu', accent:'negocio.', intro:'Comparte algunos datos y usaré esa información para preparar una vista previa gratuita.', start:'Empieza aquí', cardTitle:'Una vista previa real antes de un compromiso real.', p1:'El primer paso es entender qué haces y a quién quieres llegar. No necesitas redactar un brief perfecto.', p2:'Cuéntame qué importa, qué quieres lograr con el sitio y cualquier idea visual que ya tengas.', email:'O escribe directamente:', name:'Nombre', emailField:'Correo electrónico', business:'Nombre del negocio', optional:'(opcional)', budget:'Presupuesto aproximado', choose:'Selecciona un rango', message:'Mensaje', placeholder:'¿Qué hace tu negocio, quiénes son tus clientes y qué debería lograr el sitio?', submit:'Enviar mensaje ↗', note:'Tus datos se usan solo para responder a esta consulta. No se añaden a una lista de marketing.', sending:'Enviando…', budget1:'$250–$450 AUD', budget2:'$450–$800 AUD', budget3:'$800+ AUD', budget4:'Aún no lo sé', success:'Mensaje enviado. Te responderé al correo que indicaste.', error:'No se pudo enviar automáticamente. Abriendo tu aplicación de correo.', thanks:'Gracias. Me pondré en contacto contigo.' }
    }
  };

  const page = document.body.getAttribute('data-page') || 'home';

  function getStoredLanguage() {
    try {
      const stored = localStorage.getItem(LANG_KEY);
      if (SUPPORTED.includes(stored)) return stored;
    } catch (_) {}
    return 'en';
  }

  let currentLang = getStoredLanguage();

  function get(obj, path) {
    return path.split('.').reduce((acc, key) => acc && acc[key], obj);
  }

  function setMeta(lang) {
    const table = T[lang][page] || T.en[page];
    if (!table) return;
    if (table.metaTitle) document.title = table.metaTitle;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && table.metaDesc) desc.setAttribute('content', table.metaDesc);
  }

  function applyLanguage(lang) {
    if (!SUPPORTED.includes(lang)) lang = 'en';
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      const value = get(T[lang], key) ?? get(T.en, key);
      if (typeof value === 'string') el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.getAttribute('data-i18n-placeholder');
      const value = get(T[lang], key) ?? get(T.en, key);
      if (typeof value === 'string') el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('[data-lang-select]').forEach((select) => { select.value = lang; select.setAttribute('aria-label', get(T[lang], 'nav.language')); });

    setMeta(lang);
    try { localStorage.setItem(LANG_KEY, lang); } catch (_) {}
    updateMenuLabel();
    updateTypingLanguage();
  }

  document.querySelectorAll('[data-lang-select]').forEach((select) => {
    select.addEventListener('change', () => applyLanguage(select.value));
  });

  function updateMenuLabel() {
    const toggle = document.querySelector('[data-menu-toggle]');
    if (!toggle) return;
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-label', open ? get(T[currentLang], 'nav.close') : get(T[currentLang], 'nav.open'));
  }

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!open));
      mobileMenu.classList.toggle('open', !open);
      updateMenuLabel();
    });
    mobileMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      menuToggle.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      updateMenuLabel();
    }));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('open');
        updateMenuLabel();
        menuToggle.focus();
      }
    });
  }

  const nav = document.querySelector('.nav-shell');
  if (nav) {
    const update = () => nav.classList.toggle('is-scrolled', window.scrollY > 18);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  const roleEl = document.querySelector('[data-typed]');
  const caret = document.querySelector('[data-typed-caret]');
  let typingTimer = null;
  let roleIndex = 0, charIndex = 0, deleting = false;
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function rolesForLanguage(lang) {
    const h = T[lang].home || T.en.home;
    return [h.typed1, h.typed2, h.typed3, h.typed4];
  }

  function updateTypingLanguage() {
    if (!roleEl) return;
    roleIndex = 0; charIndex = 0; deleting = false;
    if (typingTimer) clearTimeout(typingTimer);
    typeRole();
  }

  function typeRole() {
    if (!roleEl) return;
    const roles = rolesForLanguage(currentLang);
    if (reduce) {
      roleEl.textContent = roles[0] || '';
      if (caret) caret.style.opacity = '.5';
      return;
    }
    const text = roles[roleIndex] || '';
    roleEl.textContent = text.slice(0, charIndex);
    if (!deleting && charIndex < text.length) {
      charIndex += 1; typingTimer = setTimeout(typeRole, 48); return;
    }
    if (!deleting && charIndex === text.length) {
      deleting = true; typingTimer = setTimeout(typeRole, 1500); return;
    }
    if (deleting && charIndex > 0) {
      charIndex -= 1; typingTimer = setTimeout(typeRole, 24); return;
    }
    deleting = false; roleIndex = (roleIndex + 1) % roles.length; typingTimer = setTimeout(typeRole, 300);
  }

  const glow = document.querySelector('.cursor-glow');
  const fine = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (glow && fine && !reduce) {
    let x = innerWidth / 2, y = innerHeight / 2;
    let tx = x, ty = y;
    let raf = 0;
    let active = false;
    let lastTime = performance.now();

    const paint = (now) => {
      raf = 0;
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;
      const alpha = 1 - Math.exp(-28 * dt);
      x += (tx - x) * alpha;
      y += (ty - y) * alpha;
      glow.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      if (active && (Math.abs(tx - x) > 0.05 || Math.abs(ty - y) > 0.05)) {
        raf = requestAnimationFrame(paint);
      }
    };

    document.addEventListener('pointermove', (event) => {
      tx = event.clientX;
      ty = event.clientY;
      active = true;
      glow.style.opacity = '1';
      if (!raf) {
        lastTime = performance.now();
        raf = requestAnimationFrame(paint);
      }
    }, { passive: true });

    window.addEventListener('blur', () => {
      active = false;
      glow.style.opacity = '0';
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
    });
  }

  const tilt = document.querySelector('[data-tilt]');
  if (tilt && fine && !reduce) {
    let tiltRect = null;
    const refreshTiltRect = () => { tiltRect = tilt.getBoundingClientRect(); };
    tilt.addEventListener('pointerenter', refreshTiltRect, { passive: true });
    window.addEventListener('resize', refreshTiltRect, { passive: true });
    tilt.addEventListener('pointermove', (event) => {
      if (!tiltRect) refreshTiltRect();
      const px = (event.clientX - tiltRect.left) / tiltRect.width;
      const py = (event.clientY - tiltRect.top) / tiltRect.height;
      const rx = (0.5 - py) * 4;
      const ry = (px - 0.5) * 4;
      tilt.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    }, { passive: true });
    tilt.addEventListener('pointerleave', () => { tilt.style.transform=''; tiltRect=null; });
  }

  // Stop decorative animation work when the page is not visible.
  const setVisibilityState = () => {
    document.documentElement.classList.toggle('mk-tab-hidden', document.hidden);
  };
  document.addEventListener('visibilitychange', setVisibilityState);
  setVisibilityState();

  // Adaptive safety net. Only activates after sustained low frame rate,
  // preserving the full visual treatment on capable devices.
  let perfFrames = 0;
  let perfStart = performance.now();
  let perfCooldownUntil = 0;
  const perfProbe = (now) => {
    if (!document.hidden) {
      perfFrames += 1;
      const elapsed = now - perfStart;
      if (elapsed >= 1600) {
        const fps = (perfFrames * 1000) / elapsed;
        if (fps < 48 && now > perfCooldownUntil) {
          document.documentElement.classList.add('mk-performance-lite');
          perfCooldownUntil = now + 15000;
        }
        perfFrames = 0;
        perfStart = now;
      }
    }
    requestAnimationFrame(perfProbe);
  };
  requestAnimationFrame(perfProbe);

  document.querySelectorAll('.reveal').forEach((el, i) => { el.style.transitionDelay = `${Math.min(i * 35, 280)}ms`; });
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    }), { threshold: .08 });
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
  } else document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));

  const form = document.querySelector('#contact-form');
  if (form) {
    const status = document.querySelector('#form-status');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const fields = {
        name: form.elements.name.value.trim(),
        email: form.elements.email.value.trim(),
        business: form.elements.business.value.trim(),
        budget: form.elements.budget.value,
        message: form.elements.message.value.trim(),
        honey: form.elements._honey.value
      };
      const setStatus = (text, cls='') => { if(status){ status.textContent=text; status.className='form-status '+cls; }};
      if (fields.honey) { form.reset(); setStatus(get(T[currentLang], 'contact.success'), 'success'); return; }
      const btn = form.querySelector('button[type="submit"]');
      if(btn) btn.disabled=true;
      setStatus(get(T[currentLang], 'contact.sending'));
      const payload = { ...fields, business_name: fields.business, _subject:'MK Digital - new website enquiry', _captcha:'false' };
      delete payload.honey;
      fetch('https://formsubmit.co/ajax/'+CONTACT_EMAIL, { method:'POST', headers:{'Content-Type':'application/json','Accept':'application/json'}, body:JSON.stringify(payload) })
        .then((r)=>{ if(!r.ok) throw new Error('Request failed'); return r.json().catch(()=>({})); })
        .then(()=>{ form.reset(); if(btn) btn.disabled=false; setStatus(get(T[currentLang],'contact.success'),'success'); })
        .catch(()=>{
          if(btn) btn.disabled=false;
          setStatus(get(T[currentLang],'contact.error'),'error');
          const subject=encodeURIComponent('MK Digital - new website enquiry');
          const body=encodeURIComponent('Name: '+fields.name+'\nEmail: '+fields.email+'\nBusiness: '+fields.business+'\nBudget: '+fields.budget+'\nLanguage: '+currentLang+'\n\n'+fields.message);
          window.location.href='mailto:'+CONTACT_EMAIL+'?subject='+subject+'&body='+body;
        });
    });
  }

  applyLanguage(currentLang);

  const year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
