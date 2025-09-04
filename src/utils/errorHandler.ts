/**
 * Global Error Handler
 * 
 * This utility sets up global error handlers to catch and handle uncaught errors
 * that might occur outside of React components, especially in sandboxed environments
 * where certain browser APIs might be restricted.
 */

// List of known error messages that we want to handle specially
const KNOWN_ERROR_PATTERNS = [
  {
    pattern: /Access to storage is not allowed from this context/i,
    friendly: "Browser storage access is restricted in this environment. This is common in sandboxed previews and certain browser contexts."
  },
  {
    pattern: /localStorage is not defined/i,
    friendly: "Browser storage is not available in this environment."
  }
];

/**
 * Initialize global error handlers
 */
export function initGlobalErrorHandlers() {
  // Only run in browser environment
  if (typeof window === 'undefined') return;

  // Handler for uncaught exceptions
  window.addEventListener('error', (event) => {
    console.warn('Global error caught:', event.error);
    
    // Check if this is a known error we want to handle specially
    const knownError = KNOWN_ERROR_PATTERNS.find(
      err => err.pattern.test(event.error?.message || event.message)
    );
    
    if (knownError) {
      console.info(`Handled known error: ${knownError.friendly}`);
      
      // For storage errors, we can create a notification
      if (event.error?.message?.includes('storage')) {
        createErrorNotification(knownError.friendly);
      }
      
      // Prevent the error from bubbling up further if it's a known error we can handle
      event.preventDefault();
      return false;
    }
  });

  // Handler for unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
    
    // Check if this is a known error we want to handle specially
    const knownError = KNOWN_ERROR_PATTERNS.find(
      err => err.pattern.test(event.reason?.message || '')
    );
    
    if (knownError) {
      console.info(`Handled known promise rejection: ${knownError.friendly}`);
      
      // For storage errors, we can create a notification
      if (event.reason?.message?.includes('storage')) {
        createErrorNotification(knownError.friendly);
      }
      
      // Prevent the error from bubbling up further
      event.preventDefault();
      return false;
    }
  });

  console.info('Global error handlers initialized');
}

/**
 * Create a temporary notification for errors
 */
function createErrorNotification(message: string) {
  // Only run in browser environment
  if (typeof document === 'undefined') return;
  
  // Create notification element
  const notification = document.createElement('div');
  notification.style.position = 'fixed';
  notification.style.bottom = '20px';
  notification.style.right = '20px';
  notification.style.backgroundColor = 'rgba(30, 27, 75, 0.9)';
  notification.style.color = 'white';
  notification.style.padding = '12px 16px';
  notification.style.borderRadius = '8px';
  notification.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  notification.style.zIndex = '9999';
  notification.style.maxWidth = '300px';
  notification.style.fontFamily = 'sans-serif';
  notification.style.fontSize = '14px';
  notification.style.borderLeft = '4px solid #8b5cf6';
  
  // Add content
  notification.innerHTML = `
    <div style="margin-bottom: 8px; font-weight: bold;">Notice</div>
    <div>${message}</div>
  `;
  
  // Add to document
  document.body.appendChild(notification);
  
  // Remove after 8 seconds
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transition = 'opacity 0.5s ease-out';
    
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 500);
  }, 8000);
}
