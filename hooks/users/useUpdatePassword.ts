'use client';

import { useState } from 'react';
import { changeUserPassword } from '@/lib/user/actions';

export function useChangePassword() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Function to update the password
  const updatePassword = async () => {
    // Client-side validation
    if (!oldPassword.trim() || !newPassword.trim() || !confirmPassword.trim()) {
      setMessage('All password fields are required');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      setMessage('New password must be at least 8 characters long');
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const result = await changeUserPassword(oldPassword, newPassword);
      setMessage(result.message);
      if (result.success) {
        // Clear form on success
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch (error) {
      setMessage('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return {
    oldPassword,
    setOldPassword,
    newPassword,
    setNewPassword,
    confirmPassword,
    setConfirmPassword,
    updatePassword,
    loading,
    message,
  };
}