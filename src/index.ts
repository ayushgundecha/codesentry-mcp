#!/usr/bin/env node

/**
 * CodeSentry MCP Server
 * AI-Powered Code Review Assistant using Model Context Protocol
 */

import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { createCodeSentryServer } from './server.js';
import { logger } from './utils/logger.js';

async function main() {
  try {
    logger.info('🚀 Starting CodeSentry MCP Server...');
    
    const server = createCodeSentryServer();
    const transport = new StdioServerTransport();
    
    await server.connect(transport);
    
    logger.info('✅ CodeSentry MCP Server is running and ready for connections');
    
    // Handle graceful shutdown
    process.on('SIGINT', async () => {
      logger.info('📥 Received SIGINT, shutting down gracefully...');
      await server.close();
      process.exit(0);
    });
    
    process.on('SIGTERM', async () => {
      logger.info('📥 Received SIGTERM, shutting down gracefully...');
      await server.close();
      process.exit(0);
    });
    
  } catch (error) {
    logger.error('❌ Failed to start CodeSentry MCP Server:', error);
    process.exit(1);
  }
}

// Only run if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    logger.error('💥 Unhandled error:', error);
    process.exit(1);
  });
}