import mongoose from 'mongoose';


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

export const Selected = mongoose.model('Selected', selectedSchema);