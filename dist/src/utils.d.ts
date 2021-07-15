/** A faster vresion of lodash.debounce */
export declare function debounce<T extends (...args: any[]) => void>(func: T, wait: number): T;
