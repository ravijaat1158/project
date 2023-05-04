import dataModel from "../models/dataModel.js";

export const getAllData = async (req, res) => {
  try {
    const result = await dataModel.find().select("-url").select("-start_year").select("-published").select("-title").select("-impact").select('-added').select('-end_year');
    if (result) {
      return res
        .status(200)
        .send({ success: true, message: "Data Getting Successfully", result });
    } else {
      return res.status(404).send({
        success: false,
        message: "Error in Getting Data",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ status: false, message: "Error in getting data from MongoDB" });
  }
};

export const getDataBySingleCountry = async (req, res) => {
  try {
    const { country } = req.params;
    const result = await dataModel.find({ country: country }).select("-url");
    if (result) {
      return res.status(200).send({
        success: true,
        message: "Data Getting Successfully",
        result,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Error in Getting Data",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in getting Single data from MongoDB",
    });
  }
};

export const getAllCountries = async (req, res) => {
  try {
    const countries = await dataModel.distinct("country");
    if (countries) {
      return res.status(200).send({
        success: true,
        message: "Data Getting Successfully",
        countries,
      });
    } else {
      return res.status(404).send({
        success: false,
        message: "Error in Getting Countries",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: false,
      message: "Error in getting Countries data from MongoDB",
    });
  }
};

export const getAllRegions = async (req, res) => {
  try {
    const regions = await dataModel.distinct("region");

    if (regions) {
      return res
        .status(200)
        .send({ success: true, message: "Regions Get successfully", regions });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Error in getting Regions" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in getting Regions" });
  }
};

export const getCountriesOfSpecificRegion = async (req, res) => {
  try {
    const { region } = req.params;
    const countries = await dataModel.find({ region }).distinct("country");
    if (countries) {
      return res.status(200).send({
        success: true,
        message: "Regions Get successfully",
        countries,
      });
    } else {
      return res.status(400).send({
        success: false,
        message: "Error in getting Regions And Countires",
      });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({ success: false, message: "Error in getting Regions" });
  }
};

export const getAllSectors = async (req, res) => {
  try {
    
    const result = await dataModel.find().select('sector');
    let sectors = [];
    result.map((s) => sectors.push(s.sector));
    return res.status(200).send({success:true , message:"Getting Successfully" , result:sectors})
    
  } catch (error) {
    console.log(error);
    return res.status(500).send({success:false , message:"Not getting Sector from DataBase"})
  }
}

export const getAllRegionsRepeatition = async (req, res) => {
  try {
    const result = await dataModel.find().select("region");
    let regions = [];
    result.map((s) => regions.push(s.region));
    return res.status(200).send({
      success: true,
      message: "Getting Successfully",
      result: regions,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Not getting Regions from DataBase" });
  }
};

export const getAllPestleRepeatition = async (req, res) => {
  try {
    const result = await dataModel.find().select("pestle");
    let pestles = [];
    result.map((s) => pestles.push(s.pestle));
    return res.status(200).send({
      success: true,
      message: "Getting Successfully",
      result: pestles,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Not getting Pestles from DataBase" });
  }
};

export const getDataByCountry = async (req, res) => {
  try {
    const result = await dataModel.find({ country: req.params.country });
    const pestle = await dataModel
      .find({ country: req.params.country })
      .select("pestle");
    const distinctTopic = await dataModel
      .find({ country: req.params.country }).select('topic');
    const length = result.length;
    return res
      .status(200)
      .send({
        success: true,
        message: "Data Get Successfully",
        length,
        result,
        distinctTopic,
        pestle
      });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .send({ success: false, message: "Not getting Country Data from DataBase" });
  }
}

