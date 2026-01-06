# Security Guidelines for PostCare+

## 🔒 Security Checklist

### ✅ Environment Variables
- [x] `.env` files excluded from Git
- [x] `.env.example` provided as template
- [ ] Never commit API keys or secrets
- [ ] Use environment variables for all sensitive data

### ✅ Database Security
- [ ] MongoDB connection uses authentication
- [ ] Database credentials stored in `.env` only
- [ ] Use MongoDB Atlas or secure local instance
- [ ] Enable MongoDB access control

### ✅ API Security
- [ ] Implement rate limiting for production
- [ ] Add input validation on all endpoints
- [ ] Use HTTPS in production
- [ ] Enable CORS with specific origins

### ✅ Dependencies
- [ ] Run `npm audit` regularly
- [ ] Keep dependencies updated
- [ ] Review package permissions

## 🛡️ Never Commit These Files

```
.env
.env.local
.env.production
*.key
*.pem
*.cert
credentials.json
secrets.json
config/keys.js
database backups (*.dump, *.sql)
API keys or tokens
Password files
```

## 📝 Before Deploying

1. **Set Environment Variables on Server**
   ```bash
   MONGODB_URI=your_production_mongodb_uri
   NODE_ENV=production
   PORT=5000
   ```

2. **Enable Security Headers**
   - Install helmet: `npm install helmet`
   - Add to server/index.js: `app.use(helmet())`

3. **Add Rate Limiting**
   ```bash
   npm install express-rate-limit
   ```

4. **Input Validation**
   ```bash
   npm install joi
   ```

## 🔑 Environment Variables Template

Create `.env` from `.env.example`:
```bash
cp .env.example .env
# Edit .env with your actual values
```

**Required Variables:**
- `MONGODB_URI` - Your MongoDB connection string
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - development/production

## 🚨 If You Accidentally Committed Secrets

1. **Remove from Git history immediately:**
   ```bash
   git filter-branch --force --index-filter \
   "git rm --cached --ignore-unmatch .env" \
   --prune-empty --tag-name-filter cat -- --all
   ```

2. **Rotate all exposed credentials**
3. **Force push to remote**
   ```bash
   git push origin --force --all
   ```

## 📊 Security Audit Commands

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check outdated packages
npm outdated
```

## 🔐 Recommended Production Settings

1. **Use HTTPS only**
2. **Set secure cookies**: `secure: true, httpOnly: true`
3. **Enable CORS selectively**
4. **Add authentication/authorization**
5. **Implement logging (without sensitive data)**
6. **Regular backups of database**
7. **Monitor for suspicious activity**

## 📱 Contact for Security Issues

If you discover a security vulnerability:
- **DO NOT** open a public issue
- Email: security@postcareplus.com
- Use responsible disclosure

---

**Last Updated:** January 6, 2026
**Review Frequency:** Monthly
