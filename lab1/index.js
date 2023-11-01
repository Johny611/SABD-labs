const fs = require("fs");

// Замените SOURCE и TARGET на вашу собственную маппинг-таблицу
const SOURCE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const TARGET = "Q5A8ZWS0XEDC6RFVT9GBY4HNU3J2MI1KO7LP";

// Функция для обфускации строки
function obfuscateString(s) {
	return s.split("").map(encodeChar).join("");
}

// Функция для кодирования символа
function encodeChar(c) {
	const index = SOURCE.indexOf(c);
	if (index !== -1) {
		return TARGET.charAt(index);
	}
	return c;
}

// Функция для обфускации XML-данных
function obfuscateXML(xmlData) {
	const lines = xmlData.split("\n");
	const obfuscatedLines = lines.map((line) => {
		const values = line.split(".");
		const obfuscatedValues = values.map((value, index) => {
			return index === 0 ? obfuscateString(value) : value;
		});
		return obfuscatedValues.join(".");
	});
	return obfuscatedLines.join("\n");
}

// Функция для деобфускации строки
function deobfuscateString(s) {
	return s.split("").map(decodeChar).join("");
}

// Фля функция для декодирования символа
function decodeChar(c) {
	const index = TARGET.indexOf(c);
	if (index !== -1) {
		return SOURCE.charAt(index);
	}
	return c;
}

// Функция для деобфускации XML-данных
function deobfuscateXML(xmlData) {
	const lines = xmlData.split("\n");
	const deobfuscatedLines = lines.map((line) => {
		const values = line.split(".");
		const deobfuscatedValues = values.map((value, index) => {
			return index === 0 ? deobfuscateString(value) : value;
		});
		return deobfuscatedValues.join(".");
	});
	return deobfuscatedLines.join("\n");
}

// Чтение исходного XML-файла
const inputFilePath = "input.xml";
const inputData = fs.readFileSync(inputFilePath, "utf8");

// Обфускация данных XML
const obfuscatedXML = obfuscateXML(inputData);

// Запись обфусцированных данных в новый файл
const obfuscatedOutputFilePath = "obfuscated.xml";
fs.writeFileSync(obfuscatedOutputFilePath, obfuscatedXML, "utf8");

console.log("XML-файл успешно обфусцирован.");

// Чтение обфусцированного XML-файла
const obfuscatedInputFilePath = "obfuscated.xml";
const obfuscatedData = fs.readFileSync(obfuscatedInputFilePath, "utf8");

// Деобфускация данных XML
const deobfuscatedXML = deobfuscateXML(obfuscatedData);

// Запись деобфусцированных данных в новый файл
const deobfuscatedOutputFilePath = "deobfuscated.xml";
fs.writeFileSync(deobfuscatedOutputFilePath, deobfuscatedXML, "utf8");

console.log("XML-файл успешно деобфусцирован.");
