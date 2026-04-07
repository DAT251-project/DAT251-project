'use client'

import Container from "@/app/ui/Container";
import {useParams} from "next/navigation";
import useSingleBooking from "@/app/hooks/useSingleBooking";
import useBookingDelete from "@/app/hooks/useBookingDelete";
import Image from "next/image";
import React, {useState} from "react";
import BookingConfirmed from "@/app/(main)/booking/[id]/BookingConfirmed";
import BookingDeleted from "@/app/(main)/booking/[id]/BookingDeleted";

/**
 * Shows the confirmation page of a successful booking
 */
export default function Page(){
    const [isDeleted, setIsDeleted] = useState(false);
    const params = useParams();
    const id = params.id as string;

    const {data, isError, isPending} = useSingleBooking(id);

    const deleteHook = useBookingDelete();

    const handleBookingDelete = () => {
        deleteHook.mutate(id);
        setIsDeleted(true)
    }

    return (<section className={"bg-custom-eggwhite h-full"}>
        <Container style={"flex flex-col items-center px-5 py-20 2xl:py-30 gap-9"}>
            {/*Loading animation shown while fetching booking*/}
            <div aria-live={"polite"}>
                {isPending && <Image src={"/loading.gif"}
                                     alt={"loading animation while fetching booking"}
                                     width={500} height={240}
                                     unoptimized={true}/>}
            </div>
            {!isDeleted ?
                <BookingConfirmed data={data} isError={isError} id={id} handleBookingDelete={handleBookingDelete}/> :
                <BookingDeleted email={data.email} isError={deleteHook.isError}/>
            }
        </Container>
    </section>)
 }