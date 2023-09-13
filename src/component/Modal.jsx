

const Modal = ({ isOpen, onClose }) => {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end z-10 right-0 top-0 left-80">
      <div
        className="modal-top  max-w-5xl"
        onClick={onClose}
        style={{
          background: "rgba(0, 0, 0, 0.5)",
        }}
      ></div>
      <div className="modal-container bg-[#1653B2] w-96 mx-auto rounded-md text-white shadow-lg z-50">
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body p-4">
          {/* Your modal content goes here */}
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn" onClick={onClose}>
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
