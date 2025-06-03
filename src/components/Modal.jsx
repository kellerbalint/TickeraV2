
function Modal({ isOpen, onClose, children }) {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 shadow-lg w-full max-w-md">
          {children}
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={onClose}
          >
            Bezárás
          </button>
        </div>
      </div>
    );
  }
  
  export default Modal;
  