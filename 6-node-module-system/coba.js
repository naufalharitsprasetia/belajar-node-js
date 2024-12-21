/** @format */

// console.log("Hello World");
// const nama = "naufal";

function cetakNama(nama) {
  return `Halo, nama saya ${nama}`;
}

const PI = 3.14;

const mahasiswa = {
  nama: "Naufal Harits P",
  umur: 20,
  cetakMhs() {
    return `halo nama saya ${this.nama}, dan saya berumur ${this.umur} tahun`;
  },
};
class Orang {
  constructor() {
    console.log("Objek Orang Telah Dibuat");
  }
}

// module.exports.cetakNama = cetakNama;
// module.exports.PI = PI;
// module.exports.mahasiswa = mahasiswa;
// module.exports.Orang = Orang;
// module.exports = {
//   cetakNama: cetakNama,
//   PI: PI,
//   mahasiswa: mahasiswa,
//   Orang: Orang,
// };
module.exports = { cetakNama, PI, mahasiswa, Orang };
