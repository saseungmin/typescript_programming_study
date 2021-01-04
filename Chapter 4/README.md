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

## 🦄 함수 표현식
  
### 📚 함수는 객체다
- 자바스크립트에서 함수는 `Function` 클래스의 인스턴스이다.
- 다음 코드의 `add`는 함수로서 동작한다는 의미이다.

```ts
let add = new Function('a', 'b', 'return a + b');
let result = add(1, 2);
console.log(result); // 3
```

- `add` 함수는 다음과 같은 형태로도 구현할 수 있다.

```ts
let add2 = function(a, b) { 
  return a + b; 
}

console.log(add2(1, 2)); // 3
```

- 이처럼 함수 선언문에서 함수 이름을 제외한 `function(a, b) { return a + b; }`와 같은 코드를 **함수 표현식**(**function expression**)이라고 한다.

### 📚 일등 함수
- 프로그래밍 언어가 일등 함수(first-class function) 기능을 제공하면 함수형 프로그래밍 언어라고 한다.
- 자바스크립트와 타입스크립트는 일등 함수 기능이 있으므로 함수형 프로그래밍 언어이다.
- **일당 함수란, 함수와 변수를 구분하지 않는다는 의미이다.**
- 예를 들어 다음 코드에서 `f`는 `let` 키워드가 앞에 있으므로 변수이다. `f`는 변수이므로 값을 저장할 수 있다. 변수 `f`에는 `a + b` 형태의 함수 표현식을 저장했다.
- 하지만 `f`는 변수이므로 2행처럼 `a - b` 형태의 함수 표현식도 저장할 수 있다.

```ts
let f = function(a, b) { return a + b; }
f = function(a, b) { return a - b; }
```
- 심벌 `f`가 변수인지 함수인지 사실상 구분할 수 없다. 이것이 변수와 함수를 차별하지 않는다는 의미이다.

### 📚 표현식
- 프로그래밍 언어에서 표현식(expression)이라는 용어는 리터럴, 연산자, 변수, 함수 호출 등이 복합적으로 구성된 코드 형태를 의미한다.
- 예를 들어, `1 + 2`는 1 과 2라는 리터럴과 덧셈 연산자 `+`로 구성된 표현식이다.

### 📚 함수 표현식
- 앞에서 작성한 변수 `f`에는 `function(a, b) { return a + b; }`마치 값처럼 대입하는데, 이 `function(a, b) { return a + b; }` 부분을 함수 표현식이라고 한다.

### 📚 계산법
- 컴파일러는 표현식을 만나면 계산법을 적용해 어떤 값을 만드는데 계산법에는 조급한 계산법과 느긋한(지연) 계산법 두 가지가 있다.
- 컴파일러가 `1 + 2`라는 표현식을 만나면 조급한 계산법을 적용해 3이라는 값을 만들고, 컴파일러가 `function(a, b) { return a + b; }`라는 함수 표현식을 만나면, 심벌 `a`와 `b`가 어떤 값인지 알 수 없어서 느긋한 계산법을 적용해 계산을 보류한다.

### 📚 함수 호출 연산자
- 어떤 변수가 함수 표현식을 담고 있다면, 변수 이름 뒤에 함수 호출 연산자 `()`를 붙여서 호출할 수 있다.

```ts
let functionExpression = function(a, b) { return a + b; }
let value = functionExpression(1, 2); // (1, 2): 함수 호출 연산자
```
- **컴파일러는 함수 호출문을 만나면 지금까지 미뤘던 함수 표현식에 조급한 계산법을 적용해 함수 표현식을 값으로 바꾼다.** ( `return 1 + 2 => return 3` )

### 📚 익명 함수
- 함수 표현식은 사실 대부분 언어에서 언급되는 익명 함수(anonymous function)의 다른 표현이다.

```ts
let value = (function(a, b) {return a + b; })(1, 2) // 3
```
- 다음 코드는 앞의 한 줄까지 코드를 쉽게 분석하고자 세 줄로 나눈 것이다.

```ts
let value = 
(function(a, b) { return a + b })
(1, 2) // 3
```
- 컴파일러는 2행의 **익명 함수 부분에 게으른 계산법을 적용**해 그 상태로 놔두지만, 곧바로 3행의 **함수 호출 연산자를 만나므로** 2행의 함수 몸통에 **조급한 계산법**을 적용해 최종적으로 3이라는 값을 만들어 낸다.

### 📚 const 키워드와 함수 표현식
- 함수 표현식을 담는 변수는 `let` 보다는 `const` 키워드로 선언하는 것이 바람직하다.
- 함수 표현식을 담은 변수를 `const`키워드로 선언하면, 함수 내용이 이후에 절대로 바뀔 수 없다.

```ts
const f = () => {}
```