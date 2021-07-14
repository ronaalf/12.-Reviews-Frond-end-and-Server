const http = require('http');
require('dotenv/config');
const {MongoClient} = require('mongodb');
//const MongoClient = require('mongodb').MongoClient; **The other way to call mongodb

const path = require('path');
const fs = require('fs');


const client = new MongoClient(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect().then(result => {
//     console.log('CONNECTED!!!!');
// }, error => {
//     console.log(error);
// });

(async () => {
    await client.connect();
    const database = client.db('twitch');
    const collection = database.collection('recipes');
    // TO CREATE A NEW OBJECT
    // const result = await collection.insertOne({
    //     "name": "Chocolate Cookies",
    //     "ingredients": [
    //         "Eggs",
    //         "Flour",
    //         "Chocolate Chips"
    //     ]
    // }); 
    // console.log(result.insertedId);
    // client.close();

    // TO FIND AN OBJECT
    function getRecipient (id) {
    let recipesCursor = collection.find({}).project({"id": 1});
    let recipes = recipesCursor.toArray();
    // while(await recipesCursor.hasNext()) {
    //     let recipe = await recipesCursor.next();
    //     console.log(recipe);
    // }
    console.log(recipes);
    return recipes;
    }
    
    // TO UPDATE DATA
    let updateResults = await collection.updateOne({
        "name": "Chocolate Cookies"
    },
    {
        "$set": {
            "name": "Chocolate Chip Cookies"
        },
        "$addToSet": {
            "ingredients": "Sugar"
        }
    });
    console.log("UpdateOne: ", updateResults.modifiedCount);
    client.close();
})();

const server = http.createServer((req, res) => {
     //Build file path
     let filePath = path.join(
        __dirname,
        'public',
        req.url === '/' ? 'index.html' : req.url
    );
    //Extension of file
    let extname = path.extname(filePath);

    //Initial content type
    let contentType = 'text/html';

    //Check ext and set content type
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
    }

    //Read file
    fs.readFile(filePath, (err, content) => {
       if (err) {
           if (err.code === 'ENOENT') {
               //page not found
               fs.readFile(path.join(__dirname, 'public', '404.html'), (err, content) => {
                   res.writeHead(200, { 'Content-Type': 'text/html'});
                   res.end(content, 'utf8');
               });
           } else {
               //some server error
               res.writeHead(500);
               res.end(`Server Error: ${err.code}`);
           }
       } else {
           //Success
           res.writeHead(200, { 'Content-Type': contentType});
           res.end(content, 'utf8');
       }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server is running successfully at port ${PORT}! :D`));