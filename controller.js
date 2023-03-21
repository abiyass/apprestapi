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

// tambah data blog

exports.tambahDataBlog = function (req, res) {
  var slug = req.body.slug;
  var deskripsi = req.body.deskripsi;
  var judul = req.body.judul;
  var isi = req.body.isi;
  var status = req.body.status;
  var kata_kunci = req.body.kata_kunci;
  var gambar = req.body.gambar;
  var tgl_post = req.body.tgl_post;
  var viewer = req.body.viewer;

  connection.query(
    "INSERT INTO blog_tbl (slug,deskripsi,judul,isi,status,kata_kunci,gambar,tgl_post,viewer) VALUES(?,?,?,?,?,?,?,?,?)",
    [slug, deskripsi, judul, isi, status, kata_kunci, gambar, tgl_post, viewer],
    function (error, rows, fields) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Berhasil Menambahkan Data !", res);
      }
    }
  );
};

// ubah data blog per id

exports.ubahDataBlog = function (req, res) {
  var id = req.body.id_blog;
  var slug = req.body.slug;
  var deskripsi = req.body.deskripsi;
  var judul = req.body.judul;
  var isi = req.body.isi;
  var status = req.body.status;
  var kata_kunci = req.body.kata_kunci;
  var gambar = req.body.gambar;
  var tgl_post = req.body.tgl_post;
  var viewer = req.body.viewer;

  connection.query(
    "UPDATE blog_tbl SET slug=?,deskripsi=?,judul=?,isi=?,status=?,kata_kunci=?,gambar=?,tgl_post=?,viewer=? WHERE id_blog=?",
    [
      slug,
      deskripsi,
      judul,
      isi,
      status,
      kata_kunci,
      gambar,
      tgl_post,
      viewer,
      id,
    ],
    function (error, rows, field) {
      if (error) {
        console.log(error);
      } else {
        response.ok("Data berhasil diubah", res);
      }
    }
  );
};
