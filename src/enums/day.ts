export enum Day{
    MONDAY = 1,
    TUESDAY,
    WEDNESDAY,
    THURSDAY,
    FRIDAY,
    SATURDAY,
    SUNDAY
};

export const mapDayStringToDayEnum = (dayName: string) : Day => {
    let day: Day; 

    switch (dayName) {
        case "MONDAY":
            day = Day.MONDAY;
            break;
        case "TUESDAY":
            day = Day.TUESDAY;
            break;
        case "WEDNESDAY":
            day = Day.WEDNESDAY;
            break;
        case "THURSDAY":
            day = Day.THURSDAY;
            break;
        case "FRIDAY":
            day = Day.FRIDAY;
            break;
        case "SATURDAY": 
            day = Day.SATURDAY;
            break;
        case "SUNDAY":
            day = Day.SUNDAY;
            break;
        default:
            throw new Error("could not map "+ dayName +" to enum day")
    }
    
    return day;
}