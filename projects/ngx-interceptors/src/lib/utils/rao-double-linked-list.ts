interface Node<T> {
  value: T;
  prev: Node<T> | null;
  next: Node<T> | null;
}

/**
 * Random access optimized implementation of a double linked list.
 * All functions run in constant time O(1) (unless you count collisions in hashmap..).
 */
export class RAODoubleLinkedList<T> {
  private _head: Node<T> | null;
  private _tail: Node<T> | null;
  private _index: Map<T, Node<T>>

  constructor() {
    this._head = null;
    this._tail = null;
    this._index = new Map<T, Node<T>>();
  }

  get size(): number {
    return this._index.size;
  }

  get head(): Node<T> | null {
    return this._head;
  }

  get tail(): Node<T> | null {
    return this._tail;
  }

  /**
   * Adds element to end of list.
   * If list is empty, the element will be the new head and tail.
   */
  add(value: T): void {
    if (this._index.has(value)) {
      this.moveToEnd(value);
      return;
    }

    const node: Node<T> = {
      value,
      next: null,
      prev: null
    };

    if (!this._tail) {
      this._head = node;
    } else {
      node.prev = this._tail;
      this._tail.next = node;
    }

    this._tail = node;
    this._index.set(value, node);
  }

  /**
   * Removes oldest item from the list.
   * Early returns when list is empty.
   * @returns removed value or null if list is empty.
   */
  removeHead(): T | null {
    if (!this._head) return null;

    const value = this._head.value

    this._head = this._head.next;

    if (!this._head) {
      this._tail = null;
    }

    this._index.delete(value)
    return value;
  }

  /**
   * Move element to end of list.
   * Early returns if the list empty.
   * Throws an exception if no node with this key exists.
   */
  moveToEnd(key: T): void {
    const node = this._index.get(key);

    if (!this._tail || this._tail === node) return;
    if (!node) throw new Error("No element found with this key");

    // fix pointers of previous and next nodes
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    if (node === this._head) {
      this._head = node.next;
    }

    // add to tail
    node.prev = this._tail;
    node.next = null;
    this._tail.next = node;
    this._tail = node;
  }

  /**
   * Empty list and index.
   */
  clear(): void {
    this._head = null;
    this._tail = null;
    this._index.clear();
  }
}
