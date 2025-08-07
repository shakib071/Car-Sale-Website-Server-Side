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
    const carsBookingCollection = client.db('carsdb').collection('bookings');

    app.get('/',(req,res)=> {
      res.send('Hello from Server');
    });

    app.get('/allCars', async(req,res) => {
      
      if(req.query.sort){
        const sortquery = req.query.sort;
        if(sortquery.split('-')[0]=='date'){
          // console.log(sortquery.split('-')[0])
          const dateSortOrder = sortquery.split('-')[1] === 'asc' ? 1 : -1;
          try {
            const result = await carsCollection.find({}).sort({"carDetails.addedDate": dateSortOrder}).toArray();
            res.send(result);
          }
          catch(err){
            res.status(500).send({ error: "Failed to fetch cars" });
          }
        }
        else if(sortquery.split('-')[0]=='price'){
          // console.log('price');
          const priceSortOrder = sortquery.split('-')[1] === 'asc' ? 1 : -1;
            try {
            const result = await carsCollection.find({}).sort({"carDetails.dailyRentalPrice": priceSortOrder}).toArray();
            res.send(result);
          }
          catch(err){
            res.status(500).send({ error: "Failed to fetch cars" });
          }
        }
        else{
          const cursor = carsCollection.find();
          const result = await cursor.toArray();
          res.send(result);
        }
      }
      else{
        const cursor = carsCollection.find();
        const result = await cursor.toArray();
        res.send(result);
      }
      
      
    });

   ;
    
    app.get('/myCars/:userId', async(req,res) => {
      const userId = req.params.userId;
      const query = {"userWhoAdded.uid" : userId};
      const result = await carsCollection.find(query).toArray();
      res.send(result);
    });


    app.get('/car-details/:id', async(req,res) => {
      const id = req.params.id;
      const query = {_id : new ObjectId(id)};
      const result = await carsCollection.findOne(query);
      res.send(result);
    })


    app.get('/bookings/:userId',async(req,res) => {
      const userId = req.params.userId;
      const query = {"userWhoAdded.uid" : userId};
      const result = await carsBookingCollection.find(query).toArray();
      res.send(result);
    })





    app.post('/addCar', async(req,res) => {
      const addCarData = req.body;
      // console.log(addCarData);
      const result = await carsCollection.insertOne(addCarData);
      res.send(result);
    });


    app.post('/booking',async(req,res) => {
      const bookingData = req.body;
      const result = await carsBookingCollection.insertOne(bookingData);
      res.send(result);
    });



    app.patch('/update-booking-data/:id', async(req,res)=> {
      const id = req.params.id;
      const updatedField = req.body;
      
      try{
        const filter = {_id: new ObjectId(id)};
        const UpdatedBooking = { $set: updatedField };
        const result = await carsBookingCollection.updateOne(filter,UpdatedBooking);
        res.send(result);
      }
      catch(error) {
        res.status(500).send({error: 'Update Failed'});
      }
    });



    app.patch('/update-my-car/:id', async(req,res)=> {
      const id = req.params.id;
      const UpdatedDetails = req.body;

      const filter = {_id : new ObjectId(id)};
      const updateDoc = {
        $set:  UpdatedDetails
    
      }

      try{
        const result = await carsCollection.updateOne(filter,updateDoc);
        res.send(result);
      }
      catch(error){
        res.status(500).send({error: "Update Failed"});
      }
    })


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





