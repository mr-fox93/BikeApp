import apiClient from "../api-config";
import { useInfiniteQuery } from "react-query";
import { useStore } from "../store";
import { useEffect } from "react";

interface Brand {
  make: string;
  model: string;
  year: string;
  type: string;
  seat_height: string;
  power: string;
}
interface BrandsResponse {
  data: Brand[];
  nextPage: number;
}

const useGetAllBrands = () => {
  const { model, setModelYear, modelYear } = useStore();

  const fetchAllBrands = async ({ pageParam = 0 }): Promise<BrandsResponse> => {
    //if (!model) return { data: [], nextPage: 0 };
    const response = await apiClient.get(
      `/motorcycles?make=${model}&offset=${pageParam}`
    );
    setModelYear(response.data);
    return { data: response.data, nextPage: pageParam + 30 };
  };

  useEffect(() => {
    console.log(modelYear);
  }, [modelYear]);

  return useInfiniteQuery<BrandsResponse>(["brands", model], fetchAllBrands, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export default useGetAllBrands;
