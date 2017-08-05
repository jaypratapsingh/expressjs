const express = require('express')
const app = express()
const cors = require('cors')
var bodyParser = require('body-parser');

const corsOptions = {
  origin: 'http://localhost:4200'
}

app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var MongoClient = require('mongodb').MongoClient


app.get('/', function(req, res) {
  
  MongoClient.connect('mongodb://localhost:27017/recipe', function (err, db) {
    if (err) throw err

    db.collection('unit').find().toArray(function (err, result) {
      if (err) throw err

      res.send(result)
      res.end()
    })
  })

})

app.post('/getResult', function(req, res) {

  MongoClient.connect('mongodb://localhost:27017/recipe', function (err, db) {
    if (err) throw err
    
      db.collection('FoodItem').find({name: req.body.name}).toArray(function (err, result) {
      
        if (err) throw err
      
        if(result.length>0)
          res.send(result)
        else
          res.send({"error":"No Data Found"})

      res.end()
    })

  })

})  

app.post('/getIngredient', function(req, res) {

  MongoClient.connect('mongodb://localhost:27017/recipe', function (err, db) {
    if (err) throw err
      var reqData = '/'+req.body.name+'/'

    db.collection('Recipe').find({ingredients: { $all: [reqData]}}).toArray(function (err, result) {
      
        if (err) throw err
      
        if(result.length>0)
          res.send(result)
        else
          res.send({"error":"No Data Found"})

      res.end()
    })

  })

})  



app.post('/saveNutrients', function(req, res) {

  MongoClient.connect('mongodb://localhost:27017/recipe', function (err, db) {
    if (err) throw err
      console.log(req.body.data)
      db.collection('nutrients').insert(req.body.data)
  })

})  



app.listen(3000, function() {

  console.log('running')
})

