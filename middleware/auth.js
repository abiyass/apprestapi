var connection = require("../koneksi");
var mysql = require("mysql");
var md5 = require("md5");
var response = require("../res");
var jwt = require("jsonwebtoken");
var config = require("../config/secret");
var ip = require("ip");

exports.regitrasi = function (req, res) {
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
