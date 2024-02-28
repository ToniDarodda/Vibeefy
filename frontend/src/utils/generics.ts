export type OptionalTypeWithId<T, P> = {
  +readonly [props in Exclude<keyof T, P>]: T[props];
} & { id: string };

export type Writable<T> = {
  -readonly [props in keyof T]: T[props];
};

export type IsRequired<T> = {
  +readonly [props in keyof T]-?: T[props];
};

export type isOptional<T> = {
  +readonly [props in keyof T]+?: T[props];
};

export type WritableAndRequired<T> = {
  -readonly [props in keyof T]-?: T[props];
};
