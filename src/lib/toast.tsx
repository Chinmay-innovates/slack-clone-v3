import toast, { ToastOptions } from 'react-hot-toast';
import { CheckCircle, XCircle, Loader2, Info, AlertTriangle, X } from 'lucide-react';
import clsx from 'clsx';
import React from 'react';

type ToastStatus = 'success' | 'error' | 'loading' | 'info' | 'warning';

interface ToastMessage {
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  dismissible?: boolean;
  duration?: number;
  icon?: React.ReactNode;
}

interface EnhancedToastOptions extends ToastOptions {
  sound?: boolean;
  vibrate?: boolean;
  persist?: boolean;
  className?: string;
  theme?: 'dark' | 'light' | 'system';
}

const baseOptions: ToastOptions = {
  duration: 4000,
  position: 'top-right',
  style: {
    borderRadius: '12px',
    padding: '0px',
    background: 'transparent',
    boxShadow: 'none',
    border: 'none',
  },
};

const iconMap = {
  success: <CheckCircle className="text-green-400 w-5 h-5" />,
  error: <XCircle className="text-red-400 w-5 h-5" />,
  loading: <Loader2 className="animate-spin text-yellow-400 w-5 h-5" />,
  info: <Info className="text-blue-400 w-5 h-5" />,
  warning: <AlertTriangle className="text-orange-400 w-5 h-5" />,
};

const statusConfig = {
  success: {
    bg: 'bg-neutral-800/90 border border-green-400/20',
    progressBar: 'bg-green-200',
    glow: 'shadow-[0_0_12px_rgba(34,197,94,0.08)]',
    accent: 'bg-green-500',
  },
  error: {
    bg: 'bg-red-900/20 border-red-500/30',
    progressBar: 'bg-red-400',
    glow: 'shadow-red-400/20',
    accent: 'bg-red-400',
  },
  loading: {
    bg: 'bg-yellow-900/20 border-yellow-500/30',
    progressBar: 'bg-yellow-400',
    glow: 'shadow-yellow-400/20',
    accent: 'bg-yellow-400',
  },
  info: {
    bg: 'bg-blue-900/20 border-blue-500/30',
    progressBar: 'bg-blue-400',
    glow: 'shadow-blue-400/20',
    accent: 'bg-blue-400',
  },
  warning: {
    bg: 'bg-orange-900/20 border-orange-500/30',
    progressBar: 'bg-orange-400',
    glow: 'shadow-orange-400/20',
    accent: 'bg-orange-400',
  },
};

// Sound effects
const playSound = (type: ToastStatus) => {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Different frequencies for different toast types
    const frequencies = {
      success: [523.25, 659.25, 783.99], // C5, E5, G5
      error: [392.0, 329.63], // G4, E4
      warning: [440.0, 493.88], // A4, B4
      info: [523.25, 659.25], // C5, E5
      loading: [440.0], // A4
    };

    const freq = frequencies[type] || [440.0];
    oscillator.frequency.setValueAtTime(freq[0], audioContext.currentTime);

    // Create a pleasant chord progression
    freq.forEach((f, i) => {
      oscillator.frequency.setValueAtTime(f, audioContext.currentTime + i * 0.1);
    });

    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  }
};

// Vibration patterns
const vibratePattern = (type: ToastStatus) => {
  if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
    const patterns = {
      success: [100, 50, 100],
      error: [200, 100, 200],
      warning: [150, 75, 150],
      info: [100],
      loading: [50, 50, 50],
    };

    navigator.vibrate(patterns[type] || [100]);
  }
};

