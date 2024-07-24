const mongoose = require("mongoose");
const Property = require("../models/property");
const User = require("../models/user");

const propertyController = {
  createProperty: async (req, res) => {
    try {
      const { property_type, location, price, description, user_id } = req.body;

      const newProperty = new Property({
        property_type: property_type,
        location: location,
        price: price,
        description: description,
        user_id: user_id,
      });

      await newProperty.save();
      return res
        .status(200)
        .json({ message: "Property Created", newproperty: newProperty });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  myProperty: async (req, res) => {
    try {
      let { user_id } = req.body;
      console.log(user_id);
      user_id = new mongoose.Types.ObjectId(user_id);
      const userProperties = await Property.find({ user_id: user_id });
      return res
        .status(200)
        .json({ message: "Properties Retrived", myproperty: userProperties });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  editProperty: async (req, res) => {
    try {
      const {
        property_type,
        location,
        price,
        description,
        property_id,
        status,
      } = req.body;

      const updateProperty = await Property.findByIdAndUpdate(
        property_id,
        {
          property_type: property_type,
          location: location,
          price: price,
          description: description,
          status: status,
        },
        {
          new: true,
        }
      );

      return res.status(200).json({ message: "Property updated" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  deleteProperty: async (req, res) => {
    try {
      const { property_id } = req.body;
      const deletedProperty = await Property.findOneAndDelete(property_id);
      return res.status(200).json({ message: "Property deleted" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  allProperty: async (req, res) => {
    try {
      const allProperties = await Property.find({
        user_id: { $ne: req.userId },
        status: { $ne: 1 },
      });
      return res.status(200).json({
        message: "Properties Retrieved",
        allProperties: allProperties,
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  propertyFilter: async (req, res) => {
    try {
      let { property_type, price, location } = req.body;
      const filter = {};

      if(location){
        filter.location = location
      }

      if(property_type){
        filter.property_type = property_type
      }

      if(price){
        filter.price = price
      }

      const filtered = await Property.find(filter)

      return res.status(200).json({
        message: "Properties Filtered",
        filteredProperties: filtered,
      });

    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = propertyController;
