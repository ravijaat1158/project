import React, { useState, useEffect } from "react";
import Layout from "../Components/Layout";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
} from "recharts";

import PIEChart from "../Components/PieChart";

import axios from "axios";

const HomePage = () => {
  const [allData, setAllData] = useState([]);
  const [sector, setSector] = useState([]);

  const getAllData = async () => {
    const { data } = await axios.get("/api/v1/total/sectors");

    const AxiosSectorData = data.result;
    setAllData(AxiosSectorData);
  };

  const setSectorFunction = async (data) => {
    let uniqueElements = [...new Set(data)];

    const elementCounts = uniqueElements.map((value) => [
      value,
      data.filter((str) => str === value).length,
    ]);
    let array = [];
    for (let i = 0; i < elementCounts.length; i++) {
      if (elementCounts[i][0] === "") {
        array.push({
          name: "Others",
          Entries_in_Database: elementCounts[i][1],
        });
      } else {
        array.push({
          name: elementCounts[i][0],
          Entries_in_Database: elementCounts[i][1],
        });
      }
    }
    setSector(array);
  };

  useEffect(() => {
    getAllData();
  }, []);

  useEffect(() => {
    setSectorFunction(allData);
  }, [allData]);

  return (
    <Layout title={"Homepage-BlackCoffer"}>
      <div className="container m-5 border p-3">
        <h2 className="text-center mb-4">Sector Based Graphs</h2>
        <div className="column">
          <div className="lineGraph">
            <ResponsiveContainer width={"100%"} height={"200px"} aspect={3}>
              <LineChart data={sector} margin={"120px"} width={"100%"}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ color: "black" }} />
                <Legend />
                <Line
                  type="linear"
                  activeDot={{ r: 8 }}
                  dataKey="Entries_in_Database"
                  stroke="red"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div>
            <PIEChart />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;
