// beneficiosData.js
import MultiCineSvg from "../assets/img/multicines.svg";
import SmartFitSvg from "../assets/img/smartFit.svg";
import EnextSvg from "../assets/img/enext.svg";
import SaludSaSvg from "../assets/img/saludSa.svg";

const beneficiosFiltro = {
  Quito: [
    { id: "1", nombre: "Multicines", icono: <MultiCineSvg width={100} height={100} />, ciudad: "Quito" },
    { id: "2", nombre: "SmartFit", icono: <SmartFitSvg width={100} height={100} />, ciudad: "Quito" },
  ],
  Guayaquil: [
    { id: "3", nombre: "Enext", icono: <EnextSvg width={100} height={100} />, ciudad: "Guayaquil" },
    { id: "4", nombre: "Saludsa", icono: <SaludSaSvg width={100} height={100} />, ciudad: "Guayaquil" },
  ],
  Cuenca: [
    { id: "5", nombre: "Multicines", icono: <MultiCineSvg width={100} height={100} />, ciudad: "Cuenca" },
    { id: "6", nombre: "Saludsa", icono: <SaludSaSvg width={100} height={100} />, ciudad: "Cuenca" },
  ],
};

export default beneficiosFiltro;