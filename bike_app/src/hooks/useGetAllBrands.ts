import apiClient from "../api-config";
import { useInfiniteQuery } from "react-query";
import { useStore } from "../store";

interface Brand {
  id: string;
  make: string;
  model: string;
  year: string;
  type: string;
  seat_height: string;
  power: string;
  total_weight: string;
}
interface BrandsResponse {
  data: Brand[];
  nextPage: number;
}

const useGetAllBrands = () => {
  const { model, setModelYear, yearSelect } = useStore();

  const fetchAllBrands = async ({ pageParam = 0 }): Promise<BrandsResponse> => {
    const params = {
      make: model,
      year: yearSelect,
      offset: pageParam,
    };

    const response = await apiClient.get("/motorcycles", { params });
    setModelYear(response.data);

    return {
      data: response.data.map((motorcycle: Brand) => ({
        ...motorcycle,
        id: crypto.randomUUID(),
      })),
      nextPage: pageParam + 30,
    };
  };

  return useInfiniteQuery<BrandsResponse>(
    ["brands", model, yearSelect],
    fetchAllBrands,
    {
      getNextPageParam: (lastPage) => lastPage.nextPage,
    }
  );
};

export default useGetAllBrands;
