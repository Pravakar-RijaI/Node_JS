const fs = require('fs');
const http = require('http');
const url = require('url');
const slugify = require('slugify');
const replaceTemplate = require('./modules/replaceTemplate');

const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, "utf-8");
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, "utf-8");
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, "utf-8");

const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const productData = JSON.parse(data);

const slugs = productData.map(el => slugify(el.productName, { lower: true }));
console.log(slugs);

const server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    //Overview Page
    if (pathname === "/" || pathname === "/overview") {
        res.writeHead(200, { "Content-type": "text/html" });
        const cardsHTML = productData.map(el => replaceTemplate(tempCard, el)).join('');
        const OverviewHTML = tempOverview.replace("{%PRODUCT_CARDS%}", cardsHTML);
        res.end(OverviewHTML);
    }
    else if (pathname === "/api") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.end(data);
    }

    //Product Page
    else if (pathname === "/product") {
        const product = productData[query.id]
        const productHTML = replaceTemplate(tempProduct, product);
        res.end(productHTML);
    }

    //Not Found
    else {
        res.writeHead(404, {
            "Content-type": "text/html",
            "my-own-header": "hello-world"
        });
        res.end("<h1>Page Not Found</h1>");
    }
});

server.listen(8000, "127.0.0.1", () =>
    console.log("Listening for requests on port 8000..."));