// SuccessBookingModal.tsx
import React from 'react';

interface SuccessBookingModalProps {
    onClose: () => void;
}

const SuccessBookingModal: React.FC<SuccessBookingModalProps> = ({ onClose }) => {
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Booking Successful!</h2>
                <p>Your booking has been successfully completed.</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default SuccessBookingModal;