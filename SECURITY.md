# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | ✅ |

## Reporting a Vulnerability

We take security vulnerabilities seriously. Please report security vulnerabilities responsibly.

### How to Report

1. **Do NOT** create a public GitHub issue for security vulnerabilities
2. Send details to: security@your-domain.com (or create private security advisory)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if available)

### What to Expect

- Acknowledgment within 48 hours
- Initial assessment within 5 business days
- Regular updates on progress
- Credit in security advisory (if desired)

## Security Best Practices

### For Users

1. **Keep Dependencies Updated**: Regularly run `npm audit` and update dependencies
2. **Environment Variables**: Never commit API keys, tokens, or secrets
3. **Input Validation**: Validate all external inputs to MCP tools
4. **Least Privilege**: Run with minimal required permissions

### For Contributors

1. **Code Review**: All code changes require review
2. **Static Analysis**: Use ESLint and TypeScript strict mode
3. **Dependency Scanning**: Check for vulnerable dependencies
4. **Secrets Management**: Use environment variables for sensitive data

## Security Features

- 🔒 **Input Sanitization**: All user inputs are validated and sanitized
- 🛡️ **Secure Logging**: Sensitive data is automatically redacted from logs
- 🔐 **Dependency Management**: Regular security audits of dependencies
- 🚫 **No Secrets in Code**: All sensitive configuration via environment variables

## Known Security Considerations

1. **File System Access**: MCP server can read files in analyzed repositories
2. **AI API Keys**: Required for AI analysis features - store securely
3. **Git Repository Access**: Server needs read access to analyze repositories
4. **Network Requests**: May make requests to GitHub API and AI services

## Security Audit History

- **v1.0.0**: Initial security review completed
- Regular dependency audits via GitHub Dependabot