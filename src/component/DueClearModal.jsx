const DueClearModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "" : "hidden"
      }`}
    >
      {/* <div className="modal-overlay" onClick={onClose}></div> */}

      <div className="modal-box  bg-slate-50 w-[450px]  mx-auto rounded-md shadow-lg z-50">
        <div className="modal-header">
          <div>
            <form method="dialog">
              <button
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-[25px]"
              >
                ✕
              </button>
            </form>
          </div>

          <div className="w-52 bg-red-500">
            <h1 className="text-center text-2xl">Please Pay Now</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DueClearModal;
