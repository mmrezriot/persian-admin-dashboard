// Session Management Service
export class SessionService {
  constructor() {
    this.SESSION_KEY = 'persian_admin_session';
    this.SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  }

  // Set session data
  setSession(userData) {
    const sessionData = {
      user: userData,
      timestamp: Date.now(),
      expiresAt: Date.now() + this.SESSION_DURATION
    };

    try {
      localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
      return true;
    } catch (error) {
      console.error('Error setting session:', error);
      return false;
    }
  }

  // Get session data
  getSession() {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;

      const parsed = JSON.parse(sessionData);
      
      // Check if session is expired
      if (Date.now() > parsed.expiresAt) {
        this.clearSession();
        return null;
      }

      return parsed.user;
    } catch (error) {
      console.error('Error getting session:', error);
      this.clearSession();
      return null;
    }
  }

  // Clear session
  clearSession() {
    try {
      localStorage.removeItem(this.SESSION_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing session:', error);
      return false;
    }
  }

  // Check if session is valid
  isSessionValid() {
    const session = this.getSession();
    return session !== null;
  }

  // Get remaining time in hours
  getRemainingTime() {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return 0;

      const parsed = JSON.parse(sessionData);
      const remaining = parsed.expiresAt - Date.now();
      
      if (remaining <= 0) {
        this.clearSession();
        return 0;
      }

      return Math.floor(remaining / (1000 * 60 * 60)); // hours
    } catch (error) {
      console.error('Error getting remaining time:', error);
      return 0;
    }
  }

  // Extend session
  extendSession() {
    const currentSession = this.getSession();
    if (currentSession) {
      return this.setSession(currentSession);
    }
    return false;
  }

  // Auto logout when session expires
  startSessionTimer(callback) {
    const checkSession = () => {
      if (!this.isSessionValid()) {
        if (callback) callback();
        return;
      }

      // Check every minute
      setTimeout(checkSession, 60000);
    };

    checkSession();
  }
}

// Create singleton instance
export const sessionService = new SessionService();
