'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

/**
 * ErrorBoundary component to catch JavaScript errors anywhere in the child component tree
 * and display a fallback UI instead of crashing the whole app
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  // Static method to update state when an error occurs
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  // Log error information when it occurs
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error);
    console.error('Component stack:', errorInfo.componentStack);
  }

  // Reset the error state when trying again
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    // If there's an error, show the fallback UI or default error message
    if (this.state.hasError) {
      // Use custom fallback if provided, otherwise show default error message
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="p-6 bg-red-900/80 text-white rounded-lg shadow-lg max-w-lg mx-auto my-8">
          <h2 className="text-xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">
            An error occurred while rendering this component. This might be due to browser restrictions or a temporary issue.
          </p>
          {this.state.error && (
            <div className="bg-red-950 p-3 rounded mb-4 overflow-auto max-h-32">
              <p className="text-red-300 text-sm font-mono">{this.state.error.toString()}</p>
            </div>
          )}
          <button
            onClick={this.resetErrorBoundary}
            className="px-4 py-2 bg-red-700 hover:bg-red-600 text-white rounded transition-colors"
          >
            Try again
          </button>
        </div>
      );
    }

    // If no error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
