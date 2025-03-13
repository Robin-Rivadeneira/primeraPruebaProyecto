// beneficiosData.js
import DosporUnoSvg from "../assets/img/dosporuno.svg";
import QuincePorciento from "../assets/img/quncieporcentaje.svg";
import SmartFitSvg from "../assets/img/smartFit.svg";

const beneficiosData = {
  Multicines: [
    {
      id: "1",
      nombre: "2x1 en entradas",
      horario: "Lunes y Jueves de 14H a 21H",
      icono: <DosporUnoSvg width={100} height={100} />,
    },
    {
      id: "2",
      nombre: "15% de descuento",
      horario: "Lunes y Jueves de 14H a 21H",
      icono: <QuincePorciento width={100} height={100} />,
    },
    {
      id: "4",
      nombre: "20% de descuento",
      horario: "Lunes y Jueves de 14H a 21H",
      icono: <QuincePorciento width={100} height={100} />,
    },
    {
      id: "5",
      nombre: "10% de descuento adicional",
      horario: "Viernes y Sábados de 10H a 22H",
      icono: <QuincePorciento width={100} height={100} />,
    },
  ],
  SmartFit: [
    {
      id: "3",
      nombre: "Membresía 50% off",
      horario: "Lunes a Viernes de 8H a 18H",
      icono: <SmartFitSvg width={100} height={100} />,
    },
  ],
};

export default beneficiosData;