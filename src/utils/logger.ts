/**
 * Logger utility for CodeSentry MCP Server
 */

export class Logger {
  private formatTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: string, message: string, ...args: any[]): string {
    const timestamp = this.formatTimestamp();
    const formattedArgs = args.length > 0 ? ' ' + args.map(arg => 
      typeof arg === 'object' ? this.sanitizeObject(arg) : String(arg)
    ).join(' ') : '';
    
    return `[${timestamp}] ${level}: ${message}${formattedArgs}`;
  }

  private sanitizeObject(obj: any): string {
    try {
      // Remove sensitive fields that might contain secrets
      const sensitiveKeys = ['password', 'token', 'secret', 'key', 'auth', 'credential'];
      const sanitized = { ...obj };
      
      for (const key in sanitized) {
        if (sensitiveKeys.some(sensitive => key.toLowerCase().includes(sensitive))) {
          sanitized[key] = '[REDACTED]';
        }
      }
      
      return JSON.stringify(sanitized, null, 2);
    } catch {
      return '[Object - Could not serialize]';
    }
  }

  info(message: string, ...args: any[]): void {
    console.log(this.formatMessage('INFO', message, ...args));
  }

  warn(message: string, ...args: any[]): void {
    console.warn(this.formatMessage('WARN', message, ...args));
  }

  error(message: string, ...args: any[]): void {
    console.error(this.formatMessage('ERROR', message, ...args));
  }

  debug(message: string, ...args: any[]): void {
    if (process.env.DEBUG === 'true') {
      console.debug(this.formatMessage('DEBUG', message, ...args));
    }
  }
}

export const logger = new Logger();