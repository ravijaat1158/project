import { useState, useEffect } from "react";
import axios from "axios";

export default function useCountries() {
  const [regions, setRegions] = useState([]);

  //get cat
  const getRegions = async () => {
    try {
      const { data } = await axios.get("/api/v1/regions");
      setRegions(data?.regions);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRegions();
  }, []);

  return regions;
}
