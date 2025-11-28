import api from '@/lib/axios';
import { User, UpdateProfilePayload } from '@/types';

export interface ProfileResponse {
  user: User;
}

/**
 * Get the authenticated user's profile
 */
export async function getProfile(): Promise<User> {
  const response = await api.get<User>('/auth/me');
  return response.data;
}

/**
 * Update the authenticated user's profile
 */
export async function updateProfile(data: UpdateProfilePayload): Promise<User> {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
}

/**
 * Upload user avatar
 */
export async function uploadAvatar(file: File): Promise<User> {
  const formData = new FormData();
  formData.append('avatar', file);
  
  const response = await api.patch<User>('/users/me/avatar', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
}

/**
 * Remove user avatar
 */
export async function removeAvatar(): Promise<User> {
  const response = await api.delete<User>('/users/me/avatar');
  return response.data;
}

/**
 * Deactivate (soft delete) user account
 */
export async function deactivateAccount(): Promise<void> {
  await api.delete('/users/me');
}

export interface ProfileHistoryEntry {
  id: string;
  action: string;
  fieldName: string | null;
  oldValue: string | null;
  newValue: string | null;
  changedAt: string;
  ipAddress: string | null;
}

/**
 * Get profile change history for the authenticated user
 */
export async function getHistory(): Promise<ProfileHistoryEntry[]> {
  const response = await api.get<ProfileHistoryEntry[]>('/users/me/history');
  return response.data;
}

// Export as service object for consistency with other services
export const profileService = {
  getProfile,
  updateProfile,
  uploadAvatar,
  removeAvatar,
  deactivateAccount,
  getHistory,
};
