/**
 * Componente que muestra un mensaje de error.
 * 
 * @param message - El mensaje de error a mostrar.
 * @returns Un elemento JSX que muestra el mensaje de error.
 */
export const ErrorMessage = ({ message }: { message: string }) => {
    return <div>Error: {message}</div>;
};
