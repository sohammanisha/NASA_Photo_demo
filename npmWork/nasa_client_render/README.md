# Getting Started with Render Hosted web service.

https://nasa-photo-demo-client.onrender.com/login

## Give Valid username and password to login. Currently, in only one user is set up in MongoDB Atlas Cloud Database. Any other user cant login.
Username: test
Password: password

# In the PhotoGallery Page, User can view the photo fetched from NASA API POD with pagination support. 
Click on Previous and Next to move between Pages

# User can give search string in the search input box. Currently only one search string supports and that is by Photo title. 

For example: if User gives "moon", then the Photos whose title contains "Moon" will be shown. 


#### For locally run the system ####

# Install necessary React, Express, MongoDB, NodeJS.
1) First Install MongoDB. For example from https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-windows/
1) To run clients,  
	a) Go to the directory "nasa_client_render" directory where it got installed from GitHub "https://github.com/sohammanisha/NASA_Photo_demo.git"
	b) Then install packages by executing "npm install react-router-dom moment".
	c) Run "npm start".

2) To run server, 
	a) Go to the directory "nasa-photo-app" directory where it got installed from GitHub "https://github.com/sohammanisha/NASA_Photo_demo.git"
	b) Install packages by executing 
		i) npm install; 
		ii) npm install mongoose; 
		iii) npm install express-session connect-mongo mongoose dotenv
	c) run "node server.js"
3) 

###########  There are several places where this application can be improved #################
### Now, server.js handles all the routes. Instead routes can be exported to server.js
##### Create Users can be made, Modify an user. 
##### Now count is set to 50 and returns random images each time, so search results change unpredictably. If "earth" appears in one random set but not the next, search results vary 
###### and be predicted (hopefully) if the images are stored in session. 