import { NextRequest } from 'next/server';
import { client } from '@/lib/sanity';

export async function GET(
  request: NextRequest,
  { params }: { params: { route: string[] } }
) {
  try {
    const route = params.route;
    const query = request.nextUrl.searchParams.get('query');
    const queryParams = JSON.parse(request.nextUrl.searchParams.get('params') || '{}');
    
    if (!query) {
      return new Response(JSON.stringify({ error: 'Query parameter is required' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    const data = await client.fetch(query, queryParams);
    
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Sanity API Error:', error);
    
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
} 