import React from "react";
import {TrashIcon} from "@heroicons/react/24/outline";
import {BookingSchemaType} from "@/app/(main)/booking/FormTypes";

export default function BookingConfirmed({data, isError, id, handleBookingDelete} : {data:BookingSchemaType, isError:boolean, id:string, handleBookingDelete: () => void}) {
    const timeStart:string = data?.time.slice(0,-3) || "";
    const maxHoursTime:number = 2
    // Add max hours time based on start time in correct format (hh:mm)
    const hours:number = Number(data?.time.slice(0, 2)) + maxHoursTime
    const minutes:string = data?.time.slice(2,5) || ""
    const timeEnd:string = hours.toString() + minutes || "";

    return (<>
        {/*Error message if finding booking fails*/}
        <div aria-live={"polite"}>
            {isError && <h1 className={"md:text-xl text-center"}>Kan ikke finne booking bekreftelse for booking med <span className={"font-bold"}>ID:{id}</span></h1>}
        </div>
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
                <button className={"border-2 border-red-800 bg-red-800 text-white py-2 px-3 rounded-md flex gap-2 transition-all hover:bg-custom-eggwhite hover:text-custom-red"}
                        onClick={handleBookingDelete}
                >
                    <TrashIcon className={"size-6"} aria-hidden={true}/>Slett reservasjon</button>
            </>
        }
    </>
    )
}