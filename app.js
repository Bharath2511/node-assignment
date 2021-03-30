const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const data = require("./models/data");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+'/public'));
app.set('view engine','ejs');


const url = `mongodb+srv://Bharath2511:Bharath2511@cluster0.oypkj.mongodb.net/userDatabase?retryWrites=true&w=majority`;

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}
mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })


app.get('/data',async(req,res) => {
    try {
        const records = await data.find({});
        if(records.length === 0) {
            return res.send("No data found");
        }
        console.log(records)
        res.render("data",{data:records});
    }
    catch(e) {
        console.log(e);
    }
})

app.post('/data',async(req,res)=>{
    try {
           const uidNumber = req.body.uidNumber;
           const serialNumber = req.body.serialNumber;
           const valueType = req.body.valueType;
           const scanType = req.body.scanType;
           const scanValue = req.body.scanValue;
           const actualValue = req.body.actualValue;
           const readingValue = req.body.readingValue;
           const abnormalityStatus = req.body.abnormalityStatus;
           const latitude = req.body.latitude;
           const longitude = req.body.longitude;
           const smallImage = req.body.smallImage;
           const bigImage = req.body.bigImage;
           const createdAt = req.body.createdAt;

           const newData = {uidNumber,serialNumber,valueType,scanType,scanValue,actualValue,readingValue,abnormalityStatus,latitude,longitude,smallImage,bigImage,createdAt};
           const result = await data.create(newData);    
           res.redirect('/');
        }
    catch(e) {
        console.log(e);
    }
    })
    


app.listen(8016,(req,res)=>{
    console.log("listening");
})

app.get('/index', function(req, res){
    res.render("form");
});

app.get('/', async function(req, res){
    try {
        const results = await data.find();
        if(results.length === 0) {
            return res.send("No Records To display");
        }
        res.render("data",{data:results});
    }
    catch(e) {
        console.log(e)
    }
});

