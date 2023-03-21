"use strict";

var response = require("./res");
var connection = require("./koneksi");
const conn = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi REST API berjalan !", res);
};

// menampilkan semua data blog

exports.tampildatablogall = function (req, res) {
  connection.query("SELECT * FROM blog_tbl", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

// menampilkan blog berdasarkan id

exports.tampildatablogid = function (req, res) {
  let id = req.params.id;
  connection.query(
    "SELECT * FROM blog_tbl where id_blog=?",
    [id],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok(rows, res);
      }
    }
  );
};
