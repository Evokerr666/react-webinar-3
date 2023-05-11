//Генерация уникального кода на основе счётчика
export function counter() {
  return counter.value ? ++counter.value : (counter.value = 1);
}
