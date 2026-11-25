# DOMAIN, DNS & CLOUDFLARE CONFIGURATION GUIDE
**Milestone I — Requirement 7 (2 Marks)**

---

## 1. Domain Registration Strategy

### Recommended Domain Options
Choose a clean, brandable domain name reflecting **SEO Experiment Lab**:
- `seolabs.dev`
- `seoexperimentlab.com`
- `seolabz.org`
- `seoexperimentlab.dev`
- `seolabs.io`

### Recommended Budget Registrars
| Registrar | Typical Cost (.com / .org / .dev) | WHOIS Privacy | Nameserver Update Speed |
|---|---|---|---|
| **Spaceship** (by Namecheap) | ~$7 - $9 / yr | Free Lifetime | Fast (<5 mins) |
| **Namecheap** | ~$9 - $12 / yr | Free Lifetime | Fast (<10 mins) |
| **Cloudflare Registrar** | At-cost wholesale (~$9.77/yr for .com) | Free Lifetime | Instant (Zero delegation needed) |
| **Porkbun** | ~$10 / yr | Free Lifetime | Fast (<5 mins) |

---

## 2. Cloudflare Setup & Nameserver Delegation

### Step-by-Step Delegation
1. Go to [cloudflare.com](https://dash.cloudflare.com/) and create a free account.
2. Click **"Add a Domain"** (or "+ Add Site") and enter your domain name (e.g., `YOURDOMAIN.COM`).
3. Select the **Free Plan** ($0/month) and click **Continue**.
4. Cloudflare will scan existing DNS records. Click **Continue**.
5. Cloudflare will display two assigned nameservers (e.g.):
   - `ashley.ns.cloudflare.com`
   - `todd.ns.cloudflare.com`
6. Log into your domain registrar (Spaceship / Namecheap / etc.):
   - Navigate to **Domain List** > **Manage** > **Nameservers**.
   - Change from *Default Nameservers* to **Custom DNS / Custom Nameservers**.
   - Paste Cloudflare’s two nameservers.
   - Save changes.
7. Return to Cloudflare and click **"Done, check nameservers"**.

---

## 3. Cloudflare DNS Records Table

Add the following records in the **Cloudflare Dashboard > DNS > Records**:

| Type | Name | IPv4 Address / Target | Proxy Status | TTL | Operational Purpose |
|---|---|---|---|---|---|
| **A** | `@` | `YOUR_VPS_IP` | **Proxied (Orange Cloud)** | Auto | Main website (apex root domain) |
| **CNAME** | `www` | `@` | **Proxied (Orange Cloud)** | Auto | Standardizes www to root domain |
| **A** | `app` | `YOUR_VPS_IP` | **Proxied (Orange Cloud)** | Auto | **Subdomain Placeholder:** Future React/FastAPI app |
| **CAA** | `@` | `0 issue "letsencrypt.org"` | DNS Only (Grey Cloud) | Auto | Restricts SSL authority to Let's Encrypt |

> **Note on Proxy Status:**
> Keep the **Orange Cloud (Proxied)** enabled for `@`, `www`, and `app`. This masks your VPS origin IP address from attackers, absorbs DDoS attacks, and provides CDN caching.

---

## 4. SSL/TLS Configuration: Full (Strict)

1. Go to **Cloudflare Dashboard > SSL/TLS > Overview**.
2. Select **Full (strict)**.
   - *Why Full (strict)?* It enforces end-to-end encryption between visitor, Cloudflare CDN, and the VPS origin server. Insecure modes like *Flexible* transmit plain HTTP between Cloudflare and your server, causing security vulnerabilities and WordPress redirect loops.
3. Go to **SSL/TLS > Edge Certificates**:
   - Turn **ON** **Always Use HTTPS** (redirects all HTTP traffic to HTTPS at the edge).
   - Turn **ON** **Automatic HTTPS Rewrites** (prevents mixed-content errors).
   - Enable **HSTS (HTTP Strict Transport Security)**:
     - Max Age: 6 months (15768000 seconds)
     - Apply to subdomains: Yes

---

## 5. Performance & Caching Rules

1. Go to **Caching > Configuration**:
   - Caching Level: **Standard**
   - Browser Cache TTL: **4 hours**
2. Go to **Speed > Optimization**:
   - Enable **Brotli** compression.
   - Enable **Early Hints**.
   - Auto Minify: Check **HTML**, **CSS**, and **JS** (or manage via WordPress caching plugin).

---

## 6. Security & WAF Settings

1. Go to **Security > Settings**:
   - Security Level: **Medium**
   - Challenge Passage: **30 minutes**
   - Browser Integrity Check: **Enabled**
2. Go to **Security > Bots**:
   - Turn **ON** **Bot Fight Mode** (blocks malicious scrapers and brute-force botnets).

---

## 7. DNS Propagation Verification Commands

Run these terminal commands locally (PowerShell on Windows, or Bash on Linux/macOS) to verify global propagation:

```bash
# Query root domain A record via Google DNS (8.8.8.8)
nslookup YOURDOMAIN.COM 8.8.8.8

# Query root domain A record via Cloudflare DNS (1.1.1.1)
nslookup YOURDOMAIN.COM 1.1.1.1

# Query app subdomain
nslookup app.YOURDOMAIN.COM 1.1.1.1

# Test HTTPS handshake & headers
curl -Iv https://YOURDOMAIN.COM
```

You can also verify propagation globally using [whatsmydns.net](https://www.whatsmydns.net/).

---

## 8. Milestone I Screenshot Evidence Checklist (9 Screenshots)

Save these 9 screenshots into `docs/evidence/01_domain_dns/`:
- [ ] `01_domain_registration.png`: Domain active in registrar dashboard.
- [ ] `02_cloudflare_overview.png`: Domain active in Cloudflare overview.
- [ ] `03_nameserver_delegation.png`: Assigned Cloudflare nameservers at registrar.
- [ ] `04_dns_records_table.png`: Cloudflare DNS table showing `@`, `www`, and `app`.
- [ ] `05_ssl_full_strict.png`: SSL/TLS encryption mode set to Full (strict).
- [ ] `06_edge_certificates_hsts.png`: "Always Use HTTPS" and HSTS active.
- [ ] `07_caching_configuration.png`: Caching tab showing standard cache.
- [ ] `08_security_waf_rules.png`: Security tab showing Bot Fight Mode active.
- [ ] `09_dns_propagation_global.png`: Global propagation check on whatsmydns.net.
