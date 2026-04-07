import React from "react";

export default function BookingDeleted({email, isError}:{email:string, isError:boolean}){
    return <>
        {/*Error message if deleting booking fails*/}
        <div aria-live={"polite"}>
            {isError && <h1 className={"md:text-xl text-center"}>Noe gikk galt ved sletting av booking. Vennligst prøv på nytt.</h1>}
        </div>
        {!isError && <div className={"flex flex-col items-center gap-5 text-lg max-w-2/3 w-full text-center"}>
                <h1 className={"text-2xl uppercase"}>Booking slettet</h1>
                <p>Bekreftelse for slettet booking ble sendt til <span className={"font-bold"}>{email}</span></p>
            </div>}
    </>
}