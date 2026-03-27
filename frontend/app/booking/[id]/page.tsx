'use client'

import Container from "@/app/ui/Container";
import {useParams} from "next/navigation";
import useSingleBooking from "@/app/hooks/useSingleBooking";

/**
 * Shows the confirmation page of a successful booking
 */
export default function Page(){
    const params = useParams();
    const id = params.id as string;

    const {data, isError} = useSingleBooking(id);

    const timeStart:string = data?.time.slice(0,-3) || "";
    const maxHoursTime:number = 2
    // Add max hours time based on start time in correct format (hh:mm)
    const hours:number = Number(data?.time.slice(0, 2)) + maxHoursTime
    const minutes:string = data?.time.slice(2,5) || ""
    const timeEnd:string = hours.toString() + minutes || "";

    return (<section className={"bg-custom-eggwhite h-full"}>
        <Container style={"flex flex-col items-center px-5 py-20 2xl:py-30 gap-9"}>
            {isError && <h1>Kan ikke finne booking bekreftelse for booking med <span className={"font-bold"}>ID:{id}</span></h1>}
            {data &&
               <>
                   <h1 className={"text-2xl uppercase"}>Booking bekreftet</h1>
                    <div className={"flex flex-col items-center gap-5 text-lg max-w-2/3 w-full text-center"}>
                        <p>Booking bekreftelse ble sendt til <span className={"font-bold"}>{data.email}</span></p>
                        <p>Antall gjester: <span className={"font-bold"}>{data.numberGuest}</span></p>
                        <p>Dato: <span className={"font-bold"}>{data.date.split("T")[0]}</span></p>
                        <p>Tid: <span className={"font-bold"}>{timeStart}-{timeEnd}</span></p>
                        <p>Telefonnummer: <span className={"font-bold"}>{data.phoneNumber}</span></p>
                        <p>Kommentar: <span>{data.comment}</span></p>
                    </div>
                </>
                }
        </Container>
    </section>)
 }