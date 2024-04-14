const express = require('express');
const axios = require('axios');
const cors = require('cors');
const cheerio = require('cheerio');
const { ScrapeUrls, ScrapeRecipes } = require('rethora-recipe-scraper');  
const scraper = require('@excelespina/ingredient-scraper');


const app = express();
const PORT = 5000;

let dairy = 0;
let gluten = 0;
let peanuts = 0;

app.use(cors()); 
app.use(express.json());

app.get('/scrape-recipe', async (req, res) => {
  let gluten = 0;
  let dairy = 0;
  let peanuts = 0;

  // Array to store promises for each fetch operation
const fetchPromises = JSON.parse(req.query.array).map(async (element) => {
  try {
    const axiosResponse = await axios.request({
      method: "GET",
      url: element,
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
      }
    });

    // Check if the response data includes the desired substrings

    if (axiosResponse.data.includes('bread')) {
      gluten++;
    } 
    if (axiosResponse.data.includes('cheese')) {
      dairy++;
    }
    if (axiosResponse.data.includes('peanut')) {
      peanuts++;
    }

    // Return an object containing the response data and the counts
    return {
      response: axiosResponse,
      counts: {
        gluten,
        dairy,
        peanuts
      }
    };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
});

// Wait for all fetch operations to complete
Promise.all(fetchPromises)
  .then(results => {
    // Process the results
    let resp = []
    results.forEach(result => {
      if (result) {
        // Access response data and counts
        const { response, counts } = result;
        console.log("Counts:", counts);
        resp.push(counts);
      } else {
        console.log("One of the fetch operations failed.");
      }
    });
    res.json(resp);
  })
  .catch(error => {
    console.error("Error:", error);
  });
});



// async function scrape(url) {
//   let r = [];

//   console.log(typeof(url));

//   url.forEach(async (element) => {
//     console.log(element);
//     const axiosResponse = await axios.request({
//     method: "GET",
//     url: "https://www.allrecipes.com/recipe/22831/alfredo-sauce/",
//     headers: {
//     "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
//         }
//     })
//     if(axiosResponse.data.includes('flour')) {
//       gluten++;
//     } 
//     if(axiosResponse.data.includes('cheese')){
//       dairy++;
//     }
//     if(axiosResponse.data.includes('peanut')){
//       peanuts++;
//     }
//     r.push(axiosResponse);
//     console.log(gluten, dairy, peanuts);

//   })


//   return(dairy);

  

//   // console.log(axiosResponse);
  
//   // const response = await scraper('https://www.allrecipes.com/recipe/22831/alfredo-sauce/');

//   // return response.cleaned.forEach(elem => {
//   //   console.log(elem.name)
// }

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});