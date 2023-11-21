import { useEffect, useState } from "react";
import axios from "axios";

interface MotorcycleProps {
  id: number;
  make: string;
  model: string;
  year: number;
  height: string;
  image: string;
}

const Motorcycles = () => {
  const [motorcycles, setMotorcycles] = useState<MotorcycleProps[]>([]);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await axios.get("http://localhost:3000/motorcycles");
        console.log(response.data);
        setMotorcycles(response.data);
      } catch (error) {
        console.error("Błąd przy pobieraniu danych:", error);
      }
    };

    fetchMotorcycles();
  }, []);

  return (
    <div>
      <h1>Lista Motocykli</h1>
      <ul>
        {motorcycles.map((motorcycle) => (
          <li key={motorcycle.id}>
            {motorcycle.make} - {motorcycle.height}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Motorcycles;
