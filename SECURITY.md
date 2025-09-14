# Security Policy

## Supported Versions

We actively support and provide security updates for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

The Dixit App team takes security vulnerabilities seriously. We appreciate your efforts to responsibly disclose your findings.

### How to Report a Security Vulnerability

**DO NOT** report security vulnerabilities through public GitHub issues, discussions, or pull requests.

Instead, please report security vulnerabilities by email to:

**security@nibertinvestments.com**

Please include the following information in your report:

- **Description**: A clear and concise description of the vulnerability
- **Steps to Reproduce**: Detailed steps to reproduce the vulnerability
- **Impact**: The potential impact of the vulnerability
- **Affected Components**: Which parts of the application are affected
- **Proof of Concept**: If possible, include a proof of concept
- **Suggested Fix**: If you have suggestions for fixing the vulnerability

### What to Expect

1. **Acknowledgment**: We will acknowledge receipt of your vulnerability report within 48 hours
2. **Initial Assessment**: We will provide an initial assessment within 5 business days
3. **Investigation**: We will investigate and work on a fix
4. **Resolution**: We will notify you when the vulnerability has been resolved
5. **Disclosure**: We will coordinate with you on public disclosure timing

### Security Response Timeline

- **48 hours**: Acknowledgment of report
- **5 business days**: Initial assessment and validation
- **30 days**: Target resolution time for critical vulnerabilities
- **90 days**: Target resolution time for non-critical vulnerabilities

## Security Best Practices

### For Developers

- **Dependencies**: Regularly update dependencies and monitor for security advisories
- **Authentication**: Use strong authentication mechanisms
- **Input Validation**: Validate and sanitize all user inputs
- **Error Handling**: Don't expose sensitive information in error messages
- **Logging**: Log security-relevant events but don't log sensitive data
- **HTTPS**: Always use HTTPS in production
- **Environment Variables**: Never commit secrets to version control

### For Deployment

- **Container Security**: Use minimal base images and scan for vulnerabilities
- **Network Security**: Implement proper network segmentation and firewall rules
- **Access Control**: Use principle of least privilege for all access
- **Monitoring**: Implement security monitoring and alerting
- **Backups**: Maintain secure, tested backups
- **Updates**: Keep all systems and dependencies up to date

### For Users

- **Environment Variables**: Properly configure security-related environment variables
- **Secrets Management**: Use secure secret management systems
- **Network Configuration**: Properly configure CORS, CSP, and other security headers
- **Access Logs**: Monitor access logs for suspicious activity

## Security Features

The Dixit App includes several built-in security features:

- **Helmet.js**: Security headers middleware
- **CORS**: Cross-Origin Resource Sharing configuration
- **Input Validation**: Request size limits and input sanitization
- **Error Handling**: Secure error responses that don't leak information
- **Request Logging**: Comprehensive request tracking for audit trails
- **Health Checks**: Security-conscious health endpoints

## Security Configuration

### Environment Variables

| Variable | Description | Security Impact |
|----------|-------------|-----------------|
| `HELMET_ENABLED` | Enable/disable Helmet.js security headers | High |
| `CORS_ORIGIN` | Configure CORS allowed origins | High |
| `CORS_CREDENTIALS` | Allow credentials in CORS requests | Medium |
| `MAX_REQUEST_SIZE` | Limit request body size | Medium |
| `NODE_ENV` | Environment configuration | Low |

### Recommended Production Settings

```bash
# Security headers
HELMET_ENABLED=true

# CORS configuration
CORS_ORIGIN=https://yourdomain.com
CORS_CREDENTIALS=false

# Request limits
MAX_REQUEST_SIZE=1mb

# Environment
NODE_ENV=production
```

## Known Security Considerations

### Rate Limiting

The current implementation does not include rate limiting. For production deployments, consider:

- Implementing rate limiting middleware
- Using API Gateway rate limiting
- Configuring Kubernetes ingress rate limiting

### Authentication

The current implementation does not include authentication. For production use:

- Implement proper authentication (JWT, OAuth, etc.)
- Add authorization middleware
- Use HTTPS-only cookies for session management

### Database Security

When adding database functionality:

- Use parameterized queries to prevent SQL injection
- Implement proper connection pooling
- Use encrypted connections to databases
- Follow database-specific security best practices

## Security Tools and Integrations

### Recommended Tools

- **npm audit**: Check for known vulnerabilities in dependencies
- **Snyk**: Continuous security monitoring
- **OWASP ZAP**: Web application security testing
- **Docker Scout**: Container image vulnerability scanning
- **GitHub Security Advisories**: Dependency vulnerability alerts

### CI/CD Security

The GitHub Actions workflow includes:

- Dependency vulnerability scanning
- Container image security scanning
- Secrets management with GitHub Secrets
- OIDC authentication for AWS access

## Incident Response

In case of a security incident:

1. **Immediate Response**
   - Assess the scope and impact
   - Contain the incident
   - Preserve evidence

2. **Investigation**
   - Identify root cause
   - Determine data impact
   - Document timeline

3. **Recovery**
   - Implement fixes
   - Restore services
   - Validate security

4. **Post-Incident**
   - Conduct post-mortem
   - Update security measures
   - Communicate with stakeholders

## Contact Information

- **Security Team**: security@nibertinvestments.com
- **General Support**: support@nibertinvestments.com
- **Emergency Contact**: security-urgent@nibertinvestments.com

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Node.js Security Checklist](https://blog.risingstack.com/node-js-security-checklist/)
- [Docker Security Best Practices](https://docs.docker.com/develop/dev-best-practices/)
- [Kubernetes Security](https://kubernetes.io/docs/concepts/security/)

---

Thank you for helping keep Dixit App secure!