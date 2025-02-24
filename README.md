# CurrentBuzz
## Author
* Vedant Nikam

## Project Description
CurrentBuzz is a personalized news website that allows users to customize their news feed based on their interests and preferred language. The website is built using a full-stack approach with technologies such as EJS, CSS, JavaScript, Express, Node.js, and MongoDB.

## Features
* Personalized News Feed: Users can select from 18 different news topics, including Technology, Health, Sports, Politics, Entertainment, Business, Science, Education, Crime, World, etc.
* Customizable Topics: Users can add or remove topics from their news feed as per their convenience.
* Language Preferences: Users can choose their preferred language for news content, and this preference is stored in the database for a personalized experience.
* Database Storage: User preferences for topics and language are stored in MongoDB, ensuring a consistent experience across sessions.

## Technologies Used
* EJS (Embedded JavaScript): For templating and dynamic content rendering.
* CSS: For styling the website.
* JavaScript: For client-side scripting.
* Express: As the web application framework for Node.js.
* Node.js: For server-side scripting.
* MongoDB: For storing user preferences and news data.
* Currents API: For fetching up-to-date news articles.

## Installation and Setup
1. Clone the repository:
   ```
   git clone https://github.com/VedNik3/CurrentBuzz.git
    ```

2. Go to the CurrentBuzz directory:
    ```
    cd CurrentBuzz
     ```
    
3. Install Dependencies:
   ```
   npm install express
   ```

4. Get API Key:
   * visit the Currents API's [official website](https://currentsapi.services/en)
   * Signup for free, then generate the token.
   *  Copy the token and paste it into the `.env` file as the value for `API_KEY`.

   
5. Run the server:

   ```
   npm start
   ```
   
6. Set up database:
   * Ensure MongoDB is installed and running on your machine with MongoDB Compass or Atlas
   * In .env file you can change your URL for MongoDB connection, as per your need.
   * Import the `news.topics.json` file into your MongoDB database's `topics collection`. This 
     file, located in the `jsondata folder`, contains the data of topics.
        
7. Vist the application:
   * Open your browser and go to `http://localhost:9000`


### Index page
![index page](./views/screenshots/image1.png)

### News page : 
### English
![news page](./views/screenshots/image2.png)

 ### Hindi
![news page](./views/screenshots/image3.png)

   

   
    
   


