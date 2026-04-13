import {SubmitHandler, useForm} from "react-hook-form";
import {bookingSchema, BookingSchemaType, TimeSlotExtendedType} from "@/app/(main)/booking/FormTypes";
import {zodResolver} from "@hookform/resolvers/zod";
import useBookingUpdate from "@/app/hooks/useBookingUpdate";
import {CountryCode, getCountries} from "libphonenumber-js";
import React, {useEffect} from "react";
import Image from "next/image";
import {ExclamationTriangleIcon} from "@heroicons/react/16/solid";
import {MAX_NUMBER_GUEST} from "@/app/(main)/booking/(formParts)/GuestsDetailsForm";
import {dateToString} from "@/app/utils/utils";
import {useTimeSlots} from "@/app/hooks/useTimeSlots";
import {ArrowLeftIcon} from "@heroicons/react/24/outline";

export default function BookingUpdate({data, handleUpdate}: {data:BookingSchemaType | undefined, handleUpdate: (value:boolean) => void}){
    const {
        register, handleSubmit, watch, reset, formState: { errors },
    } = useForm<BookingSchemaType>({
        resolver: zodResolver(bookingSchema),
        defaultValues:{
            ...data,
            countryCode: "NO"
        },
        mode: "onSubmit"
    })
    const chosenTimeSlot: string = watch("time");
    const bookingUpdate = useBookingUpdate();

    const onSubmit: SubmitHandler<BookingSchemaType> = async (data) => {
        // remove country code field because it's not part of Booking model
        const {countryCode, ...validRequestData} = data;
        try{
            await bookingUpdate.mutateAsync(validRequestData);
            handleUpdate(false)
        } catch (error){
            console.log(error);
        }
    }

    const COUNTRY_CODE_LIST: CountryCode[] = getCountries() || [];
    const NUMBER_GUESTS_LIST: number[] = Array.from({length: MAX_NUMBER_GUEST}, (_, index) => index + 1);
    const today = new Date();
    const todaysDate:string = dateToString(today)
    today.setDate(1) // to avoid overflow which skips a month
    today.setMonth(today.getMonth() + 2)
    const maxDate: string = dateToString(today)

    const TIMESLOT_EXTENDED: TimeSlotExtendedType[] = useTimeSlots(watch("numberGuest"), watch("date"))

    useEffect(() => {
        // to properly set the default values
        if (data?.time && TIMESLOT_EXTENDED.length > 0) {
            reset({
                ...data,
                countryCode: "NO",
            })
        }
    }, [data?.id, TIMESLOT_EXTENDED.length, reset])

    return <>
        {/*Loading animation shown while submitting form*/}
        <div aria-live={"polite"}>
            {bookingUpdate.isPending && <Image src={"/loading.gif"}
                                 alt={"loading animation while waiting for submission verification"}
                                 width={500} height={240}
                                 unoptimized={true}/>}
        </div>
        {/*Error message if submission fails*/}
        <div aria-live={"polite"}>
            {bookingUpdate.isError &&
                <div className={"flex flex-col md:flex-row items-center gap-2 text-center md:text-left bg-red-200 border-2 border-red-600 p-3"}>
                    <ExclamationTriangleIcon aria-hidden={true} className={"size-13 sm:size-10"}/>
                    <p>Det er ingen ledige bord på dette tidspunktet</p>
                </div>
            }
        </div>
        {!bookingUpdate.isPending && <form onSubmit={handleSubmit(onSubmit)}>
            <section className={"flex flex-col gap-4"}>
                <div className={"flex flex-col gap-3"}>
                    <div className={"flex gap-3"}>
                        <label htmlFor={"numberGuest"} className={"font-bold"}>Antall gjester:</label>
                        <select id={"numberGuest"} aria-describedby={"number-of-guests-error"} {...register("numberGuest", {valueAsNumber: true})}>
                            {NUMBER_GUESTS_LIST.map((numb: number, index:number) =>
                                <option key={index} value={numb}>{numb}</option>)}
                        </select>
                    </div>
                    {errors.numberGuest && <span id={"number-of-guests-error"} className={"text-red-800"}>{errors.numberGuest.message}</span>}
                </div>
                <div className={"flex flex-col gap-3"}>
                    <div className={"flex gap-3"}>
                        <label htmlFor={"date"} className={"font-bold"}>Dato:</label>
                        <input type={"date"} id={"date"} min={todaysDate} max={maxDate} {...register("date")} aria-describedby={"calendar-error"}/>
                    </div>
                    {errors.date && <span id={"calendar-error"} className={"text-red-800"}>{errors.date.message}</span>}
                </div>
                <div className={"flex flex-col gap-3"}>
                    <div className={"flex gap-3"}>
                        <label htmlFor={"time"} className={"font-bold"}>Tidspunkt:</label>
                        <select id={"time"} aria-describedby={"time-error"} {...register("time")}>
                            {TIMESLOT_EXTENDED.map((timeSlot: TimeSlotExtendedType) =>
                                <option key={timeSlot.time}
                                        value={timeSlot.time}
                                        disabled={(!timeSlot.available || timeSlot.pastTime) && chosenTimeSlot != timeSlot.time}>{timeSlot.time.slice(0,5)}</option>)
                            }
                        </select>
                    </div>
                    {errors.time && <span id={"time-error"} className={"text-red-800"}>{errors.time.message}</span>}
                </div>
                <div>
                    <div className={"grid grid-cols-6 gap-3 mb-3"}>
                        <select className={"col-span-1"}
                                id={"countryCode"}
                                {...register("countryCode")}
                                aria-label={"country code for telephone numbers"}
                                aria-describedby={"phone-number-error"}
                        >
                            {COUNTRY_CODE_LIST.map((country:CountryCode)=>
                                <option key={country}>{country}</option>
                            )}
                        </select>
                        <input type={"tel"} id={"phoneNumber"} {...register("phoneNumber", {valueAsNumber: true})}
                               placeholder={"Ditt telefonnummer"}
                               className={"border-b pb-2 focus:p-2 placeholder-custom-gray col-span-5"}
                               aria-label={"telephone number"}
                               aria-describedby={"phone-number-error"}
                        />
                    </div>
                    {errors?.phoneNumber && <span id={"phone-number-error"} className={"text-red-800"}>{errors.phoneNumber.message}</span>}
                </div>
                <div className={"flex flex-col gap-2"}>
                    <label htmlFor={"comment"} className={"text-custom-gray"}>Kommentar</label>
                    <textarea rows={4}
                              className={"border p-2 rounded-md"}
                              id={"comment"}
                              {...register("comment")}
                              aria-describedby={"comment-error"}
                              aria-required={false}/>
                    {errors?.comment && <span id={"comment-error"} className={"text-red-800"}>{errors.comment.message}</span>}
                </div>
                <div>
                    <button type={"button"}
                            aria-label={"Go back to choosing date of booking"}
                            onClick={() => handleUpdate(false)}
                            className={"p-2 border-2 rounded-full w-fit scale-90 hover:scale-100 transition-all"}>
                        <ArrowLeftIcon className={"w-8 h-8"} aria-hidden={true}/>
                    </button>
                    <div className={"flex justify-center"}>
                        <button type="submit"
                                className={"bg-black text-lg text-white w-fit py-2 px-8 rounded-3xl border-2 hover:bg-inherit hover:text-black"}>
                            Oppdater
                        </button>
                    </div>
                </div>
            </section>
        </form>}
    </>
}