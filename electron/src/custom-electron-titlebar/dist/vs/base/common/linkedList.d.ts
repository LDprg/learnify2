import {Iterator} from '../../../vs/base/common/iterator';

export declare class LinkedList<E> {
    private _first;
    private _last;
    private _insert;
    private _remove;

    private _size;

    get size(): number;

    isEmpty(): boolean;

    clear(): void;

    unshift(element: E): () => void;

    push(element: E): () => void;

    shift(): E | undefined;

    pop(): E | undefined;

    iterator(): Iterator<E>;

    toArray(): E[];
}
