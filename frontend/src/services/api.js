// API service for communicating with FastAPI backend
const API_BASE_URL = '/api';

export const activitiesAPI = {
  // Get all activities
  async getActivities() {
    try {
      const response = await fetch(`${API_BASE_URL}/activities`);
      if (!response.ok) {
        throw new Error('Failed to fetch activities');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching activities:', error);
      throw error;
    }
  },

  // Sign up for an activity
  async signUp(activityName, email) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/activities/${encodeURIComponent(activityName)}/signup?email=${encodeURIComponent(email)}`,
        {
          method: 'POST',
        }
      );
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.detail || 'Failed to sign up');
      }
      
      return result;
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  },

  // Unregister from an activity
  async unregister(activityName, email) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/activities/${encodeURIComponent(activityName)}/unregister?email=${encodeURIComponent(email)}`,
        {
          method: 'DELETE',
        }
      );
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.detail || 'Failed to unregister');
      }
      
      return result;
    } catch (error) {
      console.error('Error unregistering:', error);
      throw error;
    }
  }
};
