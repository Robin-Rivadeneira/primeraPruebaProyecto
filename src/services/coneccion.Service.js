// services/apiConeccion.js
import {
    API_GENERAL_URL,
    API_REGISTRO_URL,
    FACE_DETECTION_URL,
    LIVENESS_CHECK_URL,
    BIOMETRICS_URL,
    LUXAND_TOKEN,
} from '@env'; // Importa las variables de entorno

console.log("API_GENERAL_URL:", API_GENERAL_URL);
console.log("API_REGISTRO_URL:", API_REGISTRO_URL);
console.log("FACE_DETECTION_URL:", FACE_DETECTION_URL);
console.log("LIVENESS_CHECK_URL:", LIVENESS_CHECK_URL);
console.log("BIOMETRICS_URL:", BIOMETRICS_URL);
console.log("LUXAND_TOKEN:", LUXAND_TOKEN);

const apiConeccion = {
    coneccionGeneral: API_GENERAL_URL,
    coneccionRegsitro: API_REGISTRO_URL,
    FACE_DETECTION_URL: FACE_DETECTION_URL,
    LIVENESS_CHECK_URL: LIVENESS_CHECK_URL,
    BIOMETRICS_URL: BIOMETRICS_URL,
    LUXAND_TOKEN: LUXAND_TOKEN,
};

export default apiConeccion;