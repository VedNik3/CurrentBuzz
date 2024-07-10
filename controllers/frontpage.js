const Topic = require('../models/topic');
const Selected = require('../models/selected');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.root = async(req, res) =>{
    try {

        const guestUserId = generateGuestUserId();
        
        // Generate a token for the guest user
        const token = jwt.sign({ id: guestUserId, isGuest: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
        res.cookie("token", token, {
            httpOnly: true,
          });

          res.redirect('/index');
        
    } catch (error) {
        console.error('Error fetching index page', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

exports.submittopics = async(req, res) =>{
    let selectedTopics = req.body;
    
    try {
        const user = req.user;

        
        const topics = await Topic.find(selectedTopics);
       
        const topicids = topics.map(t => t._id);
        
        await new Selected({
            userId: user.id,
            topicId: topicids
            
        }).save();

        res.redirect('/index');
    } catch (error) {
        console.error('Error saving topics:', error.message);
        res.status(500).json({ message: 'Error saving topics' });
    }
}

function generateGuestUserId() {
   
    return `guest_${Date.now()}`;
}