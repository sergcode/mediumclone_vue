/**
 * Array(50) - создал массив с 50 пустыми значениями
 * Array(50).keys - получить индексы значений
 * [...Array(50).keys()] - заспредить и получить массив от 0 до 49
 * [...Array(50).keys()].map(el => el + 1) - промапить каждый элемент и установить начало с 1, а не с нуля
 */
export const range = (start, end) => {
  return [...Array(end).keys()].map(el => el + start)
}
