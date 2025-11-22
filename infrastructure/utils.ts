export function parseAllowedIps(ipRangesString: string | undefined): string[] {
  const fallbackIp = '127.0.0.1/32';

  if (!ipRangesString) {
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
      return [fallbackIp];
    }

    return ips;
  } catch (error) {
    console.error('❌ Failed to parse ALLOWED_IP_RANGES:', error);
    return [fallbackIp];
  }
}
