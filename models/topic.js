const mongoose = require('mongoose');

const topicSchema = new mongoose.Schema({
  topic: {
    type : String,
  },
  imageurl:{
   type: String,
  }
  
});

module.exports = mongoose.model('Topic', topicSchema);
