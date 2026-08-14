import { FaExclamationTriangle } from "react-icons/fa";
import "../css/AdminDashboard.css";


function DeleteModal({ isOpen, onClose, onConfirm, productName }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content delete-modal" onClick={(e) => e.stopPropagation()}>
        <FaExclamationTriangle className="delete-icon" />
        <h3>Delete Product</h3>
        <p>
          Are you sure you want to delete <strong>"{productName}"</strong>?
          <br />
          <span className="text-danger">This action cannot be undone!</span>
        </p>

        <div className="form-actions">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="btn-delete"
            onClick={() => {
              onConfirm();
              onClose();
            }}
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;