# 🪵 loogu

> [!NOTE]
> See the images in [`docs/`](/docs/) to see `loogu` in action.

```sh
npm i loogu
pnpm add loogu
yarn add loogu
```

## Usage

```js
import { Logger } from 'loogu';

const log = new Logger('MyApp');

log.debug('This is a debug message.');
log.info('This is an informational message.');
log.warn('This is a warning message.');
log.error('This is an error message.');
```

You can hide certain log levels:

```js
const log = new Logger('', {
	levels: [
		process.env.NODE_ENV !== 'production' && 'debug',
		'info',
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
