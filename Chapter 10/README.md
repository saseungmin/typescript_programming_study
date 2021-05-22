# 🐤 Chapter 10: 제네릭 타입 이해하기

## 🦄 제네릭 타입 이해하기
- 제네릭 타입은 인터페이스나 클래스, 함수, 타입 별칭 등에 사용할 수 있는 기능으로, 해당 심벌의 타입을 미리 지정하지 않고 다양한 타입에 대응하려고 할 떄 사용한다.

```ts
// 제네릭 인터페이스 구문
interface IValuable<T> {
  value: T;
}

// 제네릭 함수 구분
function identity<T>(arg: T): T { return arg; }

// 제네릭 타입 별치 구문
type IValuable<T> = {
  value: T;
}

// 제네릭 클래스 구문
class Valuable<T> {
  constructor(public value: T) {};
}
```

### 📚 제네릭 사용하기
- 제네릭 인터페이스 `IValuable<T>`를 구현하는 제네릭 클래스는 자신이 가진 타입 변수 `T`를 다음처럼 인터페이스 쪽 제네릭 타입 변수로 넘길 수 있다.

```ts
interface IValuable<T> {
  value: T;
}

class Valuable<T> implements IValuable<T> {
  constructor(public value: T) {}
}

// 제네릭 함수는 다음처럼 자신의 타입 변수 T를 제네릭 인터페이스의 타입 변수 쪽으로 넘기는 형태로 구현할 수 있다.
const printValue = <T>(o: IValuable<T>): void => console.log(o.value);

printValue(new Valuable<number>(1)); // 1
printValue(new Valuable<boolean>(true)); // true
printValue(new Valuable<string>('hello')); // hello
printValue(new Valuable<number[]>([1, 2, 3])); // [1, 2, 3]
```

## 🦄 제네릭 타입 제약
- 제네릭 타입 제약은 타입 변수에 적용할 수 있는 타입의 범위를 한정하는 기능을 한다.
- 타입스크립트에서 제네릭 함수의 타입을 제한하고 싶을 때는 다음 구문을 사용한다.

```ts
<최종타입1 extend 타입1, 최종타입2 extend 타입2>(a: 최종타입1, b: 최종타입2, ...) {}
```

- `printValueT` 함수는 제네릭 타입 제약 구문을 사용해 구현하고 있다.

```ts
const printValueT = <Q, T extends IValuable<Q>>(o: T) => console.log(o.value);

printValueT(new Valuable(1)); // 1
printValueT({ value: true }); //true
```

### 📚 new 타입 제약
- 프로그래밍 분야에서 팩토리 함수는 `new` 연산자를 사용해 객체를 생성하는 기능을 하는 함수를 의미한다.
- 다음 코드에서 `create` 함수의 매개변수 `type`은 실제로는 타입이다. 따라서 `type` 변수의 타입 주석으로 명시한 `T`는 타입의 타입에 해당한다.

```ts
const create = <T>(type: T): T => new type();
```

- 하지만 타입스크립트 컴파일러나느 타입의 타입을 허용하지 않으므로 오류 메시지가 발생한다.
- 그래서 다음과 같이 사용해줄 수 있다.

```ts
const create = <T extends { new(): T }>(type: T): T => new type();

// 더 간결한 문법
const create = <T>(type: new() => T): T => new type();
```

- 결론적으로, `{ new(): T }`와 `new() => T`는 같은 의미다. `new` 연산자를 `type`에 적용하면서 `type`의 생성자 쪽으로 매개변수를 전달해야 할 때 다음처럼 `new(...args)`구문을 사용한다.

```ts
const create = <T>(type: { new(...args): T }, ...args): T => new type(...args);
```

- 다음 코드는 `Point`의 인스턴스를 `{ new(...args): T }` 타입 제약을 설정한 `create` 함수로 생성하는 예이다.

```ts
class Point {
  constructor(public x: number, public y: number) {};
}

[ create(Date), create(Point, 0, 0) ].forEach(s => console.log(s));
// 2020-05-22... Point { x: 0, y: 0 }
```

### 📚 인덱스 타입 제약
- 객체의 일정 속성들만 추려서 좀 더 단순한 객체를 만들어야 할 때가 있다.

```ts
const obj = {
  name: 'Jane',
  age: 22,
  city: 'Seoul',
  country: 'Korea',
}

const pick = (obj, keys) => keys.map(key => ({ [key]: obj[key] }))
  .reduce((result, value) => ({ ...result, ...value }, {}))

// obj 객체에서 name과 age 두 속성만 추출
pick(obj, ['name', 'age']); // { name: 'Jane', age: 22 }
pick(obj, ['nam', 'agge']); // { name: undefined, age: undefined }
```

- 위 예제처럼 오타가 발생하면 엉뚱한 결과가 나온다. 타입스크립트는 이러한 상황을 방지할 목적으로 다음처럼 `keyof T` 형태로 타입 제약을 설정할 수 있게 지원한다. 이것을 **인덱스 타입 제약**이라고 한다.

```ts
<T, K extends keyof T>
```

- `keyof T` 구문으로 타입 `K`가 타입 `T`의 속성 이름이라고 타입 제약을 설정한다.

```ts
const pick = <T, K extends keyof T>(obj: T, keys: K[]) => 
  keys.map(key => ({ [key]: obj[key] }))
    .reduce((result, value) => ({ ...result, ...value }, {}))
```

- 이렇게 하면 컴파일을 해보지도 않고 앞에서 예로 든 `nam`, `agge`와 같은 입력 오류를 코드 작성 시점에 탐지할 수 있다.
