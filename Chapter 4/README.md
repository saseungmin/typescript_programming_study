# 🐤 Chapter 4: 함수와 메서드

<details><summary>Table of Contents</summary>

- 🦄 타입스크립트 변수 선언문 [:link:](#-타입스크립트-변수-선언문)
  - 📚 타입스크립트 기본 제공 타입 [:link:](#-타입스크립트-기본-제공-타입)
  - 📚 let과 const 키워드 [:link:](#-let과-const-키워드)
  - 📚 타입 주석 [:link:](#-타입-주석)
  - 📚 타입 추론 [:link:](#-타입-추론)
  - 📚 any 타입 [:link:](#-any-타입)
  - 📚 undefined 타입 [:link:](#-undefined-타입)
  - 📚 템플릿 문자열 [:link:](#-템플릿-문자열)
- 🦄 객체와 인터페이스 [:link:](#-객체와-인터페이스)
  - 📚 인터페이스 선언문 [:link:](#-인터페이스-선언문)
  - 📚 선택 속성 구문 [:link:](#-선택-속성-구문)
  - 📚 익명 인터페이스 [:link:](#-익명-인터페이스)
- 🦄 객체와 클래스 [:link:](#-객체와-클래스)
  - 📚 클래스 선언문 [:link:](#-클래스-선언문)
  - 📚 접근 제한자 [:link:](#-접근-제한자)
  - 📚 생성자 [:link:](#-생성자)
  - 📚 인터페이스 구현 [:link:](#-인터페이스-구현)
  - 📚 추상 클래스 [:link:](#-추상-클래스)
  - 📚 클래스의 상속 [:link:](#-클래스의-상속)
  - 📚 static 속성 [:link:](#-static-속성)
- 🦄 객체의 비구조화 할당문 [:link:](#-객체의-비구조화-할당문)
  - 📚 비구조화란? [:link:](#-비구조화란)
  - 📚 비구조화 할당 [:link:](#-비구조화-할당)
  - 📚 잔여 연산자 [:link:](#-잔여-연산자)
  - 📚 전개 연산자 [:link:](#-전개-연산자)
- 🦄 객체의 타입 변환 [:link:](#-객체의-타입-변환)
  - 📚 타입 변환 [:link:](#-타입-변환)
  - 📚 타입 단언 [:link:](#-타입-단언)

</details>

## 🦄 함수 선언문

- 자바스크립트에서 함수는 `function` 키워드로 만드는 함수와 `=>` 기호로 만드는 화살표 함수 두 가지 있다.
- 타입스크립트 함수 선언문은 자바스크립트 함수 선언문에서 **매개변수와 함수 반환값에 타입 주석을 붙이는 다음 형태로 구성된다.**

```ts
function add(a: number, b: number): number {
  return a + b;
}

let result = add(1, 2);
```

### 📚 매개변수와 반환값의 타입 주석 생략
- 함수 선언문에서도 매개변수와 반환값에 대한 타입 주석을 생략할 수 있다.
- 다만, 변수 때와는 달리 **함수의 매개변수 타입과 반환 타입을 생략하는 것은 바람직하지 않다.** 왜냐하면, 타입이 생략되어 있으면 함수의 구현 의도를 알기 어렵고 잘못 사용하기 쉽기 때문이다.

### 📚 void 타입
- 값을 반환하지 않는 함수는 반환 타입이 `void`이다.
- `void` 타입은 함수 반환 타입으로만 사용할 수 있다.

```ts
function printMe(name: string, age: number): void {
  console.log(`name: ${name}, age: ${age}`);
}
```

### 📚 함수 시그니처
- 변수에 타입이 있듯이 함수 또한 타입이 있는데, 함수의 타입을 **함수 시그니처**라고 한다.

```
(매개변수1타입, 매개변수2타입[, ...]) => 반환값 타입
```

- 다음 `printMe` 함수는 `string`과 `number` 타입의 매개변수가 두 개 있고 반환 타입이 `void`이다.
- 따라서 함수 시그니처는 `(string, number) => void` 이다.

```ts
let printMe: (string, number) => void = function (name: string, age: number): void {}
```
- 만약 매개변수가 없으면 단순히 `()`로 표현한다. `() => void`는 매개변수도 없고 반환값도 없는 함수 시그니처이다.

### 📚 type 키워드로 타입 별칭 만들기
- 타입스크립트는 `type`이라는 키워드를 제공한다.
- `type` 키워드는 **기존에 존재하는 타입을 단순히 이름만 바꿔서** 사용할 수 있게 해준다.
- 이러한 기능을 **타입 별칭**(**type alias**)이라고 한다.

```ts
type 새로운타입 = 기존타입
```

- `(string, number) => void` 함수 시그니처를 `stringNumberFunc`이라는 이름으로 타입 별칭을 만든다.
- 이 별칭 덕분에 변수 `f`와 `g`에 타입 주석을 더 수월하게 붙일 수 있다.

```ts
type stringNumberFunc = (string, number) => void;
let f: stringNumberFunc = function(a: string, b: number): void {}
let g: stringNumberFunc = function(c: string, d: number): void {}
```

- 함수의 타입, 즉 함수 시그니처를 명시하면 매개변수의 개수나 타입, 반환 타입이 다른 함수를 선언하는 잘못을 미연에 방지할 수 있다.

```ts
// 생략...
let h: stringNumberFunc = function () {}
h(); // 2개의 인수가 필요한데 0개를 가져왔습니다.
```

### 📚 undefined 관련 주의 사항
- `undefined` 타입은 타입스크립트의 타입 계층도에서 모든 타입 중 최하위 타입이다.
- 다음은 `undefined`를 고려하지 않은 예이다.

```ts
interface INameable {
  name: string;
}

function getName(o: INameable) { return o.name; }

let n = getName(undefined); // 오류 발생
console.log(n);
```

- `getName`은 `INameable` 타입의 매개변수를 요구하지만, `undefined` 호출해도 구문 오류가 발생하지 않는다. 
- 즉, `undefined`는 **최하위 타입**이므로 `INameable`을 **상속하는 자식 타입**으로 간주한다.
- 하지만, 코드를 실행하면 오류가 발생한다.
- 다음은 `undefined`를 고려한 예이다.

```ts
interface INameable {
  name: string;
}

function getName(o: INameable) {
  return o != undefined ? o.name : 'unknown name';
}

let n = getName(undefined);
console.log(n); // unknown name
console.log(getName({ name: 'Jack' })); // Jack
```

- 만약 인터페이스에 선택 속성이 있다면 다음과 같이 구현해야 한다.

```ts
interface IAgeable {
  age?: number;
}

function getAge(o: IAgeable) {
  return o != undefined && o.age ? o.age : 0;
}

console.log(getAge(undefined)); // 0
console.log(getAge(null)); // 0
console.log(getAge({ age: 32 })); // 32
```

### 📚 선택적 매개변수

- 함수의 매개변수에도 다음처럼 이름 뒤에 물음표를 붙일 수 있으며, 이를 **선택적 매개변수**라고 한다.

```ts
function fn(arg1: string, arg?: number): void {}
```

- 선택적 매개변수는 다음 코드에서 함수 호출을 모두 가능하게 하고 싶을 떄 사용한다.

```ts
function fn(arg1: string, arg?: number) { console.log(`arg: ${arg}`); }

fn('hello', 1); // arg: 1
fn('hello'); // arg: undefined
```

- 선택적 매개변수가 있는 함수의 시그니처는 다음처럼 타입 뒤에 물음표를 붙인다.

```ts
type OptionalArgFunc = (string, number?) => void
```