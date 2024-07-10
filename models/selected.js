const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectedSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.Mixed,
        ref: "User",
    },
    
    // topic: {
    //     type: Schema.Types.Mixed
       
    //    },
    topicId: [{
        type: mongoose.Schema.Types.Mixed,
        ref: "Topic",
       
       }]

    // imageurl:{
    //     type: [String],
    //    }
});

module.exports = mongoose.model('Selected', selectedSchema);