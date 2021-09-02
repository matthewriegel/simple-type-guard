# Simple Type Guard

## Installation

```shell
$ npm i -D simple-type-guard
```

## Why Simple Type Guard?

Simple Type Guard takes the guess-work out of validating unknown variables against a type.

No longer will you have to carefully review your code to make sure you're validating every detail of an object to see if it fits.

Simple Type Guard will help you craft the template that perfectly matches your interface and **warns you if something is missing or improperly defined**.

Even better, you don't have to learn a new pattern or all the facets of a new library. The templates you match against are all standard Javascript.

All you have to do is provide a Generic type!

## Examples

### Primitives

All primitives will take the typeof value to compare against

```ts
import simpleTypeGuard from 'simple-type-guard';

simpleTypeGuard<string>('hello world', 'string'); // -> true

simpleTypeGuard<string>(1234, 'string'); // -> false

simpleTypeGuard<boolean>(true, 'boolean'); // -> true

simpleTypeGuard<number>(0987, 'number'); // -> true
```

### Objects

Objects you ca write just like you would an interface!

```ts
import simpleTypeGuard from 'simple-type-guard';

interface Foo {
  bar: number;
}

simpleTypeGuard<Foo>({ bar: 1234 }, { bar: 'number' }); // -> true

simpleTypeGuard<Foo>({ bar: 'invalid string value' }, { bar: 'number' }); // -> false
```

### Arrays

Arrays will attempt to match every iteration of the passed in value to the _first_ index of the template array.

```ts
import simpleTypeGuard from 'simple-type-guard';

interface Foo {
  list: [
    {
      bar: number;
    }
  ];
}

simpleTypeGuard<Foo>(
  { list: [{ bar: 1234 }, { bar: 1276 }, { bar: 12973 }] },
  {
    list: [{ bar: 'number' }],
  }
); // -> true

simpleTypeGuard<Foo>(
  { list: [{ bar: 1234 }, { bar: 1276 }, { bar: 'invalid string value' }] },
  {
    list: [{ bar: 'number' }],
  }
); // -> false
```

### Optionals

#### Primitives

Primitive optionals just need a `'?'` at the end.

```ts
import simpleTypeGuard from 'simple-type-guard';

simpleTypeGuard<string | undefined>('hello world', 'string?'); // -> true

simpleTypeGuard<string | undefined>(undefined, 'string?'); // -> true

simpleTypeGuard<string | undefined>(1234, 'string?'); // -> false
```

#### Objects

Objects require a new property `{ $optional: true }` to indicate they may be undefined.

```ts
import simpleTypeGuard from 'simple-type-guard';

interface Foo {
  bar: number;
}

simpleTypeGuard<Foo | undefined>(undefined, { bar: 'number', $optional: true }); // -> true
```

#### Arrays

Optional arrays will require an `'optional'`

```ts
import simpleTypeGuard from 'simple-type-guard';

interface Foo {
  list?: [
    {
      bar: number;
    }
  ];
}

simpleTypeGuard<Foo>(
  { list: undefined },
  {
    list: [{ bar: 'number' }, 'optional'],
  }
); // -> true
```

## Options

### throwErrorOnFailure (default: false)

When true, will throw an error when an incompatibility is found. This error will provide details on what went wrong.

```ts
import simpleTypeGuard from 'simple-type-guard';

interface Foo {
  bar: string;
}

simpleTypeGuard<Foo>(
  { bar: 173 },
  { bar: 'string' },
  { throwErrorOnFailure: true }
); // ->
/**
 * Error: Invalid type detected at
 * "_root_.bar:
 * Expected "string"
 * Found "number"
 *
 * Variable Output: 173
 */
```
