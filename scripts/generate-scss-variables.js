const fs = require('fs');
const path = require('path');
const TailwindConfig = require('../tailwind.config');
const outPath = path.join(__dirname, '../assets/styles/_tailwind-theme-variables.scss');
const resolveConfig = require('tailwindcss/lib/util/resolveConfig');

// If the file exists, delete it.
fs.unlink(outPath, err => {
	if (err && err.code !== 'ENOENT') return console.error(err);

	const theme = resolveConfig.default([TailwindConfig]).theme;

	for (let configKey in theme) {
		let object = theme[configKey];
		Object.keys(object).forEach(key => {
			let value = object[key];
			if (typeof value === 'object') {
				Object.keys(value).forEach(childKey => {
					const childValue = value[childKey];
					let keyName = normalizeKey(key) + '-' + normalizeKey(childKey);
					let line = `$${configKey}-${keyName}: ${childValue};\n`;

					fs.appendFileSync(outPath, line);
					console.log(`wrote ${configKey} ${key}`);
				});
			} else {
				let keyName = normalizeKey(key);
				let line = `$${configKey}-${keyName}: ${value};\n`;

				fs.appendFileSync(outPath, line);
				console.log(`wrote ${configKey} ${key}`);
			}
		});

		fs.appendFileSync(outPath, `\n`, err => {
			if (err) return console.error(err);
		});
	}
});

function normalizeKey(key) {
	return key.replace('/', '_');
}
