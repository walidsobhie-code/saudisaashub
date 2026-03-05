const fs = require('fs');
const { XMLParser, XMLBuilder } = require('fast-xml-parser');

const expansions = {
  'ZATCA': `
<h2>أهمية الفوترة الإلكترونية للاقتصاد السعودي</h2>
<p>تُعد منظومة الفوترة الإلكترونية من أبرز مبادرات التحول الرقمي في المملكة العربية السعودية. فهي لا تُسهم فقط في تحسين الكفاءة الضريبية، بل تُعزز الشفافية المالية وتُسهل التبادل التجاري بين المنشآت.</p>
<p>تأتي هذه المنظومة ضمن رؤية 2030 التي تهدف إلى تحقيق التنوع الاقتصادي وتقليل الاعتماد على النفط. ومن خلال التحول الرقمي، تسعى المملكة لأن تصبح مركزاً إقليمياً للتجارة والأعمال.</p>
<h2>التحديات الشائعة وكيفية معالجتها</h2>
<p>تواجه المنشآت عدة تحديات عند التطبيق، أبرزها:</p>
<ul>
<li><strong>التحدي التقني:</strong> يتطلب التكامل مع الأنظمة الحالية فهماً تقنياً عميقاً.</li>
<li><strong>تكلفة التطبيق:</strong> قد تبدو التكاليف مرتفعة في البداية.</li>
<li><strong>التدريب:</strong> يحتاج الموظفون لتعلم النظام.</li>
</ul>
<h2>نصائح للنجاح في التطبيق</h2>
<p>لضمان نجاح التطبيق:</p>
<ol>
<li>ابدأ مبكراً ولا تنتظر الموعد النهائي.</li>
<li>اختر شريك تقني موثوق.</li>
<li>درّب فريقك بشكل جيد.</li>
<li>اختبر النظام بشكل كامل قبل التشغيل.</li>
</ol>
`,
  'التجارة الإلكترونية': `
<h2>مستقبل التجارة الإلكترونية في السعودية</h2>
<p>تشهد التجارة الإلكترونية في المملكة نمواً متسارعاً مدعوماً by البنية التحتية الرقمية المتطورة ومعدلات الاستخدام العالية للإنترنت. يُتوقع أن يستمر هذا النمو بشكل كبير في السنوات القادمة.</p>
<h2>العوامل الرئيسية للنجاح</h2>
<p>لتحقيق النجاح في التجارة الإلكترونية:</p>
<ul>
<li><strong>تجربة المستخدم:</strong> يجب أن تكون سهلة وممتعة.</li>
<li><strong>الدفع:</strong> توفير خيارات متعددة وآمنة.</li>
<li><strong>التوصيل:</strong> سريع وموثوق.</li>
<li><strong>الخدمة:</strong> دعم فني متميز.</li>
</ul>
`,
  'default': `
<h2>أهمية هذا المجال في السوق السعودي</h2>
<p>يشهد السوق السعودي تطوراً ملحوظاً في هذا المجال، مدعوماً برؤية 2030 وبرامج التحول الرقمي الحكومية. تُسهم هذه التطورات في فتح آفاق جديدة أمام رواد الأعمال والشركات الناشئة.</p>
<h2>التحديات والفرص</h2>
<p>يواجه القطاع تحديات عدة، لكنه يفتح أيضاً أبواباً واسعة للفرص. فالمنافسة الشائعة تدفع للتميز، والحاجة للكفاءات تخلق فرص عمل جديدة.</p>
<h2>خطوات النجاح</h2>
<p>لتحقيق النجاح:</p>
<ol>
<li>افهم احتياجات السوق المحلي.</li>
<li>قدم قيمة مضافة حقيقية.</li>
<li>استخدم التسويق الرقمي بفعالية.</li>
<li>ابنِ فريق عمل قوي.</li>
</ol>
`
};

function expandContent(title, content) {
  let expansion = expansions['default'];
  const titleLower = title.toLowerCase();

  for (const [key, value] of Object.entries(expansions)) {
    if (key !== 'default' && titleLower.includes(key.toLowerCase())) {
      expansion = value;
      break;
    }
  }

  // Check if already expanded
  if (content.includes('أهمية هذا المجال') || content.length > 2000) {
    return content;
  }

  return content + expansion;
}

// Read and parse XML
const xmlFile = '/Users/walidsobhi/SEO_Articles_All/Clean_Articles/saudisaashub-fully-cleaned.xml';
const xmlData = fs.readFileSync(xmlFile, 'utf-8');

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  parseTagValue: false,
});

const result = parser.parse(xmlData);
const items = result.rss.channel.item || [];
const itemsArray = Array.isArray(items) ? items : [items];

// Expand each article
itemsArray.forEach(item => {
  if (item['wp:status'] !== 'publish') return;

  const title = item.title || '';
  const content = item['content:encoded'] || '';
  item['content:encoded'] = expandContent(title, content);
});

// Write back
const builder = new XMLBuilder({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  format: true,
  cdataPositionChar: '\\c',
});

const output = builder.build(result);
fs.writeFileSync(xmlFile, output);

console.log('Done! XML file updated with expanded articles.');
