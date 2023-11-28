import useGetAllBrands from "../hooks/useGetAllBrands";
import { brands } from "../data/brands.ts";
import { useStore } from "../store.ts";
import getBrandImage from "./brandImage";
import InfiniteScroll from "react-infinite-scroll-component";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

const Motorcycles = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useGetAllBrands();
  const { model, setModel, setMarkModel, markModel } = useStore();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const models = data?.pages.flatMap((page) => page.data) ?? [];
  const filteredModels = models?.find((x) => x.id === markModel);

  let brandImage;
  if (filteredModels && filteredModels.make) {
    brandImage = getBrandImage(filteredModels.make);
  }

  return (
    <>
      <div>
        <Menu>
          <MenuButton as={Button}>{model || "Select a Brand"}</MenuButton>
          <MenuList>
            {brands?.map((brand) => (
              <MenuItem key={brand} onClick={() => setModel(brand)}>
                {brand}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton as={Button}>
            {filteredModels?.model || "Select model.."}
          </MenuButton>
          <MenuList>
            <InfiniteScroll
              dataLength={models.length}
              next={fetchNextPage}
              hasMore={hasNextPage ?? false}
              loader={<h4>Loading...</h4>}
              endMessage={
                <p style={{ textAlign: "center" }}>
                  <b>Yay! You have seen it all</b>
                </p>
              }
            >
              {models?.map((brand) => (
                <MenuItem key={brand.id} onClick={() => setMarkModel(brand.id)}>
                  {brand.model}
                  {"-"}
                  {brand.year}
                </MenuItem>
              ))}
            </InfiniteScroll>
          </MenuList>
        </Menu>
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
        <p>Weight: {filteredModels?.total_weight}</p>
      </div>
    </>
  );
};

export default Motorcycles;
