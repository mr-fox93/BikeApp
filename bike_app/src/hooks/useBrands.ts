// import { useQuery } from "react-query";
// import apiClient from "../api-config";

// interface Brand {
//   make: string;
//   model: string;
//   brand: string;
// }

// const fetchBrands = async () => {
//   const response = await apiClient.get<Brand>(
//     "https://motorcycles-by-api-ninjas.p.rapidapi.com/v1/motorcycles",
//     {
//       params: {
//         make: "KTM",
//         //model: "Duke 390",
//       },

//       headers: {
//         "X-RapidAPI-Key": "369a2ec2a5mshf0f00df4b442215p142657jsn36ab34252691",
//         "X-RapidAPI-Host": "motorcycles-by-api-ninjas.p.rapidapi.com",
//       },
//     }
//   );
//   return response.data;
// };

// const useBrands = () => {
//   useQuery({
//     queryKey: ["brands"],
//     queryFn: fetchBrands,
//   });
// };

// export default useBrands;
