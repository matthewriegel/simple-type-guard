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

All primitives will take the typeof value postfixed to `Simple` to compare against

```ts
import simpleTypeGuard, {
  SimpleString,
  SimpleBoolean,
  SimpleNumber,
} from 'simple-type-guard';

simpleTypeGuard<string>('hello world', SimpleString); // -> true

simpleTypeGuard<string>(1234, SimpleString); // -> false

simpleTypeGuard<boolean>(true, SimpleBoolean); // -> true

simpleTypeGuard<number>(0987, SimpleNumber); // -> true
```

### Objects

Objects you can write just like you would an interface!

```ts
import simpleTypeGuard, { SimpleNumber } from 'simple-type-guard';

interface Foo {
  bar: number;
}

simpleTypeGuard<Foo>({ bar: 1234 }, { bar: SimpleNumber }); // -> true

simpleTypeGuard<Foo>({ bar: 'invalid string value' }, { bar: SimpleNumber }); // -> false
```

### Arrays

Arrays will attempt to match every iteration of the passed in value to the _first_ index of the template array.

```ts
import simpleTypeGuard, { SimpleNumber, SimpleArray } from 'simple-type-guard';

interface Foo {
  list: FooListItem[];
}

interface FooListItem {
  bar: number;
}

simpleTypeGuard<Foo>(
  { list: [{ bar: 1234 }, { bar: 1276 }, { bar: 12973 }] },
  {
    list: SimpleArray<FooListItem>({ bar: SimpleNumber }),
  }
); // -> true

simpleTypeGuard<Foo>(
  { list: [{ bar: 1234 }, { bar: 1276 }, { bar: 'invalid string value' }] },
  {
    list: [{ bar: SimpleNumber }],
  }
); // -> false
```

#### Enums

If you have a type consisting of a number of enums (ie `type Color = 'red' | 'blue' | 'green'`), consider using SimpleExactMatch. Every parameter will be matched against.

```ts
import simpleTypeGuard, { SimpleExactMatch } from 'simple-type-guard';

const colors = ['red', 'blue', 'green'];
type Color = typeof colors[number]; // 'red' | 'blue' | 'green'

simpleTypeGuard<Color>('red', new SimpleExactMatch(...colors)); // -> true
```

#### Unions

If you have a union consisting of multiple conflicting types, SimpleOr can be used to iterate through each possible type. Every parameter will be matched against.

```ts
import simpleTypeGuard, { SimpleOr } from 'simple-type-guard';

interface Car {
  model: string;
}

interface Person {
  company: string;
}

type Foo = Car | Person;

simpleTypeGuard<Foo>(
  { company: 'willowtree' },
  new SimpleOr({ model: SimpleString }, { company: SimpleString })
); // -> true
```

#### Functions

If you wanted a lot more control over how a type is validated, `'simple-type-guard'` allows you to implement a function for a more specific validation test.

```ts
import simpleTypeGuard, { SimpleFunction } from 'simple-type-guard';

interface Foo {
  bar: 'one' | 'two' | 'three';
}

simpleTypeGuard<Foo>(
  { bar: 'one' },
  {
    bar: new SimpleFunction(
      (barVariable: unknown) =>
        ['one', 'two', 'three'].indexOf(barVariable) !== -1
    ),
  }
); // -> true
```

### Optionals

#### Primitives

Primitive optionals are the same 'Simple<Type>' but with an 'Optional' postfix.

```ts
import simpleTypeGuard, { SimpleStringOptional } from 'simple-type-guard';

simpleTypeGuard<string | undefined>('hello world', SimpleStringOptional); // -> true

simpleTypeGuard<string | undefined>(undefined, SimpleStringOptional); // -> true

simpleTypeGuard<string | undefined>(1234, SimpleStringOptional); // -> false
```

This will also allow for null values.

```ts
...
simpleTypeGuard<string | null>(null, SimpleStringOptional); // -> true
```

#### Objects

Objects require using `SimpleObjectOptional` to indicate they may be undefined.

```ts
import simpleTypeGuard, {
  SimpleObjectOptional,
  SimpleNumber,
} from 'simple-type-guard';

interface Foo {
  bar: number;
}

simpleTypeGuard<Foo | undefined>(
  undefined,
  new SimpleObjectOptional<Foo>({ bar: SimpleNumber })
); // -> true
```

#### Arrays

Optional arrays will require an `'$optional'` in index [1]

```ts
import simpleTypeGuard, {
  SimpleNumber,
  SimpleArrayOptional,
} from 'simple-type-guard';

interface Foo {
  list?: FooListItem[];
}

interface FooListItem {
  bar: number;
}

simpleTypeGuard<Foo>(
  { list: undefined },
  {
    list: new SimpleArrayOptional<FooListItem[]>({ bar: SimpleNumber }),
  }
); // -> true
```

## Options

### throwErrorOnFailure (default: false)

When true, will throw an error when an incompatibility is found. This error will provide details on what went wrong.

```ts
import simpleTypeGuard, { SimpleString } from 'simple-type-guard';

interface Foo {
  bar: string;
}

simpleTypeGuard<Foo>(
  { bar: 173 },
  { bar: SimpleString },
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
