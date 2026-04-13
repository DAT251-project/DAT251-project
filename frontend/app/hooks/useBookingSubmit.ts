import {useMutation} from "@tanstack/react-query";
import {BookingRequestType} from "@/app/(main)/booking/FormTypes";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useState} from "react";

/**
 * Custom hook to submit Booking form data to backend and change to confirmation page
 */
export default function useBookingSubmit() {
    const router = useRouter();
    const [isRedirecting, setIsRedirecting] = useState(false)

    const {mutate, isError, isPending, isSuccess} = useMutation({
        mutationFn: (formData: BookingRequestType) => {
            return axios.post("http://localhost:8080/booking", formData)
        },
        onSuccess: (data) => {
            setIsRedirecting(true)
            router.push(`/booking/${data.data.id}`);
        },
        onError: () => {
            setIsRedirecting(false)
        }
    })
    return {mutate, isError, isPending, isRedirecting};
}