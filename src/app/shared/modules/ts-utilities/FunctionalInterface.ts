/**
 * Java-like interfaces for improved readability
 */
export type Consumer<T> = (acceptable: T) => void;
export type BiConsumer<T, U> = (acceptableA: T, acceptableB: U) => void;
export type Function<T, R> = (applicable: T) => R;
export type BiFunction<T, U, R> = (applicableA: T, applicableB: U) => R;
export type Predicate<T> = (testable: T) => boolean;
export type BiPredicate<T, U> = (testableA: T, testableB: U) => boolean;
export type Comparator<T> = (comparableA: T, comparableB: T) => number;
export type Runnable = () => void;
export type Callable<R> = () => R;
export type BinaryOperator<T> = (applicableA: T, applicableB: T) => T;
export type Mapper<T, U> = (acceptable: T, index: number, parent: Array<T>) => U;
export type Dictionary = { [p: string]: any };
