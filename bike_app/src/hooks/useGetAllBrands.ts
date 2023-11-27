import apiClient from "../api-config";
import { useInfiniteQuery } from "react-query";

interface Brand {
  make: string;
  model: string;
}

interface BrandsResponse {
  data: Brand[];
  nextPage: number;
}

const useGetAllBrands = () => {
  const fetchAllBrands = async ({ pageParam = 0 }): Promise<BrandsResponse> => {
    const response = await apiClient.get(
      `/motorcycles?make=KTM&offset=${pageParam}`
    );
    return { data: response.data, nextPage: pageParam + 30 };
  };

  return useInfiniteQuery<BrandsResponse>(["brands"], fetchAllBrands, {
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
};

export default useGetAllBrands;
