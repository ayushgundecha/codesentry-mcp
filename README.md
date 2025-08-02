# 🛡️ CodeSentry MCP

> AI-Powered Code Review Assistant using Model Context Protocol

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)](https://nodejs.org/)

CodeSentry is an intelligent code review assistant that integrates with AI systems through the Model Context Protocol (MCP). It provides comprehensive analysis of your codebase, identifying security vulnerabilities, performance bottlenecks, code quality issues, and documentation gaps.

## ✨ Features

- 🔒 **Security Analysis** - Detect OWASP Top 10 vulnerabilities and security anti-patterns
- ⚡ **Performance Analysis** - Identify bottlenecks and optimization opportunities  
- 🎯 **Code Quality** - Find code smells, complexity issues, and maintainability problems
- 📚 **Documentation Review** - Check for missing or outdated documentation
- 🤖 **AI Integration** - Natural language explanations and suggestions
- 🔗 **GitHub Integration** - Automated PR reviews and status checks
- 🧪 **Live Testing** - Built-in MCP client for immediate feedback

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Git
- An AI assistant that supports MCP (Claude, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/ayushgundecha/codesentry-mcp.git
cd codesentry-mcp

# Install dependencies
npm install

# Build the project
npm run build

# Test the server
npm run dev
```

### Usage with MCP

1. **Add to Claude Desktop** (macOS):
```json
{
  "mcpServers": {
    "codesentry": {
      "command": "node",
      "args": ["/path/to/codesentry-mcp/dist/index.js"],
      "env": {}
    }
  }
}
```

2. **Test the connection**:
```
Ask Claude: "Use the ping tool to test CodeSentry"
```

3. **Analyze a repository**:
```
Ask Claude: "Use CodeSentry to analyze the repository at /path/to/your/project"
```

## 🛠️ Development

### Project Structure

```
codesentry-mcp/
├── src/
│   ├── analyzers/          # Analysis engines (security, performance, quality)
│   ├── integrations/       # External service integrations (Git, GitHub, AI)
│   ├── mcp/               # MCP protocol implementation
│   ├── utils/             # Utility functions and helpers
│   └── types/             # TypeScript type definitions
├── tests/                 # Test suites
├── docs/                  # Documentation
└── examples/              # Usage examples
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run test suite
npm run lint         # Lint code
npm run format       # Format code with Prettier
```

## 📋 Available Tools

### Analysis Tools
- `analyze_repository` - Comprehensive repository analysis
- `analyze_file` - Single file analysis
- `scan_security` - Security vulnerability scan
- `check_dependencies` - Dependency audit

### AI Tools  
- `explain_code` - Natural language code explanations
- `suggest_improvements` - AI-powered refactoring suggestions
- `generate_tests` - Test case recommendations

### GitHub Tools
- `analyze_pr` - Pull request analysis
- `comment_suggestion` - Add review comments
- `update_status` - Update PR status checks

## 📊 Example Output

```typescript
{
  "security": [
    {
      "type": "SQL_INJECTION",
      "severity": "HIGH", 
      "file": "src/user.ts",
      "line": 42,
      "description": "Potential SQL injection vulnerability",
      "suggestion": "Use parameterized queries",
      "fix": "await prisma.user.findMany({ where: { id: userId } })"
    }
  ],
  "performance": [
    {
      "type": "ALGORITHM_COMPLEXITY",
      "severity": "MEDIUM",
      "file": "src/sort.ts", 
      "line": 15,
      "complexity": "O(n²)",
      "suggestion": "Use Array.sort() for better performance",
      "estimatedImpact": "90% improvement"
    }
  ]
}
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Model Context Protocol](https://modelcontextprotocol.io/) by Anthropic
- [TypeScript ESLint](https://typescript-eslint.io/) for code analysis patterns
- [Simple Git](https://github.com/steveukx/git-js) for Git integration

## 📞 Support

- 🐛 [Report Issues](https://github.com/ayushgundecha/codesentry-mcp/issues)
- 💬 [Discussions](https://github.com/ayushgundecha/codesentry-mcp/discussions)
- 📧 Email: your-email@example.com

---

<div align="center">
  <strong>Built with ❤️ for the developer community</strong>
</div>