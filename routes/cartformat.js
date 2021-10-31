const mongoose = require('mongoose');

const cart_schema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    
    title:{
        type: String,
        required: true,
    },
      url: {
        type: String,
        required : true,
    },
    description1:{
        type: String,
        required : true,
    },
    price:{
        type: String,
        required : true,
    }
}
);
 

module.exports = mongoose.model('cartformat',cart_schema); 
// exporting the schematype of news
//cart_schema.set('validateBeforeSave',false)