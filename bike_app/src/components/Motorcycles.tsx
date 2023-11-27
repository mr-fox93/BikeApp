import useGetAllBrands from "../hooks/useGetAllBrands";

const Motorcycles = () => {
  const { data, isLoading, error } = useGetAllBrands();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const brands = data?.pages.flatMap((page) => page.data);

  return (
    <div>
      <h2>Brands</h2>
      <select>
        {brands?.map((brand) => (
          <option key={brand.model}>{brand.model}</option>
        ))}
      </select>
    </div>
  );
};

export default Motorcycles;
