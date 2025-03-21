'use client';

interface DeleteModalProps {
    isOpen: boolean;
    close: () => void;
    onConfirm: () => void;
    label: string;
    children: React.ReactNode;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ isOpen, close, onConfirm, label, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg w-[90%] max-w-md p-6">
                <h2 className="text-xl font-semibold mb-4">{label}</h2>
                <div className="mb-4">{children}</div>
                <div className="flex justify-end gap-4">
                    <button
                        onClick={close}
                        className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                    >
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
