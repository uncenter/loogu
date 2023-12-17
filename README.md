# loogu

A simple logging utility.

## Installation

```sh
npm i loogu
pnpm add loogu
yarn add loogu
bun add loogu
```

## Usage

```js
import { Logger } from 'loogu';

const log = new Logger();

log.debug('Beep boop.');
log.info('Hello, world.');
log.success('It worked!');
log.warn('Caution! Caution!');
log.error('Something went wrong...');
```

You can add a prefix for your app:

```js
const log = new Logger('MyApp');
```

You can hide certain log levels:

```js
const log = new Logger('', {
	levels: [
		process.env.NODE_ENV !== 'production' && 'debug',
		'info',
		'success',
		'warn',
		'error',
	],
});
```

You can disable throwing errors:

```js
const log = new Logger('', {
	throwError: false,
});
```

## License

[MIT](LICENSE)
