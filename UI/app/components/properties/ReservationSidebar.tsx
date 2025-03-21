'use client';

import { useState, useEffect } from 'react';
import { Range } from 'react-date-range';
import { differenceInDays, eachDayOfInterval, format } from 'date-fns';
import DatePicker from '../forms/Calendar';
import apiService from '@/app/services/apiService';
import useLoginModal from '@/app/hooks/useLoginModal';
import { setInfants, Infants } from 'infant'

const initialDateRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
}

export type Property = {
    id: string;
    guests: number;
    price_per_night: number;
}

interface ReservationSidebarProps {
    userId: string | null,
    property: Property
}

const ReservationSidebar: React.FC<ReservationSidebarProps> = ({
    property,
    userId
}) => {
    const loginModal = useLoginModal();

    const [fee, setFee] = useState<number>(0);
    const [nights, setNights] = useState<number>(1);
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [dateRange, setDateRange] = useState<Range>(initialDateRange);
    const [minDate, setMinDate] = useState<Date>(new Date());
    const [bookedDates, setBookedDates] = useState<Date[]>([]);
    const [guests, setGuests] = useState<string>('1');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Trạng thái cho modal
    const guestsRange = Array.from({ length: property.guests }, (_, index) => index + 1);

    const performBooking = async () => {

        if (userId) {
            if (dateRange.startDate && dateRange.endDate) {
                const formData = new FormData();
                formData.append('guests', guests);
                formData.append('start_date', format(dateRange.startDate, 'yyyy-MM-dd'));
                formData.append('end_date', format(dateRange.endDate, 'yyyy-MM-dd'));
                formData.append('number_of_nights', nights.toString());
                formData.append('total_price', totalPrice.toString());

                const response = await apiService.post(`/api/properties/${property.id}/book/`, formData);

                if (response.success) {
                    console.log('Booking successful');
                    window.open(response.payment_url, '_blank');
                } else {
                    console.log('Something went wrong...');
                }
            }
        } else {
            loginModal.open();
        }
    }

    const _setDateRange = (selection: any) => {
        const newStartDate = new Date(selection.startDate);
        const newEndDate = new Date(selection.endDate);

        if (newEndDate <= newStartDate) {
            newEndDate.setDate(newStartDate.getDate() + 1);
        }

        setDateRange({
            ...dateRange,
            startDate: newStartDate,
            endDate: newEndDate
        });
    }

    const getReservations = async () => {
        const reservations = await apiService.get(`/api/properties/${property.id}/reservations/`);

        let dates: Date[] = [];

        reservations.forEach((reservation: any) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.start_date),
                end: new Date(reservation.end_date)
            });

            dates = [...dates, ...range];
        });

        setBookedDates(dates);
    }

    useEffect(() => {
        getReservations();

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInDays(
                dateRange.endDate,
                dateRange.startDate
            );

            if (dayCount && property.price_per_night) {
                const _fee = ((dayCount * property.price_per_night) / 100) * 5;

                setFee(_fee);
                setTotalPrice((dayCount * property.price_per_night) + _fee);
                setNights(dayCount);
            } else {
                const _fee = (property.price_per_night / 100) * 5;

                setFee(_fee);
                setTotalPrice(property.price_per_night + _fee);
                setNights(1);
            }
        }
    }, [dateRange]);

    return (
        <aside className="mt-6 p-8 col-span-2 rounded-xl border border-gray-300 shadow-xl">
            <DatePicker
                value={dateRange}
                bookedDates={bookedDates}
                onChange={(value) => _setDateRange(value.selection)}
            />

            <div className="mb-4 mg-4 flex flex-col justify-between align-center">
                <p className="font-bold">Selected Dates</p>
                <div className="flex justify-between mt-2">
                    <p>Check-in:</p>
                    <p>{format(dateRange.startDate, 'dd/MM/yyyy')}</p>
                </div>
                <div className="flex justify-between mt-2">
                    <p>Check-out:</p>
                    <p>{format(dateRange.endDate, 'dd/MM/yyyy')}</p>
                </div>
            </div>
            <hr />

            {/* <div className="mb-6 mt-4 p-3 border border-gray-400 rounded-xl">
                <label className="mb-2 block font-bold text-xs">Guests</label>
                <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full -ml-1 text-xm"
                >
                    {guestsRange.map(number => (
                        <option key={number} value={number}>{number}</option>
                    ))}
                </select>
            </div> */}


            <div className="p-2 border-gray-400 rounded-2xl">
                <label className="block font-bold text-l text-center flex-grow mb-5">Guests</label>
                <div className=" flex items-center justify-between">
                    <div className=" flex items-center space-x-3">
                        <button
                            onClick={() => setGuests(Math.max(guests - 1, 1))}
                            className="w-12 h-12 flex items-center justify-center text-xl border border-gray-300 rounded-full bg-white hover:bg-gray-200"
                        >
                            -
                        </button>
                        <input
                            type="number"
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="w-20 text-center text-xl border-none no-arrows"
                            min="1"
                            max={guestsRange[guestsRange.length - 1]}
                        />
                        <button
                            onClick={() => setGuests(Math.min(guests + 1, guestsRange[guestsRange.length - 1]))}
                            className="w-12 h-12 flex items-center justify-center text-xl border border-gray-300 rounded-full bg-white hover:bg-gray-200"
                        >
                            +
                        </button>
                    </div>
                    <p className=" text-l text-gray-500">Maximum: {guestsRange[guestsRange.length - 1]}</p>
                </div>
            </div>



            <style jsx>{`
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        -moz-appearance: textfield;
    }
`}</style>




            <style jsx>{`
    input[type=number]::-webkit-outer-spin-button,
    input[type=number]::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
    input[type=number] {
        -moz-appearance: textfield;
    }
`}</style>


            <hr />




            <div className="mt-6 mb-4 flex justify-between align-center">
                <p>{property.price_per_night.toLocaleString('vi-VN')} VNĐ * {nights} nights</p>
                <p>{(property.price_per_night * nights).toLocaleString('vi-VN')} VNĐ</p>
            </div>

            <div className="mb-4 flex justify-between align-center">
                <p>Fee</p>
                <p>{fee.toLocaleString('vi-VN')} VNĐ</p>
            </div>

            <hr />

            <div className="mb-4 mt-4 flex justify-between align-center font-bold">
                <p>Total</p>
                <p>{totalPrice.toLocaleString('vi-VN')} VNĐ</p>
            </div>

            <hr />

            <div
                onClick={performBooking}
                className="mt-5 w-full mb-6 py-6 text-center text-white bg-airbnb hover:bg-airbnb-dark rounded-xl cursor-pointer"
            >
                Book
            </div>
        </aside>
    );
}

export default ReservationSidebar;