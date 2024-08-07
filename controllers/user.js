const User = require("../models/user");
const Topic = require('../models/topic');
const Selected = require('../models/selected');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const axios = require('axios');


exports.signuppage = async(req, res) =>{
    try {
        res.render('signup');
    } catch (error) {
        console.error('Error fetching signup page', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

exports.creatuser = async(req, res) =>{
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
          res.redirect('/signin');
    } catch (error) {
        console.error('Error signingup', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

exports.signinpage = async(req, res) =>{
    try {
        res.render('signin');
    } catch (error) {
        console.error('Error fetching signup page', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}


exports.getuser = async(req, res) =>{
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

      res.cookie("token", token, {
        httpOnly: true,
      });

      res.redirect('/index');

    } catch (error) {
        console.error('Error  signing in ', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

exports.indexpage = async(req, res) =>{
    try {
  
        const user = req.user;
       
        const topics = await Topic.find();
        
        const selectedTopics = await Selected.find({userId: user.id}).populate('userId').populate('topicId');
        
        
       const selectedTopicArrays = selectedTopics.map(doc => doc.topicId).flat();


        res.render('index', {topics, selectedTopicArrays, user : req.user});

        
    } catch (error) {
        console.error('Error fetching index page', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

exports.remove = async(req,res) => {
    try {

        const user = req.user;
       
        const topicIdToRemove = req.body.topicarrayId;

        
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


return res.redirect('/index');

        
    } catch (error) {
        console.error('Error removing Topic', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}

exports.view = async(req, res) => {
    try {

        const topicname = req.body.topicname
        
       const userId = req.user.id;

       const userdata = await User.findById(userId)
    
        const API_KEY = process.env.API_KEY;

        const category = topicname.toLowerCase();
        const language = userdata.language;

        const API_URL = `https://api.currentsapi.services/v1/search?category=${category}&language=${language}&apiKey=${API_KEY}`;

        const response = await axios.get(API_URL);

        const articles = response.data.news;

        res.render('newspage', { articles });
        
    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ message: 'Error fetching news' });
        
    }
}

exports.search = async(req, res) => {
    try {
     const word = req.query.search;
    

    const userId = req.user.id;

       const userdata = await User.findById(userId)

    const API_KEY = process.env.API_KEY;

     const keywords = word.toLowerCase();
     const language = userdata.language;

     const API_URL = `https://api.currentsapi.services/v1/search?keywords=${keywords}&language=${language}&apiKey=${API_KEY}`;

     const response = await axios.get(API_URL);

     const articles = response.data.news;

     res.render('newspage', { articles });

    } catch (error) {
        console.error('Error fetching news:', error.message);
        res.status(500).json({ message: 'Error fetching news' });
        
    }
}


exports.saveLanguage = async (req, res) => {
    try {
      const { language } = req.body;
  
      
      const userId = req.user.id;
    
  
      // Find the user by ID and update their preferred language
      const user = await User.findByIdAndUpdate(userId, { language }, { new: true });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.json({ success: true, user });
    } catch (error) {
      console.error('Error saving language', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  


exports.logout = async(req, res) =>{
    try {
        res.clearCookie('token').redirect('/signin');
    } catch (error) {
        console.error('Error singing out', error);
		res.status(500).json({ message: 'Internal server error' });
    }
}