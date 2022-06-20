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
    if (screenValue === '0' || screenValue === 'NaN') {
      screen.textContent = keyValue
    } else if (previousKeyType === 'operator') {
      screen.textContent = keyValue
    } else {
      screen.textContent = screenValue + keyValue
    }
  }

  if (type === 'dot') {
    screen.textContent = screenValue + keyValue
  }

  if (type === 'operator') {
    calculator.dataset.firstValue = screenValue
    calculator.dataset.operator = key.dataset.key
  }

  if (type === 'delete' && screenValue !== '0') {
    screen.textContent = screenValue.substring(0, screenValue.length -1)
  }

  if (type === 'delete' && screenValue.length === 1) {
    screen.textContent = '0'
  }

  if (previousKeyType === 'equal' && type === 'delete') {
    screen.textContent = '0'
  }

  if (previousKeyType === 'equal' && type !== 'delete' && type !== 'operator') {
    screen.textContent = keyValue
  }

  if (type === 'equal') {
    const firstValue = parseFloat(calculator.dataset.firstValue)
    const secondValue = parseFloat(screenValue)

    const operator = calculator.dataset.operator
    
    screen.textContent = calculate(firstValue, operator, secondValue)
  }

  if (type === 'reset') {
    screen.textContent = '0'

    calculator.dataset.firstValue = '0'
    calculator.dataset.operator = ''
  }

  calculator.dataset.previousKeyType = type
})

function calculate(firstValue, operator, secondValue) {
  firstValue = parseFloat(firstValue)
  secondValue = parseFloat(secondValue)

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
  
  if (result % 1 === 0) {
    return result
  } else {
    return result.toFixed(2)
  }
}