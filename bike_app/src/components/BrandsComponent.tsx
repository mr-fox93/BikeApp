import useGetAllBrands from "../hooks/useGetAllBrands";

const BrandsComponent = () => {
  const { data: brands, isLoading, error } = useGetAllBrands();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  return (
    <div>
      <h2>Brands</h2>
      <select>
        {brands &&
          brands.map((brand) => <option key={brand.id}>{brand.name}</option>)}
      </select>
    </div>
  );
};

export default BrandsComponent;
