import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (type, endpoint, page) => {
  const [error, seterror] = useState(null);
  const [data, setdata] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const option = {
    method: "GET",
    url: `https://api.themoviedb.org/3/${type}/${endpoint}?api_key=b095c2e4d7761a7c5e47f91b29058fef&page=${
      page ?? "1"
    }`,
  };

  const fetchdata = async () => {
    setisLoading(true);
    try {
      const reponse = await axios.request(option);
      setdata(reponse.data);
      setisLoading(false);
    } catch (error) {
      seterror(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const refetch = () => {
    setisLoading(true);
    fetchdata();
  };
  return { data, error, isLoading, refetch };
};

export default useFetch;
