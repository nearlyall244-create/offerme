import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import './ToastContainer.css';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div id="toast-root-container" className="toast-container">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = '#10b981';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = '#ef4444';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = '#f59e0b';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = '#3b82f6';
        }

        return (
          <div
            key={toast.id}
            id={`toast-${toast.id}`}
            className={`toast-item ${toast.type}`}
          >
            <div className="toast-icon">
              <Icon size={20} color={iconColor} />
            </div>
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
            <button
              id={`toast-close-${toast.id}`}
              className="toast-close"
              onClick={() => removeToast(toast.id)}
              aria-label="Close notification"
            >
              <X size={16} />
            </button>
          </div>
        );
      })}
    </div>
  );
};
