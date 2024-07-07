import React, { ErrorInfo } from 'react';

class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    console.error('The error is caught in getDerivedStateFromError:', error);
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log('An error has occurred!', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <section>
          <h1>Oops. Something went wrong :c</h1>
          <p>
            In the application, an error has occurred. Please reload the page.
          </p>
        </section>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
