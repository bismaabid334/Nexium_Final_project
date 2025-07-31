import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  
  // Log all search parameters for debugging
  console.log('All URL parameters:', Object.fromEntries(requestUrl.searchParams));
  console.log('Full URL:', request.url);
  
  // Since Supabase is using implicit flow (hash-based), we need to handle this differently
  // The tokens are in the URL hash, not as query parameters
  
  // For implicit flow, just redirect to home and let the client handle the session
  console.log('Redirecting to home - client will handle implicit flow tokens');
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}