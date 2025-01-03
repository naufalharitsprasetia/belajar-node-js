/** @format */
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// Flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// Setup EJS
app.set("view engine", "ejs");
app.use(expressLayouts); // Third Party Middleware
app.use(express.static("public")); // Built-in Middleware
app.use(express.urlencoded({ extended: true })); // Built-in Middleware

// Konfigurasi Flash
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 6000 },
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());

// Halaman Home
app.get("/", (req, res) => {
  const mahasiswa = [
    {
      nama: "Naufal Harits",
      email: "naufal@gmail.com",
    },
    {
      nama: "Erik Galih",
      email: "erik@gmail.com",
    },
    {
      nama: "Doddy Ferdiansyah",
      email: "doddy@gmail.com",
    },
  ];
  res.render("index", {
    nama: "Naufal Harits Prasetia",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main-layout",
  });
});

// Halaman About
app.get("/about", (req, res) => {
  res.render("about", {
    title: "Halaman About",
    layout: "layouts/main-layout",
  });
});

// Halaman Contact
app.get("/contact", async (req, res) => {
  const contacts = await Contact.find();

  res.render("contact", {
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// Halaman Detail Contact
app.get("/contact/:nama", async (req, res) => {
  //   const contact = findContact(req.params.nama);
  const contact = await Contact.findOne({ nama: req.params.nama });

  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.listen(port, () => {
  console.log(`Mongo Contact App | listening at http://localhost:${port}`);
});
