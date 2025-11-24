const fs = require('fs'); //Access to reading and writing data into file system
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

const slugify = require('slugify');

//SERVERS---------------------------------------------//

//Reading the contents of HTMLs and storing as a string
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
);
const tempProd = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
);

//Reading the product JSON
const data = fs.readFileSync(`${__dirname}/dev_data/data.json`, 'utf-8'); //Synchronous as we need it to be run only once in beginning to fetch the data
const prodData = JSON.parse(data);

//Creating the server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true); //Fetch the pathName and the query

  //Overview Page
  if (pathname === '/overview' || pathname === '/') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });

    const cardsHtml = prodData
      .map((el) => replaceTemplate(tempCard, el))
      .join('');
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);

    //Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, {
      'content-type': 'text/html',
    });
    const product = prodData[query.id]; //Find the product corresponding to the ID in the URL
    const output = replaceTemplate(tempProd, product); //Replace the placeholders with the appropriate fields from that product
    res.end(output);

    //API
  } else if (pathname === '/api') {
    //When we are inside /api route, we send in the JSON result
    res.writeHead(200, {
      'content-type': 'application/json',
    });
    res.end(data);

    //Error Handling
  } else {
    res.writeHead(404, {
      'Content-type': 'text-html',
      'my-own-header': 'hello-world',
    });
    res.end('<h1>Page Not Found.</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening to requests on Port 8000....');
});
