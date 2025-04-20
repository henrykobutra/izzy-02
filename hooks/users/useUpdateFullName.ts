'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateUserFullName } from '@/lib/user/actions';

export function useUpdateFullName() {
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  // Function to update the full name and refresh the UI
  const updateFullName = async () => {
    if (!fullName.trim()) {
      setMessage('Full name cannot be empty');
      return false;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await updateUserFullName(fullName);
      setMessage(result.message);
      
      if (result.success) {
        // Refresh the entire page's data to show updated name
        router.refresh();
        return true;
      }
      return false;
    } catch (error) {
      setMessage('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    fullName,
    setFullName,
    updateFullName,
    loading,
    message,
  };
}