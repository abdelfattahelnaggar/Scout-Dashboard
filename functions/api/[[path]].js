// functions/api/[[path]].js

const API_URL = 'https://socialist-ammamaria-scout-api-43c6c249.koyeb.app';

async function handleRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Construct the target API URL, preserving path and query
  const targetUrl = new URL(API_URL + url.pathname + url.search);

  // Clone and sanitize headers to avoid passing Worker-specific headers to origin
  const forwardedHeaders = new Headers(request.headers);
  // Remove headers that the platform will set or that can cause issues at origin
  forwardedHeaders.delete('host');
  forwardedHeaders.delete('origin');
  forwardedHeaders.delete('referer');
  forwardedHeaders.delete('content-length');
  forwardedHeaders.delete('accept-encoding');

  // Ensure Content-Type is present for non-GET/HEAD
  const isBodyMethod = request.method !== 'GET' && request.method !== 'HEAD';
  if (isBodyMethod && !forwardedHeaders.has('content-type')) {
    forwardedHeaders.set('content-type', 'application/json');
  }

  // Read body only when needed
  const body = isBodyMethod ? await request.clone().arrayBuffer() : undefined;

  // Forward the request to the origin
  const originResponse = await fetch(targetUrl.toString(), {
    method: request.method,
    headers: forwardedHeaders,
    body,
    redirect: 'follow',
  });

  // Add CORS headers for the browser
  const response = new Response(originResponse.body, originResponse);
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return response;
}

function handleOptions(request) {
  // Handle CORS preflight requests
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': request.headers.get('Access-Control-Request-Headers') || 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
    },
  });
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method === 'OPTIONS') {
    return handleOptions(request);
  }
  return handleRequest(context);
}

