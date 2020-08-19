export default class Task {
    id;
    state;
    name;
    datetime;

    parsedDatetime = () => {
        let locale = "de-DE";
        let dateObj = new Date(this.datetime * 1000);
        let date = dateObj.toLocaleDateString(locale);
        let time = dateObj.toLocaleTimeString(locale);
        return `${date} ${time}`;
    }
}
