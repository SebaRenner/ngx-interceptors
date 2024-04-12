import { RAOMinHeap } from "./rao-min-heap";

describe('RAOMinHeap', () => {
  it('should be empty on creation', () => {
    // act
    const heap = new RAOMinHeap<string>();

    // assert
    expect(heap.size).toBe(0);
    expect(heap.root).toBeNull();
  });

  it('should define first inserted element as root', () => {
    // arrange
    const heap = new RAOMinHeap<string>();
    const value = 'url1';

    // act
    heap.add(value);

    // assert
    expect(heap.size).toBe(1);
    expect(heap.root).toBeDefined();
    expect(heap.root?.value).toBe(value);
    expect(heap.root?.frequency).toBe(1);
    expect(heap.root?.parent).toBeNull();
    expect(heap.root?.left).toBeNull();
    expect(heap.root?.right).toBeNull();
  });
});
