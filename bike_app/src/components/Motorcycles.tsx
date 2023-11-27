import useGetAllBrands from "../hooks/useGetAllBrands";
import { brands } from "../data/brands.ts";
import { useStore } from "../store.ts";
import { useEffect } from "react";

const Motorcycles = () => {
  const { data, isLoading, error, fetchNextPage } = useGetAllBrands();
  const { model, setModel, setMarkModel, modelYear } = useStore();

  useEffect(() => {
    console.log(modelYear);
  }, [modelYear]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const models = data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <h2>Brands</h2>
      <select value={model} onChange={(e) => setModel(e.target.value)}>
        {brands?.map((x: string) => (
          <option key={x}>{x}</option>
        ))}
      </select>

      <select onChange={(e) => setMarkModel(e.target.value)}>
        {models?.map((brand) => (
          <>
            <option key={brand.model}>
              {brand.model}-{brand.year}
            </option>
          </>
        ))}
      </select>
      <button onClick={() => fetchNextPage()}>LoadMore</button>
    </div>
  );
};

export default Motorcycles;
