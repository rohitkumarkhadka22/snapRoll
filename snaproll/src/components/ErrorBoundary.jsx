import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Uncaught application error", error, info);
    }
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <main className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
        <div className="max-w-md">
          <p className="text-xs tracking-[0.25em] text-white/40 uppercase">Something went wrong</p>
          <h1 className="mt-4 font-serif text-4xl">SnapRoll hit an unexpected error.</h1>
          <p className="mt-5 text-sm leading-6 text-white/50">
            Your browser data is safe. Refresh the page to try again.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-7 rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Refresh page
          </button>
        </div>
      </main>
    );
  }
}

export default ErrorBoundary;
