interface SuccessModalProps {
    message: string;
    onClose: () => void;
    isVisible: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ message, onClose, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                <h2 className="text-xl font-semibold mb-4">Success</h2>
                <p className="mb-4">{message}</p>
                <div className="flex justify-end">
                    <button onClick={onClose} className="py-2 px-4 bg-green-500 text-white rounded">
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
