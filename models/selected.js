const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectedSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.Mixed,
        ref: "User",
    },
    
    topicId: [{
        type: mongoose.Schema.Types.Mixed,
        ref: "Topic",
       
       }]

});

module.exports = mongoose.model('Selected', selectedSchema);