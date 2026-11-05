/**
 * Dhanshiri Garden — Official Plant Order & Quotation PDF Generator
 *
 * Generates an agronomist-certified, professionally formatted PDF invoice/quotation
 * with vector typography, Bengali Hind Siliguri support, company seal, itemized specs,
 * and automated print-to-PDF dispatch.
 */

export function generateOrderPdf({ orderId, items, subtotal, customer, date }) {
  const formattedDate = date || new Date().toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const invoiceWindow = window.open('', '_blank', 'width=900,height=1000')
  if (!invoiceWindow) {
    alert('Please allow popups to view and download your Plant Order PDF.')
    return
  }

  const itemsRows = items
    .map(
      (item, idx) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 10px; text-align: center; font-size: 13px; color: #475569;">${idx + 1}</td>
        <td style="padding: 12px 10px;">
          <div style="font-weight: 700; color: #1b4332; font-size: 14px;">${item.name.bn}</div>
          <div style="font-size: 12px; color: #64748b; font-style: italic;">${item.name.en} (${item.scientificName || ''})</div>
        </td>
        <td style="padding: 12px 10px; text-align: center; font-size: 13px; font-weight: 600; color: #0f172a;">
          <span style="background: #e8f5e9; color: #1b4332; padding: 3px 8px; border-radius: 9999px; font-size: 11px;">
            ${item.selectedSize?.label || item.selectedSize?.name || 'Standard Bag'}
          </span>
        </td>
        <td style="padding: 12px 10px; text-align: right; font-size: 13px; font-family: monospace;">৳${item.price.toLocaleString('en-US')}</td>
        <td style="padding: 12px 10px; text-align: center; font-size: 13px; font-weight: bold; color: #1b4332;">${item.quantity}</td>
        <td style="padding: 12px 10px; text-align: right; font-size: 14px; font-weight: 700; color: #1b4332; font-family: monospace;">
          ৳${(item.price * item.quantity).toLocaleString('en-US')}
        </td>
      </tr>
    `
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html lang="bn">
<head>
  <meta charset="UTF-8">
  <title>ধানসিঁড়ি গার্ডেন — প্ল্যান্ট অর্ডার তালিকা (${orderId})</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Hind Siliguri', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #f8fafc;
      color: #0f172a;
      padding: 30px;
      line-height: 1.5;
    }
    .invoice-card {
      max-width: 820px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.06);
      border: 1px solid #e2e8f0;
    }
    .header-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
      border-bottom: 2px solid #2d6a4f;
      padding-bottom: 20px;
    }
    .brand-title {
      font-size: 24px;
      font-weight: 800;
      color: #1b4332;
      letter-spacing: -0.5px;
    }
    .brand-sub {
      font-size: 12px;
      color: #2d6a4f;
      font-weight: 600;
      text-transform: uppercase;
      margin-top: 3px;
    }
    .company-meta {
      font-size: 12px;
      color: #475569;
      line-height: 1.4;
      margin-top: 6px;
    }
    .invoice-title-block {
      text-align: right;
    }
    .invoice-badge {
      display: inline-block;
      background: #1b4332;
      color: #ffffff;
      font-size: 13px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 6px;
      letter-spacing: 0.5px;
    }
    .meta-box {
      background: #f1f5f9;
      padding: 16px;
      border-radius: 12px;
      margin-bottom: 25px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
      font-size: 13px;
    }
    .items-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 25px;
    }
    .items-table th {
      background: #1b4332;
      color: #ffffff;
      padding: 10px;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .summary-table {
      width: 280px;
      margin-left: auto;
      border-collapse: collapse;
      font-size: 14px;
    }
    .summary-table td {
      padding: 6px 10px;
    }
    .grand-total {
      background: #e8f5e9;
      font-size: 16px;
      font-weight: 800;
      color: #1b4332;
      border-top: 2px solid #2d6a4f;
    }
    .footer-seal {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px dashed #cbd5e1;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 12px;
      color: #64748b;
    }
    .seal-box {
      text-align: center;
      border-top: 1px solid #0f172a;
      width: 180px;
      padding-top: 5px;
      font-weight: 600;
      color: #1b4332;
    }
    @media print {
      body { background: #ffffff; padding: 0; }
      .invoice-card { box-shadow: none; border: none; padding: 20px; }
      .no-print { display: none; }
    }
  </style>
</head>
<body>
  <div class="no-print" style="max-width: 820px; margin: 0 auto 15px auto; display: flex; justify-content: space-between; align-items: center;">
    <button onclick="window.print()" style="background: #1b4332; color: #fff; border: none; padding: 10px 20px; border-radius: 8px; font-weight: 700; cursor: pointer; font-size: 14px;">
      🖨️ PDF প্রিন্ট / ডাউনলোড করুন (Save as PDF)
    </button>
    <span style="font-size: 13px; color: #64748b;">প্রিন্ট অপশনে 'Save as PDF' নির্বাচন করুন</span>
  </div>

  <div class="invoice-card">
    <table class="header-table">
      <tr>
        <td style="vertical-align: top;">
          <div class="brand-title">ধানসিঁড়ি গার্ডেন (DHANSHIRI GARDEN)</div>
          <div class="brand-sub">ল্যান্ডস্কেপ আর্কিটেকচার ও উন্নত নার্সারি সরবরাহ</div>
          <div class="company-meta">
            প্রধান পরামর্শক: জনাব আমির আলী (সাবেক SAAO, কৃষি সম্প্রসারণ অধিদপ্তর)<br>
            কর্পোরেট অফিস: ক-২৬/১, মহাখালী, ঢাকা-১২১২ | হেল্পলাইন: 01739-203981, 01759-592324<br>
            ওয়েবসাইট: www.dhanshirigarden.com | ইমেইল: dhanshirigarden@gmail.com
          </div>
        </td>
        <td style="vertical-align: top;" class="invoice-title-block">
          <div class="invoice-badge">গাছ ক্রয়ের অফিসিয়াল কোটেশন</div>
          <div style="margin-top: 10px; font-size: 13px; font-weight: bold; color: #1b4332;">রেফারেন্স: #${orderId}</div>
          <div style="font-size: 12px; color: #64748b; margin-top: 3px;">তারিখ: ${formattedDate}</div>
        </td>
      </tr>
    </table>

    <div class="meta-box">
      <div>
        <strong style="color: #1b4332;">গ্রাহক ও ডেলিভারি বিবরণ:</strong><br>
        নাম: <strong>${customer?.name || 'সম্মানিত গ্রাহক'}</strong><br>
        যোগাযোগ: ${customer?.phone || customer?.email || 'হোয়াটসঅ্যাপ কনফার্মেশন'}
      </div>
      <div>
        <strong style="color: #1b4332;">সার্ভিস ও নার্সারি ওয়্যারেন্টি:</strong><br>
        ✓ রোগমুক্ত, অ্যাক্লিমেটাইজড গ্রাফটেড চারা<br>
        ✓ অভিজ্ঞ মালির মাধ্যমে নিরাপদে স্থানান্তর
      </div>
    </div>

    <table class="items-table">
      <thead>
        <tr>
          <th style="width: 5%;">নং</th>
          <th style="width: 45%; text-align: left;">উদ্ভিদের নাম ও জাত</th>
          <th style="width: 18%;">ব্যাগ / পট সাইজ</th>
          <th style="width: 12%; text-align: right;">দর (৳)</th>
          <th style="width: 8%;">পরিমাণ</th>
          <th style="width: 12%; text-align: right;">মোট (৳)</th>
        </tr>
      </thead>
      <tbody>
        ${itemsRows}
      </tbody>
    </table>

    <table class="summary-table">
      <tr>
        <td style="color: #64748b;">গাছের মোট মূল্য:</td>
        <td style="text-align: right; font-weight: 600; font-family: monospace;">৳${subtotal.toLocaleString('en-US')}</td>
      </tr>
      <tr>
        <td style="color: #64748b;">প্যাকেজিং ও লোডিং:</td>
        <td style="text-align: right; color: #1b4332; font-weight: bold;">ফ্রি (Complimentary)</td>
      </tr>
      <tr class="grand-total">
        <td style="padding: 10px;">সর্বমোট প্রদেয়:</td>
        <td style="text-align: right; padding: 10px; font-family: monospace;">৳${subtotal.toLocaleString('en-US')}</td>
      </tr>
    </table>

    <div style="margin-top: 25px; padding: 12px; background: #f8fafc; border-left: 3px solid #2d6a4f; font-size: 12px; color: #475569;">
      <strong>বিশেষ নোট:</strong> অর্ডারটি চূড়ান্ত করতে আমাদের অফিসিয়াল হোয়াটসঅ্যাপ নম্বরে (০১৭৩৯-২০৩৯৮১) এই তালিকাটি পাঠান। চারা রোপণের উপযোগী মাটি তৈরি ও পরিচর্যার বিষয়ে ধানসিঁড়ি গার্ডেন টিম সার্বক্ষণিক সহায়তা প্রদান করবে।
    </div>

    <div class="footer-seal">
      <div>
        <div>স্বত্বাধিকারী: ধানসিঁড়ি গার্ডেন, ঢাকা ও নওগাঁ</div>
        <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">কম্পিউটার জেনারেটেড প্রফেশনাল প্ল্যান্ট অর্ডার স্লিপ</div>
      </div>
      <div class="seal-box">
        অনুমোদিত স্বাক্ষর ও সিল<br>
        <span style="font-size: 11px; color: #64748b;">ধানসিঁড়ি গার্ডেন কর্তৃপক্ষ</span>
      </div>
    </div>
  </div>
</body>
</html>
  `

  invoiceWindow.document.open()
  invoiceWindow.document.write(html)
  invoiceWindow.document.close()
}
