import React from "react";
import Layout from "../Components/Layout";
import { useParams } from "react-router-dom";

const SelectedCountry = () => {
  const params = useParams();

  return (
    <Layout title="Dahsbaoef">
      Hello User You are in {params.region} Region and {params.country} Country
      Page.
    </Layout>
  );
};

export default SelectedCountry;
