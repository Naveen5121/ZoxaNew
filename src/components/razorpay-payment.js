import {COLORS} from '../constants/colors';
import RazorpayCheckout from 'react-native-razorpay';
import {IMAGES} from '../constants/images';
import {Image} from 'react-native';

const PAYMENT = {
  async RazorpayPayment(profile, amount) {
    try {
      var options = {
        description: 'Payment',
        image: Image.resolveAssetSource(IMAGES.LOGO).uri,
        currency: 'INR',
        key: 'rzp_test_HkzyriLfjgebbp',
        // key: 'rzp_live_awEEFN2IRrxIiK',
        amount: parseFloat(amount.replace(/,/g, '')) * 100,
        // amount: 100 * 100,
        name: 'Zoxa',
        notify: {
          sms: true,
        },
        prefill: {
          email: profile.email_id,
          contact: profile.mobile_no,
          name: profile.owner_name,
        },
        theme: {color: COLORS.PRIMARY},
      };
      const data = await RazorpayCheckout.open(options);

      if (data) {
        return data;
      } else {
        return false;
      }
    } catch (error) {
      return error.response;
    }
  },
};

export {PAYMENT};
