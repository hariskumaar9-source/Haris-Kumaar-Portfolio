import {
  Component,
  useState,
  useEffect,
  type ComponentType,
  type ErrorInfo,
  type ReactNode,
} from 'react';

export interface ErrorFallbackProps {
  error: Error;
  resetError: () => void;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  FallbackComponent?: ComponentType<ErrorFallbackProps>;
  /** Changing this clears a caught error. Pass the route to recover on navigation. */
  resetKey?: unknown;
}

interface ErrorBoundaryState {
  error: Error | null;
}

function toError(value: unknown): Error {
  if (value instanceof Error) {
    return value;
  }
  if (typeof value === 'string') {
    return new Error(value);
  }
  try {
    return new Error(JSON.stringify(value));
  } catch {
    return new Error(String(value));
  }
}

function DefaultFallback({ error, resetError }: ErrorFallbackProps) {
  const [countdown, setCountdown] = useState(2);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(timer);
          resetError();
          return 0;
        }
        return c - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [resetError]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 select-none font-mono">
      <div className="max-w-md w-full rounded border-4 border-black bg-[#ededed] p-4 sm:p-5 shadow-[8px_8px_0px_#000] text-black">
        {/* Macintosh Alert Header */}
        <div className="flex items-center gap-2 border-b-2 border-black pb-2 mb-3">
          <span className="text-xl">🤖</span>
          <div>
            <h2 className="text-xs sm:text-sm font-black uppercase tracking-tight text-black">
              DeviceAI Sentinel · Auto-Rectification
            </h2>
            <p className="text-[10px] text-neutral-600 font-bold">HarisOS Runtime Self-Healing Active</p>
          </div>
        </div>

        <p className="text-xs font-bold leading-relaxed text-black/90">
          A runtime component anomaly was intercepted. The DeviceAI Agent is auto-rectifying layout bounds and restoring your OS session.
        </p>

        <div className="mt-3 p-2 rounded border border-black bg-black text-[#d8ee57] text-[10px] space-y-1">
          <div className="flex items-center justify-between font-bold">
            <span>DIAGNOSTIC STATUS:</span>
            <span className="text-[#39e658]">AUTO-HEALING ({countdown}s)</span>
          </div>
          <div className="truncate text-[9px] text-neutral-400">
            {error?.message || 'Component hook synchronization adjusted.'}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => {
              window.location.reload();
            }}
            className="rounded border border-black bg-white px-3 py-1.5 text-xs font-bold hover:bg-black hover:text-white cursor-pointer shadow-[2px_2px_0px_#000]"
          >
            Reload MockOS
          </button>
          <button
            type="button"
            onClick={resetError}
            className="rounded border-2 border-black bg-[#d8ee57] px-4 py-1.5 text-xs font-bold text-black hover:bg-[#cbe348] cursor-pointer shadow-[2px_2px_0px_#000]"
          >
            Self-Heal Now ({countdown}s)
          </button>
        </div>
      </div>
    </div>
  );
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = { error: null };

  static getDerivedStateFromError(error: unknown): ErrorBoundaryState {
    return { error: toError(error) };
  }

  componentDidCatch(error: unknown, info: ErrorInfo): void {
    console.error(
      'ErrorBoundary caught an error:',
      toError(error),
      info.componentStack,
    );
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps): void {
    if (
      this.state.error !== null &&
      prevProps.resetKey !== this.props.resetKey
    ) {
      this.resetError();
    }
  }

  resetError = (): void => {
    this.setState({ error: null });
  };

  render(): ReactNode {
    const { error } = this.state;
    if (error === null) {
      return this.props.children;
    }
    const Fallback = this.props.FallbackComponent ?? DefaultFallback;
    return <Fallback error={error} resetError={this.resetError} />;
  }
}
