export default function () {}

// type Person = {
//   name: string;
// };

// const person: Person = {
//   name: 'John Doe',
// };

// type People = Person[];

// const people: People = [{name: 'John Doe'}];

// type Color = 'red' | 'orange' | 'yellow';
// const color: Color = 'red';

// function wrap(value: any) {
//   return {value};
// }

function wrap<T>(value: T) {
  return {value};
}

const result = wrap('Hello World');

interface Person {
  name: string;
}

const person: Person = {
  name: 'John Doe',
};
const result2 = wrap(person);
console.log(result2.value.name);

interface Item<T> {
  id: number;
  data: T;
}

interface Place {
  location: string;
}

const personItem: Item<Person> = {
  id: 1,
  data: {
    name: 'John Doe',
  },
};

const placeItem: Item<Place> = {
  id: 2,
  data: {
    location: 'Korea',
  },
};

type Item2<T> = {
  id: number;
  data: T;
};

class Queue<T> {
  list: T[] = [];
  get length() {
    return this.list.length;
  }
  enqueue(item: T) {
    this.list.push(item);
  }
  dequeue() {
    return this.list.shift();
  }
}

const queue = new Queue<number>();
queue.enqueue(0);
queue.enqueue(1);
const first = queue.dequeue(); // 0
const second = queue.dequeue(); // 1
