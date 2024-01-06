const UnavailableModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-container  bg-[#c9302b] w-1/2 mx-auto rounded-md shadow-lg z-50">
        <div className="modal-header">
          <span className="modal-close" onClick={onClose}>
            &times;
          </span>
        </div>
        <div className="modal-body p-4">
          <h1 className="text-center text-3xl text-yellow-400 font-extrabold mb-4">Opps!</h1>
          <h1 className="text-center text-2xl font-bold text-white">Service is not Available</h1>

          {/* action */}

          <div className="modal-action ">
            <form method="dialog">
              <button
                className="btn btn-sm  bg-red-500 text-white hover:text-red-500"
                onClick={onClose}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnavailableModal;
