'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AuthCallbackLoadingPage() {
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('Processing auth callback...');
        console.log('Current URL:', window.location.href);
        console.log('Hash:', window.location.hash);
        
        // Check if there are auth tokens in the URL hash (implicit flow)
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        
        if (accessToken) {
          console.log('Found access token in URL hash, setting session...');
          
          // Set the session using the tokens from the URL
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });
          
          if (error) {
            console.error('Error setting session:', error);
            router.push('/signin?error=session_error');
            return;
          }
          
          if (data.session) {
            console.log('Session set successfully, redirecting to home');
            // Clear the URL hash to remove tokens from browser history
            window.history.replaceState(null, '', window.location.pathname);
            router.push('/');
            return;
          }
        }
        
        // Fallback: check for existing session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session error:', error);
          router.push('/signin?error=session_error');
          return;
        }

        if (session) {
          console.log('Existing session found, redirecting to home');
          router.push('/');
        } else {
          console.log('No session found, redirecting to signin');
          router.push('/signin');
        }
      } catch (error) {
        console.error('Auth callback error:', error);
        router.push('/signin?error=callback_error');
      } finally {
        setIsProcessing(false);
      }
    };

    // Small delay to ensure the component is mounted and URL is ready
    const timer = setTimeout(handleAuthCallback, 100);
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to avoid the useEffect size error

  if (!isProcessing) {
    return null; // Don't render anything if we're done processing
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-xl bg-white p-8 shadow-lg text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <h1 className="text-2xl font-bold mb-2">Signing you in...</h1>
        <p className="text-gray-600">Please wait while we complete your authentication.</p>
      </div>
    </div>
  );
}