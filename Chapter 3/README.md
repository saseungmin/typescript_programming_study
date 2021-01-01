# 🐤 Chapter 3: 객체와 타입

## 🦄 타입스크립트 변수 선언문

### 📚 타입스크립트 기본 제공 타입
- 자바스크립트와 타입스크립트의 기본 타입

|유형|자바스크립트 타입|타입스크립트 타입|
|:------:|:---:|:---:|
|수 유형|Number|number|
|불리언 타입|Boolean|boolean|
|문자열 타입|String|string|
|객체 타입|Object|object|

### 📚 let과 const 키워드
- 다음은 `let` 키워드로 변수를 선언하는 방법이다.
- `let`으로 선언한 변수는 코드에서 그 값이 수시로 변경될 수 있음을 암시한다.

```ts
let a = 1;
```

- 다음은 `const` 키워드로 변수를 선언하는 방법이다.
- `const`로 변수를 선언할 때는 반드시 **초기값을 명시해야 한다.**
- `const` 변수는 코드에서 변숫값이 절대 변하지 않는다는 것을 암시한다.

```ts
const a = 1;
```

### 📚 타입 주석
- 타입스크립트는 자바스크립트 변수 선언문을 확장해 다음과 같은 형태로 타입을 명시할 수 있다.
- 이를 **타입 주석**(**type annotation**)이라고 한다.

```ts
// let 변수 이름: 타입 [= 초깃값]
// const 변수이름: 타입 = 초깃값
let n: number = 1;
let b: boolean = true;
let s: string = 'hello';
let o: object = {};
```
- 타입스크립트는 `let`으로 선언한 변숫값은 **타입 주석으로 명시한 타입에 해당하는 값**으로만 바꿀 수 있다.

```ts
let n: number = 1;
let b: boolean = true;
let s: string = 'hello';

n = 'a'; // 타입 불일치 오류 발생
b = 1; // 타입 불일치 오류 발생
s = false; // 타입 불일치 오류 발생
```

### 📚 타입 추론
- 타입스크립트는 자바스크립트와 호환성을 위해 타입 주석 부분을 생략할 수 있다.
- 타입스크립트 컴파일러는 다음과 같은 코드를 만나면 **대입 연산자 `=` 오른쪽 값에 따라 변수의 타입을 지정**한다.
- 이를 **타입 추론**(**type inference**)이라고 한다.

```ts
let n = 1; // n의 타입을 number로 판단
let b = true; // b의 타입을 boolean으로 판단
let s = 'hello'; // s의 타입을 string으로 판단
let o = {}; // o의 타입을 object로 판단
```

- 즉, 변수 선언문에 타입 주석을 명시하지 않았지만, 컴파일러가 초깃값에 따라 타입을 추론하므로 각 변수는 초깃값에 해당하는 타입으로 지정된다. 따라서 **이후에 각 변수에는 해당 타입의 값만 지정할 수 있다.**

### 📚 any 타입
- 다음 코드에서 변수 `a`는 타입이 `any`이므로 값의 타입과 무관하게 어떤 종류의 값도 저장할 수 있다.

```ts
let a: any = 0;
a = 'hello';
a = true;
a = {};
```

### 📚 undefined 타입
- 자바스크립트에서 `undefined`는 값이다. (변수를 초기화하지 않으면)
- 그러나 타입스크립트에서 `undefined`는 타입이기도 하고 값이기도 하다.

```ts
let u: undefined = undefined;
u = 1; // Type '1' is not assignable to type 'undefined' 오류 발생
```
- 타입의 상속 관계를 보면 `any`는 **모든 타입의 루트 타입, 즉 최상위 타입**이다.
- 반면에 `undefined`는 모든 타입의 최하위 타입이다.

![typescript-type](../img/Chapter3-1.png)

- [이미지 출처](https://mishka.kr/2020/03/18/TypeSctipt-3-var/)

### 📚 템플릿 문자열
- 변수에 담긴 값을 조합해 문자열을 만들 수 있게 하는 **템플릿 문자열**을 제공한다.

```ts
let count = 10, message = 'Your count';
let result = `${message} is ${count}`;
console.log(result); // Your count is 10
```

## 🦄 객체와 인터페이스
- `object` 타입은 인터페이스와 클래스의 상위 타입이다.
- `object` 타입으로 선언된 변수는 `number`, `boolean`, `string`타입의 값을 가질 수는 없지만, 다음처럼 속성 이름이 다른 객체를 모두 자유롭게 담을 수 있다.

```ts
let o: object = { name: 'Jack', age: 32 };
o = { first: 1, second: 2 };
```
- `object` 타입은 마치 객체를 대상으로 하는 `any` 타입처럼 동작한다.
- 타입스크립트의 인터페이스 구문은 이렇게 동작하지 않게 하려는 목적으로 고안되었다.
- 즉, 변수 `o`에는 항상 `name`과 `age` 속성으로 구성된 객체만 가질 수 있게 해서 다른 타입일 경우 오류를 발생하게 한다.

### 📚 인터페이스 선언문
- 타입스크립트는 객체의 타입을 정의할 수 있게 하는 `interface`라는 키워드를 제공한다.

```ts
interface IPerson {
  name: string,
  age: number,
};
```

- 인터페이스의 목적은 객체의 타입 범위를 좁히는 데 있다. 따라서 다음처럼 `IPerson` 인터페이스의 조건을 벗어나는 코드는 모두 오류가 발생한다.

```ts
interface IPerson {
  name: string,
  age: number,
};

let good: IPerson = { name: 'Jack', age: 32 };

// 'age' 속성이 '{ name: string; }' 형식에 없지만 'IPerson' 형식에서 필수입니다.
let bad1: IPerson = { name: 'Jack' };
// 'name' 속성이 '{ age: number; }' 형식에 없지만 'IPerson' 형식에서 필수입니다.
let bad2: IPerson = { age: 32 };
// '{}' 형식에 'IPerson' 형식의 name, age 속성이 없습니다.
let bad3: IPerson = {};
// 개체 리터럴은 알려진 속성만 지정할 수 있으며 'IPerson' 형식에 'etc'이(가) 없습니다.
let bad4: IPerson = { name: 'Jack', age: 32, etc: true };
```

### 📚 선택 속성 구문
- 인터페이스를 설계할 때 어떤 속성은 반드시 있어야 하지만, 어떤 속성은 있어도 되고 없어도 되는 형태로 만들고 싶을 때가 있다.
- 이러한 속성을 **선택 속성**(**optional property**)이라고 한다.

```ts
interface IPerson2 {
  name: string,
  age: number,
  etc?: boolean, // optional property
}

let good1: IPerson2 = { name: 'Jack', age: 32 };
let good2: IPerson2 = { name: 'Jack', age: 32, etc: true };
```

### 📚 익명 인터페이스
- 타입스크립트는 `interface` 키워드도 사용하지 않고 인터페이스의 이름도 없는 인터페이스를 만들 수 있다.
- 이를 **익명 인터페이스**(**anonymous interface**)라고 한다.
- 익명 인터페이스 예

```ts
let ai: {
  name: string,
  age: number,
  etc?: boolean,
} = { name: 'Jack', age: 32 };
```
- 함수에 사용된 익명 인터페이스 예

```ts
function printMe(me: { name: string, age: number, etc?: boolean }) {
  console.log(
    me.etc?
      `${me.name} ${me.age} ${me.etc}` :
      `${me.name} ${me.age}`
  );
}

printMe(ai); // Jack 32
```

