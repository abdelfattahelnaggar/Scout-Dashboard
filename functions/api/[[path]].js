export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);

  // Handle OPTIONS preflight requests
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  // Build target URL
  const targetUrl = `https://socialist-ammamaria-scout-api-43c6c249.koyeb.app${url.pathname}${url.search}`;
  
  // Forward the request
  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body,
  });

  // Add CORS headers
  const newResponse = new Response(response.body, response);
  newResponse.headers.set('Access-Control-Allow-Origin', '*');
  newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return newResponse;
}

