# Getting Started with Render Hosted web service.

https://nasa-photo-demo-client.onrender.com/login

## Give Valid username and password to login. Currently, in only one user is set up in MongoDB Atlas Cloud Database. Any other user cant login.
Username: test
Password: password

# In the PhotoGallery Page:

Photoe are shown in a table with Title, Image and Show/Hide Details. 

# In the PhotoGallery Page, User can view the photo fetched from NASA API POD with pagination support. 
Click on Previous and Next to move between Pages

# User can give search string in the search input box. Currently only one search string supports and that is by Photo title. 

For example: if User gives "moon", then the Photos whose title contains "Moon" will be shown as it can be found in "SearchedWithMoon.png" in "nasa_client_render" folder.

# Now, Photoes by yearly are also displayed. For exampple, see "SearchedWithStar_And_YearlyBarchat_In_Render.png"  and "SearchedWithStar_And_YearlyBarchat_In_Renderpng_2.png" in "nasa_client_render" folder.

# User can logout from Photo Gallery Page by clicking Logout Button. 

#### For locally run the system ####

# Install necessary React, Express, MongoDB, NodeJS.


1) Get a NASA API Key by Sign up at NASA API and get an API key.
2) First Install MongoDB. For example from https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
3) To set up or run clients,  
   a) npx create-react-app "nasa_client_render" and then change directory by running "cd nasa_client_render"
   ------OR-------
   a) Go to the directory "nasa_client_render" directory where it got installed from GitHub "https://github.com/sohammanisha/NASA_Photo_demo.git" (URL:https://github.com/sohammanisha/NASA_Photo_demo/)
   b) Then install packages by executing "npm install react-router-dom moment axios d3".
   c) Run "npm start".

4) To set up and run server, 
        a) Create a new folder with name "nasa-photo-app" and then change to the nasa-photo-app directory 
           and initialize a Node.js project by running "npm init -y"
           -----OR----
       a) Go to the directory "nasa-photo-app" directory where it got installed from GitHub "https://github.com/sohammanisha/NASA_Photo_demo.git" (URL: https://github.com/sohammanisha/NASA_Photo_demo/)
       b) Set up an properties file, say name ".env" where Key from NAA API and the port the server will be set at first.
       b) Install packages by executing 
           i) npm install; 
           ii) npm install mongoose; 
           iii) npm install express-session connect-mongo mongoose dotenv natural cors
       c) run "node server.js"
   

##### Please note that as now Free Render web service hosting is taken, then the free instance will spin down with inactivity, 
#### Also, for the first time, loading of https://nasa-photo-demo-client.onrender.com/login may take some time as it is running in a free webservice as locally it is not taking time.

###########  There are several places where this application can be improved #################
### 1) Now, server.js handles all the routes. Instead routes can be exported to server.js
##### 2) Create Users can be made, Modify an user. 
##### 3) Now count is set to 50 and returns random images each time, so search results change unpredictably. If "earth" appears in one random set but not the next, search results vary 
and can be shown (hopefully) if the images are stored in session. 