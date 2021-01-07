# 🐤 Chapter 5: 배열과 튜플

## 🦄 배열 이해하기
- 자바스크립트에서 배열은 `Array` 클래스의 인스턴스이다.

```ts
let array = new Array;
array.push(1);
array.push(2);
array.push(3);
console.log(array); // [1, 2, 3]
```
- 배열에 담긴 각각 값을 아이템 또는 원소라고 한다.

### 📚 [] 단축 구문
- 자바스크립트에서는 `[]`라는 단축 구문을 제공한다.

```ts
let numbers = [1, 2, 3];
let strings = ['Hello', 'World'];
console.log(numbers, strings); // [1, 2, 3] ['Hello', 'World']
```

### 📚 자바스크립트에서 배열은 객체다
- 자바스크립트에서 배열은 객체이다.
- 배열은 `Array` 클래스의 인스턴스인데, 클래스의 인스턴스는 객체이기 때문이다.
- `Array.isArray`는 매개변수로 전달받은 심벌이 배열인지 객체인지 알려준다.

```ts
let a = [1, 2, 3];
let o = { name: 'Jack', age: 32 };
console.log(Array.isArray(a), Array.isArray(o)); // true false
```

### 📚 배열의 타입
- 타입스크립트에서 배열의 타입은 `아이템 타입[]`이다. 예를 들어, 배열의 아이템이 `number` 타입이면 배열의 타입은 `number[]`이고, 아이템이 `string` 타입이면 `string[]`이다.

```ts
let numArray: number[] = [1, 2, 3];
let strArray: string[] = ['Hello', 'World'];

type IPerson = { name: string, age?: number };
let personArray: IPerson[] = [
  { name: 'Jack' },
  { name: 'Jane', age: 32 },
];

// [ { name: 'Jack' }, { name: 'Jane', age: 32 } ]
```

### 📚 문자열과 배열 간 변환
- 타입스크립트에서는 문자 타입이 없고 문자열의 내용 또한 변경할 수 없다. 이러한 특징 때문에 문자열을 가공하려면 **먼저 문자열을 배열로 전환**해야 한다.
- 보통 문자열을 배열로 전환할 때는 `String` 클래스의 `split` 메서드를 사용한다.

```ts
const split = (str: string, delim: string = ''): string[] => str.split(delim);

console.log(
  split('hello'), // [ 'h', 'e', 'l', 'l', 'o' ]
  split('h_e_l_l_o', '_'), // [ 'h', 'e', 'l', 'l', 'o' ]
);
```

- `string[]` 타입의 배열을 다시 `string` 타입으로 변환하려면 `Array` 클래스의 `join` 메서드를 사용한다.
- 다음은 `join` 메서드를 이용하는 사용자 정의 함수 `join`을 작성한 예이다.

```ts
const join = (strArray: string[], delim: string=''): string =>
  strArray.join(delim);

console.log(
  join(['h', 'e', 'l', 'l', 'o']), // hello
  join(['h', 'e', 'l', 'l', 'o'], '_'), // h_e_l_l_o
);
```

### 📚 인덱스 연산자
- 배열이 담고 있는 아이템 중 특정 위치에 있는 아이템을 얻고자 할 때는 인덱스 `연산자[인덱스]`를 사용한다.

```ts
const numbers: number[] = [1, 2, 3, 4, 5];

for(let index = 0; index < numbers.length; index++) {
  const item: number = numbers[index];
  console.log(item); // 1 2 3 4 5
}
```

### 📚 배열의 비구조화 할당
- 배열의 비구조화 할당문에서는 객체와 달리 `[]` 기호를 사용한다.

```ts
let array: number[] = [1, 2, 3, 4, 5];
let [first, second, third, ...rest] = array;

console.log(first, second, third, rest); // 1 2 3 [4, 5]
```

### 📚 for...in 문
- `for...in` 문은 객체를 대상으로 사용하지만 배열도 객체이므로 배열에서 사용할 수 있다.

```ts
let names = ['Jack', 'Jane', 'Steve'];

for (let index in names) {
  const name = names[index];
  console.log(`[${index}]: ${name}`); // [0]: Jack [1]: Jane [2]: Steve
}
```

