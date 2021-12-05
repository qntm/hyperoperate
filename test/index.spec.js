/* eslint-env mocha */

import assert from 'assert'
import H from '../src/index.js'

describe('H', () => {
  describe('number arguments', () => {
    // Returns Infinity in the event of overflow
    describe('input validation', () => {
      it('throws on non-integer arguments', () => {
        assert.throws(() => H(0.5, 1, 2), Error('Can only hyperoperate on three numbers or three BigInts'))
        assert.throws(() => H(0, 'one', 2), Error('Can only hyperoperate on three numbers or three BigInts'))
        assert.throws(() => H(0, 1, Infinity), Error('Can only hyperoperate on three numbers or three BigInts'))
      })

      it('throws on negative arguments', () => {
        assert.throws(() => H(-1, 1, 2), Error('Can only hyperoperate on non-negative integers'))
        assert.throws(() => H(0, -2, 2), Error('Can only hyperoperate on non-negative integers'))
        assert.throws(() => H(0, 1, -Number.MAX_VALUE), Error('Can only hyperoperate on non-negative integers'))
      })
    })

    describe('H0 (successor)', () => {
      const H0 = H.bind(undefined, 0)
      it('works', () => {
        assert.strictEqual(H0(0, 0), 1)
        assert.strictEqual(H0(56, 78), 79)
        assert.strictEqual(H0(1, Number.MAX_VALUE), Number.MAX_VALUE) // Because floats
      })
    })

    describe('H1 (addition)', () => {
      const H1 = H.bind(undefined, 1)
      it('works', () => {
        assert.strictEqual(H1(33, 44), 77)
      })
    })

    describe('H2 (multiplication)', () => {
      const H2 = H.bind(undefined, 2)
      it('works', () => {
        assert.strictEqual(H2(6, 7), 42)
      })
    })

    describe('H3 (exponentiation)', () => {
      const H3 = H.bind(undefined, 3)
      it('works', () => {
        assert.strictEqual(H3(0, 0), 1)
        assert.strictEqual(H3(0, 1), 0)
        assert.strictEqual(H3(0, 2), 0)
        assert.strictEqual(H3(0, 153), 0)
        assert.strictEqual(H3(0, Number.MAX_VALUE), 0)

        assert.strictEqual(H3(1, 0), 1)
        assert.strictEqual(H3(1, 1), 1)
        assert.strictEqual(H3(1, 2), 1)
        assert.strictEqual(H3(1, 94379), 1)
        assert.strictEqual(H3(1, Number.MAX_SAFE_INTEGER), 1)

        assert.strictEqual(H3(2, 0), 1)
        assert.strictEqual(H3(2, 1), 2)
        assert.strictEqual(H3(2, 2), 4)
        assert.strictEqual(H3(2, 10), 1024)
        assert.strictEqual(H3(2, 10), 1024)

        assert.strictEqual(H3(3, 3), 27)
        assert.strictEqual(H3(5, 5), 3125)

        assert.strictEqual(H3(70, 0), 1)
        assert.strictEqual(H3(71, 1), 71)
        assert.strictEqual(H3(20001, 0), 1)
        assert.strictEqual(H3(9999999, 1), 9999999)
      })
    })

    describe('H4 (tetration)', () => {
      const H4 = H.bind(undefined, 4)
      it('works when a is 0', () => {
        assert.strictEqual(H4(0, 0), 1)
        assert.strictEqual(H4(0, 1), 0)
        assert.strictEqual(H4(0, 2), 1)
        assert.strictEqual(H4(0, 3), 0)
        assert.strictEqual(H4(0, 999), 0)
        assert.strictEqual(H4(0, 1000), 1)
        assert.strictEqual(H4(0, Number.MAX_VALUE), 1)
      })

      it('works when a is 1', () => {
        assert.strictEqual(H4(1, 0), 1)
        assert.strictEqual(H4(1, 1), 1)
        assert.strictEqual(H4(1, 2), 1)
        assert.strictEqual(H4(1, 3), 1)
        assert.strictEqual(H4(1, 987), 1)
        assert.strictEqual(H4(1, Number.MAX_VALUE), 1)
      })

      describe('when a is 2', () => {
        it('works when b is 0', () => {
          assert.strictEqual(H4(2, 0), 1)
        })

        it('works when b is 1', () => {
          assert.strictEqual(H4(2, 1), 2)
        })

        it('works when b is 2', () => {
          assert.strictEqual(H4(2, 2), 4)
        })

        it('works when b is 3', () => {
          assert.strictEqual(H4(2, 3), 16)
        })

        it('works when b is 4', () => {
          assert.strictEqual(H4(2, 4), 65536)
        })

        it('works when b is 5', () => {
          assert.strictEqual(H4(2, 5), Infinity)
        })

        it('works when b is Number.MAX_VALUE', () => {
          assert.strictEqual(H4(2, Number.MAX_VALUE), Infinity)
        })
      })

      it('works when a is 3', () => {
        assert.strictEqual(H4(3, 0), 1)
        assert.strictEqual(H4(3, 1), 3)
        assert.strictEqual(H4(3, 2), 27)
        assert.strictEqual(H4(3, 3), 7625597484987)
        assert.strictEqual(H4(3, 4), Infinity)
        assert.strictEqual(H4(3, Number.MAX_VALUE), Infinity)
      })

      it('works when a is 4', () => {
        assert.strictEqual(H4(4, 0), 1)
        assert.strictEqual(H4(4, 1), 4)
        assert.strictEqual(H4(4, 2), 256)
        assert.strictEqual(H4(4, 3), 1.3407807929942597e+154)
        assert.strictEqual(H4(4, 4), Infinity)
        assert.strictEqual(H4(4, Number.MAX_VALUE), Infinity)
      })

      it('works when a is 5', () => {
        assert.strictEqual(H4(5, 0), 1)
        assert.strictEqual(H4(5, 1), 5)
        assert.strictEqual(H4(5, 2), 3125)
        assert.strictEqual(H4(5, 3), Infinity)
        assert.strictEqual(H4(5, Number.MAX_VALUE), Infinity)
      })

      it('works when a is 143', () => {
        assert.strictEqual(H4(143, 0), 1)
        assert.strictEqual(H4(143, 1), 143)
        assert.strictEqual(H4(143, 2), 1.6332525972973913e+308)
        assert.strictEqual(H4(143, 3), Infinity)
        assert.strictEqual(H4(143, Number.MAX_VALUE), Infinity)
      })

      it('works when a is 144', () => {
        assert.strictEqual(H4(144, 0), 1)
        assert.strictEqual(H4(144, 1), 144)
        assert.strictEqual(H4(144, 2), Infinity)
        assert.strictEqual(H4(144, Number.MAX_VALUE), Infinity)
      })

      it('works when a is Number.MAX_VALUE', () => {
        assert.strictEqual(H4(Number.MAX_VALUE, 0), 1)
        assert.strictEqual(H4(Number.MAX_VALUE, 1), Number.MAX_VALUE)
        assert.strictEqual(H4(Number.MAX_VALUE, 2), Infinity)
        assert.strictEqual(H4(Number.MAX_VALUE, Number.MAX_VALUE), Infinity)
      })
    })

    describe('H5 (pentation)', () => {
      const H5 = H.bind(undefined, 5)
      it('works', () => {
        assert.strictEqual(H5(0, 0), 1)
        assert.strictEqual(H5(0, 1), 0)
        assert.strictEqual(H5(0, 2), 1)
        assert.strictEqual(H5(0, 999), 0)
        assert.strictEqual(H5(0, Number.MAX_VALUE), 1)

        assert.strictEqual(H5(1, 0), 1)
        assert.strictEqual(H5(1, 1), 1)
        assert.strictEqual(H5(1, 10000078), 1)
        assert.strictEqual(H5(1, Number.MAX_VALUE), 1)

        assert.strictEqual(H5(2, 0), 1)
        assert.strictEqual(H5(2, 1), 2)
        assert.strictEqual(H5(2, 2), 4)
        assert.strictEqual(H5(2, 3), 65536)
        assert.strictEqual(H5(2, 4), Infinity)
        assert.strictEqual(H5(2, Number.MAX_VALUE), Infinity)

        assert.strictEqual(H5(3, 0), 1)
        assert.strictEqual(H5(3, 1), 3)
        assert.strictEqual(H5(3, 2), 7625597484987)
        assert.strictEqual(H5(3, 3), Infinity)
        assert.strictEqual(H5(3, Number.MAX_VALUE), Infinity)

        assert.strictEqual(H5(4, 0), 1)
        assert.strictEqual(H5(4, 1), 4)
        assert.strictEqual(H5(4, 2), Infinity)
        assert.strictEqual(H5(4, Number.MAX_VALUE), Infinity)

        assert.strictEqual(H5(Number.MAX_VALUE, 0), 1)
        assert.strictEqual(H5(Number.MAX_VALUE, 1), Number.MAX_VALUE)
        assert.strictEqual(H5(Number.MAX_VALUE, 2), Infinity)
        assert.strictEqual(H5(Number.MAX_VALUE, Number.MAX_VALUE), Infinity)
      })
    })

    describe('H6 (hexation)', () => {
      const H6 = H.bind(undefined, 6)
      it('works', () => {
        assert.strictEqual(H6(0, 0), 1)
        assert.strictEqual(H6(0, 1), 0)
        assert.strictEqual(H6(0, 2), 1)
        assert.strictEqual(H6(0, 3), 0)
        assert.strictEqual(H6(0, Number.MAX_VALUE), 1)

        assert.strictEqual(H6(1, 0), 1)
        assert.strictEqual(H6(1, 1), 1)
        assert.strictEqual(H6(1, 2), 1)
        assert.strictEqual(H6(1, 3), 1)
        assert.strictEqual(H6(1, Number.MAX_VALUE), 1)

        assert.strictEqual(H6(2, 0), 1)
        assert.strictEqual(H6(2, 1), 2)
        assert.strictEqual(H6(2, 2), 4)
        assert.strictEqual(H6(2, 3), Infinity)
        assert.strictEqual(H6(2, Number.MAX_VALUE), Infinity)

        assert.strictEqual(H6(3, 0), 1)
        assert.strictEqual(H6(3, 1), 3)
        assert.strictEqual(H6(3, 2), Infinity)
        assert.strictEqual(H6(3, Number.MAX_VALUE), Infinity)

        assert.strictEqual(H6(Number.MAX_VALUE, 0), 1)
        assert.strictEqual(H6(Number.MAX_VALUE, 1), Number.MAX_VALUE)
        assert.strictEqual(H6(Number.MAX_VALUE, 2), Infinity)
        assert.strictEqual(H6(Number.MAX_VALUE, 3), Infinity)
        assert.strictEqual(H6(Number.MAX_VALUE, Number.MAX_VALUE), Infinity)
      })
    })

    describe('Hmax (Number.MAX_VALUE-ation)', () => {
      const Hmax = H.bind(undefined, Number.MAX_VALUE)
      it('works when a is 0', () => {
        assert.strictEqual(Hmax(0, 0), 1)
        assert.strictEqual(Hmax(0, 1), 0)
        assert.strictEqual(Hmax(0, 2), 1)
        assert.strictEqual(Hmax(0, 3), 0)
        assert.strictEqual(Hmax(0, Number.MAX_VALUE), 1)
      })

      it('works when a is 1', () => {
        assert.strictEqual(Hmax(1, 0), 1)
        assert.strictEqual(Hmax(1, 1), 1)
        assert.strictEqual(Hmax(1, 2), 1)
        assert.strictEqual(Hmax(1, 3), 1)
        assert.strictEqual(Hmax(1, Number.MAX_VALUE), 1)
      })

      it('works when a is 2', () => {
        assert.strictEqual(Hmax(2, 0), 1)
        assert.strictEqual(Hmax(2, 1), 2)
        assert.strictEqual(Hmax(2, 2), 4)
        assert.strictEqual(Hmax(2, 3), Infinity)
        assert.strictEqual(Hmax(2, Number.MAX_VALUE), Infinity)
      })

      it('works when a is 3', () => {
        assert.strictEqual(Hmax(3, 0), 1)
        assert.strictEqual(Hmax(3, 1), 3)
        assert.strictEqual(Hmax(3, 2), Infinity)
        assert.strictEqual(Hmax(3, 3), Infinity)
        assert.strictEqual(Hmax(3, Number.MAX_VALUE), Infinity)
      })

      it('works when a is 1000000', () => {
        assert.strictEqual(Hmax(1000000, 0), 1)
        assert.strictEqual(Hmax(1000000, 1), 1000000)
        assert.strictEqual(Hmax(1000000, 2), Infinity)
        assert.strictEqual(Hmax(1000000, 3), Infinity)
        assert.strictEqual(Hmax(1000000, Number.MAX_VALUE), Infinity)
      })

      describe('when a is Number.MAX_VALUE', () => {
        it('works when b is 0', () => {
          assert.strictEqual(Hmax(Number.MAX_VALUE, 0), 1)
        })

        it('works when b is 1', () => {
          assert.strictEqual(Hmax(Number.MAX_VALUE, 1), Number.MAX_VALUE)
        })

        it('works when b is 2', () => {
          assert.strictEqual(Hmax(Number.MAX_VALUE, 2), Infinity)
        })

        it('works when b is 3', () => {
          assert.strictEqual(Hmax(Number.MAX_VALUE, 3), Infinity)
        })

        it('works when b is Number.MAX_VALUE', () => {
          assert.strictEqual(Hmax(Number.MAX_VALUE, Number.MAX_VALUE), Infinity)
        })
      })
    })
  })

  describe('BigInt arguments', () => {
    // Overflow behaviour is not specified and undefined so don't test it, but we can go further
    describe('input validation', () => {
      it('throws on non-integer arguments', () => {
        assert.throws(() => H(0.5, 1n, 2n), Error('Can only hyperoperate on three numbers or three BigInts'))
        assert.throws(() => H(0n, 'one', 2n), Error('Can only hyperoperate on three numbers or three BigInts'))
        assert.throws(() => H(0n, 1n, Infinity), Error('Can only hyperoperate on three numbers or three BigInts'))
      })

      it('throws on negative arguments', () => {
        assert.throws(() => H(-1n, 1n, 2n), Error('Can only hyperoperate on non-negative integers'))
        assert.throws(() => H(0n, -2n, 2n), Error('Can only hyperoperate on non-negative integers'))
        assert.throws(() => H(0n, 1n, BigInt(-Number.MAX_VALUE)), Error('Can only hyperoperate on non-negative integers'))
      })
    })

    describe('H0 (successor)', () => {
      const H0 = H.bind(undefined, 0n)
      it('works', () => {
        assert.strictEqual(H0(0n, 0n), 1n)
        assert.strictEqual(H0(56n, 78n), 79n)
        assert.strictEqual(H0(1n, BigInt(Number.MAX_VALUE)), BigInt(Number.MAX_VALUE) + 1n)
      })
    })

    describe('H1 (addition)', () => {
      const H1 = H.bind(undefined, 1n)
      it('works', () => {
        assert.strictEqual(H1(33n, 44n), 77n)
      })
    })

    describe('H2 (multiplication)', () => {
      const H2 = H.bind(undefined, 2n)
      it('works', () => {
        assert.strictEqual(H2(6n, 7n), 42n)
      })
    })

    describe('H3 (exponentiation)', () => {
      const H3 = H.bind(undefined, 3n)
      it('works', () => {
        assert.strictEqual(H3(0n, 0n), 1n)
        assert.strictEqual(H3(0n, 1n), 0n)
        assert.strictEqual(H3(0n, 2n), 0n)
        assert.strictEqual(H3(0n, 153n), 0n)
        assert.strictEqual(H3(0n, BigInt(Number.MAX_VALUE)), 0n)

        assert.strictEqual(H3(1n, 0n), 1n)
        assert.strictEqual(H3(1n, 1n), 1n)
        assert.strictEqual(H3(1n, 2n), 1n)
        assert.strictEqual(H3(1n, 94379n), 1n)
        assert.strictEqual(H3(1n, BigInt(Number.MAX_SAFE_INTEGER)), 1n)

        assert.strictEqual(H3(2n, 0n), 1n)
        assert.strictEqual(H3(2n, 1n), 2n)
        assert.strictEqual(H3(2n, 2n), 4n)
        assert.strictEqual(H3(2n, 10n), 1024n)
        assert.strictEqual(H3(2n, 10n), 1024n)

        assert.strictEqual(H3(3n, 3n), 27n)
        assert.strictEqual(H3(5n, 5n), 3125n)

        assert.strictEqual(H3(70n, 0n), 1n)
        assert.strictEqual(H3(71n, 1n), 71n)
        assert.strictEqual(H3(20001n, 0n), 1n)
        assert.strictEqual(H3(9999999n, 1n), 9999999n)
      })
    })

    describe('H4 (tetration)', () => {
      const H4 = H.bind(undefined, 4n)
      it('works when a is 0n', () => {
        assert.strictEqual(H4(0n, 0n), 1n)
        assert.strictEqual(H4(0n, 1n), 0n)
        assert.strictEqual(H4(0n, 2n), 1n)
        assert.strictEqual(H4(0n, 3n), 0n)
        assert.strictEqual(H4(0n, 999n), 0n)
        assert.strictEqual(H4(0n, 1000n), 1n)
        assert.strictEqual(H4(0n, BigInt(Number.MAX_VALUE)), 1n)
      })

      it('works when a is 1n', () => {
        assert.strictEqual(H4(1n, 0n), 1n)
        assert.strictEqual(H4(1n, 1n), 1n)
        assert.strictEqual(H4(1n, 2n), 1n)
        assert.strictEqual(H4(1n, 3n), 1n)
        assert.strictEqual(H4(1n, 987n), 1n)
        assert.strictEqual(H4(1n, BigInt(Number.MAX_VALUE)), 1n)
      })

      describe('when a is 2n', () => {
        it('works when b is 0n', () => {
          assert.strictEqual(H4(2n, 0n), 1n)
        })

        it('works when b is 1n', () => {
          assert.strictEqual(H4(2n, 1n), 2n)
        })

        it('works when b is 2n', () => {
          assert.strictEqual(H4(2n, 2n), 4n)
        })

        it('works when b is 3n', () => {
          assert.strictEqual(H4(2n, 3n), 16n)
        })

        it('works when b is 4n', () => {
          assert.strictEqual(H4(2n, 4n), 65536n)
        })

        it('works when b is 5n', () => {
          assert.strictEqual(H4(2n, 5n), 2n ** 65536n) // a very large literal
        })

        it('works when b is 5n', () => {
          assert.throws(() => H4(2n, 6n), RangeError)
        })

        it('works when b is BigInt(Number.MAX_VALUE)', () => {
          assert.throws(() => H4(2n, BigInt(Number.MAX_VALUE)), RangeError)
        })
      })

      it('works when a is 3n', () => {
        assert.strictEqual(H4(3n, 0n), 1n)
        assert.strictEqual(H4(3n, 1n), 3n)
        assert.strictEqual(H4(3n, 2n), 27n)
        assert.strictEqual(H4(3n, 3n), 7625597484987n)
        assert.throws(() => H4(3n, 4n), RangeError)
        assert.throws(() => H4(3n, BigInt(Number.MAX_VALUE)), RangeError)
      })

      it('works when a is 4n', () => {
        assert.strictEqual(H4(4n, 0n), 1n)
        assert.strictEqual(H4(4n, 1n), 4n)
        assert.strictEqual(H4(4n, 2n), 256n)
        assert.strictEqual(H4(4n, 3n), 4n ** 4n ** 4n)
        assert.throws(() => H4(4n, 4n), RangeError)
        assert.throws(() => H4(4n, BigInt(Number.MAX_VALUE)), RangeError)
      })

      it('works when a is 5n', () => {
        assert.strictEqual(H4(5n, 0n), 1n)
        assert.strictEqual(H4(5n, 1n), 5n)
        assert.strictEqual(H4(5n, 2n), 3125n)
        assert.strictEqual(H4(5n, 3n), 5n ** 3125n) // a very large literal
        assert.throws(() => H4(5n, 4n), RangeError)
        assert.throws(() => H4(5n, BigInt(Number.MAX_VALUE)), RangeError)
      })

      it('works when a is 143n', () => {
        assert.strictEqual(H4(143n, 0n), 1n)
        assert.strictEqual(H4(143n, 1n), 143n)
        assert.strictEqual(H4(143n, 2n), 143n ** 143n) // medium-sized literal
        assert.throws(() => H4(143n, 3n), RangeError)
        assert.throws(() => H4(143n, BigInt(Number.MAX_VALUE)), RangeError)
      })

      it('works when a is 144n', () => {
        assert.strictEqual(H4(144n, 0n), 1n)
        assert.strictEqual(H4(144n, 1n), 144n)
        assert.strictEqual(H4(144n, 2n), 144n ** 144n) // medium-sized literal
        assert.throws(() => H4(144n, 3n), RangeError)
        assert.throws(() => H4(144n, BigInt(Number.MAX_VALUE)), RangeError)
      })

      it('works when a is BigInt(Number.MAX_VALUE)', () => {
        assert.strictEqual(H4(BigInt(Number.MAX_VALUE), 0n), 1n)
        assert.strictEqual(H4(BigInt(Number.MAX_VALUE), 1n), BigInt(Number.MAX_VALUE))
        assert.throws(() => H4(BigInt(Number.MAX_VALUE), 2n), RangeError)
        assert.throws(() => H4(BigInt(Number.MAX_VALUE), BigInt(Number.MAX_VALUE)), RangeError)
      })
    })

    describe('H5 (pentation)', () => {
      const H5 = H.bind(undefined, 5n)
      it('works', () => {
        assert.strictEqual(H5(0n, 0n), 1n)
        assert.strictEqual(H5(0n, 1n), 0n)
        assert.strictEqual(H5(0n, 2n), 1n)
        assert.strictEqual(H5(0n, 999n), 0n)
        assert.strictEqual(H5(0n, BigInt(Number.MAX_VALUE)), 1n)

        assert.strictEqual(H5(1n, 0n), 1n)
        assert.strictEqual(H5(1n, 1n), 1n)
        assert.strictEqual(H5(1n, 10000078n), 1n)
        assert.strictEqual(H5(1n, BigInt(Number.MAX_VALUE)), 1n)

        assert.strictEqual(H5(2n, 0n), 1n)
        assert.strictEqual(H5(2n, 1n), 2n)
        assert.strictEqual(H5(2n, 2n), 4n)
        assert.strictEqual(H5(2n, 3n), 65536n)
        assert.throws(() => H5(2n, 4n), RangeError)
        assert.throws(() => H5(2n, BigInt(Number.MAX_VALUE)), RangeError)

        assert.strictEqual(H5(3n, 0n), 1n)
        assert.strictEqual(H5(3n, 1n), 3n)
        assert.strictEqual(H5(3n, 2n), 7625597484987n)
        assert.throws(() => H5(3n, 3n), RangeError)
        assert.throws(() => H5(3n, BigInt(Number.MAX_VALUE)), RangeError)

        assert.strictEqual(H5(4n, 0n), 1n)
        assert.strictEqual(H5(4n, 1n), 4n)
        assert.throws(() => H5(4n, 2n), RangeError)
        assert.throws(() => H5(4n, BigInt(Number.MAX_VALUE)), RangeError)

        assert.strictEqual(H5(BigInt(Number.MAX_VALUE), 0n), 1n)
        assert.strictEqual(H5(BigInt(Number.MAX_VALUE), 1n), BigInt(Number.MAX_VALUE))
        assert.throws(() => H5(BigInt(Number.MAX_VALUE), 2n), RangeError)
        assert.throws(() => H5(BigInt(Number.MAX_VALUE), BigInt(Number.MAX_VALUE)), RangeError)
      })
    })

    describe('H6 (hexation)', () => {
      const H6 = H.bind(undefined, 6n)
      it('works', () => {
        assert.strictEqual(H6(0n, 0n), 1n)
        assert.strictEqual(H6(0n, 1n), 0n)
        assert.strictEqual(H6(0n, 2n), 1n)
        assert.strictEqual(H6(0n, 3n), 0n)
        assert.strictEqual(H6(0n, BigInt(Number.MAX_VALUE)), 1n)

        assert.strictEqual(H6(1n, 0n), 1n)
        assert.strictEqual(H6(1n, 1n), 1n)
        assert.strictEqual(H6(1n, 2n), 1n)
        assert.strictEqual(H6(1n, 3n), 1n)
        assert.strictEqual(H6(1n, BigInt(Number.MAX_VALUE)), 1n)

        assert.strictEqual(H6(2n, 0n), 1n)
        assert.strictEqual(H6(2n, 1n), 2n)
        assert.strictEqual(H6(2n, 2n), 4n)
        assert.throws(() => H6(2n, 3n), RangeError)
        assert.throws(() => H6(2n, BigInt(Number.MAX_VALUE)), RangeError)

        assert.strictEqual(H6(3n, 0n), 1n)
        assert.strictEqual(H6(3n, 1n), 3n)
        assert.throws(() => H6(3n, 2n), RangeError)
        assert.throws(() => H6(3n, BigInt(Number.MAX_VALUE)), RangeError)

        assert.strictEqual(H6(BigInt(Number.MAX_VALUE), 0n), 1n)
        assert.strictEqual(H6(BigInt(Number.MAX_VALUE), 1n), BigInt(Number.MAX_VALUE))
        assert.throws(() => H6(BigInt(Number.MAX_VALUE), 2n), RangeError)
        assert.throws(() => H6(BigInt(Number.MAX_VALUE), 3n), RangeError)
        assert.throws(() => H6(BigInt(Number.MAX_VALUE), BigInt(Number.MAX_VALUE)), RangeError)
      })
    })

    describe('Hmax (BigInt(Number.MAX_VALUE)-ation)', () => {
      const Hmax = H.bind(undefined, BigInt(Number.MAX_VALUE))
      it('works when a is 0n', () => {
        assert.strictEqual(Hmax(0n, 0n), 1n)
        assert.strictEqual(Hmax(0n, 1n), 0n)
        assert.strictEqual(Hmax(0n, 2n), 1n)
        assert.strictEqual(Hmax(0n, 3n), 0n)
        assert.strictEqual(Hmax(0n, BigInt(Number.MAX_VALUE)), 1n)
      })

      it('works when a is 1n', () => {
        assert.strictEqual(Hmax(1n, 0n), 1n)
        assert.strictEqual(Hmax(1n, 1n), 1n)
        assert.strictEqual(Hmax(1n, 2n), 1n)
        assert.strictEqual(Hmax(1n, 3n), 1n)
        assert.strictEqual(Hmax(1n, BigInt(Number.MAX_VALUE)), 1n)
      })

      it('works when a is 2n', () => {
        assert.strictEqual(Hmax(2n, 0n), 1n)
        assert.strictEqual(Hmax(2n, 1n), 2n)
        assert.strictEqual(Hmax(2n, 2n), 4n)
        assert.throws(() => Hmax(2n, 3n), RangeError)
        assert.throws(() => Hmax(2n, BigInt(Number.MAX_VALUE)), RangeError)
      })

      it('works when a is 3n', () => {
        assert.strictEqual(Hmax(3n, 0n), 1n)
        assert.strictEqual(Hmax(3n, 1n), 3n)
        assert.throws(() => Hmax(3n, 2n), RangeError)
        assert.throws(() => Hmax(3n, 3n), RangeError)
        assert.throws(() => Hmax(3n, BigInt(Number.MAX_VALUE)), RangeError)
      })

      it('works when a is 1000000n', () => {
        assert.strictEqual(Hmax(1000000n, 0n), 1n)
        assert.strictEqual(Hmax(1000000n, 1n), 1000000n)
        assert.throws(() => Hmax(1000000n, 2n), RangeError)
        assert.throws(() => Hmax(1000000n, 3n), RangeError)
        assert.throws(() => Hmax(1000000n, BigInt(Number.MAX_VALUE)), RangeError)
      })

      describe('when a is BigInt(Number.MAX_VALUE)', () => {
        it('works when b is 0n', () => {
          assert.strictEqual(Hmax(BigInt(Number.MAX_VALUE), 0n), 1n)
        })

        it('works when b is 1n', () => {
          assert.strictEqual(Hmax(BigInt(Number.MAX_VALUE), 1n), BigInt(Number.MAX_VALUE))
        })

        it('works when b is 2n', () => {
          assert.throws(() => Hmax(BigInt(Number.MAX_VALUE), 2n), RangeError)
        })

        it('works when b is 3n', () => {
          assert.throws(() => Hmax(BigInt(Number.MAX_VALUE), 3n), RangeError)
        })

        it('works when b is BigInt(Number.MAX_VALUE)', () => {
          assert.throws(() => Hmax(BigInt(Number.MAX_VALUE), BigInt(Number.MAX_VALUE)), RangeError)
        })
      })
    })
  })
})
