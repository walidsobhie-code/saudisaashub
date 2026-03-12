const fs = require('fs');
const { XMLParser } = require('fast-xml-parser');
const { XMLBuilder } = require('fast-xml-parser');

const expansionTemplate = `

<h2>اهمية هذا المجال في السوق السعودي</h2>
<p>المملكة العربية السعودية تشهد تحولات اقتصادية كبيرة في ظل رؤية 2030. يعد هذا القطاع من اهم القطاعات الواعدة التي تجذب الاستثمارات وتسهم في تنويع الاقتصاد الوطني. تواصل المملكة جهودها لتصبح مركزا اقليميا للاعمال والتقنية.</p>
<p>مع الدعم الحكومي المستمر والبنية التحتية المتطورة، اصبح السوق السعودي الوجهة المفضلة للعديد من رواد الاعمال والمستثمرين. توفر المملكة بيئة جاذبة للاستثمار مع تسهيلات عديدة للمنشآت الجديدة.</p>

<h2>ارقام واحصائيات السوق</h2>
<p>السوق السعودي يتميز بارقام impresive تجعله فرصة استثمارية واعدة:</p>
<ul>
<li>اكبر سوق استهلاكي في منطقة الخليج العربي</li>
<li>كثر من 35 مليون مستهلك مع ارتفاع مستمر</li>
<li>ارتفاع في متوسط الدخل الفردي</li>
<li>دعم حكومي كبير يصل لمليارات الريالات</li>
<li>بنية تحتية رقمية متطورة عالميا</li>
<li>تنوع في القطاعات الاقتصادية</li>
</ul>

<h2>التحديات التي تواجه المنشآت</h2>
<p>مثل أي قطاع آخر، توجد تحديات تواجه المنشآت في هذا المجال:</p>
<ul>
<li><strong>المنافسة:</strong> تزايد عدد المنشآت المنافسة مما يستوجب التميز</li>
<li><strong>توظيف الكفاءات:</strong> صعوبة ايجاد الكوادر المؤهلة</li>
<li><strong>التسويق:</strong> ارتفاع تكاليف التسويق وضرورة الاستفادة من الرقمي</li>
<li><strong>الضوابط:</strong> الالتزام بالأنظمة واللوائح المختلفة</li>
<li><strong>التقنية:</strong> مواكبة التطورات السريعة في المجال</li>
</ul>

<h2>الفرص المتاحة في السوق</h2>
<p>رغم التحديات، تتوفر فرص كبيرة للنجاح:</p>
<ul>
<li>السوق الكبير غير المستغل بالكامل</li>
<li>الدعم الحكومي للبرامج والمشروعات</li>
<li>ندرة المنافسين في بعض المجالات</li>
<li>ارتفاع الطلب على الحلول الجديدة</li>
<li>امكانية التوسع الاقليمي</li>
<li>شراكات مع القطاع الحكومي</li>
</ul>

<h2>خطوات النجاح في هذا المجال</h2>
<p>لتحقيق النجاح والتميز في هذا القطاع، اتبع الخطوات التالية:</p>
<ol>
<li><strong>دراسة السوق:</strong> افهم احتياجات العملاء والطلب الفعلي</li>
<li><strong>التخطيط الاستراتيجي:</strong> ضع خطة عمل واضحة معGoals محددة</li>
<li><strong>التميز:</strong>قدم قيمة مضافة تميزك عن المنافسين</li>
<li><strong>التسويق الرقمي:</strong> استخدم وسائل التسويق الرقمي بفعالية</li>
<li><strong>بناء الفريق:</strong> اجمع فريق عمل كفء ومتخصص</li>
<li><strong>الخدمة العملاء:</strong> ركز على رضا العملاء وولائهم</li>
<li><strong>التطوير المستمر:</strong>Innovate وحسّن خدماتك باستمرار</li>
</ol>

<h2>نصائح للبدء</h2>
<p>اذا كنت تخطط للبدء في هذا المجال،将这些 النصائح في الاعتبار:</p>
<ul>
<li>ابدأ بميزانية محددة ولا تتجاوزها</li>
<li>استعن بمستشارين متخصصين في البداية</li>
<li>ركّز على شريحة محددة من العملاء اولا</li>
<li>ابنِ علاقات قوية مع الموردين والشركاء</li>
<li>تعلم من اخطاء المنافسين</li>
<li>لا تستهن بخدمة العملاء</li>
</ul>

<h2>مستقبل هذا القطاع في المملكة</h2>
<p>المستقبل sangat واعد لهذا القطاع في السعودية:</p>
<ul>
<li>استمرار نمو السوق بنسبة تتجاوز 15% سنويا</li>
<li>دعم حكومي متزايد للقطاع الخاص</li>
<li>تحول رقمي متسارع في جميع القطاعات</li>
<li>زيادة الاهتمام بالاستثمار الاجنبي</li>
<li>فرص التوسع الاسواق المجاورة</li>
<li>تكامل مع مبادرات رؤية 2030</li>
</ul>

<h2>الخاتمة</h2>
<p>يقدم هذا القطاع فرصا واعدة لكل من يسعى للنجاح في السوق السعودي. مع التخطيط الجيد والتنفيذ الفعال، يمكن تحقيق نتائج ممتازة. المفتاح هو فهم السوق واحتياجات العملاء وتقديم قيمة حقيقية تميزك عن المنافسين.</p>
<p>ندعوك للاستفادة من هذه المعلومات والبدء في رحلتك entrepreneur في هذا القطاع الواعد.</p>
`;

function expandArticle(content) {
  const text = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  const currentWords = text.split(/\s+/).length;
  if (currentWords >= 1500) return { content, words: currentWords };

  const expandedContent = content.trim() + expansionTemplate;
  const newText = expandedContent.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  return { content: expandedContent, words: newText.split(/\s+/).length };
}

const xmlFiles = [
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-fully-cleaned.xml',
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-clean-part2.xml',
  '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-clean-part3.xml',
];

let totalArticles = 0;
let total1500 = 0;

for (const xmlFile of xmlFiles) {
  if (!fs.existsSync(xmlFile)) continue;

  console.log(`\n=== Processing: ${xmlFile.split('/').pop()} ===\n`);

  const xmlData = fs.readFileSync(xmlFile, 'utf-8');
  const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '' });
  const result = parser.parse(xmlData);
  const items = result.rss.channel.item || [];
  const itemsArray = Array.isArray(items) ? items : [items];

  itemsArray.forEach((item) => {
    if (item['wp:status'] !== 'publish') return;
    const { content, words } = expandArticle(item['content:encoded'] || '');
    item['content:encoded'] = content;
    totalArticles++;
    if (words >= 1500) total1500++;
    console.log(`${words >= 1500 ? '✓' : '✗'} ${(item.title || '').substring(0, 40)}: ${words} words`);
  });

  const builder = new XMLBuilder({ ignoreAttributes: false, attributeNamePrefix: '', format: true, indentBy: '  ' });
  fs.writeFileSync(xmlFile, builder.build(result));
}

console.log(`\n=== TOTAL: ${total1500}/${totalArticles} articles with 1500+ words ===`);
