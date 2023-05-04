import express from "express";
import {
  getAllCountries,
  getAllData,
  getAllPestleRepeatition,
  getAllRegions,
  getAllRegionsRepeatition,
  getAllSectors,
  getCountriesOfSpecificRegion,
  getDataByCountry,
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

// get Total sector counts
router.get("/total/sectors", getAllSectors);

// get total regions 1000 enetites
router.get("/total/regions", getAllRegionsRepeatition);

router.get("/total/pestles", getAllPestleRepeatition);

// get data by country
router.get("/:country", getDataByCountry);

export default router;