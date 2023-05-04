import React, { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Legend,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
} from "recharts";

const SelectedCountry = () => {
  const params = useParams();
  const country = params.country;

  const [countryData, setCountryData] = useState([]);
  const [dataLength, setDataLength] = useState(0);
  const [distinctTopic, setDistinctTopic] = useState([]);
  const [pestleData, setPestleData] = useState([]);

  // destructure data as need for chart
  const destructureDataAsChart = async (data) => {
    let d = [];
    for (let i = 0; i < data.length; i++) {
      d.push(data[i].topic);
    }
    // console.log(d);
    let uniqueElements = [...new Set(d)];
    // console.log(uniqueElements);

    const elementCounts = uniqueElements.map((value) => [
      value,
      d.filter((str) => str === value).length,
    ]);
    let array = [];
    for (let i = 0; i < elementCounts.length; i++) {
      //   console.log(elementCounts[i][0].topic);
      if (elementCounts[i][0] === "") {
        array.push({
          name: "Others",
          Topic_Entries_in_DataBase: elementCounts[i][1],
        });
      } else {
        array.push({
          name: elementCounts[i][0],
          Topic_Entries_in_DataBase: elementCounts[i][1],
        });
      }
    }
    setDistinctTopic(array);
  };
  const destructurePestleDataAsChart = async (data) => {
    let d = [];
    for (let i = 0; i < data.length; i++) {
      d.push(data[i].pestle);
    }
    // console.log(d);
    let uniqueElements = [...new Set(d)];
    // console.log(uniqueElements);

    const elementCounts = uniqueElements.map((value) => [
      value,
      d.filter((str) => str === value).length,
    ]);
    let array = [];
    for (let i = 0; i < elementCounts.length; i++) {
      //   console.log(elementCounts[i][0].topic);
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
    setPestleData(array);
  };
  // get Data by Country
  const getDataByCountry = async () => {
    const { data } = await axios.get(`/api/v1/${country}`);
    const length = data.length;
    const result = data.result;
    const distinctTopics = data.distinctTopic;
    const pestleD = data.pestle;
    setCountryData(result);
    setDataLength(length);
    destructureDataAsChart(distinctTopics);
    destructurePestleDataAsChart(pestleD);
  };

  useEffect(() => {
    getDataByCountry();
  }, [country]);
  return (
    <Layout title={`${country}-BlackCoffer`}>
      <div className="upperSideBox">
        <h6>Selected Country</h6>
        {country}
      </div>
      <div className="detailBox">
        <div>
          <h6>Entries Available : {dataLength}</h6>
        </div>
      </div>
      <div className="column1">
        <div className="column">
          <div className="lineGraph ">
            <ResponsiveContainer width={"100%"} height={"250px"} aspect={3}>
              <LineChart data={distinctTopic} margin={"120px"} width={"100%"}>
                <CartesianGrid strokeDasharray={"3 3"} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip contentStyle={{ color: "black" }} />
                <Legend />
                <Line
                  type="linear"
                  activeDot={{ r: 8 }}
                  dataKey="Topic_Entries_in_DataBase"
                  stroke="#02fa1b"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <div>
              <PieChart className="PIECHART" width={300} height={250}>
                <Pie
                  data={pestleData}
                  dataKey="Entries_in_Database"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  innerRadius={65}
                  fill="#f0654f"
                />
                {/* <Legend/> */}
                <Tooltip />
              </PieChart>
            </div>
            <div className="mt-4 text-center">Pestles In {country}</div>
          </div>
        </div>
      </div>
      {/* 
      <div>
        {JSON.stringify(distinctTopic)}
        {JSON.stringify(countryData)}
        {JSON.stringify(dataLength)}
      </div> */}
    </Layout>
  );
};

export default SelectedCountry;
