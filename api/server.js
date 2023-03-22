// SUNUCUYU BU DOSYAYA KURUN
const express = require("express");
const userModel = require("./users/model");
const server = express();
server.use(express.json());

server.get("/api/users", async (req, res) => {
  try {
    //!find bir parametre almıyor
    const users = await userModel.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user.id) {
      res.json(user);
    } else {
      res
        .status(404)
        .json({ message: "Belirtilen ID'li kullanıcı bulunamadı" });
    }
  } catch (err) {
    res.status(500).json({ message: "Kullanıcı bilgileri alınamadı" });
  }
});
//!BİRİNCİ YÖNTEM:
// server.post("/api/users", (req, res) => {
//   try {
//     const user = req.body;
//     if (user.bio && user.name) {
//       userModel.insert(user).then((newUser) => {
//         res.status(201).json(newUser);
//       });
//     } else {
//       res
//         .status(400)
//         .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
//     }
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
//   }
// });
//!İKİNCİ YÖNTEM:
server.post("/api/users", async (req, res) => {
  try {
    const user = req.body;
    if (user.bio && user.name) {
      //!insert bir obje alıyor parametre olarak

      res.status(201).json(await userModel.insert(user));
    } else {
      res
        .status(400)
        .json({ message: "Lütfen kullanıcı için bir name ve bio sağlayın" });
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Veritabanına kaydedilirken bir hata oluştu" });
  }
});

module.exports = server; // SERVERINIZI EXPORT EDİN {}
