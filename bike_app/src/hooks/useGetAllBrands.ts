import apiClient from "../api-config";
import { useInfiniteQuery } from "react-query";
import { useStore } from "../store";

interface Brand {
  make: string;
  model: string;
  year: string;
  type: string;
}

interface BrandsResponse {
  data: Brand[];
  nextPage: number;
}

const useGetAllBrands = () => {
  const { model, markModel } = useStore();

  const fetchAllBrands = async ({ pageParam = 0 }): Promise<BrandsResponse> => {
    if (!model) return { data: [], nextPage: 0 };
    const response = await apiClient.get(
      `/motorcycles?make=${model}&model=${markModel}&offset=${pageParam}`
    );
    return { data: response.data, nextPage: pageParam + 30 };
  };

  return useInfiniteQuery<BrandsResponse>(["brands", model], fetchAllBrands, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export default useGetAllBrands;
