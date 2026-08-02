// Data synchronization utility for Local Storage across tabs

export const DataSync = {
  // Listen for storage changes across tabs
  initStorageSync: (callback) => {
    const handler = (e) => {
      if (e.key === 'students' || e.key === 'quizCategories' || e.key === 'quizAttempts' || e.key === 'activityLogs') {
        callback(e.key, e.newValue);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  },

  // Broadcast changes to other tabs
  broadcastChange: (key, data) => {
    try {
      // Use BroadcastChannel API if available
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('quiz_data_sync');
        channel.postMessage({ key, data });
        channel.close();
      } else {
        // Fallback: trigger storage event
        localStorage.setItem('_sync_trigger', Date.now().toString());
      }
    } catch (e) {
      // Fallback: trigger storage event
      try {
        localStorage.setItem('_sync_trigger', Date.now().toString());
      } catch (err) {
        // Silently fail - data will sync on page refresh
        console.warn('Data sync unavailable:', err);
      }
    }
  },

  // Listen for broadcast messages
  listenBroadcast: (callback) => {
    try {
      if (typeof BroadcastChannel !== 'undefined') {
        const channel = new BroadcastChannel('quiz_data_sync');
        channel.onmessage = (e) => {
          callback(e.data.key, e.data.data);
        };
        return () => {
          try {
            channel.close();
          } catch (e) {
            // Channel already closed
          }
        };
      }
    } catch (e) {
      console.warn('BroadcastChannel not available, using storage events');
    }
    
    // Fallback: listen to storage events
    const handler = (e) => {
      if (e.key === '_sync_trigger') {
        callback('sync', null);
      }
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  },

  // Force sync data
  syncData: () => {
    try {
      localStorage.setItem('_sync_trigger', Date.now().toString());
    } catch (e) {
      console.warn('Failed to trigger sync:', e);
    }
  }
};

export default DataSync;