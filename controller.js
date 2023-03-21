"use strict";

var response = require("./res");
var connection = require("./koneksi");

exports.index = function (req, res) {
  response.ok("Aplikasi REST API berjalan !", res);
};

// menampilkan semua data blog

exports.tampildatablogall = function (req, res) {
  connection.query("SELECT * FROM blog_tbl", function (error, rows, fields) {
    if (error) {
      connection.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};
