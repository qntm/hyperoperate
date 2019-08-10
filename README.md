# hyperoperate

This module exports the [hyperoperation](https://en.wikipedia.org/wiki/Hyperoperation) function. This recursive function generalises the binary operations of addition (*n* = 1), multiplication (*n* = 2) and exponentiation (*n* = 3) to arbitrary non-negative *n* (tetration, pentation, hexation, ...)

> *H*(0, *a*, *b*) = *b* + 1<br/>
> *H*(1, *a*, 0) = *a*<br/>
> *H*(2, *a*, 0) = 0<br/>
> *H*(3, *a*, 0) = 1<br/>
> *H*(*n*, *a*, *b*) = *H*(*n* - 1, *a*, *H*(*n*, *a*, *b* - 1))<br/>

`H` accepts only non-negative integers `n`, `a` and `b`. Notably, `H` is implemented entirely without recursion and returns results in extremely good time!

Note that for the purposes of this module, 0 to the power of 0 is 1.

## Installation

```sh
npm install hyperoperate
```

## Usage

```js
const H = require('hyperoperate')

// n = 0: successor (`a` is ignored)
H(0, 1000, 3) // 4

// n = 1: addition
H(1, 33, 44) // 77

// n = 2: multiplication
H(2, 6, 7) // 42

// n = 3: exponentiation
H(3, 2, 10) // 1024

// n = 4: tetration
H(4, 3, 3) // 3^3^3 = 7625597484987

// n = 5: pentation
H(5, 2, 3) // 2^^2^^2 = 2^^4 = 2^2^2^2 = 65536

// and so on...
```