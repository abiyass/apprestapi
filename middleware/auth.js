var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

exports.registrasi = function (req, res) {
  var post = {
    nama_user: req.body.nama_user,
    pass_user: md5(req.body.pass_user),
    id_level_user: req.body.id_level_user,
    foto: "user.jpg",
    aktivasi: 0,
  };

  var query = "SELECT nama_user FROM ?? WHERE ??=?";
  var table = ["user_tbl", "nama_user", post.nama_user];

  query = mysql.format(query, table);

  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 0) {
        var query = "INSERT INTO ?? SET ?";
        var table = ["user_tbl"];
        query = mysql.format(query, table);
        connection.query(query, post, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            response.ok("Berhasil menambahkan data user baru", res);
          }
        });
      } else {
        response.ok("Nama User sudah terdaftar !", res);
      }
    }
  });
};

// controller untuk login

exports.login = function (req, res) {
  var post = {
    pass_user: req.body.pass_user,
    nama_user: req.body.nama_user,
  };

  var query = "SELECT * FROM ?? WHERE ??=? AND ??=?";
  var table = [
    "user_tbl",
    "pass_user",
    md5(post.pass_user),
    "nama_user",
    post.nama_user,
  ];

  query = mysql.format(query, table);
  connection.query(query, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      if (rows.length == 1) {
        var token = jwt.sign({ rows }, config.secret, { expiresIn: 1440 });
        id_user = rows[0].id_user;
        var data = {
          id_user: id_user,
          token_akses: token,
          ip_address: ip.address(),
        };

        var query = "INSERT INTO ?? SET ?";
        var table = ["akses_token"];
        query = mysql.format(query, table);
        connection.query(query, data, function (error, rows) {
          if (error) {
            console.log(error);
          } else {
            res.json({
              success: true,
              message: "Token JWT tergenerate",
              token: token,
              currUser: data.id_user,
            });
          }
        });
      } else {
        res.json({
          error: true,
          message: "Nama User atau Password Salah ",
        });
      }
    }
  });
};
