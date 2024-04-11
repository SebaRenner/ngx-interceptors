interface Node<T> {
  key: string;
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
  private _indexMap: Map<string, Node<T>>

  constructor() {
    this._head = null;
    this._tail = null;
    this._indexMap = new Map<string, Node<T>>();
  }

  get size(): number {
    return this._indexMap.size;
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
  add(key: string, value: T): void {
    if (this._indexMap.has(key)) {
      this.moveToEnd(key);
      return;
    }

    const node: Node<T> = {
      key,
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
    this._indexMap.set(key, node);
  }

  /**
   * Removes oldest item from the list
   * Early returns when list is empty
   */
  removeHead(): void {
    if (!this._head) return;
    const key = this._head.key;

    this._head = this._head.next;

    if (!this._head) {
      this._tail = null;
    }

    this._indexMap.delete(key)
  }

  /**
   * Move element to end of list.
   * Early returns if the list empty.
   * Throws an exception if no node with this key exists.
   */
  moveToEnd(key: string): void {
    const node = this._indexMap.get(key);

    if (!this._tail) return;
    if (!node) throw new Error("No element found with this key");

    // fix pointers of previous and next nodes
    if (node.prev) {
      node.prev.next = node.next;
    }
    if (node.next) {
      node.next.prev = node.prev;
    }

    // add to tail
    node.prev = this._tail;
    node.next = null;
    this._tail.next = node;
    this._tail = node;
  }
}
