import {
  FiAlertTriangle,
  FiLoader,
  FiTrash2,
  FiX,
} from "react-icons/fi";

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title?: string;
  itemName?: string;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
}

const DeleteConfirmModal = ({
  isOpen,
  title = "Delete Course",
  itemName,
  isDeleting,
  onClose,
  onConfirm,
}: DeleteConfirmModalProps) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          if (!isDeleting) {
            onClose();
          }
        }
      }}
    >
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-[#D8D1CA] bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between px-5 pt-5 sm:px-6 sm:pt-6">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <FiAlertTriangle size={21} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[#2C2825]">
                {title}
              </h2>

              <p className="mt-1 text-xs text-[#8B8179]">
                This action cannot be undone.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            aria-label="Close confirmation"
            className="rounded-lg p-1.5 text-[#756D66] transition hover:bg-[#F7F5F2] disabled:opacity-50"
          >
            <FiX size={19} />
          </button>
        </div>

        {/* Content */}
        <div className="px-5 py-5 sm:px-6">
          <p className="text-sm leading-6 text-[#625B55]">
            Are you sure you want to permanently
            delete{" "}
            <span className="font-semibold text-[#2C2825]">
              {itemName || "this course"}
            </span>
            ?
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col-reverse gap-3 border-t border-[#D8D1CA] bg-[#FCFBFA] px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D8D1CA] bg-white px-4 py-2.5 text-sm font-semibold text-[#625B55] transition hover:bg-[#F7F5F2] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? (
              <>
                <FiLoader
                  size={17}
                  className="animate-spin"
                />
                Deleting...
              </>
            ) : (
              <>
                <FiTrash2 size={17} />
                Delete Permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
