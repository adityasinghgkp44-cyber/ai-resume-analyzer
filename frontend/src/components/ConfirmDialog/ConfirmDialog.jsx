import "./ConfirmDialog.css";

import { AlertTriangle } from "lucide-react";

function ConfirmDialog({
  isOpen,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">

      <div className="dialog-box">

        <AlertTriangle
          size={70}
          className="dialog-icon"
        />

        <h2>{title}</h2>

        <p>{message}</p>

        <div className="dialog-buttons">

          <button
            className="cancel-btn"
            onClick={onCancel}
          >
            {cancelText}
          </button>

          <button
            className="confirm-btn"
            onClick={onConfirm}
          >
            {confirmText}
          </button>

        </div>

      </div>

    </div>
  );
}

export default ConfirmDialog;