# abstract-logging-with-child

`abstract-logging` but with a child logger. Also, it has types.

## Why would I want this?

Adding a child logger to `abstract-logging` is pretty simple. The README of that repository [gives an example](https://github.com/jsumners/abstract-logging/tree/80dfaef91ee87008f4ed2b6e78921d383bccd406#interface).

```js
const logger = require('abstract-logging');
logger.child = () => logger;
```

but this gets tedious and easy to mess up when you have a monorepo with a bunch of packages that can take loggers. You can write your own package wrapping it to accomplish this, but I'd rather just have a package for that on NPM.

## Install

```
npm install abstract-logging-with-child
```

Or, with `yarn`:

```
$ yarn add abstract-logging-with-child
```

Or `pnpm`:

```
$ pnpm install abstract-logging-with-child
```

## Usage

```js
import nullLogger from 'abstract-logging-with-child';

function thatTakesALogger(logger = nullLogger) {
  logger.info(
    'This message will be logged if there is an actual logger passed, but will just be a noop otherwise.',
  );
  const child = logger.child({
    someBinding:
      'Something you want to be included in everything the child logger logs, if there is an actual logger passed.',
  });
  child.debug('Something for the child logger.');
}
```

## License

MIT © Matthew Fernando Garcia
