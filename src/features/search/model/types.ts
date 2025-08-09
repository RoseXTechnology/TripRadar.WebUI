export interface SearchResult {
  id: string;
  title: string;
  type: 'destination' | 'trip' | 'user';
  description: string;
  image?: string;
}

export interface SearchFilters {
  type?: string;
  location?: string;
  dateRange?: [string, string];
}