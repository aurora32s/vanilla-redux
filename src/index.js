import { createStore } from 'redux';

const minus = document.getElementById('minus');
const add = document.getElementById('add');
const number = document.querySelector('span');

// human error를 줄이기 위해 constant variable로 관리하는 것이 좋다.
const ADD = 'ADD';
const MINUS = 'MINUS';

// 유일하게 데이터를 변경할 수 있는 함수
// state = 0 <- state 초기값 지정
const reducer = (count = 0, action) => {
  // modify state
  // if (action.type === 'add') {
  //   return state + 1;
  // } else if (action.type == 'minus') {
  //   return state - 1;
  // }

  // looks better to use switch instead of if-else
  switch (action.type) {
    case ADD:
      return count + 1;
    case MINUS:
      return count - 1;
    default:
      return count;
  }
};
const store = createStore(reducer);

const onChange = () => {
  number.innerText = store.getState();
};
store.subscribe(onChange);

// redux가 store에 속한 reducer를 호출한다.
// store.dispatch({ type: 'add' });
// store.dispatch({ type: 'add' });
// store.dispatch({ type: 'add' });
// store.dispatch({ type: 'add' });
// store.dispatch({ type: 'add' });
// store.dispatch({ type: 'add' });
// store.dispatch({ type: 'minus' });

const handleAdd = () => store.dispatch({ type: ADD });
const handleMinus = () => store.dispatch({ type: MINUS });

add.addEventListener('click', handleAdd);
minus.addEventListener('click', handleMinus);

// to do list
const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

// action type
const ADD_TODO = 'add';
const DELETE_TODO = 'delete';

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [...state, { text: action.text, id: Date.now() }];
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    default:
      return state;
  }
};
const todoStore = createStore(todoReducer);

// action creattor
// only return object for action
const addTodo = (text) => {
  return {
    type: ADD_TODO,
    text,
  };
};
const deleteTodo = (id) => {
  return {
    type: DELETE_TODO,
    id,
  };
};
const dispatchAddTodo = (text) => {
  todoStore.dispatch(addTodo(text));
};
const dispatchDeleteTodo = (event) => {
  const id = parseInt(event.target.parentNode.id);
  todoStore.dispatch(deleteTodo(id));
};

const paintTodo = () => {
  ul.innerHTML = '';
  const todos = todoStore.getState();
  // 이렇게 element를 매법 새로 생성할 경우, 많은 리소스가 소비된다.
  todos.forEach((todo) => {
    const li = document.createElement('li');
    const button = document.createElement('button');
    button.innerText = 'delte';
    button.addEventListener('click', dispatchDeleteTodo);
    li.id = todo.id;
    li.innerText = todo.text;
    li.appendChild(button);
    ul.appendChild(li);
  });
};

todoStore.subscribe(paintTodo);

const onSubmit = (event) => {
  event.preventDefault();
  const todo = input.value;
  input.value = '';
  dispatchAddTodo(todo);
};

form.addEventListener('submit', onSubmit);
