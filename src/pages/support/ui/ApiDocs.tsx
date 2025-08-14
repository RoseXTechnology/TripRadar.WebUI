import { useState } from 'react';
import { Code, Zap, Copy, Check, Play, Book, Clock, AlertTriangle, ChevronDown } from 'lucide-react';

interface APIEndpoint {
  method: string;
  endpoint: string;
  title: string;
  description: string;
  parameters: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
  response: string;
  example: string;
}

const apiEndpoints: APIEndpoint[] = [
  {
    method: 'GET',
    endpoint: '/api/v1/flights',
    title: 'Search Flights',
    description: 'Search for flights between destinations with flexible parameters',
    parameters: [
      {
        name: 'from',
        type: 'string',
        required: true,
        description: 'Departure airport code (IATA)',
      },
      {
        name: 'to',
        type: 'string',
        required: true,
        description: 'Destination airport code (IATA)',
      },
      {
        name: 'departure_date',
        type: 'string',
        required: true,
        description: 'Departure date (YYYY-MM-DD)',
      },
      {
        name: 'return_date',
        type: 'string',
        required: false,
        description: 'Return date for round trips',
      },
      {
        name: 'passengers',
        type: 'integer',
        required: false,
        description: 'Number of passengers (default: 1)',
      },
      {
        name: 'class',
        type: 'string',
        required: false,
        description: 'Cabin class: economy, business, first',
      },
    ],
    response: `{
  "flights": [
    {
      "id": "FL123456",
      "airline": "Emirates",
      "flight_number": "EK203",
      "departure": {
        "airport": "JFK",
        "time": "2024-03-15T14:30:00Z",
        "terminal": "4"
      },
      "arrival": {
        "airport": "DXB",
        "time": "2024-03-16T06:45:00Z",
        "terminal": "3"
      },
      "duration": "14h 15m",
      "stops": 0,
      "price": {
        "amount": 899,
        "currency": "USD"
      },
      "booking_url": "https://..."
    }
  ],
  "total_results": 45,
  "search_id": "search_123"
}`,
    example: `curl -X GET "https://api.tripradar.io/v1/flights?from=JFK&to=DXB&departure_date=2024-03-15&passengers=1" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
  },
  {
    method: 'GET',
    endpoint: '/api/v1/hotels',
    title: 'Search Hotels',
    description: 'Find accommodations with detailed amenities and pricing',
    parameters: [
      {
        name: 'location',
        type: 'string',
        required: true,
        description: 'City name or coordinates',
      },
      {
        name: 'check_in',
        type: 'string',
        required: true,
        description: 'Check-in date (YYYY-MM-DD)',
      },
      {
        name: 'check_out',
        type: 'string',
        required: true,
        description: 'Check-out date (YYYY-MM-DD)',
      },
      {
        name: 'guests',
        type: 'integer',
        required: false,
        description: 'Number of guests (default: 2)',
      },
      {
        name: 'rooms',
        type: 'integer',
        required: false,
        description: 'Number of rooms (default: 1)',
      },
      {
        name: 'min_rating',
        type: 'number',
        required: false,
        description: 'Minimum hotel rating (1-5)',
      },
    ],
    response: `{
  "hotels": [
    {
      "id": "HT789012",
      "name": "Grand Plaza Hotel",
      "rating": 4.8,
      "location": {
        "address": "123 Main Street",
        "city": "New York",
        "coordinates": {
          "lat": 40.7128,
          "lng": -74.0060
        }
      },
      "price": {
        "amount": 299,
        "currency": "USD",
        "per_night": true
      },
      "amenities": ["wifi", "pool", "gym", "spa"],
      "images": ["https://..."],
      "booking_url": "https://..."
    }
  ]
}`,
    example: `curl -X GET "https://api.tripradar.io/v1/hotels?location=New York&check_in=2024-03-15&check_out=2024-03-18" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
  {
    method: 'GET',
    endpoint: '/api/v1/weather',
    title: 'Weather Data',
    description: 'Get current weather and forecasts for any location',
    parameters: [
      {
        name: 'location',
        type: 'string',
        required: true,
        description: 'City name or coordinates',
      },
      {
        name: 'days',
        type: 'integer',
        required: false,
        description: 'Forecast days (1-7, default: 5)',
      },
      {
        name: 'units',
        type: 'string',
        required: false,
        description: 'Temperature units: celsius, fahrenheit',
      },
    ],
    response: `{
  "current": {
    "temperature": 22,
    "condition": "sunny",
    "humidity": 65,
    "wind_speed": 12,
    "visibility": 10
  },
  "forecast": [
    {
      "date": "2024-03-15",
      "high": 25,
      "low": 18,
      "condition": "partly_cloudy",
      "precipitation": 10
    }
  ]
}`,
    example: `curl -X GET "https://api.tripradar.io/v1/weather?location=Tokyo&days=7" \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
  },
];

export default function ApiDocs() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [expandedEndpoint, setExpandedEndpoint] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const toggleEndpoint = (endpoint: string) => {
    setExpandedEndpoint(expandedEndpoint === endpoint ? null : endpoint);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">API Documentation</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Comprehensive documentation for TripRadar's travel APIs. Build amazing travel applications with our powerful
            endpoints.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Zap className="h-6 w-6 text-yellow-500" />
            <span>Quick Start</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Authentication</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                All API requests require authentication using your API key in the Authorization header.
              </p>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 relative">
                <code className="text-sm text-gray-800 dark:text-gray-200">Authorization: Bearer YOUR_API_KEY</code>
                <button
                  onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth')}
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {copiedCode === 'auth' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Base URL</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">All API endpoints are relative to the base URL:</p>

              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 relative">
                <code className="text-sm text-gray-800 dark:text-gray-200">https://api.tripradar.io</code>
                <button
                  onClick={() => copyToClipboard('https://api.tripradar.io', 'base')}
                  className="absolute top-2 right-2 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {copiedCode === 'base' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <Clock className="h-6 w-6 text-blue-500" />
            <span>Rate Limits</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1,000</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Requests per hour</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Free Plan</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">10,000</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Requests per hour</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Pro Plan</div>
            </div>
            <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">100,000</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Requests per hour</div>
              <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">Enterprise</div>
            </div>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">API Endpoints</h2>

          {apiEndpoints.map((endpoint, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleEndpoint(endpoint.endpoint)}
                className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-bold ${
                        endpoint.method === 'GET'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : endpoint.method === 'POST'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {endpoint.method}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{endpoint.title}</h3>
                      <code className="text-sm text-gray-600 dark:text-gray-400">{endpoint.endpoint}</code>
                    </div>
                  </div>
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform ${
                      expandedEndpoint === endpoint.endpoint ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mt-2">{endpoint.description}</p>
              </button>

              {expandedEndpoint === endpoint.endpoint && (
                <div className="border-t border-gray-200 dark:border-gray-700 p-6 bg-gray-50 dark:bg-gray-700/50">
                  <div className="space-y-6">
                    {/* Parameters */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Parameters</h4>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-600">
                              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Name</th>
                              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Type</th>
                              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Required</th>
                              <th className="text-left py-2 text-gray-700 dark:text-gray-300">Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            {endpoint.parameters.map((param, idx) => (
                              <tr key={idx} className="border-b border-gray-100 dark:border-gray-600">
                                <td className="py-2 font-mono text-blue-600 dark:text-blue-400">{param.name}</td>
                                <td className="py-2 text-gray-600 dark:text-gray-400">{param.type}</td>
                                <td className="py-2">
                                  <span
                                    className={`px-2 py-1 rounded text-xs ${
                                      param.required
                                        ? 'bg-red-100 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                                        : 'bg-gray-100 text-gray-700 dark:bg-gray-600 dark:text-gray-300'
                                    }`}
                                  >
                                    {param.required ? 'Required' : 'Optional'}
                                  </span>
                                </td>
                                <td className="py-2 text-gray-600 dark:text-gray-400">{param.description}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Example Request */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Example Request</h4>
                      <div className="bg-gray-900 dark:bg-black rounded-lg p-4 relative">
                        <pre className="text-green-400 text-sm overflow-x-auto">
                          <code>{endpoint.example}</code>
                        </pre>
                        <button
                          onClick={() => copyToClipboard(endpoint.example, `example-${index}`)}
                          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                        >
                          {copiedCode === `example-${index}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Response */}
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Response</h4>
                      <div className="bg-gray-900 dark:bg-black rounded-lg p-4 relative">
                        <pre className="text-cyan-400 text-sm overflow-x-auto">
                          <code>{endpoint.response}</code>
                        </pre>
                        <button
                          onClick={() => copyToClipboard(endpoint.response, `response-${index}`)}
                          className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white"
                        >
                          {copiedCode === `response-${index}` ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Try It Button */}
                    <div className="flex justify-end">
                      <button className="bg-primary-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center space-x-2">
                        <Play className="h-4 w-4" />
                        <span>Try in Playground</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Error Codes */}
        <div className="mt-16 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center space-x-2">
            <AlertTriangle className="h-6 w-6 text-red-500" />
            <span>Error Codes</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                code: '400',
                title: 'Bad Request',
                description: 'Invalid request parameters',
              },
              {
                code: '401',
                title: 'Unauthorized',
                description: 'Invalid or missing API key',
              },
              {
                code: '403',
                title: 'Forbidden',
                description: 'Access denied or rate limit exceeded',
              },
              {
                code: '404',
                title: 'Not Found',
                description: 'Endpoint or resource not found',
              },
              {
                code: '429',
                title: 'Too Many Requests',
                description: 'Rate limit exceeded',
              },
              {
                code: '500',
                title: 'Internal Server Error',
                description: 'Server error, please try again',
              },
            ].map((error, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="text-2xl font-bold text-red-600 dark:text-red-400">{error.code}</div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">{error.title}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{error.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SDKs and Libraries */}
        <div className="mt-16 bg-gradient-to-r from-primary-600 to-blue-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Need Help Getting Started?</h3>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Check out our SDKs, code examples, and comprehensive guides to get up and running quickly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-primary-600 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Book className="h-5 w-5" />
              <span>View Guides</span>
            </button>

            <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center space-x-2 border border-white/20">
              <Code className="h-5 w-5" />
              <span>Download SDKs</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
