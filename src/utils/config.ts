/**
 * Configuration management for CodeSentry MCP Server
 * Handles environment variables and secure configuration
 */

export interface ServerConfig {
  // Server settings
  debug: boolean;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
  
  // AI provider settings (optional - only if AI features are used)
  openaiApiKey?: string;
  anthropicApiKey?: string;
  defaultAiProvider: 'openai' | 'anthropic' | 'none';
  
  // GitHub integration (optional)
  githubToken?: string;
  
  // Analysis settings
  maxFileSize: number;
  maxConcurrentAnalysis: number;
  
  // Security settings
  allowedDirectories: string[];
  blockedPatterns: string[];
}

function getEnvVar(name: string, defaultValue?: string): string | undefined {
  const value = process.env[name];
  return value !== undefined ? value : defaultValue;
}

function getEnvBool(name: string, defaultValue: boolean = false): boolean {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  return value.toLowerCase() === 'true' || value === '1';
}

function getEnvNumber(name: string, defaultValue: number): number {
  const value = process.env[name];
  if (value === undefined) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

export function loadConfig(): ServerConfig {
  return {
    // Server settings
    debug: getEnvBool('DEBUG', false),
    logLevel: (getEnvVar('LOG_LEVEL', 'info') as any) || 'info',
    
    // AI provider settings (optional)
    openaiApiKey: getEnvVar('OPENAI_API_KEY'),
    anthropicApiKey: getEnvVar('ANTHROPIC_API_KEY'),
    defaultAiProvider: (getEnvVar('AI_PROVIDER', 'none') as any) || 'none',
    
    // GitHub integration (optional)
    githubToken: getEnvVar('GITHUB_TOKEN'),
    
    // Analysis settings
    maxFileSize: getEnvNumber('MAX_FILE_SIZE', 1024 * 1024), // 1MB default
    maxConcurrentAnalysis: getEnvNumber('MAX_CONCURRENT_ANALYSIS', 5),
    
    // Security settings
    allowedDirectories: (getEnvVar('ALLOWED_DIRECTORIES', '') || '')
      .split(',')
      .map(dir => dir.trim())
      .filter(dir => dir.length > 0),
    blockedPatterns: (getEnvVar('BLOCKED_PATTERNS', 'node_modules,dist,build,.git') || 'node_modules,dist,build,.git')
      .split(',')
      .map(pattern => pattern.trim())
      .filter(pattern => pattern.length > 0),
  };
}

// Validate configuration and warn about missing optional settings
export function validateConfig(config: ServerConfig): void {
  // Warn about missing AI keys (not required, but limits functionality)
  if (!config.openaiApiKey && !config.anthropicApiKey) {
    console.warn('⚠️  No AI API keys configured. AI analysis features will be disabled.');
    console.warn('   Set OPENAI_API_KEY or ANTHROPIC_API_KEY environment variables to enable.');
  }
  
  // Warn about missing GitHub token (not required, but limits functionality)
  if (!config.githubToken) {
    console.warn('⚠️  No GitHub token configured. GitHub integration features will be disabled.');
    console.warn('   Set GITHUB_TOKEN environment variable to enable PR analysis.');
  }
  
  // Validate security settings
  if (config.maxFileSize > 10 * 1024 * 1024) { // 10MB
    console.warn('⚠️  Large MAX_FILE_SIZE configured. This may impact performance.');
  }
  
  if (config.maxConcurrentAnalysis > 10) {
    console.warn('⚠️  High MAX_CONCURRENT_ANALYSIS configured. This may impact system resources.');
  }
}

export const config = loadConfig();