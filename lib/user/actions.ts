'use server';

import { createClient } from '@/utils/supabase/server';

// Update user's full name in Supabase auth user_metadata
export async function updateUserFullName(fullName: string) {
  const supabase = await createClient();

  try {
    // Ensure user is authenticated
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      throw new Error('User not authenticated');
    }

    // Update full_name in user_metadata
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (error) {
      throw new Error(error.message);
    }

    return { success: true, message: 'Full name updated successfully' };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update full name',
    };
  }
}

// Change the authenticated user's password after verifying the old password
export async function changeUserPassword(oldPassword: string, newPassword: string) {
    const supabase = await createClient();
  
    try {
      // Ensure user is authenticated
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user || !user.email) {
        throw new Error('User not authenticated');
      }
  
      // Verify old password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: oldPassword,
      });
      if (signInError) {
        throw new Error('Incorrect old password');
      }
  
      // Basic password validation for new password
      if (newPassword.length < 8) {
        throw new Error('New password must be at least 8 characters long');
      }
  
      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });
  
      if (error) {
        throw new Error(error.message);
      }
  
      return { success: true, message: 'Password updated successfully' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to update password',
      };
    }
  }