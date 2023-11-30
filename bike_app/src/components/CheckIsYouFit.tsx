import { useEffect } from "react";
import { useStore } from "../store";
import { Box, Badge } from "@chakra-ui/react";

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
      setHeightMessage("Both feet on the ground");
    } else if (seatHeightMm <= legLengthMm + bothFeetMargin + 50) {
      setHeightMessage("One foot on the ground");
    } else {
      setHeightMessage("Too short");
    }
  }, [yourHeight, setHeightMessage, seatHeightMm]);

  return (
    <Box marginTop="20px" marginBottom="50px">
      {heightMessage === "Both feet on the ground" ||
      heightMessage === "One foot on the ground" ? (
        <Badge colorScheme="green" fontSize="25">
          {heightMessage}
        </Badge>
      ) : (
        <Badge colorScheme="red" fontSize="25">
          {heightMessage}{" "}
        </Badge>
      )}
    </Box>
  );
};

export default CheckIsYouFit;
