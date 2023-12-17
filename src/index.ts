import pc from 'picocolors';
import { format } from 'util';

const THIN_SPACE = '\u2009';

class Logger {
	private prefix: string;
	private levels: string[];
	private throwError: boolean;
	private exit: boolean;

	constructor(
		prefix: string = '',
		options: { levels?: string[]; throwError?: boolean; exit?: boolean } = {},
	) {
		this.prefix = prefix;
		this.levels = options.levels || [
			'debug',
			'info',
			'success',
			'warn',
			'error',
		];
		this.throwError =
			options.throwError !== undefined ? options.throwError : true;
		this.exit = options.exit !== undefined ? options.exit : true;
	}

	private log(
		level: 'debug' | 'info' | 'success' | 'warn' | 'error',
		args: any[],
	) {
		const colors: Record<string, (text: string) => string> = {
			debug: pc.cyan,
			info: pc.blue,
			success: pc.green,
			warn: pc.yellow,
			error: pc.red,
		};

		if (this.levels.includes(level)) {
			const prefix = this.prefix
				? pc.gray('[') + this.prefix + pc.gray(']') + ' '
				: '';

			const message = format.apply(this, args);

			console.log(
				`${prefix}${pc.bold(
					pc.inverse(
						colors[level](`${THIN_SPACE}${level.toUpperCase()}${THIN_SPACE}`),
					),
				)} ${message}`,
			);
		}
	}

	debug(...args: any[]) {
		this.log('debug', args);
	}

	info(...args: any[]) {
		this.log('info', args);
	}

	success(...args: any[]) {
		this.log('success', args);
	}

	warn(...args: any[]) {
		this.log('warn', args);
	}

	error(...args: any[]) {
		this.log('error', args);

		if (this.throwError) {
			const error = new Error(format.apply(this, args));
			Error.captureStackTrace(error, Logger.prototype.error);
			throw error;
		}
		if (this.exit) process.exit(1);
	}
}

export { Logger };
