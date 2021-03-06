# Open CSS Loader
Check the app here: [https://opencssloader.netlify.app/](https://opencssloader.netlify.app/). The Structure of the application is:

    Node.js : Backend API
    Detabase : Database
    HTML/CSS/jQuery/Ace.js : Frontend

The aim of the project is to provide a number of css loaders for your web page, So you can concentrate on what matters the most.
--<!-- markdownlint-capture -->

## Local Deployment

First make sure you have node.js and Node Package Manager (npm) installed.

1. Clone the Repository by `git clone URL`
1. Run `npm install` to donwload all the required packages
1. Create a .env file and add the Following values in it
   
```
PRIMARY_KEY // primart key for the deta
SECRET_KEY //Your Secret Password which allows you to set popups
```

Goto `public\data.js` and set the `url = http://localhost:3000/` 
in the `index.js` and `/routes/index.js` files, set the `origin`under `corsOption` as `"*"` 
i.e. 
```javascript
corsOption {
    var corsOptions = {
  origin: 'https://opencssloader.netlify.app',   // Change this to * or to your site
  optionsSuccessStatus: 200
}
```

1. Run `node app.js` or `nodemon app.js` if you have nodemon installed.
2. Goto [localhost:3000](http://localhost:3000) to see the app working.
