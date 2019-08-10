// Minifies well while being quite legible!

module.exports = (...args) => {
	if (args.length !== 3) {
		throw Error(`Expected 3 arguments, received ${args.length}`)
	}

	for (let arg of args) {
		if (!Number.isInteger(arg)) {
			throw Error(`Can't hyperoperate on ${arg}, it is not an integer`)
		}
		if (arg < 0) {
			throw Error(`Can't hyperoperate on ${arg}, it is less than 0`)
		}
	}

	const [n, a, b] = args

	const finiteResults = {
		[n /* >= 6 */]: {
			[a /* >= 3 */]: [1, a],
			0: { [b]: 1 - b % 2 },
			1: { [b]: 1 },
			2: [1, 2, 4]
		},
		0: {
			[a]: { [b]: b + 1 }
		},
		1: {
			[a]: { [b]: a + b }
		},
		2: {
			[a]: { [b]: a * b }
		},
		3: {
			[a]: { [b]: a ** b }
		},
		4: {
			[a /* >= 5 */]: [1, a, a ** a],
			0: { [b]: 1 - b % 2 },
			1: { [b]: 1 },
			2: [1, 2, 4, 16, 65536],
			3: [1, 3, 27, 7625597484987],
			4: [1, 4, 256, 1.3407807929942597e+154]
		},
		5: {
			[a /* >= 4 */]: [1, a],
			0: { [b]: 1 - b % 2 },
			1: { [b]: 1 },
			2: [1, 2, 4, 65536],
			3: [1, 3, 7625597484987]
		}
	}

	const finiteResult = finiteResults[n][a][b]

	return finiteResult === undefined ? Infinity : finiteResult
}