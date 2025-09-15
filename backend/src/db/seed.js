const pool = require("./config");
const bcrypt = require("../helpers/bcrypt"); // helper bcryptjs

async function seed() {
  try {
    const users = [
      { username: "tangsa", password: "123456" },
      { username: "budi", password: "67890" },
    ];

    for (const user of users) {
      const hashPassword = bcrypt.hashPassword(user.password);
      await pool.query(
        "INSERT INTO users (username, password) VALUES ($1, $2)",
        [user.username, hashPassword]
      );
    }

    const products = [
      {
        name: "Smartphone X1",
        description:
          "Smartphone canggih dengan layar AMOLED 6.5 inci dan kamera 108MP.",
        user_id: 1,
      },
      {
        name: "Wireless Headphones Z",
        description:
          "Headphone nirkabel dengan noise cancelling dan baterai tahan 30 jam.",
        user_id: 1,
      },
      {
        name: "Gaming Laptop Pro",
        description:
          "Laptop gaming dengan prosesor Intel i7 dan GPU RTX 3060 untuk performa tinggi.",
        user_id: 1,
      },
      {
        name: "Smartwatch Fit 2",
        description:
          "Jam tangan pintar dengan fitur tracking kesehatan dan notifikasi pintar.",
        user_id: 1,
      },
      {
        name: "Bluetooth Speaker Boom",
        description: "Speaker portable dengan suara jernih dan tahan air IPX7.",
        user_id: 1,
      },
      {
        name: "4K Action Camera",
        description:
          "Kamera aksi dengan resolusi 4K, tahan banting dan anti air.",
        user_id: 1,
      },
      {
        name: "Portable Charger 20000mAh",
        description: "Power bank berkapasitas besar dengan 2 port USB cepat.",
        user_id: 1,
      },
      {
        name: "Mechanical Keyboard RGB",
        description:
          "Keyboard mekanik dengan lampu RGB dan switch tactile responsif.",
        user_id: 1,
      },
      {
        name: "Noise Cancelling Earbuds",
        description:
          "Earbuds dengan noise cancelling aktif dan koneksi Bluetooth 5.2.",
        user_id: 1,
      },
      {
        name: "Smart Home Hub",
        description:
          "Alat pusat smart home untuk mengontrol lampu, kamera, dan perangkat IoT lainnya.",
        user_id: 1,
      },
      {
        name: "Eco Water Bottle",
        description:
          "Botol minum ramah lingkungan dengan material stainless steel.",
        user_id: 2,
      },
      {
        name: "Yoga Mat Pro",
        description:
          "Matras yoga tebal anti-slip, nyaman untuk semua jenis yoga.",
        user_id: 2,
      },
      {
        name: "Running Shoes Xtreme",
        description: "Sepatu lari dengan bantalan empuk dan desain ringan.",
        user_id: 2,
      },
      {
        name: "Fitness Tracker 2025",
        description: "Pelacak aktivitas dan detak jantung dengan layar OLED.",
        user_id: 2,
      },
      {
        name: "Electric Kettle Smart",
        description:
          "Teko listrik dengan kontrol suhu presisi dan auto shut-off.",
        user_id: 2,
      },
      {
        name: "Noise Cancelling Headphones",
        description:
          "Headphone dengan fitur peredam bising aktif dan suara jernih.",
        user_id: 2,
      },
      {
        name: "Portable Projector Mini",
        description:
          "Proyektor mini HD, ringan dan mudah dibawa untuk presentasi.",
        user_id: 2,
      },
      {
        name: "Smart Lamp WiFi",
        description:
          "Lampu pintar yang bisa dikontrol via aplikasi dan voice assistant.",
        user_id: 2,
      },
      {
        name: "Wireless Mouse Ergonomic",
        description:
          "Mouse nirkabel dengan desain ergonomis dan baterai tahan lama.",
        user_id: 2,
      },
      {
        name: "Coffee Grinder Electric",
        description:
          "Penggiling kopi elektrik dengan pengaturan tingkat kehalusan.",
        user_id: 2,
      },
    ];

    for (const product of products) {
      await pool.query(
        "INSERT INTO products (name, description, user_id) VALUES ($1, $2, $3)",
        [product.name, product.description, product.user_id]
      );
    }

    console.log("Seeding selesai ✅");
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    pool.end();
  }
}

seed();
