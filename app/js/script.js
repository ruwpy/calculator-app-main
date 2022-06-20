// theme switcher

const themeSwitch = document.querySelector('.switcher__container');
const bodyDocument = document.querySelector('body');

themeSwitch.addEventListener('click', () => {
  if (bodyDocument.classList.contains('theme1')) {
    bodyDocument.classList.remove('theme1');
    bodyDocument.classList.add('theme2');
  } else if (bodyDocument.classList.contains('theme2')) {
    bodyDocument.classList.remove('theme2');
    bodyDocument.classList.add('theme3');
  } else {
    bodyDocument.classList.remove('theme3');
    bodyDocument.classList.add('theme1')
  }
})

// calculator

const calculator = document.querySelector('.calc')
const keys = calculator.querySelector('.calc__keys')
const screen = calculator.querySelector('.calc__screen')

keys.addEventListener('click', (e) => {
  if (!e.target.closest('button')) return

  const key = e.target
  const keyValue = key.textContent
  const screenValue = screen.textContent
  const type = key.dataset.type
  const previousKeyType = calculator.dataset.previousKeyType

  if (type === 'num') {
    if (screenValue === '0') {
      screen.textContent = keyValue
    } else if (previousKeyType === 'operator') {
      screen.textContent = keyValue
    } else {
      screen.textContent = screenValue + keyValue
    }
  }

  if (type === 'operator') {
    calculator.dataset.firstValue = screenValue
    calculator.dataset.operator = key.dataset.key
  }

  if (type === 'equal') {
    const firstValue = parseInt(calculator.dataset.firstValue)
    const operator = calculator.dataset.operator
    const secondValue = parseInt(screenValue)

    screen.textContent = calculate(firstValue, operator, secondValue)
  }

  calculator.dataset.previousKeyType = type
})

function calculate(firstValue, operator, secondValue) {
  firstValue = parseInt(firstValue)
  secondValue = parseInt(secondValue)

  let result = ''

  if (operator === 'plus') {
    result = firstValue + secondValue
  } else if (operator === 'minus') {
    result = firstValue - secondValue
  } else if (operator === 'divide') {
    result = firstValue / secondValue
  } else {
    result = firstValue * secondValue
  }
  return result
}