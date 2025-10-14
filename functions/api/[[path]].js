// // Cloudflare Pages Function to proxy API requests and handle CORS
// export async function onRequest(context) {
//   const { request } = context;
//   const url = new URL(request.url);
  
//   // Handle preflight OPTIONS request
//   if (request.method === 'OPTIONS') {
//     return new Response(null, {
//       headers: {
//         'Access-Control-Allow-Origin': '*',
//         'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
//         'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//         'Access-Control-Max-Age': '86400',
//       },
//     });
//   }
  
//   // Extract the path after /api/
//   const apiPath = url.pathname.replace('/api/', '');
  
//   // Build the target URL
//   const targetUrl = `https://socialist-ammamaria-scout-api-43c6c249.koyeb.app/api/${apiPath}${url.search}`;
  
//   // Create headers for the proxied request
//   const headers = new Headers(request.headers);
//   headers.set('Origin', 'https://socialist-ammamaria-scout-api-43c6c249.koyeb.app');
  
//   // Create a new request with the same method, headers, and body
//   const apiRequest = new Request(targetUrl, {
//     method: request.method,
//     headers: headers,
//     body: request.method !== 'GET' && request.method !== 'HEAD' ? await request.clone().arrayBuffer() : null,
//   });
  
//   try {
//     // Forward the request to the API
//     const response = await fetch(apiRequest);
    
//     // Clone the response and add CORS headers
//     const newResponse = new Response(response.body, response);
//     newResponse.headers.set('Access-Control-Allow-Origin', '*');
//     newResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     newResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
//     return newResponse;
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Proxy error', message: error.message }), {
//       status: 500,
//       headers: {
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*',
//       },
//     });
//   }
// }

