import './root.scss'
import './styles.scss'


declare const friconix_update: () => void;


const taskInputEL: HTMLInputElement | null = document.querySelector('.text-input-box');
const submitBtn: HTMLButtonElement | null = document.querySelector('.submit-btn');
let tasks: Tasks = {};


enum TaskStatus { 
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED'
}

interface Tasks {
  [key: string]: Task
}

interface Task {
  taskValue: string,
  _id: number,
  status: TaskStatus
}

submitBtn?.addEventListener('click', createTask);
window.addEventListener('DOMContentLoaded', getTasksFromStorage);

function createTask(e: Event): void {
  e.preventDefault();
  if (!taskInputEL?.value) return;
  let inputValue: string  = taskInputEL?.value;

  const _id: number = new Date().getTime();
  const task: Task = {
    taskValue: inputValue,
    _id: _id,
    status: TaskStatus.IN_PROGRESS
  }

  tasks[`${_id}`] = task;
  saveToStorage()

  renderNewTask(task);
  taskInputEL.value = '';
}

function renderNewTask(task: Task): void {
  const toDosUl: HTMLUListElement | null = document.querySelector('.to-dos-container')
  const li: HTMLLIElement = document.createElement('li');
  const paragraph: HTMLParagraphElement = document.createElement('p');
  const radioBtn: HTMLButtonElement = document.createElement('button');
  const binBtn: HTMLButtonElement = document.createElement('button');
  radioBtn.classList.add('to-do-selector');
  binBtn.classList.add('bin-btn');
  paragraph.innerText = task.taskValue;
  const icon: HTMLElement = document.createElement('i');
  icon.classList.add('fi-xnsuxl-trash-solid');
  binBtn.appendChild(icon);
  li.appendChild(radioBtn);
  li.appendChild(paragraph);
  li.appendChild(binBtn);
  li.classList.add('to-do-el');
  if(task.status === TaskStatus.COMPLETED) {
    li.classList.add('completed-task');
    radioBtn.classList.add('radio-toggled');
  }
  toDosUl?.appendChild(li);
  friconix_update(); //icon






  radioBtn.addEventListener('click', function(): void {
    radioBtn.classList.toggle('radio-toggled');
    li.classList.toggle('completed-task');
    if (tasks[`${task._id}`].status === TaskStatus.IN_PROGRESS) {
      tasks[`${task._id}`].status = TaskStatus.COMPLETED
      saveToStorage();
    } else {
      tasks[`${task._id}`].status = TaskStatus.IN_PROGRESS
      saveToStorage();
    }
  })

  binBtn.addEventListener('click', function(): void {
    li.remove();
    delete tasks[`${task._id}`];
    saveToStorage();
  })


}

function saveToStorage(): void {
  localStorage.setItem('tasks', JSON.stringify(tasks))
}

function getTasksFromStorage(): void {
  const storedTasksString: string | null = localStorage.getItem('tasks');
  if (!storedTasksString) return;
  const storedTaskObj: Tasks = JSON.parse(storedTasksString);
  tasks = storedTaskObj;
  const tasksValues: Task[] = Object.values(storedTaskObj);
  for (let task of tasksValues) {
    renderNewTask(task);
  }
}

// document.getElementById('tester')?.addEventListener('click', () => console.log(tasks));