- 만약 `for...in` 문에 객체를 사용할 때는 객체가 가진 속성을 대상으로 순회한다.

```ts
let jack = { name: 'Jack', age: 32 };
for(let property in jack) {
  console.log(`${property}: ${jack[property]}`); // name: 'Jack' age: 32
}
```

### 📚 for...of 문
- `for...in` 문은 배열의 인덱스값을 대상으로 순회하지만, `for...of` 문은 배열의 아이템값을 대상으로 순회한다.

```ts
for(let name of ['Jack', 'Jane', 'Steve'])
  console.log(name); // Jack Jane Steve
```

### 📚 제네릭 방식 타입
- 배열을 다루는 함수를 작성할 때는 `number[]`와 같이 타입이 고정된 함수를 만들기보다는 `T[]` 형태로 배열의 아이템 타입을 한꺼번에 표현하는 것이 편리하다.
- 타입을 `T`와 같은 일종의 변수로 취급하는 것을 **제네릭(generics) 타입**이라고 한다.

```ts
const arrayLength = (array: T[]): number => array.length;
```
- 그런데 이렇게 하면 컴파일러가 `T`의 의미를 알 수 있어야 한다.
- 즉, `T`가 타입 변수라고 알려줘야 한다.

```ts
export const arrayLength = <T>(array: T[]): number => array.length;
export const isEmpty = <T>(array: T[]): boolean => arrayLength<T>(array) == 0;
```

- 제네릭 함수로 구현했으므로 다양한 배열 타입에 모두 정상적으로 대응하는 것을 볼 수 있다.

```ts
import { arrayLength, isEmpty } from "./arrayLength";

let numArray: number[] = [1, 2, 3];
let strArray: string[] = ['Hello', 'World'];

type IPerson = {
  name: string,
  age?: number,
};

let personArray: IPerson[] = [
  { name: 'Jack'},
  { name: 'Jane', age: 32 },
];

console.log(
  arrayLength(numArray), // 3 
  arrayLength(strArray), // 2 
  arrayLength(personArray), // 2 
  isEmpty([]), // true
  isEmpty([1]), // false
);
```

### 📚 제네릭 함수의 타입 추론
- 다음 코드의 1행의 `identity` 함수는 제네릭 형태로 구현되어 있다.
- 제네릭 형태로 구현된 함수는 원칙적으로 3행처럼 타입 변수를 다음과 같은 형태로 명시해 주어야 한다.

```ts
const identity = <T>(n: T): T => n;

console.log(
  identity<boolean>(true), // true
  identity(true), // true
);
```

- 하지만 이런 코드는 번거로워서 타입스크립트는 4행처럼 타입 변수 부분을 생략할 수 있게 한다.

```ts
함수이름<타입변수>(매개변수)
```

- 타입스크립트는 **타입 변수가 생략된 제네릭 함수를 만나면 타입 추론을 통해 생략된 타입을 찾아낸다.**

### 📚 제네릭 함수의 함수 시그니처
- 타입스크립트는 어떤 경우 함수 시그니처의 매개변수 부분에 변수 이름을 기입하라고 요구한다.
- 다음 화면에서 `normal` 함수는 `cb`라는 이름의 매개변수에 함수 시그니처를 사용했다. 그런데 `normal`과 달리 `error`는 오류가 발생한다.

```ts
const normal = (cb: (number) => number): void => {};
// error: number 식별자가 중복되었습니다.
const error = (cb: (number, number?) => number): void => {}; 
const fixed = (cb: (a:number, number?) => number): void => {};
```

- 이런 오류가 발생하면 3행의 `fixed` 선언문처럼 **타입스크립트가 해석하지 못하는 부분에 변수를 삽입하고 이 변수에 타입을 명시해 해결한다.**
- 제네릭 타입의 함수에서도 같은 문제가 발생하는데, 해결 방법은 앞서 `fixed`에서와 같다.

```ts
const f = <T>(cb: (arg: T, i?: number) => number): void => {};
```

### 📚 전개 연산자
- 전개 연산자는 배열에서도 적용할 수 있다.

```ts
let array1: number[] = [1];
let array2: number[] = [2, 3];
let mergedArray: number[] = [...array1, ...array2, 4];
console.log(mergedArray); // [1, 2, 3, 4]
```

