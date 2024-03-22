/**
 * Componente de modal para mostrar el estado de un pedido.
 * 
 * @param status - El estado del pedido.
 * @param children - Los elementos hijos del componente.
 * @returns El componente de modal.
 */
export const StatusModal = ({ status, children }: { status: string, children: React.ReactNode }) => {
    return (
      <div className="modal">
        <div className={`modal-content ${status !== 'CREATING_ORDER' ? 'show' : ''}`}>
          <h2>Estado del Pedido: {traducirEstado(status)}</h2>
          {children}
        </div>
      </div>
    );
};

  

const traducirEstado = (estado: string) => {
    switch (estado) {
      case 'CREATING_ORDER':
        return 'Creando Pedido';
      case 'PREPARING':
        return 'Preparando';
      case 'READY_FOR_DELIVERY':
        return 'Listo para Entrega';
      default:
        return 'Actualizando...';
    }
  };
  