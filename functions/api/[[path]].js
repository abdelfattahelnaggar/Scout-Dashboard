// functions/api/[[path]].js

const API_URL = 'https://socialist-ammamaria-scout-api-43c6c249.koyeb.app';

async function handleRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Construct the target API URL, preserving the path and query string.
  const apiUrl = new URL(API_URL + url.pathname + url.search);

  // Create a new request to the target API, forwarding the original method, headers, and body.
  const apiRequest = new Request(apiUrl.toString(), {
    method: request.method,
    headers: request.headers,
    body: request.body,
    redirect: 'follow',
  });

  // Fetch the response from the target API.
  const response = await fetch(apiRequest);

  // Create a mutable copy of the response to add CORS headers for the browser.
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', '*'); // Allow any origin
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return newResponse;
}

function handleOptions(request) {
    // Handle CORS pre-flight requests by returning the appropriate CORS headers.
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        // Reflect the headers requested by the client in the pre-flight request.
        'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400', // Cache pre-flight response for 24 hours.
      },
    });
}

export async function onRequest(context) {
  const { request } = context;
  // Route OPTIONS requests to the pre-flight handler.
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }
  // Route all other requests to the main proxy handler.
  return handleRequest(context);
}