### 📚 range 함수 구현
- ramda의 외부 패키지가 제공하는 `R.range`란 함수를 사용해 봤었는데, 배열의 전개 연산자를 적용하면 `R.range`와 같은 함수를 쉽게 만들 수 있다.
- 다음 `range` 함수는 재귀 함수 스타일로 동작하며, `R.range`처럼 `from`에서 `to`까지 수로 구성된 배열을 생성해 준다.

```ts
const range = (from: number, to: number): number[] =>
  from < to ? [from, ...range(from + 1, to)]: [];

let numbers: number[] = range(1, 10);
console.log(numbers); // [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
```

## 🦄 선언형 프로그래밍과 배열

### 📚 명령형 프로그래밍이란?
- 프로그램의 기본 형태는 입력 데이터를 얻고 가공한 다음, 결과를 출력하는 형태로 구성된다.

> 1. 입력 데이터 얻기
> 2. 입력 데이터 가공해 출력 데이터 생성
> 3. 출력 데이터 출력

- 반면에 선언형 프로그래밍은 시스템 자원의 효율적인 운용보다는 일괄된 문제 해결 구조에 더 집중한다. 선언형 프로그래밍은 명령형 프로그래밍처럼 `for`문을 사용하지 않고 모두 데이터를 배열에 담고 그 문제가 해결될 때까지 끊임없이 또 다른 형태의 배열로 가공하는 방식으로 구현한다.

> 1. 문제를 푸는 데 필요한 모든 데이터 배열에 저장
> 2. 입력 데이터 배열을 가공해 출력 데이터 배열 생성
> 3. 출력 데이터 배열에 담긴 아이템 출력


### 📚 1부터 100까지 더하기 문제 풀이
- 아래 구조는 명령형 프로그래밍 방식이다.

```ts
let sum = 0;
for(let val = 1; val <= 100;)
  sum += val++;
console.log(sum); // 5050
```

- 다음 코드는 선언형으로 구현한 것이다.
- 명령어 코드는 데이터와 가공이 `for` 문 안에서 이루어졌지만, **선언형은 데이터 생성과 가공 과정을 분리한다.**

```ts
import { range } from "./range";

let numbers: number[] = range(1, 100 + 1);
console.log(numbers); // [1, 2, ..., 100]
```

### 📚 fold: 배열 데이터 접기
- 폴드는 `[1, 2, 3, ...]` 형태의 배열 데이터를 가공해 `5050`과 같은 하나의 값을 생성하려고 할 때 사용한다.
- 폴드 함수는 `T[]` 타입 배열을 가공해 `T` 타입의 결과를 만들어 준다.

```ts
export const fold = <T>(array: T[], callback: (result: T, val: T) => T, initValue: T) => {
  let result: T = initValue;

  for (let i = 0; i < array.length; ++i) {
    const value = array[i];
    result = callback(result, value);
  }
  
  return result;
}
```

- 다음은 `fold` 함수를 사용해 선언형 프로그래밍 방식으로 1부터 100까지 더하는 코드를 구현한 것이다.

```ts
import { range } from "./range";
import { fold } from './fold';

// 입력 데이터 생성
let numbers: number[] = range(1, 100 + 1);

// 입력 데이터 가공
let result = fold(numbers, (result, value) => result + value, 0);
console.log(result); // 5050
```

- 명령형 방식은 시스템 자원의 효율을 최우선으로 생각하지만, 선언형 방식은 폴드처럼 범용으로 구현된 함수를 재사용하면서 문제를 해결한다.

### 📚 1부터 100까지 훌수의 합 구하기
- 다음은 명령형 방식으로 구현한 코드이다.

```ts
let oddSum = 0;
for (let val = 1; val <= 100; val += 2) {
  oddSum += val;
}

console.log(oddSum); // 2500
```

### 📚 filter: 조건에 맞는 아이템만 추려내기
- 함수형 프로그래밍에서 흔히 보는 `filter`라는 이름의 함수는 입력 배열을 가공해 조건에 맞는 값만 추려내는 기능을 한다.
- `filter` 함수를 구현한 예이다.

