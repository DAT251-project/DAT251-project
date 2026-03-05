'use client';

import {useState} from "react";
import BookingDetailsForm from "@/app/booking/BookingDetailsForm";
import {BookingFormOutput, BookingSchema} from "@/app/booking/FormTypes";
import CustomerDetailsForm from "@/app/booking/CustomerDetailsForm";

export default function Page () {
    const [formState, setFormState] = useState<Partial<BookingSchema>>({});
    const [showBookingForm, setShowBookingForm] = useState(true);

    console.log(formState)

    const handleBookingState = (data: BookingFormOutput) => {
        setFormState(prevState => ({
            ...prevState,
            ...data,
        }));
        setShowBookingForm(false);
    }

    return (<>
            {showBookingForm ?
                <BookingDetailsForm setBookingDetails={handleBookingState}/> :
                <CustomerDetailsForm setCustomerDetails={handleBookingState}/>
            }
    </>
    );
}