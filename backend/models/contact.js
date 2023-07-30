const mongoose = require("mongoose");

const {model , Schema } = mongoose;

const QuerySchema = new Schema({
    name: {type: String},
    email: {type: String},
    query: {type: String},
}) 

const QueryModel = model('query', QuerySchema);

module.exports = QueryModel;