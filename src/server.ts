/**
 * CodeSentry MCP Server Implementation
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { 
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from '@modelcontextprotocol/sdk/types.js';
import { logger } from './utils/logger.js';
import type { AnalysisConfig } from './types/index.js';

const SERVER_INFO = {
  name: 'codesentry-mcp',
  version: '1.0.0',
  description: 'AI-Powered Code Review Assistant using Model Context Protocol'
};

const DEFAULT_CONFIG: AnalysisConfig = {
  enableSecurity: true,
  enablePerformance: true,
  enableQuality: true,
  enableDocumentation: true,
  maxFileSize: 1024 * 1024, // 1MB
  supportedExtensions: ['.ts', '.js', '.tsx', '.jsx', '.py', '.go', '.rs', '.java', '.cpp', '.c'],
  ignorePatterns: ['node_modules/', 'dist/', 'build/', '.git/', '*.min.js']
};

export function createCodeSentryServer(): Server {
  const server = new Server(SERVER_INFO, {
    capabilities: {
      tools: {},
      resources: {},
      prompts: {}
    }
  });

  // List available tools
  server.setRequestHandler(ListToolsRequestSchema, async () => {
    logger.debug('📝 Listing available tools');
    
    return {
      tools: [
        {
          name: 'ping',
          description: 'Test connectivity to the CodeSentry server',
          inputSchema: {
            type: 'object',
            properties: {
              message: {
                type: 'string',
                description: 'Optional message to echo back'
              }
            }
          }
        },
        {
          name: 'analyze_repository',
          description: 'Analyze a git repository for security, performance, and quality issues',
          inputSchema: {
            type: 'object',
            properties: {
              path: {
                type: 'string',
                description: 'Path to the repository to analyze'
              },
              config: {
                type: 'object',
                description: 'Analysis configuration options',
                properties: {
                  enableSecurity: { type: 'boolean' },
                  enablePerformance: { type: 'boolean' },
                  enableQuality: { type: 'boolean' },
                  enableDocumentation: { type: 'boolean' }
                }
              }
            },
            required: ['path']
          }
        }
      ]
    };
  });

  // Handle tool calls
  server.setRequestHandler(CallToolRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    logger.info(`🔧 Executing tool: ${name}`);
    logger.debug('Tool arguments:', args);

    switch (name) {
      case 'ping':
        return {
          content: [
            {
              type: 'text',
              text: `🏓 Pong! CodeSentry is running. ${args?.message ? `Message: ${args.message}` : ''}`
            }
          ]
        };

      case 'analyze_repository':
        // TODO: Implement repository analysis
        return {
          content: [
            {
              type: 'text',
              text: `🔍 Repository analysis started for: ${args?.path}\n\n⚠️  Feature coming soon - currently in development!`
            }
          ]
        };

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  });

  // List available resources
  server.setRequestHandler(ListResourcesRequestSchema, async () => {
    logger.debug('📋 Listing available resources');
    
    return {
      resources: [
        {
          uri: 'codesentry://config',
          name: 'CodeSentry Configuration',
          description: 'Current analysis configuration settings',
          mimeType: 'application/json'
        }
      ]
    };
  });

  // Handle resource reads
  server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
    const { uri } = request.params;
    
    logger.info(`📖 Reading resource: ${uri}`);

    switch (uri) {
      case 'codesentry://config':
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(DEFAULT_CONFIG, null, 2)
            }
          ]
        };

      default:
        throw new Error(`Unknown resource: ${uri}`);
    }
  });

  // List available prompts
  server.setRequestHandler(ListPromptsRequestSchema, async () => {
    logger.debug('💭 Listing available prompts');
    
    return {
      prompts: [
        {
          name: 'code_review',
          description: 'Comprehensive code review prompt for analyzing code quality, security, and performance'
        },
        {
          name: 'security_audit',
          description: 'Security-focused analysis prompt for identifying vulnerabilities and security issues'
        }
      ]
    };
  });

  // Handle prompt requests
  server.setRequestHandler(GetPromptRequestSchema, async (request) => {
    const { name, arguments: args } = request.params;
    
    logger.info(`💭 Getting prompt: ${name}`);
    
    switch (name) {
      case 'code_review':
        return {
          description: 'Comprehensive code review analysis',
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: 'Please perform a comprehensive code review focusing on:\n\n1. **Security**: Look for vulnerabilities, security anti-patterns, and potential attack vectors\n2. **Performance**: Identify bottlenecks, inefficient algorithms, and optimization opportunities\n3. **Quality**: Check for code smells, maintainability issues, and best practices\n4. **Documentation**: Assess documentation completeness and clarity\n\nProvide specific, actionable feedback with file locations and suggested improvements.'
              }
            }
          ]
        };

      case 'security_audit':
        return {
          description: 'Security-focused code analysis',
          messages: [
            {
              role: 'user',
              content: {
                type: 'text',
                text: 'Perform a thorough security audit of the codebase. Focus on:\n\n1. **OWASP Top 10** vulnerabilities\n2. **Input validation** and sanitization\n3. **Authentication** and authorization flaws\n4. **Cryptographic** implementations\n5. **Dependency** vulnerabilities\n6. **Data exposure** risks\n\nProvide severity ratings and specific remediation steps for each issue found.'
              }
            }
          ]
        };

      default:
        throw new Error(`Unknown prompt: ${name}`);
    }
  });

  logger.info('🏗️  CodeSentry MCP Server initialized');
  return server;
}