var fs = require("fs");
var path = require("path");
var mkdirp = require("mkdirp");

function scaleValue (value, newSize, oldSize) {
	if (newSize == oldSize) {
		return value;
	}
	return Math.ceil(value * newSize / oldSize);
}

function roundUpToUnit (num, unit) {
	var dif = num % unit;
	return (dif) ? num + unit - dif : num;
}

function joinName () {
	var args = [].slice.call(arguments);
	return args.filter(function(arg){ return !!arg; }).join("-");
}

function makeClassName (string, sizeLabel, prefix) {

	if (sizeLabel) {
		if (string.indexOf("{size}") > -1) {
			string = substitute(string, {size: sizeLabel});
		}
		else {
			string += "-" + sizeLabel;
		}
	}
	else {
		if (string.indexOf("{size}") > -1) {
			string = string.replace(/(^|-)\{size\}/, "");
		}
	}

	if (string[0] !== "." && string.indexOf(prefix) !== 0) {
		string = prefix + "-" + string;
	}

	return ((string[0] != ".") ? "." : "") + string;
}

function substitute (string, object) {
	return string.replace(/\{([a-zA-Z}]+)\}/g, function (match, token) {
		return (token in object) ? object[token]: match;
	});
}

function write (filepath, data, callback) {
	mkdirp(path.dirname(filepath), function (err) {
		if (err) {
			throw err;
		}
		fs.writeFile(filepath, data, function (err) {
			if (err) {
				throw err;
			}
			callback(null);
		});
	});
}

module.exports.scaleValue = scaleValue;

module.exports.roundUpToUnit = roundUpToUnit;

module.exports.joinName = joinName;

module.exports.makeClassName = makeClassName;

module.exports.substitute = substitute;

module.exports.write = write;