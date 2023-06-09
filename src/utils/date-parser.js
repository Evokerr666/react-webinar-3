/**
 * Форматирование даты
 * @param date {string}
 * @returns {String}
 */
/* const date = '2023-06-08T23:05:28.261Z' */
export default function dateParser(date) {
  const parseDate = new Date(date)
    .toLocaleString("ru-Ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }).replace("г.,", "в");

  return parseDate;
}
/* console.log(dateParser(date)); */