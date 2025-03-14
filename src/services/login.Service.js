// services/authService.js
import apiConeccion from './coneccion.Service';

export const login = async (email, password) => {
    try {
        console.log("URL de la solicitud:", `${apiConeccion.coneccionGeneral}/auth`);
        console.log("Datos enviados:", { email, password });

        const response = await fetch(`${apiConeccion.coneccionGeneral}/auth`, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        console.log("Estado de la respuesta:", response.status);
        console.log("Headers de la respuesta:", response.headers);

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error del servidor:", errorData);
            throw new Error(errorData.message || 'Error al iniciar sesión');
        }

        const data = await response.json();
        console.log("Datos recibidos:", data.data.token);
        return data;
    } catch (error) {
        console.error("Error en la solicitud:", error);
        throw new Error(error.message || 'Error al iniciar sesión');
    }
};