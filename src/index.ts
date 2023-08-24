import kleur from 'kleur';

class Logger {
	private prefix: string;
	private levels: string[];
	private throwError: boolean;

	constructor(
		prefix: string = '',
		options: { levels?: string[]; throwError?: boolean } = {},
	) {
		this.prefix = prefix;
		this.levels = options.levels || ['debug', 'info', 'warn', 'error'];
		this.throwError =
			options.throwError !== undefined ? options.throwError : true;
	}

	private log(level: 'debug' | 'info' | 'warn' | 'error', message: string) {
		const colors: Record<string, (text: string) => string> = {
			debug: kleur.bgCyan,
			info: kleur.bgBlue,
			warn: kleur.bgYellow,
			error: kleur.bgRed,
		};

		if (this.levels.includes(level)) {
			message = `${
				this.prefix ? kleur.gray('[') + this.prefix + kleur.gray(']') + ' ' : ''
			}${colors[level](` ${level.toUpperCase()} `)} ${message}`;
			console.log(message);
		}
	}

	debug(...messages: string[]) {
		this.log('debug', messages.join(' '));
	}

	info(...messages: string[]) {
		this.log('info', messages.join(' '));
	}

	warn(...messages: string[]) {
		this.log('warn', messages.join(' '));
	}

	error(...messages: string[]) {
		this.log('error', messages.join(' '));

		if (this.throwError) {
			const error = new Error(messages.join(' '));
			// @ts-expect-error
			Error.captureStackTrace(error, Logger.prototype.error);
			throw error;
		}
	}
}

export { Logger };
