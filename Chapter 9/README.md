# 🐤 Chapter 9: 람다 라이브러리

- 자세한 내용은 책을 참고합시당 (P.199 ~ P.258)

## 🦄 람다 기본 사용법

### 📚 R.range 함수

```ts
import * as R from 'ramda';

console.log(R.range(1, 9 + 1)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 📚 R.tap 디버깅용 함수
- `R.tap` 함수는 2차 고차 함수 형태로 현재 값을 파악할 수 있게 해준다.

```ts
import * as R from 'ramda';

const numbers: number[] = R.range(1, 9 + 1);

R.tap(n => console.log(n))(numbers); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 📚 R.pipe 함수

```ts
import * as R from 'ramda';

const array: number[] = R.range(1, 10);

R.pipe(R.tap(n => console.log(n)))(array); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 📚 포인트가 없는 함수

```ts
import * as R from 'ramda';

const dump = <T>(array: T[]): T[] => R.pipe(
  R.tap(n => console.log(n))
)(array) as T[]; // 타입 단언 사용

dump(R.range(1, 10)); // [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

### 📚 자동 커리 이해하기

```ts
import * as R from 'ramda';

console.log(
  R.add(1, 2),  // 3
  R.add(1)(2),  // 3
);
```

### 📚 R.curryN 함수
- N개의 매개변수를 가진 1차 함수(first function)를 N개의 커리 매개변수를 가지는 N차 고차 함수로 만들어 준다.

```ts
import * as R from 'ramda';

const sum  = (...numbers: number[]): number =>
  numbers.reduce((result: number, sum: number) => result + sum, 0);

const curriedSum = R.curryN(4, sum);

console.log(
  curriedSum(), // [Function (anonymous)]
  curriedSum(1), // [Function (anonymous)]
  curriedSum(1)(2), // [Function (anonymous)]
  curriedSum(1)(2)(3), // [Function (anonymous)]
  curriedSum(1)(2)(3)(4), // 10
);
```

### 📚 순수 함수
- 람다 라이브러리가 제공하는 함수들은 항상 입력 변수의 상태를 변화시키지 않고 새로운 값을 반환한다.

## 🦄 배열에 담긴 수 다루기

### 📚 선언형 프로그래밍
- 선언형 프로그래밍에서 모든 입력 데이터는 다음처럼 단순 데이터보다배열 형태를 주로 사용한다.

```ts
const value = 1;

const newArray = R.pipe(
  R.map(R.inc)
)([value]) // [2]
```

- `R.pipe` 안에서는 `console.log()`문을 직접 사용할 수 없으므로 반드시 `R.tap` 함수를 사용해야 한다.

### 📚 사칙 연산 함수

```ts
R.add(a: number)(b: number); // a + b
R.subtract(a: number)(b: number); // a - b
R.multiply(a: number)(b: number); // a * b
R.divide(a: number)(b: number); // a / b
```

### 📚 R.addIndex 함수
- `Array.map`은 두 번째 매개변수로 `index`를 제공하지만, `R.map`은 `Array.map`과 다르게 `index` 매개변수를 기본적으로 제공하지 않는다. 따라서 `R.addIndex` 함수를 사용해 `R.map`이 `index`를 제공하는 새로운 함수를 만들어야 한다.

```ts
import * as R from 'ramda';

const addIndex = R.pipe(
  R.addIndex(R.map)(R.add),
  // R.addIndex(R.map)((value: number, index: number) => R.add(value)(index)),
  R.tap(a => console.log(a)) // [1, 3, 5, 7, 9, 11, 13, 15, 17]
);

const newNumbers = addIndex(R.range(1, 9 + 1));
```

### 📚 R.flip 함수
- 람다는 `R.flip`이라는 함수를 제공하는데 `R.flip`은 `R.subtract`와 같은 2차 고차 함수의 매개 변수 순서를 바꿔준다.

```ts
import * as R from 'ramda';

const reverseSubtract = R.flip(R.subtract);

const newArray = R.pipe(
  R.map(reverseSubtract(10)), // value - 10
  R.tap(a => console.log(a)), // [ -9, -8, -7, -6, -5, -4, -3, -2, -1 ]
)(R.range(1, 9 + 1));
```

### 📚 사칙 연산 함수들의 조합

> f(x) = ax<sup>2</sup> + bx + c

