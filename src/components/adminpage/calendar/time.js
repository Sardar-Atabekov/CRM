import moment from "moment";
import "moment/locale/ru";
function Time(date) {
  let stillUtc = moment.utc(date);
  let time = moment(stillUtc)
    .local()
    .format("L");
  return time;
}

function TimeHours(date) {
  let stillUtc = moment.utc(date);
  let time = moment(stillUtc)
    .local()
    .format("LT");
  return time;
}

function TimeDate(date) {
  let stillUtc = moment.utc(date);
  console.log("Date format: ", date);
  let time = moment(stillUtc)
    .local()
    .format("DD.MM.YYYY, LT");
  return time;
}

function TodayDate() {
  let stillUtc = moment.utc();
  let time = moment(stillUtc)
    .local()
    .format("dddd, D MMMM");
  let firstSymbol = time[0].toUpperCase(),
    symbol = time.substring(1, time.length);
  time = firstSymbol.concat(symbol);
  return time;
}

export { Time, TimeHours, TimeDate, TodayDate };
