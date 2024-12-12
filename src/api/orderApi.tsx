import axios from 'axios';

const BASE_URL = 'https://2w8n4vrqeb.execute-api.us-east-1.amazonaws.com';

export const createOrder = async (orderData: any, accessToken: string) => {
  try {
    const response = await axios.post(`${BASE_URL}/order`, orderData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      },
    });
    console.log('Order status:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrderStatus = async (orderId: string, accessToken: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/order/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching order status:', error);
    throw error;
  }
};

export const getPurchaseHistory = async (email: string, accessToken: string) => {
  try {
    console.log('Fetching purchase history for email:', email);
    const response = await axios.get(`${BASE_URL}/purchase-history?email=${email}`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching purchase history:', error);
    throw error;
  }
};


export const getAllOrders = async (filters: any) => {
  try {
    const response = await axios.get(`${BASE_URL}/orders`, {
      headers: {
        'Authorization': `Bearer ${filters.accessToken}`
      },
      params: filters
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}

export const updateOrderStatus = async (orderId: string, accessToken: string) => {
  try {
    const response = await axios.put(`${BASE_URL}/order/status`, {
      orderId: orderId,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};
