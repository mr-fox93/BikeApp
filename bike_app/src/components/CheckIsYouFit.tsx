import { useEffect } from "react";
import { useStore } from "../store";

const CheckIsYouFit = () => {
  const { setHeightMessage, yourHeight, heightMessage, bikeHeigh } = useStore();

  const extractSeatHeight = (bikeHeightString: string) => {
    const regex = /\b\d{3}\b/;
    const found = bikeHeightString.match(regex);
    console.log(found);
    return found ? parseInt(found[0], 10) : null;
  };

  const seatHeightMm = extractSeatHeight(bikeHeigh) ?? 0;
  const bothFeetMargin = 50;

  useEffect(() => {
    const legLengthCm = +yourHeight * 0.46;
    const legLengthMm = legLengthCm * 10;
    if (yourHeight.length <= 3 && seatHeightMm < 600) return;
    if (seatHeightMm <= legLengthMm + bothFeetMargin) {
      setHeightMessage("obie nogi na ziemi");
    } else if (seatHeightMm <= legLengthMm + bothFeetMargin + 50) {
      setHeightMessage("jedna noga na ziemi");
    } else {
      setHeightMessage("za niski");
    }
  }, [yourHeight, setHeightMessage, seatHeightMm]);

  return (
    <div>
      <p>{heightMessage ? heightMessage : "Wprowadź swój wzrost"}</p>
    </div>
  );
};

export default CheckIsYouFit;
