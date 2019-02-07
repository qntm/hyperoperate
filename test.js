const H = require('.')

describe('H', () => {
	describe('input validation', () => {
		it('throws on the wrong number of arguments', () => {
			expect(() => H()).toThrowError('Expected 3 arguments, received 0')
			expect(() => H.call()).toThrowError('Expected 3 arguments, received 0')
			expect(() => H.call(undefined)).toThrowError('Expected 3 arguments, received 0')
			expect(() => H(0)).toThrowError('Expected 3 arguments, received 1')
			expect(() => H.call(undefined, undefined)).toThrowError('Expected 3 arguments, received 1')
			expect(() => H(0, 1)).toThrowError('Expected 3 arguments, received 2')
			expect(() => H(0, 1, 2, 3)).toThrowError('Expected 3 arguments, received 4')
			expect(() => H.apply(undefined, Array(16).fill(5))).toThrowError('Expected 3 arguments, received 16')
		})

		it('throws on non-integer arguments', () => {
			expect(() => H(0.5, 1, 2)).toThrowError('Can\'t hyperoperate on 0.5, it is not an integer')
			expect(() => H(0, 'one', 2)).toThrowError('Can\'t hyperoperate on one, it is not an integer')
			expect(() => H(0, 1, Infinity)).toThrowError('Can\'t hyperoperate on Infinity, it is not an integer')
		})

		it('throws on negative arguments', () => {
			expect(() => H(-1, 1, 2)).toThrowError('Can\'t hyperoperate on -1, it is less than 0')
			expect(() => H(0, -2, 2)).toThrowError('Can\'t hyperoperate on -2, it is less than 0')
			expect(() => H(0, 1, -Number.MAX_VALUE)).toThrowError('Can\'t hyperoperate on -1.7976931348623157e+308, it is less than 0')
		})
	})

	describe('H0 (successor)', () => {
		const H0 = H.bind(undefined, 0)
		it('works', () => {
			expect(H0(0, 0)).toBe(1)
			expect(H0(56, 78)).toBe(79)
			expect(H0(1, Number.MAX_VALUE)).toBe(Number.MAX_VALUE) // Because floats
		})
	})

	describe('H1 (addition)', () => {
		const H1 = H.bind(undefined, 1)
		it('works', () => {
			expect(H1(33, 44)).toBe(77)
		})
	})

	describe('H2 (multiplication)', () => {
		const H2 = H.bind(undefined, 2)
		it('works', () => {
			expect(H2(6, 7)).toBe(42)
		})
	})

	describe('H3 (exponentiation)', () => {
		const H3 = H.bind(undefined, 3)
		it('works', () => {
			expect(H3(0, 0)).toBe(1)
			expect(H3(0, 1)).toBe(0)
			expect(H3(0, 2)).toBe(0)
			expect(H3(0, 153)).toBe(0)
			expect(H3(0, Number.MAX_VALUE)).toBe(0)

			expect(H3(1, 0)).toBe(1)
			expect(H3(1, 1)).toBe(1)
			expect(H3(1, 2)).toBe(1)
			expect(H3(1, 94379)).toBe(1)
			expect(H3(1, Number.MAX_SAFE_INTEGER)).toBe(1)

			expect(H3(2, 0)).toBe(1)
			expect(H3(2, 1)).toBe(2)
			expect(H3(2, 2)).toBe(4)
			expect(H3(2, 10)).toBe(1024)
			expect(H3(2, 10)).toBe(1024)

			expect(H3(3, 3)).toBe(27)
			expect(H3(5, 5)).toBe(3125)

			expect(H3(70, 0)).toBe(1)
			expect(H3(71, 1)).toBe(71)
			expect(H3(20001, 0)).toBe(1)
			expect(H3(9999999, 1)).toBe(9999999)
		})
	})

	describe('H4 (tetration)', () => {
		const H4 = H.bind(undefined, 4)
		it('works', () => {
			expect(H4(0, 0)).toBe(1)
			expect(H4(0, 1)).toBe(0)
			expect(H4(0, 2)).toBe(1)
			expect(H4(0, 3)).toBe(0)
			expect(H4(0, 999)).toBe(0)
			expect(H4(0, 1000)).toBe(1)
			expect(H4(0, Number.MAX_VALUE)).toBe(1)

			expect(H4(1, 0)).toBe(1)
			expect(H4(1, 1)).toBe(1)
			expect(H4(1, 2)).toBe(1)
			expect(H4(1, 3)).toBe(1)
			expect(H4(1, 987)).toBe(1)
			expect(H4(1, Number.MAX_VALUE)).toBe(1)

			expect(H4(2, 0)).toBe(1)
			expect(H4(2, 1)).toBe(2)
			expect(H4(2, 2)).toBe(4)
			expect(H4(2, 3)).toBe(16)
			expect(H4(2, 4)).toBe(65536)
			expect(H4(2, 5)).toBe(Infinity)
			expect(H4(2, Number.MAX_VALUE)).toBe(Infinity)

			expect(H4(3, 0)).toBe(1)
			expect(H4(3, 1)).toBe(3)
			expect(H4(3, 2)).toBe(27)
			expect(H4(3, 3)).toBe(7625597484987)
			expect(H4(3, 4)).toBe(Infinity)
			expect(H4(3, Number.MAX_VALUE)).toBe(Infinity)

			expect(H4(4, 0)).toBe(1)
			expect(H4(4, 1)).toBe(4)
			expect(H4(4, 2)).toBe(256)
			expect(H4(4, 3)).toBe(1.3407807929942597e+154)
			expect(H4(4, 4)).toBe(Infinity)
			expect(H4(4, Number.MAX_VALUE)).toBe(Infinity)

			expect(H4(5, 0)).toBe(1)
			expect(H4(5, 1)).toBe(5)
			expect(H4(5, 2)).toBe(3125)
			expect(H4(5, 3)).toBe(Infinity)
			expect(H4(5, Number.MAX_VALUE)).toBe(Infinity)

			expect(H4(143, 0)).toBe(1)
			expect(H4(143, 1)).toBe(143)
			// expect(H4(143, 2)).toBe(1.6332525972973913e+308) // bug in V8
			expect(H4(143, 3)).toBe(Infinity)
			expect(H4(143, Number.MAX_VALUE)).toBe(Infinity)

			expect(H4(144, 0)).toBe(1)
			expect(H4(144, 1)).toBe(144)
			expect(H4(144, 2)).toBe(Infinity)
			expect(H4(144, Number.MAX_VALUE)).toBe(Infinity)

			expect(H4(Number.MAX_VALUE, 0)).toBe(1)
			expect(H4(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE)
			expect(H4(Number.MAX_VALUE, 2)).toBe(Infinity)
			expect(H4(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity)
		})
	})

	describe('H5 (pentation)', () => {
		const H5 = H.bind(undefined, 5)
		it('works', () => {
			expect(H5(0, 0)).toBe(1)
			expect(H5(0, 1)).toBe(0)
			expect(H5(0, 2)).toBe(1)
			expect(H5(0, 999)).toBe(0)
			expect(H5(0, Number.MAX_VALUE)).toBe(1)

			expect(H5(1, 0)).toBe(1)
			expect(H5(1, 1)).toBe(1)
			expect(H5(1, 10000078)).toBe(1)
			expect(H5(1, Number.MAX_VALUE)).toBe(1)

			expect(H5(2, 0)).toBe(1)
			expect(H5(2, 1)).toBe(2)
			expect(H5(2, 2)).toBe(4)
			expect(H5(2, 3)).toBe(65536)
			expect(H5(2, 4)).toBe(Infinity)
			expect(H5(2, Number.MAX_VALUE)).toBe(Infinity)

			expect(H5(3, 0)).toBe(1)
			expect(H5(3, 1)).toBe(3)
			expect(H5(3, 2)).toBe(7625597484987)
			expect(H5(3, 3)).toBe(Infinity)
			expect(H5(3, Number.MAX_VALUE)).toBe(Infinity)

			expect(H5(4, 0)).toBe(1)
			expect(H5(4, 1)).toBe(4)
			expect(H5(4, 2)).toBe(Infinity)
			expect(H5(4, Number.MAX_VALUE)).toBe(Infinity)

			expect(H5(Number.MAX_VALUE, 0)).toBe(1)
			expect(H5(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE)
			expect(H5(Number.MAX_VALUE, 2)).toBe(Infinity)
			expect(H5(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity)
		})
	})

	describe('H6 (hexation)', () => {
		const H6 = H.bind(undefined, 6)
		it('works', () => {
			expect(H6(0, 0)).toBe(1)
			expect(H6(0, 1)).toBe(0)
			expect(H6(0, 2)).toBe(1)
			expect(H6(0, 3)).toBe(0)
			expect(H6(0, Number.MAX_VALUE)).toBe(1)

			expect(H6(1, 0)).toBe(1)
			expect(H6(1, 1)).toBe(1)
			expect(H6(1, 2)).toBe(1)
			expect(H6(1, 3)).toBe(1)
			expect(H6(1, Number.MAX_VALUE)).toBe(1)

			expect(H6(2, 0)).toBe(1)
			expect(H6(2, 1)).toBe(2)
			expect(H6(2, 2)).toBe(4)
			expect(H6(2, 3)).toBe(Infinity)
			expect(H6(2, Number.MAX_VALUE)).toBe(Infinity)

			expect(H6(Number.MAX_VALUE, 0)).toBe(1)
			expect(H6(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE)
			expect(H6(Number.MAX_VALUE, 2)).toBe(Infinity)
			expect(H6(Number.MAX_VALUE, 3)).toBe(Infinity)
			expect(H6(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity)
		})
	})

	describe('Hmax (Number.MAX_VALUE-ation)', () => {
		const Hmax = H.bind(undefined, Number.MAX_VALUE)
		it('works', () => {
			expect(Hmax(0, 0)).toBe(1)
			expect(Hmax(0, 1)).toBe(0)
			expect(Hmax(0, 2)).toBe(1)
			expect(Hmax(0, 3)).toBe(0)
			expect(Hmax(0, Number.MAX_VALUE)).toBe(1)

			expect(Hmax(1, 0)).toBe(1)
			expect(Hmax(1, 1)).toBe(1)
			expect(Hmax(1, 2)).toBe(1)
			expect(Hmax(1, 3)).toBe(1)
			expect(Hmax(1, Number.MAX_VALUE)).toBe(1)

			expect(Hmax(2, 0)).toBe(1)
			expect(Hmax(2, 1)).toBe(2)
			expect(Hmax(2, 2)).toBe(4)
			expect(Hmax(2, 3)).toBe(Infinity)
			expect(Hmax(2, Number.MAX_VALUE)).toBe(Infinity)

			expect(Hmax(Number.MAX_VALUE, 0)).toBe(1)
			expect(Hmax(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE)
			expect(Hmax(Number.MAX_VALUE, 2)).toBe(Infinity)
			expect(Hmax(Number.MAX_VALUE, 3)).toBe(Infinity)
			expect(Hmax(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity)
		})
	})
})
