const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  firstLang: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  secondLang: {
    type: String,
    required: true,
    min: 1,
    max: 255,
  },
  comment: {
    type: String,
    required: false,
  },
  fileName: {
    type: String,
    required: true,
    max: 1024,
    min: 1,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  finishDate: {
    type: String,
    required: true,
  },
  orderStatus: {
    type: String,
    default: "pending",
  },
  orderPrice: {
    type: String,
    required: true,
  },
})

module.exports = mongoose.model("Order", orderSchema)
