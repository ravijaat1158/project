import React from "react";
import { useState, useEffect } from "react";
import { PieChart, Pie, Tooltip, Legend } from "recharts";
import axios from "axios";

const PIEChart = () => {
  const [allData, setAllData] = useState([]);
  const [sector, setSector] = useState([]);
  const [graphData, setGraphData] = useState([]);

  const getAllData = async () => {
    const { data } = await axios.get("/api/v1/total/sectors");

    const AxiosSectorData = data.result;
    setAllData(AxiosSectorData);
  };

  const setSectorFunction = async () => {
    let uniqueElements = [...new Set(allData)];

    const elementCounts = uniqueElements.map((value) => [
      value,
      allData.filter((str) => str === value).length,
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
    setSectorFunction();
  }, [allData]);

  return (
    <PieChart className="PIECHART" width={300} height={250}>
      <Pie
        data={sector}
        dataKey="Entries_in_Database"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        innerRadius={65}
        fill="#eded3c"
      />
      {/* <Legend/> */}
      <Tooltip />
    </PieChart>
  );
};

export default PIEChart;
