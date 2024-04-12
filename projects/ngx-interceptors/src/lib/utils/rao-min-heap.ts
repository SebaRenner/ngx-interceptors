interface Node<T> {
  value: T
  frequency: number;
  parent: Node<T> | null;
  left: Node<T> | null;
  right: Node<T> | null;
}

/**
 * Random access optimized implementation of a min heap.
 * SRE: Work in progress!
 */
export class RAOMinHeap<T> {
  private _root: Node<T> | null;
  private _index: Map<T, Node<T>>;

  constructor() {
    this._root = null;
    this._index = new Map<T, Node<T>>();
  }

  get size(): number {
    return this._index.size;
  }

  get root(): Node<T> | null {
    return this._root;
  }

  add(value: T) {
    const node: Node<T> = {
      value,
      frequency: 1,
      parent: null,
      left: null,
      right: null
    };

    if (!this._root) {
      this._root = node;
    }

    this._index.set(value, node);
  }
}
