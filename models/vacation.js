/* eslint-disable linebreak-style */
"use strict";

const mongoose = require("mongoose"),
  { Schema } = require("mongoose");

var culinary_VacationSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true
    },
    heroImage:{
      type:String,
      default:"HeroImage.jpg",
      required:true
    },
    description: {
      type: String,
      required: true,
      default:"None specified",
      trim:true
    },
    cuisine: {
      type: String,
      //default: "",
      required: true,
      min: [0, "Vacation cannot have a negative number of students"]
    },
    cost: {
      type: Number,
      default: 0,
      min: [0, "Vacation packages cannot have a negative cost"]
    },
    maxTravelers: {
      type: Number,
      default: 0,
      min: [0, "Vacation packages cannot have more than 25 travelers"],
      max: [25, "Vacation packages cannot have a negative number of travelers"]
    },
    destination: {
      type: String,
      required: true,
      default: "None specified",
     
    },
    departureLocation: {
      type: String,
      default: "",
      required: true,
      
    },
    departureDate	: {
      type:Date,
      default:Date.now(),
      required: true,
    },
    returnDate:{
      type:Date,
      default:Date.now(),
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Vacation", culinary_VacationSchema);
