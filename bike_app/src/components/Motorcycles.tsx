import { useEffect } from "react";
import apiClient from "../api-config";
import { useQuery } from "react-query";

interface MotorcycleArticle {
  articleCompleteInfo: {
    articleID: number;
    makeName: string;
    modelName: string;
    categoryName: string;
    yearName: number;
  };
  // Dodaj inne sekcje, jeśli są potrzebne
  physicalMeasuresAndCapacities: {
    seatHeightName: string;
    // Dodaj inne pola, jeśli są potrzebne
  };
  // ... możesz dodać więcej sekcji z odpowiedzi, jeśli to konieczne
}

type MotorcycleResponse = MotorcycleArticle[];

const Motorcycles = () => {
  const fetchMotorcycleSpecs = async (): Promise<MotorcycleResponse> => {
    const response = await apiClient.get(
      "/make/Aprilia/model/Dorsoduro%201200"
    );
    return response.data;
  };

  const { data, isLoading, error } = useQuery<MotorcycleResponse>(
    "motorcycleSpecs",
    fetchMotorcycleSpecs
  );

  useEffect(() => {
    console.log(data);
  }, [data]);

  if (isLoading) {
    return <div>Ładowanie...</div>;
  }

  if (error) {
    return <div>Wystąpił błąd: </div>;
  }

  // Przykładowe wyświetlanie danych
  return (
    <div>
      {data &&
        data.map((motorcycle) => (
          <div key={motorcycle.articleCompleteInfo.articleID}>
            <h3>{motorcycle.articleCompleteInfo.modelName}</h3>
            <p>
              Wysokość siedzenia:{" "}
              {motorcycle.physicalMeasuresAndCapacities.seatHeightName}
            </p>
            <p>Year: {motorcycle.articleCompleteInfo.yearName}</p>
          </div>
        ))}
    </div>
  );
};

export default Motorcycles;
