import useGetAllBrands from "../hooks/useGetAllBrands";
import { brands } from "../data/brands.ts";
import { useStore } from "../store.ts";
import getBrandImage from "./brandImage";

const Motorcycles = () => {
  const { data, isLoading, error } = useGetAllBrands();
  const { model, setModel, setMarkModel, markModel } = useStore();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const models = data?.pages.flatMap((page) => page.data);
  const filteredModels = models?.find((x) => x.model === markModel);

  let brandImage;
  if (filteredModels && filteredModels.make) {
    brandImage = getBrandImage(filteredModels.make);
  }

  return (
    <>
      <div>
        <h2>Brands</h2>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          {brands?.map((x: string) => (
            <option key={x}>{x}</option>
          ))}
        </select>

        <select onChange={(e) => setMarkModel(e.target.value)}>
          {models?.map((brand) => (
            <option key={brand.model}>{brand.model}</option>
          ))}
        </select>
      </div>
      <div>
        <h2>Models</h2>
        {brandImage && (
          <img
            style={{ width: "150px", height: "90px" }}
            src={brandImage}
            alt={filteredModels?.make}
          />
        )}
        <p>Make: {filteredModels?.make}</p>
        <p>Model: {filteredModels?.model}</p>
        <p>Type: {filteredModels?.type}</p>
        <p>Year: {filteredModels?.year}</p>
        <p>Seat Height: {filteredModels?.seat_height}</p>
        <p>Power: {filteredModels?.power ? filteredModels.power : "NaN"}</p>
      </div>
    </>
  );
};

export default Motorcycles;
