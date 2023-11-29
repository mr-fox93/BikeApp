import axios from "axios";
import { useEffect } from "react";

const Test = () => {
  const fetchData = async () => {
    const options = {
      method: "GET",
      url: "https://motorcycles-by-api-ninjas.p.rapidapi.com/v1/motorcycles",
      params: {
        make: "Kawasaki",
        model: "Ninja",
      },
      headers: {
        "X-RapidAPI-Key": "369a2ec2a5mshf0f00df4b442215p142657jsn36ab34252691",
        "X-RapidAPI-Host": "motorcycles-by-api-ninjas.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Test</div>;
};

export default Test;
