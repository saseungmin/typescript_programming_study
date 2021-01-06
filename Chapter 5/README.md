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