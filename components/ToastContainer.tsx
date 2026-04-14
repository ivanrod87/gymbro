'use client';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContainerProps {
  toasts: ToastMessage[];
  removeToast: (id: string) => void;
}

export function ToastContainer({ toasts, removeToast }: ToastContainerProps) {
  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          onClick={() => removeToast(toast.id)}
          className="bg-emerald-700/85 text-white px-4 py-3 rounded-lg shadow-lg max-w-sm cursor-pointer hover:bg-emerald-800/85 transition-colors"
          style={{
            animation: 'fadeInSlow 0.5s ease-in-out forwards',
          }}
          onAnimationEnd={() => {
            setTimeout(() => {
              const element = document.getElementById(toast.id);
              if (element) {
                element.style.animation = 'fadeOutSlow 0.5s ease-in-out forwards';
                setTimeout(() => removeToast(toast.id), 500);
              }
            }, 3000);
          }}
          id={toast.id}
        >
          <p className="text-sm font-medium">{toast.message}</p>
        </div>
      ))}

      <style>{`
        @keyframes fadeInSlow {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeOutSlow {
          from {
            opacity: 1;
            transform: translateY(0);
          }
          to {
            opacity: 0;
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
}
