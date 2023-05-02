import React from "react";
import useRegions from "../Hooks/useRegions";
import { useNavigate } from "react-router-dom";

import { Layout, theme } from "antd";
const { Header } = Layout;

const Headers = () => {
  const navigate = useNavigate();
  const regions = useRegions();

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Header style={{ padding: 0, background: colorBgContainer }}>
      <div className="HeaderTop">
        <h2
          onClick={() => navigate("/")}
          className="headerTitle"
          style={{ padding: 13, cursor: "pointer" }}
        >
          BlackCoffer Project
        </h2>
        {/* <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Select Region
          </button>
                  <ul className="dropdown-menu force-scroll">
                      {
                          regions.map((c) =>
                              <li><Link className="dropdown-item" to={`/api/v1/region/${c}`}>{c}</Link></li>
                          )
                      }
          </ul>
        </div> */}
      </div>
    </Header>
  );
};

export default Headers;
