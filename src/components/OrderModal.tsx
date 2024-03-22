/**
 * Componente que muestra la información de un pedido.
 * 
 * @component
 * @param {Object} props - Las propiedades del componente.
 * @param {Object} props.orderInfo - La información del pedido.
 * @param {string} props.orderInfo.name - El nombre del cliente.
 * @param {string} props.orderInfo.address - La dirección de entrega.
 * @param {string[]} props.orderInfo.pizzas - Las pizzas del pedido.
 * @returns {JSX.Element} El elemento JSX que muestra la información del pedido.
 */
export const OrderModal = ({ orderInfo }: { orderInfo: any }) => {
    return (
        <div style={{ /* TODO */ }}>
            <h2>Información del Pedido</h2>
            <p>Nombre: {orderInfo.name}</p>
            <p>Dirección: {orderInfo.address}</p>
            <p>Pizzas: {orderInfo.pizzas.join(', ')}</p>
        </div>
    );
};
