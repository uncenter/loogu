import kleur from 'kleur';
import { format } from 'util';

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
		this.levels = options.levels || ['debug', 'info', 'warn', 'error'];
		this.throwError =
			options.throwError !== undefined ? options.throwError : true;
		this.exit = options.exit !== undefined ? options.exit : true;
	}

	private log(level: 'debug' | 'info' | 'warn' | 'error', args: any[]) {
		const colors: Record<string, (text: string) => string> = {
			debug: kleur.bgCyan,
			info: kleur.bgBlue,
			warn: kleur.bgYellow,
			error: kleur.bgRed,
		};

		if (this.levels.includes(level)) {
			const message = `${
				this.prefix ? kleur.gray('[') + this.prefix + kleur.gray(']') + ' ' : ''
			}${colors[level](` ${level.toUpperCase()} `)} ${format.apply(
				this,
				args,
			)}`;
			console.log(message);
		}
	}

	debug(...args: any[]) {
		this.log('debug', args);
	}

	info(...args: any[]) {
		this.log('info', args);
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
