# 🐤 Chapter 11: 모나드

## 🦄 모나드 이해하기
- 프로그래밍에서 모나드는 일종의 코드 설계 패턴으로서 몇 개의 인터페이스를 구현한 클래스다.
- 모나드 클래스는 몇 가지 공통적인 특징이 있다.

### 📚 타입 클래스란?
- 모나드를 이해하는 첫걸음은 타입 클래스가 왜 필요한지 아는 것이다.
- 작성자의 의도를 이해하지 못한 코드는 프로그램이 비정상적으로 종료되기 떄문에 이를 방지하려면 매개변수 `b`는 반드시 `map` 메서드가 있는 타입이라고 타입을 제한해야 한다.

```ts
const callMap = fn => b => b.map(fn);

// 타입을 제한
const callMap = <T, U>(fn: (T) => U) => <T extends { map(fn) }>(b: T) => b.map(fn);
```

- 모나드 방식 설계는 반드시 `map`과 `of`라는 이름의 메서드가 있는 `Monad<T>` 클래스를 만든다.

```ts
class Monad<T> {
  constructor(public value: T){}
  static of<U>(value: U): Monad<U> { return new Monad<U>(value) }
  map<U>(fn: (x: T) => U): Monad<U> { return new Monad<U>(fn(this.value)) }
}
```

- 이처럼 `Monad<T>`와 같은 클래스를 타입 클래스라고 한다. 타입 클래스는 다음처럼 함수를 만들 때 특별한 타입으로 제약하지 않아도 된다.

```ts
const callMonad = (fn) => (b) => Monad.of(b).map(fn).value;
```

- `Monad<T>`와 같은 타입 클래스 덕분에 `callMonad`처럼 타입에 따른 안정성을 보장하면서도 코드의 재사용성이 뛰어난 범용 함수를 쉽게 만들 수 있다.

```ts
callMonad((a: number) => a + 1)(1); // 2
callMonad((a: number[]) => a.map(value => value + 1))([1, 2, 3, 4]); // [2, 3, 4, 5]
```

### 📚 고차 타입이란?
- 앞서 본 `Monad<T>`는 타입 `T`를 `Monad<T>` 타입으로 변환했다가 때가 되면 다시 타입 `T`로 변환해준다.
- `Monad<T>`처럼 타입 `T`를 한 단계 더 높이는 타입으로 변환하는 용도의 타입을 고차 타입이라고 한다.

> 타입스크립트는 3차 이상 고차 타입을 만들 수는 없다

### 📚 카테고리 이론
- https://ko.wikipedia.org/wiki/%EB%B2%94%EC%A3%BC%EB%A1%A0
- 수학에서 집합은 프로그래밍에서 타입이다. 수학에서 카테고리는 집합의 집합으로 이해할 수 있다.
- 프로그래밍에서 카테고리는 타입의 타입, 즉 고차 타입으로 이해할 수 있다. 그리고 모나드는 별도의 특징이 있는 고차 타입이다.

