import { printMe } from "./utils/anonymousInterface";

// 익명 인터페이스
let ai: {
  name: string,
  age: number,
  etc?: boolean,
} = { name: 'Jack', age: 32 };

printMe(ai);