```ts
export const filter = <T>(array: T[], callback: (value: T, index?: number) => boolean): T[] => {
  let result: T[] = [];

  for (let index: number = 0; index < array.length; ++index) {
    const value = array[index];
    
    if(callback(value, index)) {
      result = [...result, value];
    }

    return result;
  }
}
```

- `filter`를 사용해 구현한다.

```ts
import { range } from "./range";
import { fold } from './fold';
import { filter } from './filter';

let numbers: number[] = range(1, 100 + 1);

const isOdd = (n: number): boolean => n % 2 !== 0;
let result = fold(filter(numbers, isOdd), (result, value) => result + value, 0);

console.log(result); // 2500
```

### 📚 1^2^ + 2^2^ + ... + 100^2^
- 명령형 방식으로 구현한 것이다.

```ts
let squareSum = 0;
for (let val = 1; val <= 100; ++val ) {
  squareSum += val * val;
}
console.log(squareSum);
```
- 선언형 방식으로 입력 데이터를 이와 같이 구현하려면 `map`이라는 함수가 필요하다.

### 📚 map: 배열 데이터 가공하기
- 변수 `x`와 `y`의 타입까지 생각하면 `map`은 `x: T -> y: Q` 처럼 입력과 출력의 변수의 타입이 서로 다를 수 있음을 고려해야 한다.

```ts
export const map = <T, Q>(array: T[], callback: (value: T, index?: number) => Q): Q[] => {
  let result: Q[] = [];

  for(let index = 0; index < array.length; ++index) {
    const value = array[index];
    result = [...result, callback(value, index)];
  }
  
  return result;
}
```

- 이제 `map` 함수를 이용하면 선언형 방식의 코드로 작성할 수 있다.

```ts
import { range } from "./range";
import { fold } from './fold';
import { map } from './map';

let numbers: number[] = range(1, 100 + 1);
let result = fold(
  map(numbers, value => value * value),
  (result, value) => result + value, 
  0
)

console.log(result); // 338350
```

## 🦄 배열의 map, reduce, filter 메서드

### 📚 filter 메서드
- 배열의 타입이 `T[]`일 때 배열의 `filter` 메서드는 다음과 같은 형태로 설계되었다.

```ts
filter(callback: (value: T, index?: number): boolean): T[]
```

- 다음 코드는 `filter` 메서드를 사용해 구현한 예이다.

```ts
import { range } from "./range";

const array: number[] = range(1, 10 + 1);

let odds: number[] = array.filter((value) => value % 2 !== 0);
let evens: number[] = array.filter((value) => value % 2 === 0);

console.log(odds, evens); // [ 1, 3, 5, 7, 9 ] [ 2, 4, 6, 8, 10 ]
```

### 📚 map 메서드
- 배열의 타입이 `T[]`일 때 배열의 `map` 메서드는 다음과 같은 형태로 설계되었으며, `filter`와 달리 `map` 메서드는 입력 타입과 다른 타입의 배열을 만들 수 있다.

```ts
map(callback: (value: T, index? number): Q): Q[]
```
- 다음 코드는 `map` 메서드를 사용해 구현한 예로 `number[]` 타입 배열의 `string[]` 타입 배열로 가공하는 예이다.

```ts
import { range } from "./range";

let square: string[] = range(1, 5 + 1)
  .map((val, index) => `[${index}]: ${val}`);

console.log(square); // [ '[0]: 1', '[1]: 2', '[2]: 3', '[3]: 4', '[4]: 5' ]
```

### 📚 reduce 메서드
- 구현한 `fold` 함수는 타입스크립트 배열의 `reduce` 메서드로 대체할 수 있다.
- 배열의 타입이 `T[]`일 때 배열의 `reduce` 메서드는 다음과 같은 형태로 설계되었다.

```ts
reduce(callback: (result: T, value: T), initialValue: T): T;
```

- 다음은 1부터 100까지 더하는 로직을 `reduce` 메서드를 사용해 다시 구현한 예이다.

```ts
import { range } from "./range";

let reduceSum: number = range(1, 100 + 1)
  .reduce((result: number, value: number) => result + value, 0);

console.log(reduceSum); // 5050
```