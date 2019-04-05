import React from "react";
import "./Modal.scss";
const MyModal = ({
  title,
  children,
  canCancel,
  canConfirm,
  onCancel,
  onConfirm,
  confirmText
}) => (
  <div className="modal">
    <header className="modal__header">
      <h1>{title}</h1>
    </header>
    <section className="modal__content">{children}</section>
    <section className="modal__actions">
      {canCancel && (
        <button className="btn" onClick={onCancel}>
          Cancel
        </button>
      )}
      {canConfirm && (
        <button className="btn" onClick={onConfirm}>
          {confirmText ? confirmText : "Confirm"}
        </button>
      )}
    </section>
  </div>
);

export default MyModal;
