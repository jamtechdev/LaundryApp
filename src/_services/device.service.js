import axios from 'axios';

const PAYMENT_API_URL = 'https://admin.reinarancy.com';
const API_BASE_URL = 'https://laundry-pay.net/admin/api';
const OAUTH_TOKEN_URL = 'https://laundry-pay.net/admin/oauth/token';

const deviceService = {
    getAuthToken,
    getLandryDeviceListwithShop,
    getLandryDeviceListwithDeviceId,
    startDevice,
    initiatePayment,
    checkPaymentStatus
};

export default deviceService;

/**
 * Retrieves the OAuth token using the API key grant.
 */
function getAuthToken() {
    const data = {
        grant_type: 'api_key',
        client_id: '8ed997b0-e793-11ec-9db7-abf499082fd3',
        client_secret: 'XToSWyMcV18PsDaV17bfq0tmnbg44b4GSXwYbnZg',
        api_key: 'key_vOBOw7eF93gYEVdGilEKHcDfBFthvL',
        scope: 'table_read value_read value_write view_read plugin'
    };

    return axios.post(OAUTH_TOKEN_URL, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

/**
 * Retrieves the Landry Device List using the deviceId.
 * 
 * @param {string|number} deviceId - The device id to query.
 * @param {string} token - The bearer token for authorization.
 */
function getLandryDeviceListwithDeviceId(deviceId, token) {
    const url = `${API_BASE_URL}/data/LandryDeviceList/query-column`;
    const params = { q: `deviceid eq ${deviceId}` };

    return axios.get(url, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        params
    });
}

/**
 * Retrieves the Landry Device List using the shop id.
 * 
 * @param {string|number} shopId - The shop id to query.
 * @param {string} token - The bearer token for authorization.
 */
function getLandryDeviceListwithShop(shopId, token) {
    const url = `${API_BASE_URL}/data/LandryDeviceList/query-column`;
    const params = { q: `shop eq ${shopId}` };

    return axios.get(url, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        params
    });
}



/**
 * Initiates the device start process for a given device and sales amount.
 *
 * @param {string|number} deviceId - The ID of the device.
 * @param {string|number} salesAmount - The sales amount.
 * @param {string} token - The bearer token for authorization.
 * @returns {Promise} - Axios promise.
 */
function startDevice(deviceId ='00001999987', salesAmount, token) {
    const url = `${API_BASE_URL}/plugins/devicestart/exec/${deviceId}/${salesAmount}`;
    console.log(url)
    return axios.get(url, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
}

/**
 * Initiates a payment by posting the payment amount.
 *
 * @param {number|string} amount - The payment amount.
 * @returns {Promise} - Axios promise resolving with the payment response.
 */
function initiatePayment(amount) {
    const url = `${PAYMENT_API_URL}/paypay`;
    return axios.post(url, { amount });
};

/**
 * Checks the status of a payment using its codeId.
 *
 * @param {string} codeId - The codeId of the payment.
 * @returns {Promise} - Axios promise resolving with the payment status response.
 */
function checkPaymentStatus(codeId) {
    const url = `${PAYMENT_API_URL}/paypay/status/${codeId}`;
    return axios.get(url);
};