```ts
import * as R from 'ramda';

type NumberToNumberFunc = (number) => number;

// 람다를 사용하지 않음
//const f = (a: number, b: number, c: number): NumberToNumberFunc =>
//  (x: number): number => a * x ** 2 + b * x + c;

// 람다 함수 사용
const exp = (N: number) => (x: number) => x ** N;
const square = exp(2);

export const f = (a: number, b: number, c: number): NumberToNumberFunc =>
  (x: number): number => R.add(
    R.add(
      R.multiply(a)(square(x))
    )(R.multiply(b)(x)),
    c
  );
```

## 🦄 서술자와 조건 연산

### 📚 수의 크기를 판단하는 서술자
- 수를 비교해 `true`나 `false`를 반환하는 다음의 서술자들을 제공한다.

```ts
R.lt(a)(b): boolean // a < b 이면 true, a가 b보다 작음
R.lte(a)(b): boolean // a <= b 이면 true, a가 b보다 작거나 같음
R.gt(a)(b): boolean // a > b 이면 true, a가 b보다 큼
R.gte(a)(b): boolean // a >= b 이면 true, a가 b보다 크거나 같음
```

- 배열의 아이템 중 3보다 크거나 같은 수만 선택

```ts
import * as R from 'ramda';

R.pipe(
  R.filter(R.lte(3)),
  R.tap(n => console.log(n)) // [3, 4, 5, 6, 7, 8, 9, 10]
)(R.range(1, 10 + 1));
```

### 📚 R.allPass 로직 함수
- `R.lt`, `R.gt`처럼 `boolean` 타입의 값을 반환하는 함수들은 `R.allPass`와 `R.anyPass`라는 로직 함수를 통해 결합할 수 있다.

```ts
R.allPass(서술자배열) // 배열의 조건을 모두 만족하면 true
R.anyPass(서술자배열) // 배열의 조건을 하나라도 만족하면 true
```

- 다음 예는 `x`가 `min <= x < max` 조건을 만족하는지 `R.allPass` 함수를 사용해 확인한다.

```ts
import * as R from 'ramda';

type NumberToBooleanFunc = (n: number) => boolean;

export const selectRange = (min: number, max: number): NumberToBooleanFunc =>
  R.allPass([
    R.lte(min),
    R.gt(max),
  ]);
```

### 📚 R.not 함수
- 입력값이 `true`이면 `false`를 반환하고 `false`이면 `true`를 반환하는 함수이다.
- 이전에 구현한 `selectRange`와 반대로 작용하는 `notRange`를 구현할 수 있다.

```ts
import * as R from 'ramda';
import { selectRange } from './selectRange';

export const notRange = (min: number, max: number) => 
  R.pipe(selectRange(min, max), R.not);
```

### 📚 R.ifElse 함수
- `R.ifElse` 함수는 세 가지 매개변수를 포함하는데, 첫 번째는 `true/false`를 반환하는 서술자를, 두 번째는 선택자가 `true`를 반환할 때 실행할 함수를 세 번째는 선택자가 `false`를 반환할 때 실행할 함수이다.
- 다음 코드는 1부터 10까지 수에서 중간값 6보다 작은 수는 1씩 감소시키고, 같거나 큰 수는 1씩 증가시키는 것을 구현한 예이다.

```ts
import * as R from 'ramda';

const input: number[] = R.range(1, 10 + 1);
const halfVale = input[input.length / 2]; // 6

const subtractOrAdd = R.pipe(
  R.map(R.ifElse(
    R.lte(halfVale), // 조건 서술자: x => half <= x,
    R.inc, // true 일 때 실행할 함수
    R.dec, // false 일 때 실행할 함수
  )),
  R.tap(a => console.log(a)), // [0, 1, 2, 3, 4, 7, 8, 9, 10, 11]
);

const result = subtractOrAdd(input);
```

## 🦄 문자열 다루기

- 문자열 앞뒤의 백색 문자 자르기

```ts
import * as R from 'ramda';

R.trim('\t hello \n'); // hello
```

- 대소문자 전환

```ts
import * as R from 'ramda';

R.toUpper('Hello'); // HELLO
R.toLower('HELLO'); // hello
```

- 문자열을 배열로 변환과 배열을 문자열로 변환

```ts
import * as R from 'ramda';

const words: string[] = R.split(' ')(`Hello world!, I'm Peter.`);
// ['Hello', 'world!,', "I'm", 'Peter.']

R.join(' ')(words);
// "Hello world!, I'm Peter."
```
