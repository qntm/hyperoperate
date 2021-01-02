/* eslint-env jest */

const H = require('.')

describe('H', () => {
  describe('number arguments', () => {
    // Returns Infinity in the event of overflow
    describe('input validation', () => {
      it('throws on non-integer arguments', () => {
        expect(() => H(0.5, 1, 2)).toThrowError('Can only hyperoperate on three numbers or three BigInts')
        expect(() => H(0, 'one', 2)).toThrowError('Can only hyperoperate on three numbers or three BigInts')
        expect(() => H(0, 1, Infinity)).toThrowError('Can only hyperoperate on three numbers or three BigInts')
      })

      it('throws on negative arguments', () => {
        expect(() => H(-1, 1, 2)).toThrowError('Can only hyperoperate on non-negative integers')
        expect(() => H(0, -2, 2)).toThrowError('Can only hyperoperate on non-negative integers')
        expect(() => H(0, 1, -Number.MAX_VALUE)).toThrowError('Can only hyperoperate on non-negative integers')
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
      it('works when a is 0', () => {
        expect(H4(0, 0)).toBe(1)
        expect(H4(0, 1)).toBe(0)
        expect(H4(0, 2)).toBe(1)
        expect(H4(0, 3)).toBe(0)
        expect(H4(0, 999)).toBe(0)
        expect(H4(0, 1000)).toBe(1)
        expect(H4(0, Number.MAX_VALUE)).toBe(1)
      })

      it('works when a is 1', () => {
        expect(H4(1, 0)).toBe(1)
        expect(H4(1, 1)).toBe(1)
        expect(H4(1, 2)).toBe(1)
        expect(H4(1, 3)).toBe(1)
        expect(H4(1, 987)).toBe(1)
        expect(H4(1, Number.MAX_VALUE)).toBe(1)
      })

      describe('when a is 2', () => {
        it('works when b is 0', () => {
          expect(H4(2, 0)).toBe(1)
        })

        it('works when b is 1', () => {
          expect(H4(2, 1)).toBe(2)
        })

        it('works when b is 2', () => {
          expect(H4(2, 2)).toBe(4)
        })

        it('works when b is 3', () => {
          expect(H4(2, 3)).toBe(16)
        })

        it('works when b is 4', () => {
          expect(H4(2, 4)).toBe(65536)
        })

        it('works when b is 5', () => {
          expect(H4(2, 5)).toBe(Infinity)
        })

        it('works when b is Number.MAX_VALUE', () => {
          expect(H4(2, Number.MAX_VALUE)).toBe(Infinity)
        })
      })

      it('works when a is 3', () => {
        expect(H4(3, 0)).toBe(1)
        expect(H4(3, 1)).toBe(3)
        expect(H4(3, 2)).toBe(27)
        expect(H4(3, 3)).toBe(7625597484987)
        expect(H4(3, 4)).toBe(Infinity)
        expect(H4(3, Number.MAX_VALUE)).toBe(Infinity)
      })

      it('works when a is 4', () => {
        expect(H4(4, 0)).toBe(1)
        expect(H4(4, 1)).toBe(4)
        expect(H4(4, 2)).toBe(256)
        expect(H4(4, 3)).toBe(1.3407807929942597e+154)
        expect(H4(4, 4)).toBe(Infinity)
        expect(H4(4, Number.MAX_VALUE)).toBe(Infinity)
      })

      it('works when a is 5', () => {
        expect(H4(5, 0)).toBe(1)
        expect(H4(5, 1)).toBe(5)
        expect(H4(5, 2)).toBe(3125)
        expect(H4(5, 3)).toBe(Infinity)
        expect(H4(5, Number.MAX_VALUE)).toBe(Infinity)
      })

      it('works when a is 143', () => {
        expect(H4(143, 0)).toBe(1)
        expect(H4(143, 1)).toBe(143)
        expect(H4(143, 2)).toBe(1.6332525972973913e+308)
        expect(H4(143, 3)).toBe(Infinity)
        expect(H4(143, Number.MAX_VALUE)).toBe(Infinity)
      })

      it('works when a is 144', () => {
        expect(H4(144, 0)).toBe(1)
        expect(H4(144, 1)).toBe(144)
        expect(H4(144, 2)).toBe(Infinity)
        expect(H4(144, Number.MAX_VALUE)).toBe(Infinity)
      })

      it('works when a is Number.MAX_VALUE', () => {
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

        expect(H6(3, 0)).toBe(1)
        expect(H6(3, 1)).toBe(3)
        expect(H6(3, 2)).toBe(Infinity)
        expect(H6(3, Number.MAX_VALUE)).toBe(Infinity)

        expect(H6(Number.MAX_VALUE, 0)).toBe(1)
        expect(H6(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE)
        expect(H6(Number.MAX_VALUE, 2)).toBe(Infinity)
        expect(H6(Number.MAX_VALUE, 3)).toBe(Infinity)
        expect(H6(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity)
      })
    })

    describe('Hmax (Number.MAX_VALUE-ation)', () => {
      const Hmax = H.bind(undefined, Number.MAX_VALUE)
      it('works when a is 0', () => {
        expect(Hmax(0, 0)).toBe(1)
        expect(Hmax(0, 1)).toBe(0)
        expect(Hmax(0, 2)).toBe(1)
        expect(Hmax(0, 3)).toBe(0)
        expect(Hmax(0, Number.MAX_VALUE)).toBe(1)
      })

      it('works when a is 1', () => {
        expect(Hmax(1, 0)).toBe(1)
        expect(Hmax(1, 1)).toBe(1)
        expect(Hmax(1, 2)).toBe(1)
        expect(Hmax(1, 3)).toBe(1)
        expect(Hmax(1, Number.MAX_VALUE)).toBe(1)
      })

      it('works when a is 2', () => {
        expect(Hmax(2, 0)).toBe(1)
        expect(Hmax(2, 1)).toBe(2)
        expect(Hmax(2, 2)).toBe(4)
        expect(Hmax(2, 3)).toBe(Infinity)
        expect(Hmax(2, Number.MAX_VALUE)).toBe(Infinity)
      })

      it('works when a is 3', () => {
        expect(Hmax(3, 0)).toBe(1)
        expect(Hmax(3, 1)).toBe(3)
        expect(Hmax(3, 2)).toBe(Infinity)
        expect(Hmax(3, 3)).toBe(Infinity)
        expect(Hmax(3, Number.MAX_VALUE)).toBe(Infinity)
      })

      it('works when a is 1000000', () => {
        expect(Hmax(1000000, 0)).toBe(1)
        expect(Hmax(1000000, 1)).toBe(1000000)
        expect(Hmax(1000000, 2)).toBe(Infinity)
        expect(Hmax(1000000, 3)).toBe(Infinity)
        expect(Hmax(1000000, Number.MAX_VALUE)).toBe(Infinity)
      })

      describe('when a is Number.MAX_VALUE', () => {
        it('works when b is 0', () => {
          expect(Hmax(Number.MAX_VALUE, 0)).toBe(1)
        })

        it('works when b is 1', () => {
          expect(Hmax(Number.MAX_VALUE, 1)).toBe(Number.MAX_VALUE)
        })

        it('works when b is 2', () => {
          expect(Hmax(Number.MAX_VALUE, 2)).toBe(Infinity)
        })

        it('works when b is 3', () => {
          expect(Hmax(Number.MAX_VALUE, 3)).toBe(Infinity)
        })

        it('works when b is Number.MAX_VALUE', () => {
          expect(Hmax(Number.MAX_VALUE, Number.MAX_VALUE)).toBe(Infinity)
        })
      })
    })
  })

  describe('BigInt arguments', () => {
    // Overflow behaviour is not specified and undefined so don't test it, but we can go further
    describe('input validation', () => {
      it('throws on non-integer arguments', () => {
        expect(() => H(0.5, 1n, 2n)).toThrowError('Can only hyperoperate on three numbers or three BigInts')
        expect(() => H(0n, 'one', 2n)).toThrowError('Can only hyperoperate on three numbers or three BigInts')
        expect(() => H(0n, 1n, Infinity)).toThrowError('Can only hyperoperate on three numbers or three BigInts')
      })

      it('throws on negative arguments', () => {
        expect(() => H(-1n, 1n, 2n)).toThrowError('Can only hyperoperate on non-negative integers')
        expect(() => H(0n, -2n, 2n)).toThrowError('Can only hyperoperate on non-negative integers')
        expect(() => H(0n, 1n, BigInt(-Number.MAX_VALUE))).toThrowError('Can only hyperoperate on non-negative integers')
      })
    })

    describe('H0 (successor)', () => {
      const H0 = H.bind(undefined, 0n)
      it('works', () => {
        expect(H0(0n, 0n)).toBe(1n)
        expect(H0(56n, 78n)).toBe(79n)
        expect(H0(1n, BigInt(Number.MAX_VALUE))).toBe(BigInt(Number.MAX_VALUE) + 1n)
      })
    })

    describe('H1 (addition)', () => {
      const H1 = H.bind(undefined, 1n)
      it('works', () => {
        expect(H1(33n, 44n)).toBe(77n)
      })
    })

    describe('H2 (multiplication)', () => {
      const H2 = H.bind(undefined, 2n)
      it('works', () => {
        expect(H2(6n, 7n)).toBe(42n)
      })
    })

    describe('H3 (exponentiation)', () => {
      const H3 = H.bind(undefined, 3n)
      it('works', () => {
        expect(H3(0n, 0n)).toBe(1n)
        expect(H3(0n, 1n)).toBe(0n)
        expect(H3(0n, 2n)).toBe(0n)
        expect(H3(0n, 153n)).toBe(0n)
        expect(H3(0n, BigInt(Number.MAX_VALUE))).toBe(0n)

        expect(H3(1n, 0n)).toBe(1n)
        expect(H3(1n, 1n)).toBe(1n)
        expect(H3(1n, 2n)).toBe(1n)
        expect(H3(1n, 94379n)).toBe(1n)
        expect(H3(1n, BigInt(Number.MAX_SAFE_INTEGER))).toBe(1n)

        expect(H3(2n, 0n)).toBe(1n)
        expect(H3(2n, 1n)).toBe(2n)
        expect(H3(2n, 2n)).toBe(4n)
        expect(H3(2n, 10n)).toBe(1024n)
        expect(H3(2n, 10n)).toBe(1024n)

        expect(H3(3n, 3n)).toBe(27n)
        expect(H3(5n, 5n)).toBe(3125n)

        expect(H3(70n, 0n)).toBe(1n)
        expect(H3(71n, 1n)).toBe(71n)
        expect(H3(20001n, 0n)).toBe(1n)
        expect(H3(9999999n, 1n)).toBe(9999999n)
      })
    })

    describe('H4 (tetration)', () => {
      const H4 = H.bind(undefined, 4n)
      it('works when a is 0n', () => {
        expect(H4(0n, 0n)).toBe(1n)
        expect(H4(0n, 1n)).toBe(0n)
        expect(H4(0n, 2n)).toBe(1n)
        expect(H4(0n, 3n)).toBe(0n)
        expect(H4(0n, 999n)).toBe(0n)
        expect(H4(0n, 1000n)).toBe(1n)
        expect(H4(0n, BigInt(Number.MAX_VALUE))).toBe(1n)
      })

      it('works when a is 1n', () => {
        expect(H4(1n, 0n)).toBe(1n)
        expect(H4(1n, 1n)).toBe(1n)
        expect(H4(1n, 2n)).toBe(1n)
        expect(H4(1n, 3n)).toBe(1n)
        expect(H4(1n, 987n)).toBe(1n)
        expect(H4(1n, BigInt(Number.MAX_VALUE))).toBe(1n)
      })

      describe('when a is 2n', () => {
        it('works when b is 0n', () => {
          expect(H4(2n, 0n)).toBe(1n)
        })

        it('works when b is 1n', () => {
          expect(H4(2n, 1n)).toBe(2n)
        })

        it('works when b is 2n', () => {
          expect(H4(2n, 2n)).toBe(4n)
        })

        it('works when b is 3n', () => {
          expect(H4(2n, 3n)).toBe(16n)
        })

        it('works when b is 4n', () => {
          expect(H4(2n, 4n)).toBe(65536n)
        })

        it('works when b is 5n', () => {
          expect(H4(2n, 5n)).toBe(2n ** 65536n) // a very large literal
        })

        it('works when b is 5n', () => {
          expect(() => H4(2n, 6n)).toThrow(RangeError)
        })

        it('works when b is BigInt(Number.MAX_VALUE)', () => {
          expect(() => H4(2n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
        })
      })

      it('works when a is 3n', () => {
        expect(H4(3n, 0n)).toBe(1n)
        expect(H4(3n, 1n)).toBe(3n)
        expect(H4(3n, 2n)).toBe(27n)
        expect(H4(3n, 3n)).toBe(7625597484987n)
        expect(() => H4(3n, 4n)).toThrow(RangeError)
        expect(() => H4(3n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })

      it('works when a is 4n', () => {
        expect(H4(4n, 0n)).toBe(1n)
        expect(H4(4n, 1n)).toBe(4n)
        expect(H4(4n, 2n)).toBe(256n)
        expect(H4(4n, 3n)).toBe(4n ** 4n ** 4n)
        expect(() => H4(4n, 4n)).toThrow(RangeError)
        expect(() => H4(4n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })

      it('works when a is 5n', () => {
        expect(H4(5n, 0n)).toBe(1n)
        expect(H4(5n, 1n)).toBe(5n)
        expect(H4(5n, 2n)).toBe(3125n)
        expect(H4(5n, 3n)).toBe(5n ** 3125n) // a very large literal
        expect(() => H4(5n, 4n)).toThrow(RangeError)
        expect(() => H4(5n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })

      it('works when a is 143n', () => {
        expect(H4(143n, 0n)).toBe(1n)
        expect(H4(143n, 1n)).toBe(143n)
        expect(H4(143n, 2n)).toBe(143n ** 143n) // medium-sized literal
        expect(() => H4(143n, 3n)).toThrow(RangeError)
        expect(() => H4(143n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })

      it('works when a is 144n', () => {
        expect(H4(144n, 0n)).toBe(1n)
        expect(H4(144n, 1n)).toBe(144n)
        expect(H4(144n, 2n)).toBe(144n ** 144n) // medium-sized literal
        expect(() => H4(144n, 3n)).toThrow(RangeError)
        expect(() => H4(144n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })

      it('works when a is BigInt(Number.MAX_VALUE)', () => {
        expect(H4(BigInt(Number.MAX_VALUE), 0n)).toBe(1n)
        expect(H4(BigInt(Number.MAX_VALUE), 1n)).toBe(BigInt(Number.MAX_VALUE))
        expect(() => H4(BigInt(Number.MAX_VALUE), 2n)).toThrow(RangeError)
        expect(() => H4(BigInt(Number.MAX_VALUE), BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })
    })

    describe('H5 (pentation)', () => {
      const H5 = H.bind(undefined, 5n)
      it('works', () => {
        expect(H5(0n, 0n)).toBe(1n)
        expect(H5(0n, 1n)).toBe(0n)
        expect(H5(0n, 2n)).toBe(1n)
        expect(H5(0n, 999n)).toBe(0n)
        expect(H5(0n, BigInt(Number.MAX_VALUE))).toBe(1n)

        expect(H5(1n, 0n)).toBe(1n)
        expect(H5(1n, 1n)).toBe(1n)
        expect(H5(1n, 10000078n)).toBe(1n)
        expect(H5(1n, BigInt(Number.MAX_VALUE))).toBe(1n)

        expect(H5(2n, 0n)).toBe(1n)
        expect(H5(2n, 1n)).toBe(2n)
        expect(H5(2n, 2n)).toBe(4n)
        expect(H5(2n, 3n)).toBe(65536n)
        expect(() => H5(2n, 4n)).toThrow(RangeError)
        expect(() => H5(2n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)

        expect(H5(3n, 0n)).toBe(1n)
        expect(H5(3n, 1n)).toBe(3n)
        expect(H5(3n, 2n)).toBe(7625597484987n)
        expect(() => H5(3n, 3n)).toThrow(RangeError)
        expect(() => H5(3n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)

        expect(H5(4n, 0n)).toBe(1n)
        expect(H5(4n, 1n)).toBe(4n)
        expect(() => H5(4n, 2n)).toThrow(RangeError)
        expect(() => H5(4n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)

        expect(H5(BigInt(Number.MAX_VALUE), 0n)).toBe(1n)
        expect(H5(BigInt(Number.MAX_VALUE), 1n)).toBe(BigInt(Number.MAX_VALUE))
        expect(() => H5(BigInt(Number.MAX_VALUE), 2n)).toThrow(RangeError)
        expect(() => H5(BigInt(Number.MAX_VALUE), BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })
    })

    describe('H6 (hexation)', () => {
      const H6 = H.bind(undefined, 6n)
      it('works', () => {
        expect(H6(0n, 0n)).toBe(1n)
        expect(H6(0n, 1n)).toBe(0n)
        expect(H6(0n, 2n)).toBe(1n)
        expect(H6(0n, 3n)).toBe(0n)
        expect(H6(0n, BigInt(Number.MAX_VALUE))).toBe(1n)

        expect(H6(1n, 0n)).toBe(1n)
        expect(H6(1n, 1n)).toBe(1n)
        expect(H6(1n, 2n)).toBe(1n)
        expect(H6(1n, 3n)).toBe(1n)
        expect(H6(1n, BigInt(Number.MAX_VALUE))).toBe(1n)

        expect(H6(2n, 0n)).toBe(1n)
        expect(H6(2n, 1n)).toBe(2n)
        expect(H6(2n, 2n)).toBe(4n)
        expect(() => H6(2n, 3n)).toThrow(RangeError)
        expect(() => H6(2n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)

        expect(H6(3n, 0n)).toBe(1n)
        expect(H6(3n, 1n)).toBe(3n)
        expect(() => H6(3n, 2n)).toThrow(RangeError)
        expect(() => H6(3n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)

        expect(H6(BigInt(Number.MAX_VALUE), 0n)).toBe(1n)
        expect(H6(BigInt(Number.MAX_VALUE), 1n)).toBe(BigInt(Number.MAX_VALUE))
        expect(() => H6(BigInt(Number.MAX_VALUE), 2n)).toThrow(RangeError)
        expect(() => H6(BigInt(Number.MAX_VALUE), 3n)).toThrow(RangeError)
        expect(() => H6(BigInt(Number.MAX_VALUE), BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })
    })

    describe('Hmax (BigInt(Number.MAX_VALUE)-ation)', () => {
      const Hmax = H.bind(undefined, BigInt(Number.MAX_VALUE))
      it('works when a is 0n', () => {
        expect(Hmax(0n, 0n)).toBe(1n)
        expect(Hmax(0n, 1n)).toBe(0n)
        expect(Hmax(0n, 2n)).toBe(1n)
        expect(Hmax(0n, 3n)).toBe(0n)
        expect(Hmax(0n, BigInt(Number.MAX_VALUE))).toBe(1n)
      })

      it('works when a is 1n', () => {
        expect(Hmax(1n, 0n)).toBe(1n)
        expect(Hmax(1n, 1n)).toBe(1n)
        expect(Hmax(1n, 2n)).toBe(1n)
        expect(Hmax(1n, 3n)).toBe(1n)
        expect(Hmax(1n, BigInt(Number.MAX_VALUE))).toBe(1n)
      })

      it('works when a is 2n', () => {
        expect(Hmax(2n, 0n)).toBe(1n)
        expect(Hmax(2n, 1n)).toBe(2n)
        expect(Hmax(2n, 2n)).toBe(4n)
        expect(() => Hmax(2n, 3n)).toThrow(RangeError)
        expect(() => Hmax(2n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })

      it('works when a is 3n', () => {
        expect(Hmax(3n, 0n)).toBe(1n)
        expect(Hmax(3n, 1n)).toBe(3n)
        expect(() => Hmax(3n, 2n)).toThrow(RangeError)
        expect(() => Hmax(3n, 3n)).toThrow(RangeError)
        expect(() => Hmax(3n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })

      it('works when a is 1000000n', () => {
        expect(Hmax(1000000n, 0n)).toBe(1n)
        expect(Hmax(1000000n, 1n)).toBe(1000000n)
        expect(() => Hmax(1000000n, 2n)).toThrow(RangeError)
        expect(() => Hmax(1000000n, 3n)).toThrow(RangeError)
        expect(() => Hmax(1000000n, BigInt(Number.MAX_VALUE))).toThrow(RangeError)
      })

      describe('when a is BigInt(Number.MAX_VALUE)', () => {
        it('works when b is 0n', () => {
          expect(Hmax(BigInt(Number.MAX_VALUE), 0n)).toBe(1n)
        })

        it('works when b is 1n', () => {
          expect(Hmax(BigInt(Number.MAX_VALUE), 1n)).toBe(BigInt(Number.MAX_VALUE))
        })

        it('works when b is 2n', () => {
          expect(() => Hmax(BigInt(Number.MAX_VALUE), 2n)).toThrow(RangeError)
        })

        it('works when b is 3n', () => {
          expect(() => Hmax(BigInt(Number.MAX_VALUE), 3n)).toThrow(RangeError)
        })

        it('works when b is BigInt(Number.MAX_VALUE)', () => {
          expect(() => Hmax(BigInt(Number.MAX_VALUE), BigInt(Number.MAX_VALUE))).toThrow(RangeError)
        })
      })
    })
  })
})
