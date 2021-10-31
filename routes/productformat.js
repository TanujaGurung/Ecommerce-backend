const mongoose = require('mongoose');

const products_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    title:{
        type: String,
        required: true,
    },
      url: {
        type: String,
        required : true,
    },
    url1: {
        type: String,
        required : true,
    },
    url2: {
        type: String,
        required : true,
    },
    description1:{
        type: String,
        required : true,
    },
    description2:{
        type: String,
        required : true,
    },
    price:{
        type: String,
        required : true,
    }
}
);
 

module.exports = mongoose.model('productformat',products_schema); 
// exporting the schematype of news
//feeds_schema.set('validateBeforeSave',false)