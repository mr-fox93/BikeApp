// getBrandImage.js
import KTM from "../assets/KTM.png";
// Importuj inne obrazy marek

const getBrandImage = (brand: string) => {
  switch (brand) {
    case "KTM":
      return KTM;

    default:
      return null;
  }
};

export default getBrandImage;
