/** @format */

// console.log("Hello WPU");
// const nama = "Naufal Harits";
// const cetakNama = (nama) => `Hi, nama saya ${nama}`;
// console.log(cetakNama(nama));
// console.log(window);

// const cetakNama = require("./coba");

// // console.log("Hello WPU");
// console.log(cetakNama("Harits"));

// const fs = require("fs"); // Core Module
// const cetakNama = require("./coba"); // Local Module
// const moment = require("moment"); // Third party Module / Npm Module /  node_module
// console.log(cetakNama("Harits"));

const coba = require("./coba"); // Local Module

console.log(
  coba.cetakNama("Naufal"),
  coba.PI,
  coba.mahasiswa.cetakMhs(),
  new coba.Orang()
);
