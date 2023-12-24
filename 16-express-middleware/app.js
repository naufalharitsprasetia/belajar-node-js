/** @format */
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

// Gunakan EJS
app.set("view engine", "ejs");
// Third Party Middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// Built-in Middleware
app.use(express.static("public"));

//  Application Level Middleware
app.use((req, res, next) => {
  console.log("Time : ", Date.now());
  next();
});
app.use((req, res, next) => {
  console.log("Ini MiddleWare ke-2 ");
  next();
});

// Route / Routing
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Naufal Harits",
      email: "naufal@gmail.com",
    },
  ];
  res.render("index", {
    nama: "Naufal Harits Prasetia",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});
app.get("/contact", (req, res) => {
  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
  });
});
app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID :  ${req.params.id} <br> Category ID : ${req.query.category}`
  );
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>Not Found 404....</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
