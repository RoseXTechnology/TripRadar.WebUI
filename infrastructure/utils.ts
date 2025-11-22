export function parseAllowedIps(ipRangesString: string | undefined): string[] {
  const fallbackIp = '127.0.0.1/32';

  console.log('🔍 parseAllowedIps called with:', ipRangesString ? `"${ipRangesString}"` : 'undefined');

  if (!ipRangesString) {
    console.warn('⚠️ ALLOWED_IP_RANGES is not set. WAF will block all requests (fallback to dummy IP).');
    return [fallbackIp];
  }

  try {
    const ips = ipRangesString
      .split(';')
      .map(entry => {
        const parts = entry.split('|');
        if (parts.length >= 2) {
          return parts[1].trim();
        }
        return null;
      })
      .filter((ip): ip is string => !!ip && ip.length > 0);

    if (ips.length === 0) {
      console.warn('⚠️ No valid IPs found in ALLOWED_IP_RANGES. WAF will block all requests.');
      return [fallbackIp];
    } else {
      console.log(`✅ Configured WAF with ${ips.length} allowed IPs:`, ips);
    }

    return ips;
  } catch (error) {
    console.error('❌ Failed to parse ALLOWED_IP_RANGES:', error);
    return [fallbackIp];
  }
}
