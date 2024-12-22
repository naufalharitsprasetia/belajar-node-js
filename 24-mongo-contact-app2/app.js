/** @format */
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const { body, validationResult, check } = require("express-validator");
const methodOverride = require("method-override");

require("./utils/db");
const Contact = require("./model/contact");

const app = express();
const port = 3000;

// Flash
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");

// Setup Method Override
app.use(methodOverride("_method"));
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

// Halaman Form Tambah Data Contact
app.get("/contact/add", (req, res) => {
  res.render("add-contact", {
    title: "Form Tambah Data Contact",
    layout: "layouts/main-layout",
  });
});

//  Proses Tambah Data Contact
app.post(
  "/contact/add",
  [
    body("nama").custom(async (value) => {
      const duplikat = await Contact.findOne({ nama: value });
      if (duplikat) {
        throw new Error("Nama Contact Sudah Terdaftar !!!");
      }
      return true;
    }),
    check("email", "Email tidak valid").isEmail(),
    check("nohp", "Nomer Handphone Tidak Valid").isMobilePhone("id-ID"),
  ],
  // Cek Error , Kalau Gak ada Add Contact
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render("add-contact", {
        title: "Form Tambah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
      });
    } else {
      await Contact.insertMany(req.body);
      // Kirimkan Flash Messages
      req.flash("msg", "Data Contact Berhasil Di Tambahkan");
      res.redirect("/contact");
    }
  }
);

// Hapus Contact
// app.get("/contact/delete/:nama", async (req, res) => {
//   const contact = await Contact.findOne({ nama: req.params.nama });
//   // jika contact tidak ada
//   if (!contact) {
//     res.status(404);
//     res.send("<h1>404</h1>");
//   } else {
//     Contact.deleteOne({ _id: contact._id }).then((result) => {
//       req.flash("msg", "Data Contact Berhasil Di HAPUS !!");
//       res.redirect("/contact");
//     });
//   }
// });
app.delete("/contact", (req, res) => {
  Contact.deleteOne({ nama: req.body.nama }).then((result) => {
    req.flash("msg", "Data Contact Berhasil Di HAPUS !!");
    res.redirect("/contact");
  });
});

// halaman Form Ubah Data Contact
app.get("/contact/edit/:nama", async (req, res) => {
  const contact = await Contact.findOne({ nama: req.params.nama });
  res.render("edit-contact", {
    title: "Form Ubah Data Contact",
    layout: "layouts/main-layout",
    contact,
  });
});

// Proses Ubah Data
app.put(
  // Route
  "/contact",
  // Validation
  [
    body("nama").custom(async (value, { req }) => {
      const duplikat = await Contact.findOne({ nama: value });
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
      res.render("edit-contact", {
        title: "Form Ubah Data Contact",
        layout: "layouts/main-layout",
        errors: errors.array(),
        contact: req.body,
      });
    } else {
      Contact.updateOne(
        { _id: req.body._id },
        {
          $set: {
            nama: req.body.nama,
            email: req.body.email,
            nohp: req.body.nohp,
          },
        }
      ).then((result) => {
        // Kirimkan Flash Messages
        req.flash("msg", "Data Contact Berhasil Di Ubah !!");
        res.redirect("/contact");
      });
    }
  }
);

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
