const path = require("path");
const _root = path.resolve(__dirname, "..", "..");

exports.root = function () {
  var pathElements = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(pathElements));
};
