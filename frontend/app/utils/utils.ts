/**
 * Converts given date into month in full text
 * @param date - date to be used
 * @return String - month (ex. March)
 */
export function getMonthToString(date: Date){
    return date.toLocaleDateString("no-NO", {month: "long"});
}

/**
 * Transform date object to string format (YYYY-MM-DD)
 * @param date - to transform
 * @return String - YYYY-MM-DD
 */
export function dateToString(date: Date): string{
    const month: number = date.getMonth() + 1
    const monthString: string = month < 10 ? "0" + month : month.toString()
    const day: number = date.getDate()
    const dateString: string = day < 10 ? "0" + day : day.toString()

    return `${date.getFullYear()}-${monthString}-${dateString}`
}