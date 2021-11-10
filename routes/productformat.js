const mongoose = require('mongoose');
const Products_schema = mongoose.model(
    'Products_schema',
    new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        url1: {
            type: String,
            required: true,
        },
        url2: {
            type: String,
            required: true,
        },
        description1: {
            type: String,
            required: true,
        },
        description2: {
            type: String,
            required: true,
        },
        price: {
            type: String,
            required: true,
        },
    })
);

module.exports = Products_schema;
