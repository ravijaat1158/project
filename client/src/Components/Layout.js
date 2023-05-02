import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Headers from "./Header";
import { Layout, theme, Select } from "antd";
import useRegions from "../Hooks/useRegions";
import axios from "axios";
import { Helmet } from "react-helmet";

const { Option } = Select;
const { Content, Footer } = Layout;

const Structure = ({ children, title, description, keywords, author }) => {
  const navigate = useNavigate();
  const regions = useRegions();
  const [regionCountries, setRegionCountries] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  const setRegionCountriesfunction = async () => {
    const { data } = await axios.get(`/api/v1/region/${selectedRegion}`);
    setRegionCountries(data?.countries);
  };
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <Layout>
        <Layout>
          <Headers />
          <Content
            style={{
              margin: "24px 16px 0",
            }}
          >
            <div
              style={{
                padding: 24,
                minHeight: 563,
                background: colorBgContainer,
              }}
            >
              <div className="column">
                <div className="">
                  <h5>Filters On Basis Of : </h5>{" "}
                </div>
                <Select
                  bordered={false}
                  placeholder="Select a Region"
                  size="large"
                  showSearch
                  className="form-selects"
                  onChange={(value) => {
                    setSelectedRegion(value);
                    setRegionCountriesfunction();
                  }}
                >
                  {regions?.map((c) => (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  ))}
                </Select>
                <Select
                  bordered={false}
                  placeholder="Select a Country"
                  size="large"
                  showSearch
                  className="form-selects"
                  onChange={(value) => {
                    setSelectedCountry(value);
                    navigate(`/api/v1/${selectedRegion}/${value}`);
                  }}
                >
                  {regionCountries?.map((c) => (
                    <Option key={c} value={c}>
                      {c}
                    </Option>
                  ))}
                </Select>
              </div>
              <hr />
              {children}
            </div>
          </Content>
          <Footer
            style={{
              textAlign: "center",
            }}
          >
            Copyrights © ravijaat2917@gmail.com
          </Footer>
        </Layout>
      </Layout>
    </div>
  );
};

Structure.defaultProps = {
  title: "BlackCoffer-Dashboard",
  description: "BlackCoffe project",
  keywords: "mern,react,node,mongodb",
  author: "ravijaat2917@gmail.com",
};
export default Structure;
