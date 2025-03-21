"use client";

import { useState } from "react";
import apiService from "../services/apiService";
import ConfirmModal from "../components/modals/ConfirmModal";
import SuccessModal from "../components/modals/SuccessModal";

interface CancelButtonProps {
    reservationId: string;
    refreshReservations: () => Promise<void>;
}

const CancelButton: React.FC<CancelButtonProps> = ({ reservationId, refreshReservations }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const handleCancel = async () => {
        if (isLoading) return;
        setIsLoading(true);

        try {
            const response = await apiService.get(`/api/properties/reservations/${reservationId}/cancel`);
            await refreshReservations();
            setIsSuccessModalVisible(true);
        } catch (error) {
            console.error("Error canceling reservation:", error);
            alert("An error occurred while canceling the reservation.");
        } finally {
            setIsLoading(false);
            setIsConfirmModalVisible(false);
        }
    };

    const showConfirmModal = () => {
        setIsConfirmModalVisible(true);
    };

    const hideConfirmModal = () => {
        setIsConfirmModalVisible(false);
    };

    const hideSuccessModal = () => {
        setIsSuccessModalVisible(false);
    };

    return (
        <>
            <div
                onClick={showConfirmModal}
                className={`mt-6 inline-block cursor-pointer py-4 px-6 bg-airbnb text-white rounded-xl ${
                    isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
            >
                {isLoading ? "Canceling..." : "Cancel"}
            </div>

            <ConfirmModal
                title="Confirm Cancellation"
                message="Are you sure you want to cancel this reservation?"
                onConfirm={handleCancel}
                onCancel={hideConfirmModal}
                isVisible={isConfirmModalVisible}
            />

            <SuccessModal
                message="Reservation canceled successfully!"
                onClose={hideSuccessModal}
                isVisible={isSuccessModalVisible}
            />
        </>
    );
};

export default CancelButton;
