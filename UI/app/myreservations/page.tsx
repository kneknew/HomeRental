"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import apiService from "../services/apiService";
import Link from "next/link";
import CancelButton from "./CancelButton";

const MyReservationsPage = () => {
    const [reservations, setReservations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchReservations = async () => {
        try {
            setIsLoading(true);
            const data = await apiService.get('/api/auth/myreservations/');
            setReservations(data);
        } catch (error) {
            console.error("Failed to fetch reservations:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchReservations();
    }, []);

    if (isLoading) {
        return <p>Loading reservations...</p>;
    }

    if (reservations.length === 0) {
        return <p>You have no reservations.</p>;
    }

    return (
        <main className="max-w-[1500px] mx-auto px-6 pb-6">
            <h1 className="my-6 text-2xl">My reservations</h1>

            <div className="space-y-4">
                {reservations.map((reservation) => (
                    <div
                        key={reservation.id}
                        className="p-5 grid grid-cols-1 md:grid-cols-4 gap-4 shadow-md border border-gray-300 rounded-xl"
                    >
                        <div className="col-span-1">
                            <div className="relative overflow-hidden aspect-square rounded-xl">
                                <Image
                                    fill
                                    src={reservation.property.image_url}
                                    className="hover:scale-110 object-cover transition h-full w-full"
                                    alt="Beach house"
                                />
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-3 flex flex-col justify-between">
                            <div>
                                <h2 className="mb-4 text-xl">{reservation.property.title}</h2>

                                <p className="mb-2"><strong>Check in date:</strong> {reservation.start_date}</p>
                                <p className="mb-2"><strong>Check out date:</strong> {reservation.end_date}</p>

                                <p className="mb-2"><strong>Number of nights:</strong> {reservation.number_of_nights}</p>
                                <p className="mb-2"><strong>Total price:</strong> {reservation.total_price.toLocaleString('vi-VN')} VNĐ</p>
                                <p
                                    className={`inline-block cursor-pointer py-0.5 px-2 text-[11px] font-semibold rounded-md text-white ${
                                        reservation.status === "PENDING"
                                            ? "bg-yellow-500"
                                            : reservation.status === "PAID"
                                            ? "bg-green-500"
                                            : "bg-red-500"
                                    }`}
                                >
                                    {reservation.status.charAt(0).toUpperCase() + reservation.status.slice(1).toLowerCase()}
                                </p>

                            </div>
                            <div className="flex gap-3">
                                <Link
                                    href={`/properties/${reservation.property.id}`}
                                    className="mt-6 inline-block cursor-pointer py-4 px-6 bg-sky-500 text-white rounded-xl"
                                >
                                    Details
                                </Link>

                                {(reservation.status !== "CANCELLED" && reservation.status !== "PAID") && (
                                    <CancelButton
                                        reservationId={reservation.id}
                                        refreshReservations={fetchReservations}
                                    />
                                )}

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
};

export default MyReservationsPage;
