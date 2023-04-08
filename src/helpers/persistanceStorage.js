export const getItem = key => {
  try {
    /** Если мы получаем, что-то из localStorage - это всегда строка поэтому вызываем JSON.parse() чтобы быть уверенными, что мы получим обратно данные.
      Потому что каждый раз парсить объект в каждом месте где вам нужно - это просто не удобно
     */
    return JSON.parse(localStorage.getItem(key))
  } catch (e) {
    console.error('Error in getting data from localStorage', e)
    return null // Если мы не получили ни чего, то мы просто хотим получить NULL
  }
}

/** Первый аргумент KEY - это куда мы записываем, DATA - это что мы записываем */
export const setItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error('Error in setting data to localStorage', e)
    // Если это setItem, то мы ничего не возвращаем поэтому return null можно удалить
  }
}
