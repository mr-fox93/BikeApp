import useGetAllBrands from "../hooks/useGetAllBrands";
import { brands } from "../data/brands.ts";
import { useStore } from "../store.ts";
import InfiniteScroll from "react-infinite-scroll-component";

//import getBrandImage from "./brandImage";
//import { useState } from "react";

//import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

const Motorcycles = () => {
  const { data, isLoading, error, fetchNextPage, hasNextPage } =
    useGetAllBrands();
  const { model, setModel } = useStore();
  //const [currentIndex, setCurrentIndex] = useState<number>(0);

  // useEffect(() => {
  //   console.log(currentIndex);
  //   if (currentIndex >= 29) {
  //     fetchNextPage();
  //   }
  // }, [currentIndex]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;

  const models = data?.pages.flatMap((page) => page.data) ?? [];
  //const filteredModels = models?.find((x) => x.model === markModel);

  // let brandImage;
  // if (filteredModels && filteredModels.make) {
  //   brandImage = getBrandImage(filteredModels.make);
  // }

  return (
    <>
      <div>
        <h2>Brands</h2>
        <select value={model} onChange={(e) => setModel(e.target.value)}>
          {brands?.map((x: string) => (
            <option key={x}>{x}</option>
          ))}
        </select>
        <InfiniteScroll
          dataLength={models.length} // długość obecnej listy
          next={fetchNextPage} // funkcja do ładowania kolejnej strony
          hasMore={hasNextPage ?? false} // czy jest więcej stron do załadowania
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <table className="ui celled padded table">
            <thead>
              <tr>
                <th>Index</th>
                <th>Make</th>
                <th>Model</th>
                <th>Year</th>
                <th>Type</th>
                <th>Seat Height</th>
                <th>Power</th>
              </tr>
            </thead>
            <tbody>
              {models?.map((item, index) => (
                <tr>
                  <td>{index}</td>
                  <td>{item.make}</td>
                  <td>{item.model}</td>
                  <td>{item.year}</td>
                  <td>{item.type}</td>
                  <td>{item.seat_height}</td>
                  <td>{item.power}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                {/* <th colspan="6">
        <!-- Tu możesz dodać paginację jeśli jest potrzebna -->
      </th> */}
              </tr>
            </tfoot>
          </table>
        </InfiniteScroll>

        <button onClick={() => fetchNextPage()}>Next</button>
      </div>
    </>
  );
};

export default Motorcycles;

// import useGetAllBrands from "../hooks/useGetAllBrands";
// import { brands } from "../data/brands.ts";
// import { useStore } from "../store.ts";
// import getBrandImage from "./brandImage";
// //import { useState } from "react";

// import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";

// const Motorcycles = () => {
//   const { data, isLoading, error, fetchNextPage } = useGetAllBrands();
//   const { model, setModel, setMarkModel, markModel } = useStore();
//   //const [currentIndex, setCurrentIndex] = useState<number>(0);

//   // useEffect(() => {
//   //   console.log(currentIndex);
//   //   if (currentIndex >= 29) {
//   //     fetchNextPage();
//   //   }
//   // }, [currentIndex]);

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Error occurred</div>;

//   const models = data?.pages.flatMap((page) => page.data);
//   const filteredModels = models?.find((x) => x.model === markModel);

//   let brandImage;
//   if (filteredModels && filteredModels.make) {
//     brandImage = getBrandImage(filteredModels.make);
//   }

//   return (
//     <>
//       <div>
//         <h2>Brands</h2>
//         <select value={model} onChange={(e) => setModel(e.target.value)}>
//           {brands?.map((x: string) => (
//             <option key={x}>{x}</option>
//           ))}
//         </select>

//         <Menu>
//           <MenuButton as={Button}>{markModel || "Select model.."}</MenuButton>
//           <MenuList>
//             {models?.map((brand) => (
//               <MenuItem
//                 key={brand.id}
//                 onClick={() => setMarkModel(brand.model)}
//                 //onMouseEnter={() => setCurrentIndex(index)}
//               >
//                 {brand.model}
//               </MenuItem>
//             ))}
//           </MenuList>
//         </Menu>

//         <button onClick={() => fetchNextPage()}>Next</button>
//       </div>
//       <div>
//         <h2>Models</h2>
//         {brandImage && (
//           <img
//             style={{ width: "150px", height: "90px" }}
//             src={brandImage}
//             alt={filteredModels?.make}
//           />
//         )}
//         <p>Make: {filteredModels?.make}</p>
//         <p>Model: {filteredModels?.model}</p>
//         <p>Type: {filteredModels?.type}</p>
//         <p>Year: {filteredModels?.year}</p>
//         <p>Seat Height: {filteredModels?.seat_height}</p>
//         <p>Power: {filteredModels?.power ? filteredModels.power : "NaN"}</p>
//       </div>
//     </>
//   );
// };

// export default Motorcycles;
