"use strict";

module.exports = function (app) {
  var jsonku = require("./controller");

  app.route("/").get(jsonku.index);
  app.route("/blog").get(jsonku.tampildatablogall);
  app.route("/blog/:id").get(jsonku.tampildatablogid);
  app.route("/blog/tambahdata").post(jsonku.tambahDataBlog);
  app.route("/blog/ubahdata").put(jsonku.ubahDataBlog);
  app.route("/blog/hapusdata").delete(jsonku.hapusDataBlog);
};
