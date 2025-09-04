import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic'; // Ensure dynamic rendering for this route
export const revalidate = 3600; // Revalidate every hour

// Helper function to add CORS headers
function corsHeaders(response: NextResponse) {
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}

// Handle OPTIONS request (preflight)
export async function OPTIONS() {
  return corsHeaders(new NextResponse(null, { status: 204 }));
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const imagePath = searchParams.get('path');
  
  if (!imagePath) {
    return corsHeaders(new NextResponse('Image path is required', { 
      status: 400,
      headers: { 'Content-Type': 'text/plain' }
    }));
  }
  
  try {
    // Security: Prevent path traversal attacks
    const sanitizedPath = path.normalize(imagePath).replace(/^(\.\.(\/|\\|$))+/, '');
    const fullPath = path.join(process.cwd(), 'public', sanitizedPath);
    
    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      console.warn(`Image not found: ${fullPath}`);
      
      // Try an alternative path format (in case of Windows/Unix path differences)
      const altPath = path.join(process.cwd(), 'public', sanitizedPath.replace(/\\/g, '/'));
      if (!fs.existsSync(altPath)) {
        return corsHeaders(new NextResponse('Image not found', { 
          status: 404,
          headers: { 'Content-Type': 'text/plain' }
        }));
      } else {
        // Use the alternative path if found
        const fileBuffer = fs.readFileSync(altPath);
        const contentType = getContentType(altPath);
        
        return corsHeaders(new NextResponse(fileBuffer, {
          status: 200,
          headers: {
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=86400'
          }
        }));
      }
    }
    
    // Read and return the file
    const fileBuffer = fs.readFileSync(fullPath);
    const contentType = getContentType(fullPath);
    
    return corsHeaders(new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400'
      }
    }));
  } catch (error) {
    console.error('Error serving image:', error);
    return corsHeaders(new NextResponse('Internal Server Error', { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    }));
  }
}

function getContentType(filePath: string): string {
  const ext = path.extname(filePath).toLowerCase();
  
  switch (ext) {
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.webp':
      return 'image/webp';
    case '.jfif':
      return 'image/jpeg';
    default:
      return 'application/octet-stream';
  }
} 