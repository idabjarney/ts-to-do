import './root.scss'
import './styles.scss'


declare const friconix_update: () => void;


const taskInputEL: HTMLInputElement | null = document.querySelector('.text-input-box');
const submitBtn: HTMLButtonElement | null = document.querySelector('.submit-btn');
let tasks: string[] = [];

submitBtn?.addEventListener('click', renderNewTask);

function renderNewTask(e: Event): void {
  e.preventDefault();
  if (!taskInputEL?.value) return;
  const toDosUl: HTMLUListElement | null = document.querySelector('.to-dos-container')
  let inputValue: string  = taskInputEL?.value;
  const li: HTMLLIElement = document.createElement('li');
  const paragraph: HTMLParagraphElement = document.createElement('p');
  const radioBtn: HTMLButtonElement = document.createElement('button');
  const binBtn: HTMLButtonElement = document.createElement('button');
  radioBtn.classList.add('to-do-selector');
  binBtn.classList.add('bin-btn');
  paragraph.innerText = inputValue
  const icon: HTMLElement = document.createElement('i');
  icon.classList.add('fi-xnsuxl-trash-solid');
  binBtn.appendChild(icon);
  li.appendChild(radioBtn);
  li.appendChild(paragraph);
  li.appendChild(binBtn);
  li.classList.add('to-do-el');
  toDosUl?.appendChild(li);
  friconix_update(); //icon
  tasks.push(inputValue);
  console.log(tasks)

  radioBtn.addEventListener('click', function(): void {
    radioBtn.classList.toggle('radio-toggled');
    li.classList.toggle('completed-task');
  })

  binBtn.addEventListener('click', function(): void {
    li.remove();
  })


  taskInputEL.value = '';
}

// function createListItem(value: string): void {
//   const li: HTMLLIElement = document.createElement('li');

// }