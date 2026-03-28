/**
 * Converts given date into month in full text
 * @param date - date to be used
 * @return String - month (ex. March)
 */
export function getMonthToString(date: Date){
    return date.toLocaleDateString("no-NO", {month: "long"});
}

/**
 * Checks if given time and date is valid to book.
 * Users must book minimum 2 hours ahead of the booking time
 * @param time - time to check
 * @param chosenFullDate - date to check
 * @return Boolean
 */
export function isPastTime(time: string, chosenFullDate: string): boolean {
    const todaysDate = new Date();

    let month = todaysDate.getMonth() + 1;
    let monthString: string = "";
    if (month < 10) {
        monthString = "0" + month.toString()
    } else {
        monthString = month.toString();
    }
    const dateString = `${todaysDate.getFullYear()}-${monthString}-${todaysDate.getDate()}`;
    const hour = Number(time.split(":")[0])

    // users must minimum book 2 hours before the booking time
    if ((todaysDate.getHours() + 3) > hour && chosenFullDate === dateString){
        return true;
    }
    return false;
}