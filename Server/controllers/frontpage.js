import {Topic} from '../models/topic.js';
import {Selected} from '../models/selected.js';
import jwt from 'jsonwebtoken';

export const root = async(req, res) =>{
    try {

        const guestUserId = generateGuestUserId();
        
        // Generate a token for the guest user
        const token = jwt.sign({ id: guestUserId, isGuest: true }, process.env.JWT_SECRET, { expiresIn: "1h" });
        
       
        return res.status(200).json({ message: 'Guest user', token });

        
    } catch (error) {
        console.error('Error fetching index page', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}



export const submittopics = async(req, res) => {
    try {
        const newlyselectedtopics = req.body; 
        const user = req.user;
        
        const topics = await Topic.find({
            topic: { $in: newlyselectedtopics.map(t => t.topic) }
        });
       
        const topicids = topics.map(t => t._id);
        
        await new Selected({
            userId: user.id,
            topicId: topicids
        }).save();

        return res.status(200).json({message: 'success'});
    } catch (error) {
        console.error('Error saving topics:', error.message);
        res.status(500).json({ message: 'Error saving topics' });
    }
}

function generateGuestUserId() {
   
    return `guest_${Date.now()}`;
}