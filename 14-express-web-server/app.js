/** @format */
const express = require("express");
const app = express();
const port = 3000;

// Route / Routing
app.get("/", (req, res) => {
  // res.send("Hello World!");
  // res.json({
  //   nama: "Naufal",
  //   email: "naufal@gmail.com",
  //   number: "08122054923232",
  // });
  res.sendFile("./index.html", { root: __dirname });
});
app.get("/about", (req, res) => {
  // res.send("Ini Adalah About");
  res.sendFile("./about.html", { root: __dirname });
});
app.get("/contact", (req, res) => {
  // res.send("Ini Adalah Kontak");
  res.sendFile("./contact.html", { root: __dirname });
});
app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID :  ${req.params.id} <br> Category ID : ${req.query.category}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("<h1>Not Found 404....</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// const http = require("http");
// const fs = require("fs");

// const port = 3000;

// const renderHTML = (path, res) => {
//   fs.readFile(path, (err, data) => {
//     if (err) {
//       res.writeHead(404);
//       res.write("Error : File Not Found");
//     } else {
//       res.write(data);
//     }
//     res.end();
//   });
// };

// http
//   .createServer((req, res) => {
//     res.writeHead(200, {
//       "Content-type": "text/html",
//     });
//     const url = req.url;
//     switch (url) {
//       case "/about":
//         renderHTML("./about.html", res);
//         break;
//       case "/contact":
//         renderHTML("./contact.html", res);
//         break;
//       default:
//         renderHTML("./index.html", res);
//         break;
//     }
//   })
//   .listen(port, () => {
//     console.log(`Server is Listening on Port ${port}..`);
//   });
