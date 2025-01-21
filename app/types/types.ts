export default interface IHistoricalDates {
    title: string;
    dates: IDescription[]
}
interface IDescription {
    year: number,
    text: string,
}