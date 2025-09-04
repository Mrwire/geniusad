'use client';

import { useState, useEffect } from 'react';
import { fetchFromSanity } from '@/lib/sanity';

interface UseSanityDataOptions {
  fallbackData?: any;
  revalidateInterval?: number;
}

export function useSanityData<T = any>(query: string, params = {}, options: UseSanityDataOptions = {}) {
  const { fallbackData, revalidateInterval = 60000 } = options;
  
  const [data, setData] = useState<T | undefined>(fallbackData);
  const [isLoading, setIsLoading] = useState<boolean>(!fallbackData);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout | null = null;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchFromSanity(query, params);
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error(String(err)));
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchData();

    // Set up revalidation
    if (revalidateInterval > 0) {
      timeoutId = setInterval(fetchData, revalidateInterval);
    }

    return () => {
      isMounted = false;
      if (timeoutId) {
        clearInterval(timeoutId);
      }
    };
  }, [query, JSON.stringify(params), revalidateInterval]);

  return { data, isLoading, error };
}

export default useSanityData; 