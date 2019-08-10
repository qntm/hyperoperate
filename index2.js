// This one minifies the best although it's very illegible.

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

	const or = (...args) => args.find(x => x !== undefined)

	return or(
		[
			b + 1, // n = 0
			a + b, // n = 1
			a * b, // n = 2
			a ** b // n = 3
		][n],

		[
			1 - b % 2, // a = 0
			1          // a = 1
		][a],

		[
			1, // b = 0
			a  // b = 1
		][b],

		or(
			or(
				[
					// n = 4
					[
						// b = 2
						Array(143).fill().map((a, i) => i ** i).slice(2),

						// b = 3
						[
							16,      // a = 2
							3 ** 27, // a = 3
							4 ** 256 // a = 4
						],

						// b = 4
						[
							65536 // a = 2
						]
					],

					// n = 5
					[
						// b = 2
						[
							4,      // a = 2
							3 ** 27 // a = 3
						],

						// b = 3
						[
							65536 // a = 2
						]
					]
				][n - 4],

				// n >= 6
				[
					// b = 2
					[
						// a = 2
						4
					]
				]
			)[b - 2],

			// b out of range
			[]
		)[a - 2],

		// a out of range
		Infinity
	)
}
