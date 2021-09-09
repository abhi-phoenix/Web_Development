# xai-cyber
Express application which is for users to have a simulated network environment for cyber attacks

Technologies used:
1. Express 
2. mysql (downloaded mysql workbench, mysql server)
3. node js
4. ejs

Database Setup:
 -> Set path : set PATH=%PATH%;C:\Program Files\MySQL\MySQL Server 8.0\bin.
 -> Use this command to login to the database
    mysql -u root -p.
    You will be prompted to enter a password, enter it.
 -> Use source and the database name to run the sql file to create the database.
    source <filename>

Nodejs modules:
 -> All the dependency modules are in the package.json
 -> Use 'npm install' to install all the required modules.        

Run the application:
 -> run 'node app.js' in command prompt.

Launch the application:
 -> Open a browser of your choice.
 -> Go to this url with the api : login
    Ex: http://localhost:2000/login 
