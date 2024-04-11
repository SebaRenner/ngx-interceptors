import { RAODoubleLinkedList } from "./rao-double-linked-list";

interface TestPerson {
  name: string;
  age: number;
}

describe('RAODoubleLinkedList', () => {
  it('should be empty on creation', () => {
    // act
    const list = new RAODoubleLinkedList<TestPerson>();

    // assert
    expect(list.size).toBe(0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  it('should add element to empty list', () => {
    // arrange
    const list = new RAODoubleLinkedList<TestPerson>();
    const p1: TestPerson = {
      name: 'John',
      age: 20
    }

    // act
    list.add(p1);

    // assert
    expect(list.size).toBe(1);
    expect(list.head?.value).toBe(p1);
    expect(list.tail?.value).toBe(p1);
  });

  it('should remove first element', () => {
    // arrange
    const list = new RAODoubleLinkedList<TestPerson>();
    list.add({ name: 'John', age: 20 });

    // act
    list.removeHead();

    // assert
    expect(list.size).toBe(0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });

  it('should set new element as new tail', () => {
    // arrange
    const list = new RAODoubleLinkedList<TestPerson>();
    const p1: TestPerson = { name: 'John', age: 20 }
    const p2: TestPerson = { name: 'Jane', age: 23 }
    list.add(p1);

    // act
    list.add(p2);

    // assert
    expect(list.size).toBe(2);
    expect(list.head?.value).toBe(p1);
    expect(list.tail?.value).toBe(p2);
  });

  it('should set second element as new head when head is removed', () => {
    // arrange
    const list = new RAODoubleLinkedList<TestPerson>();
    const p1: TestPerson = { name: 'John', age: 20 }
    const p2: TestPerson = { name: 'Jane', age: 23 }
    list.add(p1);
    list.add(p2);

    // act
    list.removeHead();

    // assert
    expect(list.size).toBe(1);
    expect(list.head?.value).toBe(p2);
    expect(list.tail?.value).toBe(p2);
  });

  it('should move first element to end', () => {
        // arrange
        const list = new RAODoubleLinkedList<TestPerson>();
        const p1: TestPerson = { name: 'John', age: 20 }
        const p2: TestPerson = { name: 'Jane', age: 23 }
        const p3: TestPerson = { name: 'Jasmine', age: 21 }
        list.add(p1);
        list.add(p2);
        list.add(p3);

        // act
        list.moveToEnd(p1);

        // assert
        expect(list.size).toBe(3);
        expect(list.head?.value).toBe(p2);
        expect(list.tail?.value).toBe(p1);
        expect(list.head?.next?.value).toBe(p3);
        expect(list.head?.next?.next).toBe(list.tail);
        expect(list.tail?.prev?.value).toBe(p3);
        expect(list.tail?.prev?.prev).toBe(list.head);
  });

  it('should move middle element to end', () => {
    // arrange
    const list = new RAODoubleLinkedList<TestPerson>();
    const p1: TestPerson = { name: 'John', age: 20 }
    const p2: TestPerson = { name: 'Jane', age: 23 }
    const p3: TestPerson = { name: 'Jasmine', age: 21 }
    list.add(p1);
    list.add(p2);
    list.add(p3);

    // act
    list.moveToEnd(p2);

    // assert
    expect(list.size).toBe(3);
    expect(list.head?.value).toBe(p1);
    expect(list.tail?.value).toBe(p2);
    expect(list.head?.next?.value).toBe(p3);
    expect(list.head?.next?.next).toBe(list.tail);
    expect(list.tail?.prev?.value).toBe(p3);
    expect(list.tail?.prev?.prev).toBe(list.head);
  });

  it('should do nothing if the element is already at the end', () => {
    // arrange
    const list = new RAODoubleLinkedList<TestPerson>();
    const p1: TestPerson = { name: 'John', age: 20 }
    const p2: TestPerson = { name: 'Jane', age: 23 }
    list.add(p1);
    list.add(p2);

    const before = list.tail;

    // act
    list.moveToEnd(p2);
    const after = list.tail;

    // assert
    expect(list.size).toBe(2);
    expect(before).toBe(after);
  });

  it('should move existing element to end of list', () => {
    // arrange
    const list = new RAODoubleLinkedList<TestPerson>();
    const p1: TestPerson = { name: 'John', age: 20 }
    const p2: TestPerson = { name: 'Jane', age: 23 }
    list.add(p1);
    list.add(p2);

    // act
    list.add(p1);

    // assert
    expect(list.size).toBe(2);
    expect(list.tail?.value).toBe(p1);
  });

  it('should clear list and index', () => {
    // arrange
    const list = new RAODoubleLinkedList<TestPerson>();
    const p1: TestPerson = { name: 'John', age: 20 }
    const p2: TestPerson = { name: 'Jane', age: 23 }
    list.add(p1);
    list.add(p2);

    // act
    list.clear();

    // assert
    expect(list.size).toBe(0);
    expect(list.head).toBeNull();
    expect(list.tail).toBeNull();
  });
});
