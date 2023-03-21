"use strict";

exports.ok = function (valus, res) {
  var data = {
    status: 200,
    values: values,
  };

  res.json(data);
  res.end();
};
