import apiClient from "../api-config";
import { useQuery } from "react-query";

interface Brand {
  id: number;
  name: string;
}

const useGetAllBrands = () => {
  const fetchAllBrands = async (): Promise<Brand[]> => {
    const response = await apiClient.get("/make");
    return response.data;
  };

  return useQuery<Brand[]>("brands", fetchAllBrands);
};

export default useGetAllBrands;
