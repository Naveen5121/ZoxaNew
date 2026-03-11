import moment from 'moment';
import {COLORS} from '../constants/colors';
import ConvertIntoRupees from './convert-into-rupees';
import {Image} from 'react-native';
import {IMAGES} from '../constants/images';

export const InvoiceHtmlData = (billDetails, userProfile) => {
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
    n = ('000000000' + num)
      .substr(-9)
      .match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return;
    var str = '';
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

  const changeDateFormat = date => {
    let momentDate = moment(date);
    let formatedDate = moment(momentDate).format('LL');

    return formatedDate;
  };

  return `<!DOCTYPE html>
<html>
  <head>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css" />

    <link
      rel="stylesheet"
      href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css" />
    <style>
      table,
      th,
      td {
        border: 0px solid black;
        border-collapse: collapse;
        font-size: 14px !important;
        border-top-width: 1px;
        border-bottom-width: 1px;
      }

      .name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px !important;
      }
      .bottom-text {
        padding-right: 2.5px;
        padding-left: 2.5px;
        padding-top: 10px;
        padding-bottom: 10px;
        vertical-align: top;
        font-size: 10px !important;
        color:grey !important;
        border-width: 0px !important;
      }
      .td-left {
        padding-right: 2.5px;
        padding-left: 2.5px;
        padding-top: 10px;
        padding-bottom: 10px;
        vertical-align: top;
      }
      .td-right {
        padding-right: 10px;
        padding-left: 10px;
        padding-top: 5px;
        padding-bottom: 5px;
        text-align: end;
        /* vertical-align: top; */
      }

      .heading-td {
        padding-top: 10px;
        padding-bottom: 10px;
        border-width: 0px;
        border-left-width: 2px;
        padding-left: 15px;
      }

      .value-td {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: right;
        border-width: 0px;
        padding-right: 5px;
      }

      .heading-td-total {
        padding-top: 10px;
        padding-bottom: 10px;
        border-width: 0px;
        border-left-width: 2px;
        padding-left: 15px;
        border-top-width: 2px;
      }

      .value-td-total {
        padding-top: 10px;
        padding-bottom: 10px;
        text-align: right;
        border-width: 0px;
        padding-right: 5px;
        border-top-width: 2px;
      }

      .flex-container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 40px;
        margin-top: 40px;
      }

      .company_info {
        display: flex;
        flex: 1;
        flex-direction: column;
        align-items: flex-end; /* Align content to the right */
      }
      .invoice-btn {
        text-align: center;
        background-color: ${COLORS.PRIMARY} !important;
        border-radius: 30px;
        padding: 7px 20px 7px 20px;
        width: fit-content;
        margin: 40px auto;
      }

      .invoice-no {
        padding: 10px;
        vertical-align: top;
        text-align: right;
        border-width: 0px !important;
      }
      .amount-words-container {
        width: 100%;
        padding-left: 2.5px;
        padding-top: 20px;
        padding-bottom: 20px;
        border: 0px solid black;
        border-top-width: 1px;
        border-bottom-width: 1px;
      }
      .amount-words {
        padding-left: 2.5px;
        padding-top: 20px;
        padding-bottom: 20px;
        width: 70%;
      }

      .info-container {
        width: 100%;
        border-width: 0px !important;
        margin-bottom: 50px;
      }

      .watermark {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999; /* Ensure the watermark stays on top */
        opacity: 0.15; /* Adjust the opacity as needed */
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      }

      /* Ensure watermark image covers the whole page */
      .watermark img {
        width: 50%;
        height: 50%;
        object-fit: contain;
      }

      @page {
        margin-bottom: 0;
        size: A4;
      }

      @media print {
        #btn {
          text-align: center;
          background-color: ${COLORS.PRIMARY_BLUE} !important;
          border-radius: 30px;
          padding: 7px 20px 7px 20px;
          width: fit-content;
          margin: 30px auto;
        }
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="flex-container">
        <img
        src=${Image.resolveAssetSource(IMAGES.LOGO).uri}
         style="height: 90px; width: 200px" />
        <div class="company_info">
          <div>
            <h2 style="color: black"><b>Zoxa Wholesale Solutions</b></h2>
            <p style="text-align: start !important; margin-top: -10px">
             Plot no-246,Udhyog  Vihar,Phase -IV, <br />Gurugram-122015 <br />Phone: +91 7836998998<br />Rb@zoxawholesale.com
            </p>
          </div>
        </div>
      </div>
      <div class="invoice-btn">
        <b style="color: white !important; font-size: 19px">INVOICE</b>
      </div>

      <div>
        <table class="info-container">
          <tr>
            <td style="border-width: 0px !important">
              <b style="text-decoration: underline">Bill To:</b>

              <p style="margin-top: 10px">
                <span class="name">${userProfile.owner_name.toUpperCase()}</span>
              </p>
              <p style="margin-bottom: -2px; margin-top: -10px;">
                <span style="color: black"
                  ><b>${userProfile.email_id}</b
                  ></span
                >
              </p>
              <p>
                <span style="color: black"><b>
                +91 ${userProfile.mobile_no}</b></span>
              </p>
            </td>
            <td class="invoice-no">
              <b> Invoice No : </b>${billDetails.order_no.toUpperCase()}<br />
              <b> Dated : </b>
              ${changeDateFormat(billDetails.date)}<br />
           
              
            </td>
          </tr>
        </table>
        <table style="width: 100%; border-top-width: 2px">
          <tr>
            <td class="td-left">
              <b>DESCRIPTION</b>
            </td>

            <td class="td-right">
              <b>AMOUNT (INR)</b>
            </td>
          </tr>
        </table>

       <table style="width: 100%">
        ${billDetails.product_list
          .map(
            product => `
            <tr>
              <td class="td-left">
                <b>${product.product_name}</b>
                <h5>Qty: ${product.product_qty}</h5>
              </td>
              <td class="td-right">
                <b>${ConvertIntoRupees(product.product_salerate)}</b>
              </td>
            </tr>
          `,
          )
          .join('')}
      </table>
      
        <table class="amount-words-container">
          <tr>
            <td rowspan="4" class="amount-words">
              <b>Total Amount (in words)</b><br />
              INR
              ${convertNumberToWords(parseInt(billDetails.total_amt))} 
              Rupees Only
            </td>
            <td class="heading-td">Total</td>
            <td class="value-td">
            ${ConvertIntoRupees(billDetails.total_amt)}
            </td>
          </tr>
          
          <tr>
            <td class="heading-td"></td>
         
          </tr>
         
          <tr>
            <td class="heading-td-total">Grand Total</td>
            <td class="value-td-total">
            ${ConvertIntoRupees(billDetails.total_amt)}
            </td>
          </tr>
        </table>

        <div style="width: 100%">
          <p class="bottom-text">
            <br />
            Note : This is system generated invoice
          </p>
        </div>
      </div>
    </div>
    <div class="watermark">
      <img src=${
        Image.resolveAssetSource(IMAGES.LOGO).uri
      } alt="Watermark Image" />
    </div>
  </body>
</html>
`;
};

{
  /*   <td class="right">${Number(billDetails.taxable_amount || 0).toFixed(
   2,
 )}</td>
<td class="right">${Number(billDetails.cgst || 0).toFixed(2)}</td>
<td class="right">${Number(billDetails.sgst || 0).toFixed(2)}</td>
<td class="right">${Number(billDetails.rounded_off || 0).toFixed(2)}</td>
<td class="right"><strong>${Number(billDetails.total_amt || 0).toFixed(
    2,
  )}</strong></td>*/
}
