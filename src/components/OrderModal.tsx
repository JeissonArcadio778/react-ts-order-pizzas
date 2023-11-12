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
