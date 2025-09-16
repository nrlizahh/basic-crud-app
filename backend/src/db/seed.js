const pool = require("./config");
const bcrypt = require("../helpers/bcrypt"); // helper bcryptjs

async function seed() {
  try {
    //  Users
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
    const productData = [
      [
        "Smartphone X1",
        "Smartphone canggih dengan layar AMOLED 6.5 inci dan kamera 108MP.",
      ],
      [
        "Wireless Headphones Z",
        "Headphone nirkabel dengan noise cancelling dan baterai tahan 30 jam.",
      ],
      [
        "Gaming Laptop Pro",
        "Laptop gaming dengan prosesor Intel i7 dan GPU RTX 3060 untuk performa tinggi.",
      ],
      [
        "Smartwatch Fit 2",
        "Jam tangan pintar dengan fitur tracking kesehatan dan notifikasi pintar.",
      ],
      [
        "Bluetooth Speaker Boom",
        "Speaker portable dengan suara jernih dan tahan air IPX7.",
      ],
      [
        "4K Action Camera",
        "Kamera aksi dengan resolusi 4K, tahan banting dan anti air.",
      ],
      [
        "Portable Charger 20000mAh",
        "Power bank berkapasitas besar dengan 2 port USB cepat.",
      ],
      [
        "Mechanical Keyboard RGB",
        "Keyboard mekanik dengan lampu RGB dan switch tactile responsif.",
      ],
      [
        "Noise Cancelling Earbuds",
        "Earbuds dengan noise cancelling aktif dan koneksi Bluetooth 5.2.",
      ],
      [
        "Smart Home Hub",
        "Alat pusat smart home untuk mengontrol lampu, kamera, dan perangkat IoT lainnya.",
      ],
      [
        "Eco Water Bottle",
        "Botol minum ramah lingkungan dengan material stainless steel.",
      ],
      [
        "Yoga Mat Pro",
        "Matras yoga tebal anti-slip, nyaman untuk semua jenis yoga.",
      ],
      [
        "Running Shoes Xtreme",
        "Sepatu lari dengan bantalan empuk dan desain ringan.",
      ],
      [
        "Fitness Tracker 2025",
        "Pelacak aktivitas dan detak jantung dengan layar OLED.",
      ],
      [
        "Electric Kettle Smart",
        "Teko listrik dengan kontrol suhu presisi dan auto shut-off.",
      ],
      [
        "Noise Cancelling Headphones",
        "Headphone dengan fitur peredam bising aktif dan suara jernih.",
      ],
      [
        "Portable Projector Mini",
        "Proyektor mini HD, ringan dan mudah dibawa untuk presentasi.",
      ],
      [
        "Smart Lamp WiFi",
        "Lampu pintar yang bisa dikontrol via aplikasi dan voice assistant.",
      ],
      [
        "Wireless Mouse Ergonomic",
        "Mouse nirkabel dengan desain ergonomis dan baterai tahan lama.",
      ],
      [
        "Coffee Grinder Electric",
        "Penggiling kopi elektrik dengan pengaturan tingkat kehalusan.",
      ],
    ];

    for (let i = 0; i < productData.length; i++) {
      const [name, description] = productData[i];
      const user_id = i < 10 ? 1 : 2; 
      const image_url = `https://picsum.photos/300?random=${i + 1}`;

      await pool.query(
        "INSERT INTO products (name, description, image_url, user_id) VALUES ($1, $2, $3, $4)",
        [name, description, image_url, user_id]
      );
    }

    console.log("Successfully seeded database");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    pool.end();
  }
}

seed();
