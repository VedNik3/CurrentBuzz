import mongoose from 'mongoose';

const topicSchema = new mongoose.Schema({
  topic: {
    type : String,
  },
  imageurl:{
   type: String,
  }
  
});

export const Topic = mongoose.model('Topic', topicSchema);
