# Web Application Security Testing - Full Content

---

**name:** Web Application Security Testing

**description:** OWASP Top 10 testing, injection vulnerability detection, API security assessment, authentication testing, and web vulnerability reporting for authorized assessments

**version:** 3.0.0

**author:** Masriyan

**tags:** [cybersecurity, web-security, owasp, xss, sqli, api, pentest, burpsuite, authentication]

---

## Purpose

Enable Claude to assist with comprehensive web application security assessments covering OWASP Top 10, injection testing, API security, authentication analysis, and client-side security. Claude analyzes application behavior, generates test payloads, reviews source code, and produces structured vulnerability reports.

> **Authorization Required**: All testing must be performed on authorized targets only. Confirm scope and written authorization before testing.

---

## Activation Triggers

This skill activates when the user asks about:
- OWASP Top 10 testing or assessment methodology
- SQL injection, XSS, SSRF, SSTI, command injection testing
- API security testing (REST, GraphQL, SOAP)
- Authentication bypass, session management flaws
- Web application firewall (WAF) bypasses for authorized testing
- CORS, CSP, or security header analysis
- OAuth/OIDC security review
- JWT analysis or manipulation
- Burp Suite or OWASP ZAP usage guidance
- Web vulnerability report writing

---

## Core Capabilities

### 1. OWASP Top 10 Assessment

| # | Vulnerability | Claude's Assessment Approach |
|---|--------------|------------------------------|
| A01 | Broken Access Control | Test IDOR, path traversal, forced browsing, privilege escalation |
| A02 | Cryptographic Failures | Audit TLS, check sensitive data exposure, weak algorithms |
| A03 | Injection | Test all inputs for SQLi, NoSQLi, OS command, LDAP, SSTI |
| A04 | Insecure Design | Review architecture for missing security controls |
| A05 | Security Misconfiguration | Check defaults, error disclosure, directory listing, debug mode |
| A06 | Vulnerable Components | Audit third-party libraries and framework versions |
| A07 | Auth & ID Failures | Test session management, brute force, MFA, credential storage |
| A08 | Software & Data Integrity | Check update mechanisms, deserialization, CI/CD security |
| A09 | Logging & Monitoring Failures | Verify logging coverage and alerting |
| A10 | SSRF | Test URL parameters, webhooks, import functionality |

### 2. Injection Testing

Map all injection points: GET/POST params, URL path segments, HTTP headers
(X-Forwarded-For, User-Agent, Referer, Cookie), JSON/XML/GraphQL bodies,
file upload names and metadata.

SQLi: detect with `'`, `' OR '1'='1`, time-based blind (`SLEEP`, `WAITFOR
DELAY`, `pg_sleep`); confirm with harmless PoC only, never destructive
queries; fix is parameterized queries / prepared statements, not
string-escaping.

XSS: find reflection points, identify HTML/attribute/JS/URL context, confirm
with a harmless payload for that context; fix is contextual output encoding
(+ CSP as defense in depth), not blacklist filtering.

Command injection: separators `; | & && \`cmd\` $(cmd)`; fix is avoiding
shell invocation entirely (argv arrays) over sanitizing input.

SSRF: URL input points (import, webhooks, doc converters, image-from-url);
test internal/metadata targets only in an authorized, non-destructive way;
fix is an allowlist of destinations, not a denylist.

SSTI: universal probes `{{7*7}}`, `${7*7}`, `<%= 7*7 %>`, `#{7*7}`; fix is
logic-less templates or sandboxed rendering with user input never reaching
template source.

### 3. API Security Testing

Authentication: endpoints reachable without a token, JWT `alg:none` /
weak-secret acceptance, API keys in URL query strings, Basic auth over
plain HTTP.

Authorization: BOLA/IDOR (swap an object ID and see if another user's data
comes back), mass assignment (extra privileged fields in a POST body),
function-level access (hit an admin endpoint as a regular user).

Input validation: injection in params/body, rate limiting presence,
behavior on unexpected/extra fields.

Data exposure: response includes fields the client doesn't need, one user
can see another's PII, verbose error messages leak internals, debug/docs
endpoints reachable in production.

### 4. Authentication & Session Testing

Session tokens: sufficient entropy, unpredictable, invalidated on logout
and password change, `Secure` + `HttpOnly` + `SameSite` cookie flags.

Passwords: complexity enforced, lockout after N failures, never echoed back
or logged, reset tokens single-use/time-limited and not leaked via
Referer/URL.

OAuth: `state` validated (CSRF), redirect URI strictly matched (no open
redirect), auth codes single-use, PKCE for public clients, no client
secret shipped in frontend JS.

### 5. Security Headers & CORS

Required headers: `Strict-Transport-Security`, `Content-Security-Policy`,
`X-Content-Type-Options: nosniff`, `X-Frame-Options`,
`Referrer-Policy`, `Permissions-Policy`, `Cache-Control: no-store` on
sensitive endpoints.

CORS: reject arbitrary reflected `Origin`, reject `null` origin, don't
trust unvalidated subdomains of the site's own domain.

---

## Vulnerability Report Template

```markdown
## Web Security Finding: [Title]

**ID:** WEB-[Number]
**Severity:** [Critical / High / Medium / Low / Info]
**CWE:** [CWE-ID — CWE Name]
**OWASP:** [A0X — Category]

### Affected Location
**File/Endpoint:** `path/to/file.php` or `https://target/api/endpoint`

### Description
[Clear description of the vulnerability and why it's a risk]

### Reproduction / Evidence
[Minimal PoC — request, input, or code snippet showing the flaw]

### Impact
[Business and technical impact — data exposure, account takeover, RCE, etc.]

### Remediation
[Specific fix with code example]
```

---

## References

- [OWASP Top 10 2021](https://owasp.org/www-project-top-ten/)
- [OWASP Testing Guide v4.2](https://owasp.org/www-project-web-security-testing-guide/)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)

---

## Scope note for this project

This site has no live pentest engagement scoped — usage here is a
**white-box static source review** of our own codebase (PHP API +
React/Vite frontend), not live payload injection against a running
target. Apply the OWASP Top 10 checklist above as a code-reading
methodology: trace each input to its sink, confirm the actual guard in
place (or its absence), and fix in the source rather than demonstrating
exploitation.
