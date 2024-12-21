/** @format */

// Core Module
//  File System
const fs = require("fs");

// Menuliskan string ke file (Synchronous)

// try {
//   fs.writeFileSync("data/test.txt", "Hello World Secara Synchronous");
// } catch (e) {
//   console.log(e);
// }

// Menuliskan String ke File (Asynchronous)
// fs.writeFile("data/test.txt", "Hello World Secara Asynchronous", (e) => {
//   console.log(e);
// });

// Membaca Isi File (Synchronous)
// const data = fs.readFileSync("data/test.txt", "utf-8");
// console.log(data);

// Membaca Isi File (ASynchronous)
// fs.readFile("data/test.txt", "utf-8", (err, data) => {
//   if (err) throw err;
//   console.log(data);
// });

// Readline
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Masukkan Nama Anda : ", (nama) => {
  // TO DO
  rl.question("Masukkan No HP Anda : ", (noHP) => {
    const contact = { nama, noHP };
    const file = fs.readFileSync("data/contacts.json", "utf8");
    const contacts = JSON.parse(file);

    contacts.push(contact);

    fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

    console.log("TERIMA KASIH TELAH MENGISIKAN DATA !!");

    rl.close();
  });
});
