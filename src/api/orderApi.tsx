import axios from 'axios';

/**
 * Crea una orden de pedido.
 * 
 * @param orderData - Los datos de la orden de pedido.
 * @param orderData.name - El nombre del cliente.
 * @param orderData.address - La dirección de entrega.
 * @param orderData.pizzas - Las pizzas seleccionadas.
 * @returns Una promesa que se resuelve con la respuesta del servidor.
 * @throws Si ocurre un error al realizar la solicitud.
 */
export const createOrder = async (orderData: { name: string; address: string; pizzas: string[] }) => {
    try {
        const response = await axios.post('https://2w8n4vrqeb.execute-api.us-east-1.amazonaws.com/order', orderData, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response;
    } catch (error) {
        console.error('Error making the request:', error);
        throw error;
    }
};

export const getOrderStatus = async (orderId: string) => {
    const response = await axios.get(`https://2w8n4vrqeb.execute-api.us-east-1.amazonaws.com/order/${orderId}`);
    return response.data;
};
