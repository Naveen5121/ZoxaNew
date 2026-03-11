import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  makeGetRequest,
  makeGetRequestWithToken,
  makePostRequest,
  makePostRequestWithToken,
} from './apiService';
import {
  RESPONSE_FAILURE,
  RESPONSE_SUCCESS,
  constructFailureResponse,
} from './serviceUtils';

//OLD BASE URL
//const BASE_URL = 'https://tycoon.easytipsntricks.com/Api'; //test
//const BASE_URL = 'https://classicindustriessap.in/apitesting/Api'; //live

//NEW BASE URL
const BASE_URL = 'https://test3.easytipsntricks.com/Api';

const API = {
  async setLoginData(phone_no) {
    try {
      const data = await makePostRequest(BASE_URL + '/login_company', {
        phone_no,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setLoginViaEmailIdPassword(email, password) {
    try {
      const data = await makePostRequest(
        BASE_URL + '/v_login_via_username_password',
        {
          email,
          password,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getOtpData(otp, phone_no) {
    //  console.log(otp, phone);
    try {
      const data = await makePostRequest(BASE_URL + '/verify_otp_company', {
        phone_no,
        otp,
      });

      if (data.success) {
        return data;
      } else {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getFilterData(name) {
    console.log(name);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/product_filter',
        {
          name,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setRegistrationData(
    business_type,
    company_name,
    email_id,
    owner_name,
    shipping_address,
    reg_address,
    company_type,
    gst_no,
    pan_no,
    account_team_email,
    primary_email,
    company_person_name,
    contact_no_company,
    address_map,
    state_code,
    state_id,
    city_id,
    pin,
    prd_image1,
    prd_image2,
    prd_image3,
  ) {
    console.log(gst_no, prd_image3);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/new_company_registration',
        {
          business_type: business_type,
          company_name: company_name,
          email_id: email_id,
          owner_name: owner_name,
          shipping_address: shipping_address,
          reg_address: reg_address,
          company_type: company_type,
          gst_no: gst_no,
          pan_no: pan_no,
          account_team_email: account_team_email,
          primary_email: primary_email,
          company_person_name: company_person_name,
          contact_no_company: contact_no_company,
          address_map: address_map,
          state_code: state_code,
          state_id: state_id,
          city_id: city_id,
          pin: pin,

          'prd_image1[]': {
            uri: prd_image1
              ? prd_image1.uri
              : Image.resolveAssetSource(IMAGES.LOGO).uri,
            type: prd_image1 ? prd_image1.type : 'image/jpeg',
            name: prd_image1 ? prd_image1.fileName : `Image_${Date.now()}.png`,
          },
          'prd_image2[]': {
            uri: prd_image2
              ? prd_image2.uri
              : Image.resolveAssetSource(IMAGES.LOGO).uri,
            type: prd_image2 ? prd_image2.type : 'image/jpeg',
            name: prd_image2 ? prd_image2.fileName : `Image_${Date.now()}.png`,
          },
          'prd_image3[]': {
            uri: prd_image3
              ? prd_image3.uri
              : Image.resolveAssetSource(IMAGES.LOGO).uri,
            type: prd_image3 ? prd_image3.type : 'image/jpeg',
            name: prd_image3 ? prd_image3.fileName : `Image_${Date.now()}.png`,
          },
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getCompanyProfile() {
    try {
      const data = await makeGetRequestWithToken(
        BASE_URL + '/view_company_profile',
      );

      if (data.success) {
        return data;
      } else {
        //console.log('Token Expire');
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setUpdateProfile(
    name,
    email,
    pin,
    password,
    address,
    entity_name,
    entity_address,
    bank_acc_no,
    bank_acc_type,
    ifsc,
    vendor_type,
    image,
  ) {
    console.log(
      'update data ' + name,
      email,
      pin,
      password,
      address,
      entity_name,
      entity_address,
      bank_acc_no,
      bank_acc_type,
      ifsc,
      vendor_type,
      image,
    );

    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/v_update_profile',
        {
          name,
          email,
          pin,
          password,
          address,
          entity_name,
          entity_address,
          bank_acc_no,
          bank_acc_type,
          ifsc,
          vendor_type,
          image: {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          },
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      console.log(error);
      return error.response;
    }
  },

  async getStateList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/state_code');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getDistrictListByStateId(id) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/city_by_state', {
        state_id: id,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getPinCodeListByDistrictId(id, stateId) {
    console.log(id, stateId + 'id, statte');
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/pin_by_city_state',
        {
          city_id: id,
          state_id: stateId,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setSendEmailOtp(email) {
    try {
      const data = await makePostRequest(BASE_URL + '/v_send_email_otp', {
        email,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setVerifyEmailOtp(otp, email) {
    //  console.log(otp, phone);
    try {
      const data = await makePostRequest(BASE_URL + '/v_verify_email_otp', {
        email,
        otp,
        device_token: '1234567890',
      });

      if (data.success) {
        return data;
      } else {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setRegistrationDataWithoutToken(
    name,
    email,
    pin,
    password,
    c_password,
    address,
    pan_no,
    entity_name,
    entity_address,
    is_gst_reg,
    gstin,
    bank_acc_no,
    bank_acc_type,
    ifsc,
    gst_cert_image,
    pan_image,
    image,
    phone,
  ) {
    console.log(gst_cert_image, pan_image, image);
    try {
      const data = await makePostRequest(
        BASE_URL + '/v_new_user_registration_without_token',
        {
          phone,
          name,
          email,
          pin,
          password,
          c_password,
          address,
          pan_no,
          entity_name,
          entity_address,
          is_gst_reg,
          gstin,
          bank_acc_no,
          bank_acc_type,
          ifsc,

          gst_cert_image: {
            uri: gst_cert_image.uri,
            type: gst_cert_image.type,
            name: gst_cert_image.fileName,
          },

          pan_image: {
            uri: pan_image.uri,
            type: pan_image.type,
            name: pan_image.fileName,
          },

          image: {
            uri: image.uri,
            type: image.type,
            name: image.fileName,
          },
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setForgotPassword(emailId) {
    try {
      const data = await makePostRequest(BASE_URL + '/forgot_password', {
        email: emailId,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setChangePassword(oldPassword, newPassword, confirmNewPassword) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/change_password',
        {
          old_password: oldPassword,
          new_password: newPassword,
          c_password: confirmNewPassword,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getBannerImages() {
    try {
      const data = await makeGetRequest(BASE_URL + '/banner');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getHomeScreenItems() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/item');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getStateCodeList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/state_code');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getUnitList(type) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/unit', {
        type: type,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getCategories() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/category');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getSubCategoriesByCatId(id) {
    console.log(id);
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/sub_category', {
        category_id: id,
      });

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getProductListByCatSubcatId(category_id, sub_category_id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/product_by_category_sub_category',
        {
          category_id: category_id,
          sub_category_id: sub_category_id,
        },
      );

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getProductRate(product_id, qty) {
    console.log('IDSSSSSSS => ' + product_id, qty);
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/get_rate', {
        product_id: product_id,
        qty: qty,
      });

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  // async getProductList(category_id) {
  //   try {
  //     const data = await makePostRequestWithToken(BASE_URL + '/product_list', {
  //       category_id: category_id,
  //     });

  //     if (data.success) {
  //       return data;
  //     }
  //   } catch (error) {
  //     return error.response;
  //   }
  // },

  async setAddToCart(product_id, qty, rate, seller, gst, user_type) {
    console.log('AddToCart ' + product_id, qty, rate, seller, gst, user_type);
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/add_to_cart', {
        product_id: product_id,
        qty: qty,
        rate: rate,
        seller: seller,
        gst: gst,
        user_type: user_type,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getCartList(type) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/view_cart', {
        user_type: type,
      });

      if (data.success) {
        return data;
      } else {
      }
    } catch (error) {
      return error.response;
    }
  },

  async setUpdateCart(rate, qty, edit_id) {
    console.log('UpdateCart=======>>>' + rate, qty, edit_id);

    try {
      const data = await makePostRequestWithToken(BASE_URL + '/update_cart', {
        rate: rate,
        qty: qty,
        edit_id: edit_id,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setDeleteItemInCart(edit_id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/delete_item_in_cart',
        {
          edit_id: edit_id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setAddShippingAddress(
    name,
    address,
    city,
    state,
    pin,
    address_type,
    landmark,
    mobNo,
  ) {
    console.log(city, state, pin);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/add_shipping_address',
        {
          name: name,
          address: address,
          city: city,
          state: state,
          pin: pin,
          address_type: address_type,
          landmark: landmark,
          mobile: mobNo,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setDefaultShippingAddress(address_id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/set_default_shipping_address',
        {
          address_id: address_id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setDeleteShippingAddress(address_id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/delete_shipping_address',
        {
          address_id: address_id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getShippingAddress() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/get_all_address');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setPlaceOrder(
    payment_id,
    addrId,
    payMethod,
    cgst,
    sgst,
    igst,
    user_type,
    coins_used,
    coins_added,
  ) {
    console.log(
      payment_id,
      addrId,
      payMethod,
      cgst,
      sgst,
      igst,
      user_type,
      coins_used,
      coins_added,
    );
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/place_order', {
        payment_id,
        payment_type: payMethod,
        address_id: addrId,
        cgst: cgst,
        sgst: sgst,
        igst: igst,
        user_type: user_type,
        coins_used: coins_used,
        coins_added: coins_added,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getSubscriptionList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/subscription');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setSubscriptionPlan(
    payment_id,
    subscription_id,
    off_percent,
    price,
    plan_duration_type,
    plan_duration,
  ) {
    console.log(
      'Plaen' + payment_id,
      subscription_id,
      off_percent,
      price,
      plan_duration_type,
      plan_duration,
    );
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/get_subscription_plan',
        {
          payment_id: payment_id,
          subscription_id: subscription_id,
          off_percent: off_percent,
          price: price,
          plan_duration_type: plan_duration_type,
          plan_duration: plan_duration,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getAllOrders() {
    try {
      const data = await makeGetRequestWithToken(
        BASE_URL + '/get_all_order_by_custumer_id',
        {
          mart_service: '0',
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getUploadedProductList() {
    try {
      const data = await makeGetRequestWithToken(
        BASE_URL + '/view_uploaded_products_list',
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setCreateNewCategory(name, category_image) {
    console.log(category_image, name);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/create_category',
        {
          name,
          category_image: {
            uri: category_image.uri,
            type: category_image.type,
            name: category_image.fileName,
          },
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setCreateNewSubCategory(cat_id, name, category_image) {
    console.log(category_image, name);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/create_subcategory',
        {
          cat_id,
          name,
          category_image: {
            uri: category_image.uri,
            type: category_image.type,
            name: category_image.fileName,
          },
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setCreateNewProduct(
    itemname,
    subcat_id,
    cat_id,
    disc,
    ingredients,
    nutritional_val,
    cust_no,
    item_type,
    uom,
    qty,
    mrp,
    salerate,
    purchaserate,
    prd_image1,
  ) {
    try {
      console.log(
        itemname,
        subcat_id,
        cat_id,
        disc,
        ingredients,
        nutritional_val,
        cust_no,
        item_type,
        uom,
        qty,
        mrp,
        salerate,
        purchaserate,
        prd_image1,
      );
      let access_token = await AsyncStorage.getItem('accessToken');
      var myHeaders = new Headers();
      myHeaders.append('Authorization', access_token);
      myHeaders.append('Content-Type', 'multipart/form-data');

      function getFormData(object) {
        const data = new FormData();
        Object.keys(object).forEach(key => data.append(key, object[key]));
        return data;
      }

      const formdata = getFormData({
        itemname,
        subcat_id,
        cat_id,
        disc,
        ingredients,
        nutritional_val,
        cust_no,
        item_type,
        'uom[]': uom,
        'qty[]': qty,
        'mrp[]': mrp,
        'salerate[]': salerate,
        'purchaserate[]': purchaserate,
      });

      prd_image1.forEach(item => {
        console.log(item);
        formdata.append('prd_image1[]', {
          uri: item.uri,
          type: item.type,
          name: item.fileName,
        });
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: formdata,
      };
      const response = await fetch(BASE_URL + '/v_add_product', requestOptions);

      const data = await response.json();

      if (
        data.success === RESPONSE_SUCCESS ||
        data.success === RESPONSE_FAILURE
      ) {
        return data;
      }
      return constructFailureResponse();
    } catch (error) {
      return error.response;
    }
  },

  async getAddedProductList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/v_view_product');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setOrderStatus(id, status) {
    console.log(id, status);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/v_change_order_status',
        {
          id,
          status,
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setDeleteProductByUnit(id) {
    console.log(id);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/v_delete_product',
        {
          id,
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setUpdateProductToStore(
    edit_id,
    itemname,
    subcat_id,
    cat_id,
    disc,
    ingredients,
    nutritional_val,
    cust_no,
    item_type,
    uom,
    qty,
    mrp,
    salerate,
    purchaserate,
    prd_image1,
  ) {
    console.log(
      edit_id,
      itemname,
      subcat_id,
      cat_id,
      disc,
      ingredients,
      nutritional_val,
      cust_no,
      item_type,
    );
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/v_update_product',
        {
          edit_id,
          itemname,
          subcat_id,
          cat_id,
          disc,
          ingredients,
          nutritional_val,
          cust_no,
          item_type,
          'uom[]': uom,
          'qty[]': qty,
          'mrp[]': mrp,
          'salerate[]': salerate,
          'purchaserate[]': purchaserate,
        },
      );

      prd_image1.forEach(item => {
        console.log(item);
        formdata.append('prd_image1[]', {
          uri: item.uri,
          type: item.type,
          name: item.fileName,
        });
      });
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setAddNewProductToStore(
    id,
    mrp,
    salerate,
    purchaserate,
    discount_type,
    discount,
    qty,
    uom,
  ) {
    console.log(
      id,
      mrp,
      salerate,
      purchaserate,
      discount_type,
      discount,
      qty,
      uom,
    );
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/add_product_to_store',
        {
          id,
          mrp,
          salerate,
          purchaserate,
          discount_type,
          discount,
          qty,
          uom,
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setDeleteProductFromStore(product_id) {
    console.log(product_id);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/delete_all_product_to_store',
        {
          product_id,
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getSubCatByCatId(type, id) {
    console.log(' type' + type, ' getSubCatByCatId' + id);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/subcategory_by_category_id',
        {
          type: type,
          category_id: id,
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getProductListBySubCatId(category_id, subcategory_id) {
    console.log(category_id + ' cat ID', subcategory_id + ' Sub Cat ID');
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/product_by_category_sub_category_id',
        {
          category_id,
          subcategory_id,
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getCityByStateId(id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/get_city_by_state',
        {
          state_id: id,
        },
      );
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getStateDistrictByPinCode() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/pincode');
      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getServicesListByServiceType() {
    try {
      const data = await makeGetRequestWithToken(
        BASE_URL + '/service_list_by_service_type',
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getServicesList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/service_list');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getProductList(category_id) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/product_list', {
        category_id: category_id,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getSortProductList(category_id, sortId) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/sorting', {
        category_id: category_id,
        sort_by: sortId,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getFilterProductList(category_id, minVal, maxVal) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/filter', {
        category_id: category_id,
        min_val: minVal,
        max_val: maxVal,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getSearchItem(keyword) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/search', {
        keyword: keyword,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getBrowsePlan(phone_no) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/browse_plan', {
        phone_no,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getCalculatedGstByStateCode(state_code, user_type) {
    console.log(state_code, user_type);
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/calculate_tax', {
        state_code: state_code,
        user_type: user_type,
      });

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setRechargePlan(phone_no, operator_id, amount) {
    console.log(phone_no, operator_id, amount);
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/do_recharge', {
        phone_no,
        operator_id,
        amount,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setPurchasePlan(plan_id) {
    console.log(plan_id);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/user_subscribe_plan',
        {
          plan_id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getFastagOreratorList() {
    try {
      const data = await makeGetRequestWithToken(
        BASE_URL + '/fast_tag_operator',
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setPayFasTagBill(operator_id, vehicle_number, amt) {
    console.log(operator_id, vehicle_number, amt);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/fast_tag_recharge',
        {
          operator_id,
          vehicle_number,
          amt,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getLpgOreratorList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/lpg_operators');

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getLpgBill(operator_id, number) {
    console.log(operator_id, number);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/fetch_lpg_bill',
        {
          operator_id,
          number,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setPayLpgBill(operator_id, number, amount) {
    try {
      const data = await makePostRequestWithToken(BASE_URL + '/pay_lpg_bill', {
        operator_id,
        number,
        amount,
      });

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setPayLicPayment(number, amount) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/lic_bill_payment',
        {
          number,
          amount,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getLicBill(number) {
    console.log(number);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/lic_bill_fetch',
        {
          number,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getProductDetails(product_id) {
    console.log(product_id);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/product_detail',
        {
          product_id: product_id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setManageWishlist(product_id, isWishlist) {
    console.log(product_id);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/manage_wishlist',
        {
          product_id: product_id,
          is_wishlist: isWishlist,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getWishlist() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/get_wishlist');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getAllOrderList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/v_view_order');

      if (data.success) {
        return data;
      } else {
        //console.log('Token Expire');
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setUpdateShippingAddress(
    name,
    address,
    city,
    state,
    pin,
    address_type,
    landmark,
    mobNo,
    address_id,
  ) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/update_app_users_address',
        {
          name: name,
          address: address,
          city: city,
          state: state,
          pin: pin,
          address_type: address_type,
          landmark: landmark,
          mobile: mobNo,
          address_id: address_id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getAllServiceBooking() {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/get_all_services_order_by_custumer_id',
        {
          mart_service: '1',
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getOrderByStatus(order_status) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/get_order_by_status',
        {
          order_status: order_status,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getOrderDetails(order_id) {
    console.log(order_id);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/order_detail_by_id',
        {
          order_id: order_id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getServiceBookingDetails(order_id) {
    console.log(order_id + 'order_id');
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/service_order_detail_by_id',
        {
          order_id: order_id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getCouponList() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/coupon_list');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setUserProfile(username, phoneNo, email, imageData) {
    // console.log(imageData);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/update_profile',
        {
          email: email,
          name: username,
          phone: phoneNo,
          image: imageData,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async setBookService(
    serviceId,
    bookingDate,
    selectedTimeSlot,
    addrId,
    reason,
    orderId,
    paymentMode,
    prd_image1,
    plan_type,
    subs_id,
    coupon_code,
  ) {
    console.log(coupon_code);
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/place_order_service',
        {
          service_id: serviceId,
          address_id: addrId,
          service_date: bookingDate,
          service_time: selectedTimeSlot,
          description: reason,
          orderId,
          payment_mode: paymentMode,
          prd_image1,
          plan_type,
          subs_id,
          coupon_code,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getCityListByStateId(id) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/get_city_by_state',
        {
          state_id: id,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getPinCodeListByCityId(id, stateId) {
    try {
      const data = await makePostRequestWithToken(
        BASE_URL + '/get_pin_by_city_state',
        {
          city_id: id,
          state_id: stateId,
        },
      );

      if (data.success) {
        return data;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getAboutUs() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/about_us');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getContactDetails() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/support');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getTc() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/terms_condition');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },

  async getPrivacyPolicy() {
    try {
      const data = await makeGetRequestWithToken(BASE_URL + '/privacy_policy');

      if (data.success) {
        return data;
      } else {
        return 0;
      }
    } catch (error) {
      return error.response;
    }
  },
};

export default API;
