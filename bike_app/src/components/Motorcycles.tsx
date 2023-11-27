import useGetAllBrands from "../hooks/useGetAllBrands";
import { brands } from "../data/brands.ts";
import { useStore } from "../store.ts";

const Motorcycles = () => {
  const { data, isLoading, error } = useGetAllBrands();
  const { model, setModel, setMarkModel } = useStore();

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
            <option key={brand.model}>{brand.model}</option>
          </>
        ))}
      </select>
    </div>
  );
};

export default Motorcycles;