### 📚 판타지랜드 규격
- 모나드는 모나드 룰이라고 하는 코드 설계 원칙에 맞춰 구현된 클래스를 의미한다.
- 판타지랜드 규격이란, 하스켈 표준 라이브러리 구조를 자바스크립트 방식으로 재구성한 것이다.
- [이미지 참고](https://github.com/fantasyland/fantasy-land)
- 어떤 클래스에 다음 네 가지 조건을 모두 만족한다면 그 클래스는 모나드이다.

> - 펑터(Functor): `map`이라는 인스턴스 메서드를 가지는 클래스
> - 어플라이(Apply): 펑터이면서 `ap`라는 인스턴스 메서드를 가지는 클래스
> - 애플리커티브(Applicative): 어플라이이면서 `of`라는 클래스 메서드를 가지는 클래스
> - 체인(Chain): 애플리커티브이면서 `chain`이라는 메서드를 가지는 클래스

### 📚 모나드 룰
- 어떤 클래스의 이름이 `M`이고 이 클래스의 인스턴스를 `m`이라고 할 때 모나드는 애플리커티브와 체인의 기능을 가지고 있고, 다음과 같은 두 가지 법칙을 만족하게 구현한 클래스이다.
- 모나드 룰의 왼쪽 법칙과 오른쪽 법칙

|구분|의미|
|:---:|:---:|
|왼쪽 법칙|`M.of(a).chain(f) == f(a)`|
|오른쪽 법칙|`m.chain(M.of) == m`|

- [판타지랜드 Monad](https://github.com/fantasyland/fantasy-land#monad)

## 🦄 Identity 모나드 이해와 구현

### 📚 값 컨테이너 구현용 IValuable<T> 인터페이스 구현
- 이 컨테이너 클래스는 `number`와 같은 구체적인 타입의 값을 가지는 것이 아니라, 모든 타입 `T`의 값을 가질 수 있는 제네릭 컨테이너 클래스를 생각할 수 있다.
- 이처럼 타입 `T`를 가지는 값의 컨테이너를 **값 컨테이너**라고 한다.

### 📚 클래스 이름이 왜 Identity인가?
- 함수형 프로그래밍에서 `identity`는 항상 다음처럼 구현하는 특별한 의미의 함수다.

```ts
const identity = <T>(value: T): T => value;
```

- `Identity`는 `map`, `ap`, `of`, `chain`과 같은 기본 메서드만 구현한 모나드이다. 카테고리 이론에서 자신의 타입에서 다른 타입으로 갔다가 돌아올 때 값이 변경되지 않는 카테고리를 `Identity`라고 부른다.

### 📚 값 컨테이너로서의 Identity<T> 구현하기

```ts
import { IValuable } from '../interfaces/IValuable';

export class Identity<T> implements IValuable<T> {
  constructor(private _value: T) {}
  value() { return this._value };
};
```

### 📚 ISetoid<T> 인터페이스와 구현
- 판타지랜드 규격에서 `setoid`는 `equals`라는 이름의 메서드를 제공하는 인터페이스를 의미하며, 타입스크립트로는 다음처럼 구현할 수 있다.

```ts
import { IValuable } from './IValuable';

export interface ISetoid<T> extends IValuable<T> {
  equals<U>(value: U): boolean;
};
```

- 이제 `Identity<T>`에 `ISetoid<T>`를 구현한다.

```ts
import { ISetoid } from '../interfaces/ISetoid';

export class Identity<T> implements ISetoid<T> {
  constructor(private _value: T) {}
  value() { return this._value };
  equals<U>(that: U): boolean {
    if(that instanceof Identity) {
      return this.value() == that.value();
    }

    return false;
  }
};
```

- 테스트 코드를 작성

```ts
import { Identity } from '../classes/Identity';

const one = new Identity(1);
const anotherOne = new Identity(1);
const two = new Identity(2);

console.log(
  one.equals(anotherOne), // true
  one.equals(two), // false
  one.equals(1), // false
  one.equals(null), // false
  one.equals([1]), // false
);
```

- 코드는 `Identity<number>` 타입 변수가 `one`이 똑같은 `Identity<number>` 타입 변수 `anotherOne`과 비교할 때만 `true`로 반환하고 있다.

### 📚 IFunctor<T> 인터페이스와 구현
- 판타지랜드 규격에서 펑터는 `map`이라는 메서드를 제공하는 인터페이스이다.
- 다음 코드는 타입스크립트 언어의 특성을 고려해 구현한 것으로, 카테고리 이론에서 펑터는 엔도펑터(endofunctor)라는 특별한 성질을 만족시켜야 한다.

```ts
export interface IFunctor<T> {
  map<U>(fn: (x: T) => U);
}
```

### 📚 엔도펑터란?
- 엔도펑터는 특정 카테고리에서 출발해도 도착 카테고리는 다시 출발 카테고리가 되게 하는 펑터를 의미한다.
- 다음 `Identity<T>`의 `map` 메서드의 구현 내용은 앤도펑터로 동작하게 하는 코드이다.

```ts
import { ISetoid } from '../interfaces/ISetoid';
import { IFunctor } from '../interfaces/IFunctor';

export class Identity<T> implements ISetoid<T>, IFunctor<T> {
  constructor(private _value: T) {}
  // IValuable
  value() { return this._value };
  // ISetiod
  equals<U>(that: U): boolean {
    if(that instanceof Identity) {
      return this.value() == that.value();
    }

    return false;
  }
  // IFunctor
  map<U>(fn: (x: T) => U) {
    return new Identity<U>(fn(this.value()));
  }
};
```

### 📚 IApply<T> 인터페이스와 구현
- 판타지랜드 규격에서 어플라이(apply)는 자신은 펑터이면서 동시에 `ap`라는 메서드를 제공하는 인터페이스이다.

```ts
import { IFunctor } from "./IFunctor";

export interface IApply<T> extends IFunctor<T> {
  ap<U>(b: U);
}
```

- 그런데 `IApply`를 구현하는 컨테이너는 값 컨타이너로서뿐만 아니라 고차 함수 컨테이너로서도 동작한다.

```ts
import { ISetoid } from '../interfaces/ISetoid';
import { IApply } from '../interfaces/IApply';

export class Identity<T> implements ISetoid<T>, IApply<T> {
  // 생략..
  // IApply
  ap<U>(b: U) {
    const f = this.value();
    if (f instanceof Function) {
      return Identity.of<U>((f as Function)(b));
    }
  }
};
```

### 📚 IApplicative<T> 인터페이스와 구현
- 판타지랜드 규격에서 애플리커티브는 그 자신이 어플라이이면서 `of`라는 클래스 메서드를 추가로 제공하는 인터페이스이다.
- 그런데 현재 타입스크립트에서는 인터페이스에 정적 메서드를 구현하지 못한다.

```ts
import { IApply } from "./IApply";

export interface IApplicative<T> extends IApply<T> {
  // static of(value: T);
}
```

- 다음 코드는 `Identity` 클래스에 `of` 클래스 메서드를 구현한 예이다.

```ts
import { ISetoid } from '../interfaces/ISetoid';
import { IApplicative } from '../interfaces/IApplicative';

export class Identity<T> implements ISetoid<T>, IApplicative<T> {
  // 생략..
  // IApplicative
  static of<T>(value: T): Identity<T> {
    return new Identity<T>(value);
  }
};
```

### 📚 IChain<T> 인터페이스와 구현
- 판타지랜드 규격에서 체인은 그 자신이 어플라이이면서 `chain`이라는 메서드를 구현하는 인터페이스이다.

```ts
import { IApply } from './IApply';

export interface IChain<T> extends IApply<T> {
  chain<U>(fn: (T) => U);
}
```

- `chain` 메서드는 펑터의 `map`과 달리 엔도펑터로 구현해야 할 의무가 없다.

```ts
import { ISetoid } from '../interfaces/ISetoid';
import { IApplicative } from '../interfaces/IApplicative';
import { IChain } from '../interfaces/IChain';

export class Identity<T> implements ISetoid<T>, IChain<T>, IApplicative<T> {
  // 생략..
  // IChain
  chain<U>(fn: (T) => U): U {
    return fn(this.value());
  }
};
```

- 엔도펑도인 `map`은 항상 같은 카테고리에 머무른다. 반면에 `chain`은 자신이 머무르고 싶은 카테고리를 스스로 정해야 한다.

```ts
import { Identity } from '../classes/Identity';

console.log(
  Identity.of(1).map((value) => `the count is ${value}`).value(),
  Identity.of(1).chain((value) => Identity.of(`the count is ${value}`)).value(),
);
// the count is 1 the count is 1
```

### 📚 IMonad<T> 인터페이스와 구현
- 판타지랜드 규격에서 모나드는 다음처럼 체인과 애플리커티브를 구현한 것이다.

```ts
import { IChain } from './IChain';
import { IApplicative } from './IApplicative';

export interface IMonad<T> extends IChain<T>, IApplicative<T> {};
```

- 다음은 `Identity<T>` 모나드가 완성된 것이다.

```ts
import { ISetoid } from '../interfaces/ISetoid';
import { IMonad } from '../interfaces/IMonad';

export class Identity<T> implements ISetoid<T>, IMonad<T> {
  constructor(private _value: T) {}
  // IValuable
  value() { return this._value };
  // ISetiod
  equals<U>(that: U): boolean {
    if(that instanceof Identity) {
      return this.value() == that.value();
    }

    return false;
  }
  // IFunctor
  map<U>(fn: (x: T) => U) {
    return new Identity<U>(fn(this.value()));
  }
  // IApply
  ap<U>(b: U) {
    const f = this.value();
    if (f instanceof Function) {
      return Identity.of<U>((f as Function)(b));
    }
  }
  // IApplicative
  static of<T>(value: T): Identity<T> {
    return new Identity<T>(value);
  }
  // IChain
  chain<U>(fn: (T) => U): U {
    return fn(this.value());
  }
};
```

- 다음 코드는 완성된 `Identity<T>` 모나드가 `M.of(a).chain(f) == f(a)` 왼쪽 법칙을 만족하는지 테스트하는 내용이다.

```ts
import { Identity } from '../classes/Identity';

const a = 1;
const f = a => a * 2;

console.log(
  Identity.of(a).chain(f) == f(a), // true
);
```

- 다음은 `Identity<T>`가 `m.chain(M.of) == m` 모나드 오른쪽 법칙을 충족하는지를 테스트하는 내용이다.

```ts
import { Identity } from '../classes/Identity';

const m = Identity.of(1);

console.log(
  m.chain(Identity.of).equals(m),
);
```

- 다음 코드는 마치 배열의 `map`, `filter` 메서드를 메서드 체인으로 코딩하듯, `Identity` 타입 객체 `jack`의 메서드들을 체인 형태로 호출한다.
- 모나드는 이처럼 선언형 프로그래밍을 염두에 두고 설계된 것이다.

```ts
import { Identity } from '../classes/Identity';

type IPerson = {
  name: string,
  age: number,
};

const jack = Identity.of(['Jack', 32]);

console.log(
  jack
    .map(([name, age]) => ({ name, age }))
    .chain((p: IPerson) => Identity.of(p))
    .map(({ name, age }) => [name, age])
    .value()[0] === jack.value()[0] // true
);
```
