import moment from 'moment';
import {COLORS} from '../constants/colors';
import ConvertIntoRupees from './convert-into-rupees';
import {Image} from 'react-native';
import {IMAGES} from '../constants/images';

export const InvoiceHtmlData = (billDetails, userProfile) => {
  const formatDate = date => moment(date).format('DD-MM-YYYY');
  const changeDateFormat = date => {
    let momentDate = moment(date);
    let formatedDate = moment(momentDate).format('LL');

    return formatedDate;
  };

  function convertNumberToWords(num) {
    var ones = [
      '',
      'One ',
      'Two ',
      'Three ',
      'Four ',
      'Five ',
      'Six ',
      'Seven ',
      'Eight ',
      'Nine ',
      'Ten ',
      'Eleven ',
      'Twelve ',
      'Thirteen ',
      'Fourteen ',
      'Fifteen ',
      'Sixteen ',
      'Seventeen ',
      'Eighteen ',
      'Nineteen ',
    ];
    var tens = [
      '',
      '',
      'Twenty',
      'Thirty',
      'Forty',
      'Fifty',
      'Sixty',
      'Seventy',
      'Eighty',
      'Ninety',
    ];
    if ((num = num.toString()).length > 9)
      return 'Overflow: Maximum 9 digits supported';
    const n = ('000000000' + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    let str = '';
    str +=
      n[1] != 0
        ? (ones[Number(n[1])] || tens[n[1][0]] + ' ' + ones[n[1][1]]) + 'Crore '
        : '';
    str +=
      n[2] != 0
        ? (ones[Number(n[2])] || tens[n[2][0]] + ' ' + ones[n[2][1]]) + 'Lakh '
        : '';
    str +=
      n[3] != 0
        ? (ones[Number(n[3])] || tens[n[3][0]] + ' ' + ones[n[3][1]]) +
          'Thousand '
        : '';
    str +=
      n[4] != 0
        ? (ones[Number(n[4])] || tens[n[4][0]] + ' ' + ones[n[4][1]]) +
          'Hundred '
        : '';
    str +=
      n[5] != 0
        ? (str != '' ? 'and ' : '') +
          (ones[Number(n[5])] || tens[n[5][0]] + ' ' + ones[n[5][1]])
        : '';
    return str;
  }

  const grandTotal =
    parseFloat(billDetails.total_amt || 0) +
    parseFloat(billDetails.cgst || 0) +
    parseFloat(billDetails.sgst || 0) +
    parseFloat(billDetails.igst || 0);

  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      font-size: 12px;
      margin: 0;
      padding: 20px;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #000;
      padding: 6px;
      text-align: left;
    }
    .no-border {
      border: none;
    }
    .center {
      text-align: center;
    }
    .right {
      text-align: right;
    }
    .section-title {
      font-weight: bold;
      margin-top: 20px;
      margin-bottom: 5px;
    }
    .footer-note {
      font-size: 10px;
      color: #555;
      margin-top: 30px;
    }
  </style>
</head>
<body>

 <div style="text-align: center; width: 100%;">
    <h2 style="margin: 0;">TAX INVOICE</h2>
 </div>

 <div style="display: flex; justify-content: space-between; align-items: center;">
  <div style="flex: 1;">
    <h3>Zoxa Wholesale Solutions</h3>
    <p>
      Plot no-246, Udhyog Vihar, Phase -IV, Gurugram-122015<br />
      PAN: AABFZ7120K<br />
      GSTIN: 06AABFZ7120K1Z2<br />
      Contact: 7836998998 | Email: Rb@zoxawholesale.com
    </p>
  </div>
  <div style="flex: 0 0 200px; text-align: right;">
    <img src="${
      Image.resolveAssetSource(IMAGES.LOGO).uri
    }" alt="Company Logo" style="max-width: 180px; height: auto;" />
  </div>
