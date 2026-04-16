import numeral from "numeral";

type InputValue = number | string | undefined | null;

export function fBytes(number: InputValue) {
	const format = number ? numeral(number).format("0.0 b") : "";

	return result(format, ".0");
}

export function fNumber(number: InputValue) {
	return numeral(number).format();
}

function result(format: string, key = ".00") {
	const isInteger = format.includes(key);

	return isInteger ? format.replace(key, "") : format;
}
