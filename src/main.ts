import './root.scss'
import './styles.scss'

const taskInputEL: HTMLInputElement | null = document.querySelector('.text-input-box');
const submitBtn: HTMLButtonElement | null = document.querySelector('.submit-btn');
let tasks: string[] = [];

submitBtn?.addEventListener('click', renderNewTask);

function renderNewTask(e: Event): void {
  e.preventDefault();
  if (!taskInputEL?.value) return;
  const toDosUl: HTMLUListElement | null = document.querySelector('.to-dos-container')
  let inputValue: string  = taskInputEL?.value;
  // const li: HTMLLIElement = document.createElement('li');
  // const paragraph: HTMLParagraphElement = document.createElement('p');
  // paragraph.innerText = inputValue;
  // li.appendChild(paragraph);
  // li.classList.add('to-do-el');
  // toDosUl?.appendChild(li);
  const newTodo: string = `
  <li class="to-do-el">
    <button class="to-do-selector"></button>
    <p>${inputValue}</p>
    <button class="bin-btn">hey
    </button>
  </li>
  `;
  toDosUl?.insertAdjacentHTML('beforeend', newTodo)
}

// function createListItem(value: string): void {
//   const li: HTMLLIElement = document.createElement('li');

// }