// Custom toast component
const ToastComponent: React.FC<{
  status: ToastStatus;
  msg: ToastMessage;
  toastId: string;
  duration?: number;
  theme?: 'dark' | 'light' | 'system';
}> = ({ status, msg, toastId, duration = 4000, theme = 'dark' }) => {
  const [progress, setProgress] = React.useState(100);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = React.useRef<number>(Date.now());
  const pausedTimeRef = React.useRef<number>(0);

  const config = statusConfig[status];
  const isDark =
    theme === 'dark' ||
    (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  React.useEffect(() => {
    if (status === 'loading' || duration === Infinity) return;

    const updateProgress = () => {
      if (isPaused) return;

      const elapsed = Date.now() - startTimeRef.current - pausedTimeRef.current;
      const remaining = Math.max(0, duration - elapsed);
      const progressPercent = (remaining / duration) * 100;

      setProgress(progressPercent);

      if (remaining <= 0) {
        toast.dismiss(toastId);
      }
    };

    intervalRef.current = setInterval(updateProgress, 50);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [duration, isPaused, status, toastId]);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isPaused) {
      setIsPaused(true);
      pausedTimeRef.current += Date.now() - startTimeRef.current;
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (isPaused) {
      setIsPaused(false);
      startTimeRef.current = Date.now();
    }
  };

  const handleDismiss = () => {
    toast.dismiss(toastId);
  };

  const handleAction = () => {
    if (msg.action?.onClick) {
      msg.action.onClick();
      toast.dismiss(toastId);
    }
  };

  return (
    <div
      className={clsx(
        'relative flex items-start gap-3 p-4 rounded-xl shadow-2xl backdrop-blur-xl transition-all duration-300 w-[380px] max-w-md',
        'border transform-gpu',
        config.bg,
        config.glow,
        isDark ? 'bg-gray-900/90 text-white' : 'bg-white/90 text-gray-900',
        isHovered && 'scale-102 shadow-3xl',
        'animate-in slide-in-from-right-full duration-300',
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Accent bar */}
      <div className={clsx('absolute left-0 top-0 w-1 h-full rounded-l-xl', config.accent)} />

      {/* Progress bar */}
      {status !== 'loading' && duration !== Infinity && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200/20 rounded-b-xl overflow-hidden">
          <div
            className={clsx('h-full transition-all duration-100 ease-linear', config.progressBar)}
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* Icon */}
      <div className="flex-shrink-0 mt-0.5">{msg.icon || iconMap[status]}</div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="font-semibold text-sm leading-tight">{msg.title}</p>
            {msg.description && (
              <p
                className={clsx(
                  'text-xs mt-1 leading-relaxed opacity-80',
                  isDark ? 'text-gray-300' : 'text-gray-600',
                )}
              >
                {msg.description}
              </p>
            )}
          </div>

          {/* Dismiss button */}
          {msg.dismissible !== false && (
            <button
              onClick={handleDismiss}
              className={clsx(
                'ml-2 p-1 rounded-md transition-colors duration-200 hover:bg-gray-500/20',
                'focus:outline-none focus:ring-2 focus:ring-gray-400/50',
              )}
            >
              <X className="w-4 h-4 opacity-60 hover:opacity-100" />
            </button>
          )}
        </div>

        {/* Action button */}
        {msg.action && (
          <button
            onClick={handleAction}
            className={clsx(
              'mt-3 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200',
              'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30',
              'focus:outline-none focus:ring-2 focus:ring-white/50',
            )}
          >
            {msg.action.label}
          </button>
        )}
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 rounded-xl overflow-hidden pointer-events-none">
        <div
          className={clsx(
            'absolute inset-0 opacity-5',
            status === 'success' && 'bg-gradient-to-r from-green-500/10 to-green-300/10',
            status === 'error' && 'bg-gradient-to-r from-red-400 to-pink-400',
            status === 'warning' && 'bg-gradient-to-r from-orange-400 to-yellow-400',
            status === 'info' && 'bg-gradient-to-r from-blue-400 to-cyan-400',
            status === 'loading' && 'bg-gradient-to-r from-yellow-400 to-orange-400',
          )}
        />
      </div>
    </div>
  );
};

// Enhanced toast function
export const showToast = (
  status: ToastStatus,
  msg: ToastMessage,
  options: EnhancedToastOptions = {},
) => {
  const {
    sound = true,
    vibrate = false,
    persist = false,
    duration = msg.duration || 4000,
    theme = 'dark',
    ...toastOptions
  } = options;

  // Play sound if enabled
  if (sound) {
    playSound(status);
  }

  // Vibrate if enabled
  if (vibrate) {
    vibratePattern(status);
  }

  const finalDuration = persist ? Infinity : duration;

  return toast.custom(
    (t) => (
      <ToastComponent
        status={status}
        msg={msg}
        toastId={t.id}
        duration={finalDuration}
        theme={theme}
      />
    ),
    {
      ...baseOptions,
      duration: finalDuration,
      ...toastOptions,
    },
  );
};

// Convenience functions
export const toast_success = (
  title: string,
  description?: string,
  options?: EnhancedToastOptions,
) => showToast('success', { title, description }, options);

export const toast_error = (title: string, description?: string, options?: EnhancedToastOptions) =>
  showToast('error', { title, description }, options);

export const toast_warning = (
  title: string,
  description?: string,
  options?: EnhancedToastOptions,
) => showToast('warning', { title, description }, options);

export const toast_info = (title: string, description?: string, options?: EnhancedToastOptions) =>
  showToast('info', { title, description }, options);

export const toast_loading = (
  title: string,
  description?: string,
  options?: EnhancedToastOptions,
) => showToast('loading', { title, description }, options);

// Promise toast
export const toast_promise = async <T,>(
  promise: Promise<T>,
  messages: {
    loading: ToastMessage;
    success: ToastMessage | ((data: T) => ToastMessage);
    error: ToastMessage | ((error: any) => ToastMessage);
  },
  options: EnhancedToastOptions = {},
) => {
  const loadingToast = showToast('loading', messages.loading, { ...options, duration: Infinity });

  try {
    const data_1 = await promise;
    toast.dismiss(loadingToast);
    const successMsg =
      typeof messages.success === 'function' ? messages.success(data_1) : messages.success;
    return showToast('success', successMsg, options);
  } catch (error_1) {
    toast.dismiss(loadingToast);
    const errorMsg =
      typeof messages.error === 'function' ? messages.error(error_1) : messages.error;
    return showToast('error', errorMsg, options);
  }
};

// Batch toast
export const toast_batch = (
  toasts: Array<{
    status: ToastStatus;
    msg: ToastMessage;
    delay?: number;
    options?: EnhancedToastOptions;
  }>,
) => {
  toasts.forEach(({ status, msg, delay = 0, options = {} }, index) => {
    setTimeout(() => {
      showToast(status, msg, options);
    }, delay + index * 150); // Stagger by 150ms
  });
};

// Usage Examples:
/*
// Basic usage
toast_success('Success!', 'Your action was completed successfully');
toast_error('Error!', 'Something went wrong. Please try again.');

// With action button
showToast('success', {
  title: 'File uploaded',
  description: 'Your file has been uploaded successfully',
  action: {
    label: 'View File',
    onClick: () => window.open('/files/document.pdf')
  }
}, { sound: true, vibrate: true });

// Promise handling
toast_promise(
  fetch('/api/data'),
  {
    loading: { title: 'Loading...', description: 'Fetching your data' },
    success: { title: 'Success!', description: 'Data loaded successfully' },
    error: { title: 'Error!', description: 'Failed to load data' }
  },
  { sound: true, theme: 'dark' }
);

// Batch notifications
toast_batch([
  { status: 'info', msg: { title: 'Step 1', description: 'Initializing...' } },
  { status: 'success', msg: { title: 'Step 2', description: 'Processing...' }, delay: 1000 },
  { status: 'success', msg: { title: 'Complete!', description: 'All done!' }, delay: 2000 }
]);

// Persistent toast
showToast('warning', {
  title: 'Important Notice',
  description: 'This message will stay until dismissed',
  dismissible: true
}, { persist: true });
*/
