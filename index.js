const express = require('express');
const app = express();
const port = 5000;
const { MongoClient , ServerApiVersion , ObjectId} = require('mongodb');
require('dotenv').config();
const cors = require('cors');

//middleware
app.use(cors());
app.use(express.json());


const { DB_USER , DB_PASS } = process.env;

const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@recipie-book-app.ifzwuw8.mongodb.net/?retryWrites=true&w=majority&appName=Recipie-Book-App`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});



async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    
    const carsCollection = client.db('carsdb').collection('cars');

    app.get('/',(req,res)=> {
      res.send('Hello from Server');
    })
    app.post('/addCar', async(req,res) => {
      const addCarData = req.body;
      // console.log(addCarData);
      const result = await carsCollection.insertOne(addCarData);
      res.send(result);
    });


    app.listen(port, ()=> {
    console.log(`Car Sale App listenting on port ${port}`);
    })
    // await client.db("admin").command({ ping: 1 });
    // console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    
  }
}
run().catch(console.dir);





