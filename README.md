# AninoExam

### How to run application:
1) Install nodejs.

2) go to the root directory where index.js is found.

3) open cmd from this root directory and type:
  - **npm install nodemon**.
  - (I had nodemon installed globally so its not included to the node_modules here)
  
4) create your own .env file on the root directory with the following (not including '<>'):
- DB_CONNECTION_LOCAL=\<your local mongodb access link here\> (if using local)
- DB_CONNECTION_CLOUD=\<your cloud mongodb access link here\> (if using cloud)
- PORT = \<desired port\>

5) Head over to /setup/db.js and change the variable **dbConnection** to either **process.env.DB_CONNECTION_LOCAL** (for local) or **process.env.DB_CONNECTION_CLOUD** (for cloud).

6) type in cmd (from that root directory): 
- **npm start**

7) After performing #4, the app should now be listening on the given port at index.js (in this case, 3000).

Further testing was done through the use of postman in my side.
