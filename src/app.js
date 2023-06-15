import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import xml2js  from "xml2js";


const app = express();
//const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(cors());
app.set("port",5000);
app.use(express.json());
app.use(morgan("dev"));

app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Headers', 'Content-Type')
    res.header('Access-Control-Allow-Headers', 'mytoken')
    next()
  })
import indexRoutes from "./routers/coustomer.routers.js";
//urlAPI
app.use("/api",indexRoutes);

// settings
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "ejs");

// middlewares

const parser = new xml2js.Parser();
app.get('/', (req, res) => {
     
  let num1 =4
  let num2 =5
  if (num1 < num2) {
    console.log("no")
    
  }else{
  
    res.send("120.0.0.13 =>session start");
  }
  });


  app.post("/api/xml", (req, res) => {
    let xmlData = '';
    req.on('data', (chunk) => {
      xmlData += chunk.toString();

    });

    req.on('end', ()=>{
      parser.parseString(xmlData, (err, results)=>{
        if(err){
          console.error('Error parsin XML:', err);
          res.status(400).send('Invalid XML');
        }else{
          console.log('Parsed XML:', results);
          res.status(200).send('XML data received');
        }
      });
    });
  });

// static files
//app.use(express.static(path.join(__dirname, "public")));

export default app;