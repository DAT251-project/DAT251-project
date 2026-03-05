'use client';

import {zodResolver} from "@hookform/resolvers/zod";
import {useForm, SubmitHandler} from "react-hook-form";
import clsx from "clsx";
import {BookingFormInput, BookingFormOutput, bookingDetails} from "@/app/booking/FormTypes";

const date = new Date();
const todayDate = date.toISOString().slice(0,10);
const times = ["13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00"];

export default function BookingDetailsForm({setBookingDetails}:{setBookingDetails: any}){
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        formState: { errors },
    } = useForm<BookingFormInput, any, BookingFormOutput>({
        resolver: zodResolver(bookingDetails)
    })

    const selectedTime = watch("time");

    const onSubmit: SubmitHandler<BookingFormOutput> = (data) => {
        console.log("FORM BOOKING DETAILS SUBMITTED")
        console.log(data)
        setBookingDetails(data)
    }

    console.log(getValues());
    console.log(errors);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"mt-10"}>
                <section className={"flex flex-col gap-3"}>
                    <div className={"mt-6 w-full max-w-100 m-auto"}>
                        <div className={"flex flex-col border-2 px-4 py-2 rounded-xs border-gray-400 w-full"}>
                            <label htmlFor="numberOfGuest">Gjester</label>
                            <select id="numberOfGuest" {...register("numberOfGuest")}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>
                        <div className={"w-full mt-2"}>
                            <div className={"flex flex-col border-2 px-4 py-2 mb-2 rounded-xs border-gray-400"}>
                                <label htmlFor="start">Velg dato</label>
                                <input type="date" id="start" min={todayDate} max="2050-12-31"{...register("date")}/>
                            </div>
                            {errors?.date && <span className={"text-red-800"}>Fyll inn dato</span>}
                        </div>
                    </div>
                    <div className={"flex flex-col items-center"}>
                        <label htmlFor="time" className={"font-bold text-2xl mt-6 mb-3"}>Velg tid</label>
                        <input id={"time"} {...register("time")} className={"hidden"}/>
                        {errors?.time && <span className={"text-red-800 mb-2"}>Velg et tidspunkt</span>}
                        <div className={"grid grid-cols-4 gap-1"}>
                            {times.map((time)=>(
                                    <button onClick={()=> setValue("time", time, {shouldValidate: true})} key={time} type={"button"}
                                            className={clsx(
                                                "p-4 rounded-xs border-2 bg-custom-green hover:bg-light-custom-green hover:border-light-custom-green",
                                                selectedTime == time ? "border-red" : "border-custom-green"
                                            )
                                            }>
                                        <p>{time}</p>
                                    </button>
                                )
                            )}
                        </div>
                    </div>
                    <div className={"flex justify-center mt-2"}>
                        <button type="submit">
                            Book
                        </button>
                    </div>
                </section>
        </form>
    )

}