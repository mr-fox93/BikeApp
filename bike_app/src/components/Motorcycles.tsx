import useGetAllBrands from "../hooks/useGetAllBrands";
import { brands } from "../data/brands.ts";
import { useStore } from "../store.ts";
import getBrandImage from "./brandImage";
import InfiniteScroll from "react-infinite-scroll-component";

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

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
  Image,
  Box,
  Input,
} from "@chakra-ui/react";
import { years } from "../data/years.ts";
import { useEffect } from "react";
import CheckIsYouFit from "./CheckIsYouFit.tsx";

const Motorcycles = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useGetAllBrands();
  const {
    model,
    setModel,
    setMarkModel,
    markModel,
    yearSelect,
    setYearSelect,
    setYourHeight,
    setBikeHeight,
    setHeightMessage,
    yourHeight,
  } = useStore();

  useEffect(() => {
    setYearSelect("");
  }, [model, setYearSelect]);

  useEffect(() => {
    setYourHeight("");
    setBikeHeight("");
    setHeightMessage("");
  }, [model, setYourHeight, setBikeHeight, setHeightMessage]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const models = data?.pages.flatMap((page) => page.data) ?? [];
  const filteredModels = models?.find((x) => x.id === markModel);

  let brandImage;
  if (filteredModels && filteredModels.make) {
    brandImage = getBrandImage(filteredModels.make);
  }

  const handleClick = (brand: Brand) => {
    setMarkModel(brand.id);
    setBikeHeight(brand.seat_height);
  };

  return (
    <>
      <div>
        <Flex
          justifyContent="center"
          marginTop="80px"
          marginBottom="20px"
          gap="10px"
        >
          <Flex flexDirection="column">
            <Text marginBottom="2px" fontSize="15px">
              Brand
            </Text>
            <Menu>
              <MenuButton as={Button}>{model || "Select a Brand"}</MenuButton>
              <MenuList maxHeight="300px" overflowY="auto">
                {brands?.map((brand) => (
                  <MenuItem key={brand} onClick={() => setModel(brand)}>
                    {brand}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Flex>

          <Menu>
            <Flex flexDirection="column">
              <Text marginBottom="2px" fontSize="15px">
                Model
              </Text>
              <MenuButton as={Button}>
                {filteredModels?.model || "Select model"}
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
                    <MenuItem key={brand.id} onClick={() => handleClick(brand)}>
                      {brand.model}
                      {"-"}
                      {brand.year}
                    </MenuItem>
                  ))}
                </InfiniteScroll>
              </MenuList>
            </Flex>
            <Flex flexDirection="column">
              <Text marginBottom="2px" fontSize="15px">
                Year
              </Text>
              <Menu>
                <MenuButton as={Button}>
                  {yearSelect || "Select year"}
                </MenuButton>
                <MenuList maxHeight="300px" overflowY="auto">
                  {years?.map((year) => (
                    <MenuItem key={year} onClick={() => setYearSelect(year)}>
                      {year}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
            </Flex>
          </Menu>
        </Flex>
      </div>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        p="20px"
      >
        <Input
          onChange={(e) => setYourHeight(e.target.value)}
          value={yourHeight}
          placeholder="put your height in cm ..."
        />
        <CheckIsYouFit />

        {brandImage && (
          <Image
            width="150px"
            height="90px"
            src={brandImage}
            alt={filteredModels?.make}
            marginBottom="20px"
          />
        )}
        <Flex
          direction={{ base: "column", md: "row" }}
          wrap="wrap"
          justifyContent="center"
          maxWidth="800px"
          gap="20px"
        >
          <Box>
            <Text>Make: {filteredModels?.make}</Text>
            <Text>Model: {filteredModels?.model}</Text>
            <Text>Type: {filteredModels?.type}</Text>
            <Text>Year: {filteredModels?.year}</Text>
          </Box>
          <Box>
            <Text>Seat Height: {filteredModels?.seat_height}</Text>
            <Text>
              Power: {filteredModels?.power ? filteredModels.power : "NaN"}
            </Text>
            <Text>Weight: {filteredModels?.total_weight}</Text>
            <Text>Displacement: data in future</Text>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default Motorcycles;
