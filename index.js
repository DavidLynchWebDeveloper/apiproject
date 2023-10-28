import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import axios from "axios";

const app = express();
const port = 3000
const API_URL = "https://api.openbrewerydb.org/v1/breweries/random";
let brewArray = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    });
});

app.get("/random", async (req, res) => {  
  brewArray = [];
  try {
      const result = await axios.get(API_URL);
      brewArray.push(result.data[0].name);
      brewArray.push(result.data[0].brewery_type);
      brewArray.push(result.data[0].address_1);
      brewArray.push(result.data[0].city);
      brewArray.push(result.data[0].state_province);
      brewArray.push(result.data[0].postal_code);
      brewArray.push(result.data[0].phone);
      brewArray.push(result.data[0].website_url);
      const content = {items: brewArray};
      res.render("random.ejs", content );
    } catch (error) {
      res.render("random.ejs", { content: JSON.stringify(error.response.data) });
    }
  });

  app.get("/bycity", async (req, res) => {  
    try {
        let url = "https://api.openbrewerydb.org/v1/breweries?by_city=san_diego&per_page=20";
        const result = await axios.get(url);
        let arr1 = [];
        let arr2 = [];
        for (var i=0;i<20;i++) {
           arr1.push(result.data[i].name);
           arr1.push(result.data[i].brewery_type);
           arr1.push(result.data[i].address_1);
           arr1.push(result.data[i].city);
           arr1.push(result.data[i].state_province);
           arr1.push(result.data[i].postal_code);
           arr1.push(result.data[i].phone);
           arr1.push(result.data[i].website_url);
           arr2.push(arr1);
           arr1 = [];
        }
        const content = {items: arr2};
        res.render("bycity.ejs", content );
      } catch (error) {
        res.render("bycity.ejs", { content: JSON.stringify(error.response.data) });
      }
    });

    app.get("/bytype", async (req, res) => {  
      try {
          let url = "https://api.openbrewerydb.org/v1/breweries?by_type=micro&per_page=20";
          const result = await axios.get(url);
          let arr1 = [];
          let arr2 = [];
          for (var i=0;i<20;i++) {
             arr1.push(result.data[i].name);
             arr1.push(result.data[i].brewery_type);
             arr1.push(result.data[i].address_1);
             arr1.push(result.data[i].city);
             arr1.push(result.data[i].state_province);
             arr1.push(result.data[i].postal_code);
             arr1.push(result.data[i].phone);
             arr1.push(result.data[i].website_url);
             arr2.push(arr1);
             arr1 = [];
          }
          const content = {items: arr2};
          res.render("bytype.ejs", content );
        } catch (error) {
          res.render("bytype.ejs", { content: JSON.stringify(error.response.data) });
        }
      });

      
    app.get("/bystate", async (req, res) => {  
      try {
        
          let url = "https://api.openbrewerydb.org/v1/breweries?by_state=new_york&per_page=20";
          const result = await axios.get(url);
          let arr1 = [];
          let arr2 = [];
          for (var i=0;i<20;i++) {
             arr1.push(result.data[i].name);
             arr1.push(result.data[i].brewery_type);
             arr1.push(result.data[i].address_1);
             arr1.push(result.data[i].city);
             arr1.push(result.data[i].state_province);
             arr1.push(result.data[i].postal_code);
             arr1.push(result.data[i].phone);
             arr1.push(result.data[i].website_url);
             arr2.push(arr1);
             arr1 = [];
          }
          const content = {items: arr2};
          res.render("bystate.ejs", content );
        } catch (error) {
          res.render("bystate.ejs", { content: JSON.stringify(error.response.data) });
        }
      });

      app.get("/byquery", async (req, res) => {  
        try {
          
            let url = "https://api.openbrewerydb.org/v1/breweries/search?query=dog&per_page=20";
            const result = await axios.get(url);
            let arr1 = [];
            let arr2 = [];
            for (var i=0;i<20;i++) {
               arr1.push(result.data[i].name);
               arr1.push(result.data[i].brewery_type);
               arr1.push(result.data[i].address_1);
               arr1.push(result.data[i].city);
               arr1.push(result.data[i].state_province);
               arr1.push(result.data[i].postal_code);
               arr1.push(result.data[i].phone);
               arr1.push(result.data[i].website_url);
               arr2.push(arr1);
               arr1 = [];
            }
            const content = {items: arr2};
            res.render("query.ejs", content );
          } catch (error) {
            res.render("query.ejs", content );
          }
        });

        app.get("/byname", async (req, res) => {  
          try { 
              let url = "https://api.openbrewerydb.org/v1/breweries?by_name=cooper&per_page=5";
              const result = await axios.get(url);
              let arr1 = [];
              let arr2 = [];
              for (var i=0;i<5;i++) {
                 arr1.push(result.data[i].name);
                 arr1.push(result.data[i].brewery_type);
                 arr1.push(result.data[i].address_1);
                 arr1.push(result.data[i].city);
                 arr1.push(result.data[i].state_province);
                 arr1.push(result.data[i].postal_code);
                 arr1.push(result.data[i].phone);
                 arr1.push(result.data[i].website_url);
                 arr2.push(arr1);
                 arr1 = [];
              }
              const content = {items: arr2};
              res.render("byname.ejs", content );
            } catch (error) {
              res.render("byname.ejs", content );
            }
          });

      app.post("/bytype", async (req, res) => { 
        let type = req.body.type;
        let qty = req.body.qty;
        let url = "https://api.openbrewerydb.org/v1/breweries/" + "?by_type=" + type + "&per_page=" + qty;
        try {
        const result = await axios.get(url);
        let getlen = result.data.length
        let arr1 = [];
        let arr2 = [];
        for (var i=0;i<getlen;i++) {
           arr1.push(result.data[i].name);
           arr1.push(result.data[i].brewery_type);
           arr1.push(result.data[i].address_1);
           arr1.push(result.data[i].city);
           arr1.push(result.data[i].state_province);
           arr1.push(result.data[i].postal_code);
           arr1.push(result.data[i].phone);
           arr1.push(result.data[i].website_url);
           arr2.push(arr1);
           arr1 = [];
        }
        const content = {items: arr2};
        res.render("bytype.ejs", content);
        } catch (error) {
          res.render("bytype.ejs", content);
        }
        });

    app.post("/bycity", async (req, res) => { 
      let city = req.body.city;
      let qty = req.body.qty;
      let url = "https://api.openbrewerydb.org/v1/breweries?by_city=" + city + "&per_page=" + qty;
      try {
        const result = await axios.get(url);
        let getlen = result.data.length;
        let arr1 = [];
        let arr2 = [];
        for (var i=0;i<getlen;i++) {
           arr1.push(result.data[i].name);
           arr1.push(result.data[i].brewery_type);
           arr1.push(result.data[i].address_1);
           arr1.push(result.data[i].city);
           arr1.push(result.data[i].state_province);
           arr1.push(result.data[i].postal_code);
           arr1.push(result.data[i].phone);
           arr1.push(result.data[i].website_url);
           arr2.push(arr1);
           arr1 = [];
        }
        const content = {items: arr2};
        res.render("bycity.ejs", content);
        } catch (error) {
          res.render("bycity.ejs", content);
        }
        });

        app.post("/bystate", async (req, res) => { 
          let state = req.body.state;
          let qty = req.body.qty;
          let url = "https://api.openbrewerydb.org/v1/breweries/?by_state=" + state + "&per_page=" + qty;
          try {
          const result = await axios.get(url);
          let getlen = result.data.length
          let arr1 = [];
          let arr2 = [];
          for (var i=0;i<getlen;i++) {
             arr1.push(result.data[i].name);
             arr1.push(result.data[i].brewery_type);
             arr1.push(result.data[i].address_1);
             arr1.push(result.data[i].city);
             arr1.push(result.data[i].state_province);
             arr1.push(result.data[i].postal_code);
             arr1.push(result.data[i].phone);
             arr1.push(result.data[i].website_url);
             arr2.push(arr1);
             arr1 = [];
          }
          const content = {items: arr2};
          res.render("bystate.ejs", content);
          } catch (error) {
          res.render("bystate.ejs", content);
          }
          });

          app.post("/byquery", async (req, res) => { 
            let queryin = req.body.query;
            let qty = req.body.qty;
            let url = "https://api.openbrewerydb.org/v1/breweries/search?query=" + queryin + "&per_page=" + qty;
            try {
            const result = await axios.get(url);
            let getlen = result.data.length
            let arr1 = [];
            let arr2 = [];
            for (var i=0;i<getlen;i++) {
               arr1.push(result.data[i].name);
               arr1.push(result.data[i].brewery_type);
               arr1.push(result.data[i].address_1);
               arr1.push(result.data[i].city);
               arr1.push(result.data[i].state_province);
               arr1.push(result.data[i].postal_code);
               arr1.push(result.data[i].phone);
               arr1.push(result.data[i].website_url);
               arr2.push(arr1);
               arr1 = [];
            }
            const content = {items: arr2};
            res.render("query.ejs", content);
            } catch (error) {
            res.render("query.ejs", content);
            }
            });

        
            app.post("/byname", async (req, res) => { 
              let namein = req.body.name;
              let qty = req.body.qty;
              let url = "https://api.openbrewerydb.org/v1/breweries?by_name=" + namein + "&per_page=" + qty;
              try {
              const result = await axios.get(url);
              let getlen = result.data.length
              let arr1 = [];
              let arr2 = [];
              for (var i=0;i<getlen;i++) {
                 arr1.push(result.data[i].name);
                 arr1.push(result.data[i].brewery_type);
                 arr1.push(result.data[i].address_1);
                 arr1.push(result.data[i].city);
                 arr1.push(result.data[i].state_province);
                 arr1.push(result.data[i].postal_code);
                 arr1.push(result.data[i].phone);
                 arr1.push(result.data[i].website_url);
                 arr2.push(arr1);
                 arr1 = [];
              }
              const content = {items: arr2};
              res.render("query.ejs", content);
              } catch (error) {
              res.render("query.ejs", content);
              }
              });
  

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


