const path = require("path");
const _root = path.resolve(__dirname, "..", "..");

exports.root = function (...pathElements) {
  return path.join.apply(path, [_root].concat(pathElements));
};
