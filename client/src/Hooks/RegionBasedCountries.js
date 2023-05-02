import { useState, useEffect } from "react";
import axios from "axios";

export default function useCountries() {
  const [countries, setCountries] = useState([]);

  //get cat
  const getCountries = async (region) => {
    try {
      const { data } = await axios.get(`/api/v1/region/${region}`);
      setCountries(data?.countries);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCountries();
  }, []);

  return countries;
}
