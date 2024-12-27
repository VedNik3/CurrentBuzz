import {User} from "../models/user.js";
import {Topic} from '../models/topic.js';
import {Selected} from '../models/selected.js';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from 'axios';


export const signuppage = async(req, res) =>{
    try {
        res.render('signup');
    } catch (error) {
        console.error('Error fetching signup page', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

export const creatuser = async(req, res) =>{
    const {username, password} = req.body;
    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res
              .status(400)
              .send("Username already exists. Please choose a different username.");
          }

          const salt = await bcrypt.genSalt();
          const passwordHash = await bcrypt.hash(password, salt);

          const user = new User({
            username,
            password: passwordHash,
            
          });
          await user.save();
        //   res.redirect('/signin');
        return res.status(200).json({message : 'user is created'});

    } catch (error) {
        console.error('Error signingup', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

export const signinpage = async(req, res) =>{
    try {
        res.render('signin');
    } catch (error) {
        console.error('Error fetching signup page', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}


export const getuser = async(req, res) =>{
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
    
        if (!user) return res.status(401).send("Invalid username");
    
        const isMatch = await bcrypt.compare(password, user.password);
    
        if (!isMatch) return res.status(401).send("Invalid password");
    
        delete user.password;

    const userPayload = {
        id: user._id,
        username: user.username,
        
    };

    const token = jwt.sign(userPayload, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

   
    return res.status(200).json({ message: 'get user', token });


    } catch (error) {
        console.error('Error  signing in ', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

export const indexpage = async(req, res) =>{
    
    try {
       
        const user = req.user;
        
       
        const topics = await Topic.find();
        
        const selectedTopics = await Selected.find({userId: user.id}).populate('userId').populate('topicId');
        
        
       const selectedTopicArrays = selectedTopics.map(doc => doc.topicId).flat();
   
        return res.status(200).json({
            topics,
            selectedTopicArrays,
            userrole: user.isGuest,
        });

        
    } catch (error) {
        console.error('Error fetching index page', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

export const remove = async(req,res) => {
    try {

        const user = req.user;
       
        const topicIdToRemove = req.body.topicId;

        
        const selectedTopics = await Selected.find({userId: user.id});


        let documentContainingTopic = null;
        for (const doc of selectedTopics) {
            if (doc.topicId.includes(topicIdToRemove)) {
                documentContainingTopic = doc;
                break;
            }
        }

        // If no document contains the topicIdToRemove, send an appropriate response
        if (!documentContainingTopic) {
            return res.status(404).send({ message: 'Topic ID not found in user selections' });
        }

        // Remove the topicId from the document
        documentContainingTopic.topicId = documentContainingTopic.topicId.filter(topicId => !topicId.equals(topicIdToRemove));

        if (documentContainingTopic.topicId.length === 0) {
            // If array is empty, delete the whole document
            await documentContainingTopic.deleteOne();
            

        } else {
            // Save the updated document if topicId array is not empty
            await documentContainingTopic.save();
        }


// return res.redirect('/index');
return res.status(200).json({message : 'success'});

        
    } catch (error) {
        console.error('Error removing Topic', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

export const view = async(req, res) => {
    try {
        
        const topicname = req.body.topicName;
       
       const userId = req.user.id;

       const userdata = await User.findById(userId)
    
        const API_KEY = process.env.API_KEY;

        const category = topicname.toLowerCase();
        const language = userdata.language;

        const API_URL = `https://api.currentsapi.services/v1/search?category=${category}&language=${language}&apiKey=${API_KEY}`;

        const response = await axios.get(API_URL);

        const articles = response.data.news;

        
        return res.status(200).json({articles});
        
    } catch (error) {
        console.error('Error fetching news:', error.message);
       return res.status(500).json({ message: 'Error fetching news' });
        
    }
}

export const search = async(req, res) => {
    try {
     const word = req.body.query;
   
    

    const userId = req.user.id;

       const userdata = await User.findById(userId)

    const API_KEY = process.env.API_KEY;

     const keywords = word.toLowerCase();
     const language = userdata.language;

     const API_URL = `https://api.currentsapi.services/v1/search?keywords=${keywords}&language=${language}&apiKey=${API_KEY}`;

     const response = await axios.get(API_URL);

     const articles = response.data.news;

    //  res.render('newspage', { articles });
    return res.status(200).json({articles});

    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ message: 'Error fetching news' });
        
    }
}


export const saveLanguage = async (req, res) => {
    try {
      const language = req.body.languagecode;
    
      const userId = req.user.id;
    
  
      // Find the user by ID and update their preferred language
      const user = await User.findByIdAndUpdate(userId, { language }, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
    //   res.json({ success: true, user });
    return res.status(200).json({message : 'successfully set langauage'});
    } catch (error) {
      console.error('Error saving language', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


export const logout = async(req, res) =>{
    try {
        res.clearCookie('token').redirect('/signin');
    } catch (error) {
        console.error('Error singing out', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}