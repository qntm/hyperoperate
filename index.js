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

	// successor operator
	if (n === 0) {
		return b + 1
	}

	// addition
	if (n === 1) {
		return a + b
	}

	// multiplication
	if (n === 2) {
		return a * b
	}

	// exponentiation
	if (n === 3) {
		return a ** b
	}

	// Time for some handy base cases

	if (a === 0) {
		// Fun fact:
		return b % 2 === 0 ? 1 : 0 // Relies on the fact that 0 ** 0 = 1 in this programming language
	}
	if (a === 1) {
		// 1^...^b = 1 for all b
		return 1
	}
	if (b === 0) {
		// a^0 = 1 for all a >= 2
		return 1
	}
	if (b === 1) {
		// a^1 = a for all a >= 2
		return a
	}
	if (a === 2 && b === 2) {
		// Another fun fact
		return 4
	}

	// tetration - power tower of {b} copies of {a}
	if (n === 4) {
		if (b === 2) {
			return a ** a // finite for a = 143, not a = 144
		}
		if (b === 3) {
			// a^a^a
			if (a === 2) {
				return 16
			}
			if (a === 3) {
				return 7625597484987
			}
			if (a === 4) {
				// Precise figure is
				// 1340780792994259709957402499820584
				// 6127479365820592393377723561443721
				// 7640300735469768018742981669034276
				// 9003185818648605085375388281194656
				// 9946433649006084096
				return 1.3407807929942597e+154
			}
			return Infinity
		}
		if (b === 4) {
			// a^a^a^a
			if (a === 2) {
				return 4 ** 8 // 65536
			}
			return Infinity
		}
		return Infinity
	}

	// pentation: tetrate {a} to itself, {b} times
	if (n === 5) {
		if (b === 2) {
			// a^^a
			if (a === 3) {
				return 7625597484987
			}
			return Infinity
		}
		if (b === 3) {
			// a^^a^^a
			if (a === 2) {
				return 65536
			}
			return Infinity
		}
		return Infinity
	}

	// No other meaningful results
	return Infinity
}
