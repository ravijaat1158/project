import express from "express";
import {
  getAllCountries,
  getAllData,
  getAllRegions,
  getCountriesOfSpecificRegion,
  getDataBySingleCountry,
} from "../controllers/getDataController.js";

const router = express.Router();

// get all the data
router.get("/data", getAllData);

// get data by country name
router.get("/data/:country", getDataBySingleCountry);

// get All countries
router.get("/countries", getAllCountries);

// get all regions
router.get("/regions", getAllRegions);

// get country on basis of region
router.get("/region/:region", getCountriesOfSpecificRegion);

export default router;
