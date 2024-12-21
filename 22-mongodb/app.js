/** @format */

const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const dbName = "wpu";

const client = new MongoClient(uri);

async function run() {
  try {
    // Menghubungkan ke MongoDB
    await client.connect();
    console.log("Koneksi ke database berhasil!");

    // Mengakses database dan koleksi
    const db = client.db(dbName);
    const mahasiswaCollection = db.collection("mahasiswa");

    // Mengambil semua data dari koleksi mahasiswa
    const mahasiswa = await mahasiswaCollection.find({}).toArray();

    // Menampilkan data
    console.log("Data mahasiswa:");
    console.log(mahasiswa);
  } catch (err) {
    console.error("Terjadi kesalahan:", err);
  } finally {
    // Menutup koneksi
    await client.close();
  }
}

// Menjalankan fungsi utama
run().catch((err) => console.log("Gagal:", err));

// find by id / nama
// Edit data
// Delete data
