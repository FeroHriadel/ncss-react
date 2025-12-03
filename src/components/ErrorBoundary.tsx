import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details to console
    console.error('ErrorBoundary caught an error:', error);
    console.error('Error Info:', errorInfo);
    console.error('Component Stack:', errorInfo.componentStack);

    // Update state with error info
    this.setState({
      error,
      errorInfo
    });

    // You can also log the error to an error reporting service here
    // Example: logErrorToService(error, errorInfo);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '2rem',
          maxWidth: '800px',
          margin: '2rem auto',
          border: '2px solid #ef4444',
          borderRadius: '0.5rem',
          backgroundColor: '#fef2f2'
        }}>
          <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>
            Something went wrong
          </h1>
          
          <details style={{ marginBottom: '1rem', cursor: 'pointer' }}>
            <summary style={{ 
              padding: '0.5rem', 
              backgroundColor: '#fee2e2', 
              borderRadius: '0.25rem',
              fontWeight: 'bold'
            }}>
              Error Details
            </summary>
            <div style={{ 
              marginTop: '0.5rem', 
              padding: '1rem', 
              backgroundColor: '#fff', 
              borderRadius: '0.25rem',
              border: '1px solid #fecaca'
            }}>
              <p style={{ marginBottom: '0.5rem' }}>
                <strong>Error:</strong> {this.state.error?.toString()}
              </p>
              {this.state.errorInfo && (
                <div>
                  <p style={{ marginBottom: '0.5rem' }}><strong>Component Stack:</strong></p>
                  <pre style={{ 
                    fontSize: '0.75rem', 
                    overflow: 'auto',
                    backgroundColor: '#f9fafb',
                    padding: '0.5rem',
                    borderRadius: '0.25rem'
                  }}>
                    {this.state.errorInfo.componentStack}
                  </pre>
                </div>
              )}
            </div>
          </details>

          <button
            onClick={this.handleReset}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#dc2626',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500',
              marginRight: '0.5rem'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#b91c1c'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#dc2626'}
          >
            Try Again
          </button>

          <button
            onClick={() => window.location.href = '/'}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#6b7280',
              color: 'white',
              border: 'none',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              fontWeight: '500'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#4b5563'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#6b7280'}
          >
            Go to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