</div>

  <table>
    <tr>
      <td><strong>Invoice No:</strong> ${billDetails.order_no}</td>
      <td><strong>Dated:</strong> ${changeDateFormat(billDetails.date)}</td>
    </tr>
    <tr>
      <td><strong>Customer PO:</strong> ${billDetails.customer_po || 'N/A'}</td>
      <td><strong>Place of Supply:</strong> ${
        billDetails.place_of_supply || 'Uttar Pradesh (09)'
      }</td>
    </tr>
    <tr>
      <td><strong>Terms of Payment:</strong> 30 Days</td>
      <td><strong>Reverse Charge:</strong> N</td>
    </tr>
  </table>

  <table style="margin-top: 10px;">
    <tr>
      <td><strong>Billed to:</strong><br />${userProfile.company_name}<br />
        ${userProfile.shipping_address}<br />
        Mob: ${userProfile.mobile_no}<br />
        GSTIN: ${userProfile.gst_no}
      </td>
      <td><strong>Shipped to:</strong><br />${userProfile.company_name}<br />
        ${userProfile.shipping_address}<br />
        Mob: ${userProfile.mobile_no}<br />
        GSTIN: ${userProfile.gst_no}
      </td>
    </tr>
  </table>

  <table style="margin-top: 20px;">
    <thead>
      <tr>
        <th>S.N.</th>
        <th>Description of Goods</th>
        <th>HSN/SAC</th>
       
        <th>Qty</th>
        <th>Unit</th>
        <th>Net Price</th>
        <th>Amount (₹)</th>
      </tr>
    </thead>
    <tbody>
      ${billDetails.product_list
        .map((p, index) => {
          return `
            <tr>
              <td>${index + 1}</td>
              <td>${p.product_name}</td>
              <td>${p.hsn_code || ''}</td>
            
              <td>${p.product_qty}</td>
              <td>${p.unit || 'Pcs'}</td>
              <td class="right">${Number(p.product_salerate || 0).toFixed(
                2,
              )}</td>
              <td class="right">${Number(
                (p.product_qty || 0) * (p.product_salerate || 0),
              ).toFixed(2)}</td>
            </tr>`;
        })
        .join('')}
    </tbody>
  </table>

  <table style="margin-top: 10px;">
    <tr>
      <td colspan="6" class="no-border right">Add: CGST</td>
      <td colspan="2" class="right">${parseFloat(billDetails.cgst).toFixed(
        2,
      )}</td>
    </tr>
    <tr>
      <td colspan="6" class="no-border right">Add: SGST</td>
      <td colspan="2" class="right">${parseFloat(billDetails.sgst).toFixed(
        2,
      )}</td>
    </tr>
    <tr>
      <td colspan="6" class="no-border right">Add: IGST</td>
      <td colspan="2" class="right">${parseFloat(billDetails.igst).toFixed(
        2,
      )}</td>
    </tr>
    <tr>
      <td colspan="6" class="no-border right"><strong>Grand Total</strong></td>
      <td colspan="2" class="right"><strong>${Math.round(
        grandTotal,
      )}</strong></td>
    </tr>
  </table>

  <p><strong>Amount in Words:</strong> Rupees ${convertNumberToWords(
    Math.round(grandTotal),
  )} Only</p>

  <p style="font-size: 13px; margin-top: 30px;">
    <strong>Bank Details :</strong> All Payment to be made by "Cheque/DD/NEFT/RTGS In favour of <strong>Zoxa Wholesale Solutions</strong>"<br />
    Bank Name: SBI-NARSINGAPUR-GURGAON, A/C NO: 37765843776, IFSC CODE: SBIN0020704
  </p>

  <table style="width: 100%; margin-top: 20px; border: 1px solid black; border-collapse: collapse;">
    <tr>
      <td style="width: 60%; padding: 10px; vertical-align: top; border: 1px solid black;">
        <strong>Terms & Conditions</strong><br />
        <p style="font-size: 12px; margin: 5px 0;">E.& O.E.</p>
        <ol style="padding-left: 15px; margin: 0; font-size: 12px;">
          <li>Goods once sold will not be taken back.</li>
          <li>Interest @ 18% p.a. will be charged if the payment is not made within the stipulated time.</li>
          <li>Subject to 'Haryana' Jurisdiction only.</li>
          <li>Warranty by Manufacturing Company Policy.</li>
        </ol>
      </td>
      <td style="width: 20%; padding: 10px; vertical-align: top; border: 1px solid black;">
        <strong>Authoritie's Signature :</strong>
      </td>
      <td style="width:20%; padding: 10px; vertical-align: top; border: 1px solid black;">
        <strong>Receiver's Signature :</strong>
      </td>
    </tr>
  </table>

</body>
</html>`;
};
