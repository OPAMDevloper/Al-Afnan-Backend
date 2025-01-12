// services/sonicShippingService.js
const axios = require('axios');

class SonicShippingService {
    constructor() {
        this.baseURL = process.env.SONIC_API_URL || 'https://sonic.pk/api';
        this.apiKey = process.env.SONIC_API_KEY;
    }

    async addPickupAddress(addressData) {
        try {
            console.log('address data', addressData)
            const response = await axios.post(`https://sonic.pk/api/pickup_address/add`, addressData, {
                headers: {
                    'Authorization': 'RmhKRjgwbHlPNG1zbTdnV1ByemlsR1lYSzBCeXJCVkY5elQwajZRVU1RVVBnOVVkOW9SaUJLTEpmdGRp67594b0d0c700'
                }
            });

            console.log('response.data', response.data);

            return response.data;
        } catch (error) {
            console.error('Error adding pickup address:', error.message);
            throw error;
        }
    }


    async createShipment(orderData) {

        console.log('order data---00', orderData)
        try {
            const response = await axios.post(`https://sonic.pk/api/shipment/book`, {
                service_type_id: 1,
                pickup_address_id: orderData.pickupAddressId,
                information_display: 1,
                consignee_city_id: orderData.address.cityId,
                consignee_name: orderData.address.name,
                consignee_address: orderData.address.fullAddress,
                consignee_phone_number_1: orderData.address.phone,
                consignee_email_address: orderData.address.email,
                // order_id: orderData.orderId,
                item_product_type_id: 24,
                item_description: `Order #${orderData.orderId}`,
                item_quantity: 1,
                item_insurance: 0,
                pickup_date: new Date().toISOString().split('T')[0],
                estimated_weight: 1.0,
                shipping_mode_id: 1, // Rush delivery
                amount: orderData.amount,
                payment_mode_id: 1,
                charges_mode_id: 4
            }, {
                headers: {
                    'Authorization': 'RmhKRjgwbHlPNG1zbTdnV1ByemlsR1lYSzBCeXJCVkY5elQwajZRVU1RVVBnOVVkOW9SaUJLTEpmdGRp67594b0d0c700'
                }
            });


            console.log('response.data', response.data);

            return response.data;
        } catch (error) {

            console.log('error', error.message);
            // throw error;
        }
    }

    async trackShipment(trackingNumber) {
        try {

            console.log('this api key', this.apiKey);
            const response = await axios.get(`${this.baseURL}/shipment/track`, {
                params: {
                    tracking_number: trackingNumber,
                    type: 0 // Shipper tracking
                },
                headers: {
                    'Authorization': this.apiKey
                }
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async getShipmentStatus(trackingNumber) {
        try {
            const response = await axios.get(`${this.baseURL}/shipment/status`, {
                params: {
                    tracking_number: trackingNumber,
                    type: 0
                },
                headers: {
                    'Authorization': this.apiKey
                }
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new SonicShippingService();