/** @format */
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const {
  loadContact,
  findContact,
  addContact,
  cekDuplikat,
  deleteContact,
  updateContacts,
} = require("./utils/contacts");
const { check, body, validationResult } = require("express-validator");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

const app = express();
const port = 3000;

// Gunakan EJS
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
  const contacts = loadContact();
  res.render("contact", { 
    title: "Halaman Contact",
    layout: "layouts/main-layout",
    contacts,
    msg: req.flash("msg"),
  });
});

// Halaman Form Tambah Data Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

//  Proses Tambah Data Contact
app.post(
  // Route
  "/contact/add",
  // Validation
  [
    body("nama").custom((value) => {
      const duplikat = cekDuplikat(value);
      if (duplikat) {
        throw new Error("Nama Contact Sudah Terdaftar !!!");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "Nomer Handphone Tidak Valid").isMobilePhone("id-ID"),
  ],
  // Cek Error , Kalau Gak ada Add Contact
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      addContact(req.body);
      // Kirimkan Flash Messages
      req.flash("msg", "Data Contact Berhasil Di Tambahkan");
      res.redirect("/contact");
    }
  }
);

// Hapus Contact
app.get("/contact/delete/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  // jika contact tidak ada
  if (!contact) {
    res.status(404);
    res.send("<h1>404</h1>");
  } else {
    deleteContact(req.params.nama);
    req.flash("msg", "Data Contact Berhasil Di HAPUS !!");
    res.redirect("/contact");
  }
});

// halaman Form Ubah Data Contact
app.get("/contact/edit/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// Proses Ubah Data
app.post(
  // Route
  "/contact/update",
  // Validation
  [
    body("nama").custom((value, { req }) => {
      const duplikat = cekDuplikat(value);
      if (value !== req.body.oldNama && duplikat) {
        throw new Error("Nama Contact Sudah Terdaftar !!!");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "Nomer Handphone Tidak Valid").isMobilePhone("id-ID"),
  ],
  // Cek Error , Kalau Gak ada Add Contact
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // return res.status(400).json({ errors: errors.array() });
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      updateContacts(req.body);
      // Kirimkan Flash Messages
      req.flash("msg", "Data Contact Berhasil Di Ubah !!");
      res.redirect("/contact");
    }
  }
);

// Halaman Detail Contact
app.get("/contact/:nama", (req, res) => {
  const contact = findContact(req.params.nama);
  res.render("detail", {
    title: "Halaman Detail Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>Not Found 404....</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
