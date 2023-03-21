import './root.scss'
import './styles.scss'


declare const friconix_update: () => void;


const taskInputEL: HTMLInputElement | null = document.querySelector('.text-input-box');
const submitBtn: HTMLButtonElement | null = document.querySelector('.submit-btn');
const tasks: Tasks = {};


enum TaskStatus { 
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

interface Tasks {
  [key: string]: Task
}

interface Task {
  task: string,
  _id: number,
  status: TaskStatus
}

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


  const _id: number = new Date().getTime();
  const task: Task = {
    task: inputValue,
    _id: _id,
    status: TaskStatus.IN_PROGRESS
  }

  tasks[`${_id}`] = task;
  saveToStorage()

  radioBtn.addEventListener('click', function(): void {
    radioBtn.classList.toggle('radio-toggled');
    li.classList.toggle('completed-task');
    if (tasks[`${_id}`].status === TaskStatus.IN_PROGRESS) {
      tasks[`${_id}`].status = TaskStatus.COMPLETED
    } else {
      tasks[`${_id}`].status = TaskStatus.IN_PROGRESS
    }
    saveToStorage();
  })

  binBtn.addEventListener('click', function(): void {
    li.remove();
    delete tasks[`${_id}`];
    saveToStorage();
  })


  taskInputEL.value = '';
}

function saveToStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getTasksFromStorage(): void {
  const storedTasksString: string | null = localStorage.getItem('tasks');
  if (!storedTasksString) return;
  const storedTaskObj: Tasks = JSON.parse(storedTasksString);
  const tasksValues: Task[] = Object.values(storedTaskObj);
  for (let task of tasksValues) {
    
  }
}

// document.getElementById('tester')?.addEventListener('click', () => console.log(tasks));