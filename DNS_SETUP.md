# Custom Domain Setup for TripRadar WebUI

## Overview
- **Development**: `dev.tripradar.io`
- **Production**: `app.tripradar.io` (future)

## Step 1: Deploy Infrastructure with CDN

Deploy infrastructure first to get CDN endpoint:

```bash
cd infrastructure
npm run deploy:dev
```

After deployment, get CDN endpoint hostname:

```bash
pulumi stack output
```

You'll get something like: `tripradar-webui-dev.azureedge.net`

## Step 2: Configure DNS (CNAME Record)

In your DNS provider (where `tripradar.io` is hosted), add CNAME record:

```
Type: CNAME
Name: dev
Value: tripradar-webui-dev.azureedge.net
TTL: 3600 (or default)
```

**Important**: Do NOT include the protocol (`https://`) in the CNAME value!

### DNS Provider Examples:

**Cloudflare:**
1. Go to DNS settings
2. Add record:
   - Type: `CNAME`
   - Name: `dev`
   - Target: `tripradar-webui-dev.azureedge.net`
   - Proxy status: DNS only (gray cloud)

**Azure DNS:**
```bash
az network dns record-set cname set-record \
  --resource-group your-dns-rg \
  --zone-name tripradar.io \
  --record-set-name dev \
  --cname tripradar-webui-dev.azureedge.net
```

**GoDaddy / Namecheap:**
1. DNS Management
2. Add CNAME Record
3. Host: `dev`
4. Points to: `tripradar-webui-dev.azureedge.net`

## Step 3: Add Custom Domain to Azure CDN

After DNS is configured (wait 5-10 minutes for propagation):

```bash
# Get CDN details
RESOURCE_GROUP="tripradar-webui-rg-dev"
CDN_PROFILE="tripradar-webui-cdn-dev"
CDN_ENDPOINT="tripradar-webui-dev"

# Add custom domain
az cdn custom-domain create \
  --resource-group $RESOURCE_GROUP \
  --profile-name $CDN_PROFILE \
  --endpoint-name $CDN_ENDPOINT \
  --name dev-tripradar-io \
  --hostname dev.tripradar.io
```

## Step 4: Enable HTTPS

Azure CDN provides free managed SSL certificate:

```bash
az cdn custom-domain enable-https \
  --resource-group $RESOURCE_GROUP \
  --profile-name $CDN_PROFILE \
  --endpoint-name $CDN_ENDPOINT \
  --name dev-tripradar-io \
  --min-tls-version 1.2
```

**Certificate provisioning takes 6-8 hours.**

## Step 5: Verify

```bash
# Check DNS propagation
nslookup dev.tripradar.io

# Check custom domain status
az cdn custom-domain show \
  --resource-group $RESOURCE_GROUP \
  --profile-name $CDN_PROFILE \
  --endpoint-name $CDN_ENDPOINT \
  --name dev-tripradar-io
```

## Troubleshooting

### DNS Not Resolving
```bash
# Check DNS propagation globally
# https://dnschecker.org/#CNAME/dev.tripradar.io

# Flush local DNS cache (Windows)
ipconfig /flushdns

# Flush local DNS cache (Mac/Linux)
sudo dscacheutil -flushcache
```

### Custom Domain Validation Failed
- Ensure CNAME record is correct (no `https://`, no trailing dot)
- Wait 10-15 minutes for DNS propagation
- Verify with: `nslookup dev.tripradar.io`

### HTTPS Not Working
- Certificate provisioning takes 6-8 hours
- Check status: `az cdn custom-domain show ...`
- CustomHttpsProvisioningState should be "Enabled"

## Current Setup

### Development
- **Default URL**: https://tripradarwebuidev.z6.web.core.windows.net/
- **CDN URL**: https://tripradar-webui-dev.azureedge.net/
- **Custom Domain**: https://dev.tripradar.io/ (after DNS setup)

### Production (Future)
- **Custom Domain**: https://app.tripradar.io/

## Auto-Configuration with Pulumi

The infrastructure code supports automatic custom domain creation. When you run `pulumi up`, it will:

1. ✅ Create CDN profile and endpoint
2. ✅ Configure custom domain (if DNS is ready)
3. ⏳ Enable HTTPS (Azure manages certificate)

**Note**: You must configure DNS BEFORE running Pulumi with custom domain config, otherwise custom domain creation will fail.

## Useful Commands

```bash
# Get CDN endpoint URL
az cdn endpoint show \
  --resource-group tripradar-webui-rg-dev \
  --profile-name tripradar-webui-cdn-dev \
  --name tripradar-webui-dev \
  --query "hostName" -o tsv

# List all custom domains
az cdn custom-domain list \
  --resource-group tripradar-webui-rg-dev \
  --profile-name tripradar-webui-cdn-dev \
  --endpoint-name tripradar-webui-dev

# Purge CDN cache
az cdn endpoint purge \
  --resource-group tripradar-webui-rg-dev \
  --profile-name tripradar-webui-cdn-dev \
  --name tripradar-webui-dev \
  --content-paths "/*"
```
