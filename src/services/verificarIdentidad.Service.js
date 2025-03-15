export const getQrIdormationData = async (idIdentidadFromQR) => { // Recibir idIdentidad como parámetro
    try {
        // Validar que tenemos el idIdentidad
        if (!idIdentidadFromQR) {
            throw new Error('No se proporcionó un idIdentidad válido');
        }

        // Realizar la petición HTTP usando el id del QR
        const response = await fetch(`http://52.70.109.55:3007/api/registrocivil/${idIdentidadFromQR}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'Content-Type': 'application/json',
            },
        });

        // Resto del código se mantiene igual...
        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error en la solicitud:", errorData);
            throw new Error(errorData.message || 'Error al obtener los datos del registro civil');
        }

        const registroCivilData = await response.json();
        console.log("Datos del registro civil:", registroCivilData);

        const menuData = {
            cedula: registroCivilData.nui || '1713489514',
            nombre: registroCivilData.nombre || 'Gerald Orlando Moreno Jadan',
            grado: registroCivilData.grado || 'Teniente Coronel',
            caduca: registroCivilData.caduca || '01/01/2030',
            imagenPerfil: registroCivilData.fotografia || '',
            imagenTarjeta: registroCivilData.fotografia || '',
        };

        return menuData;
        
    } catch (error) {
        console.error("Error al obtener los datos del menú:", error);
        throw error;
    }
};