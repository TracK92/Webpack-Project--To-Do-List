import createTodoListComponents from './createTasksAndEvents.js';
import MyToDoList from './mainContainerClass.js';
// initiate new instance of main class container
const MyToDo = new MyToDoList();
// call the ul element that contains all list items
const listContainer = document.querySelector('.listContainer');
class OneTaskListItem {
  constructor(index, description, completed) {
    this.index = index;
    this.description = description;
    this.completed = completed;
  }

  // add
  addNewToDo(mainArr, newToDo) {
    this.description = newToDo;
    this.index = mainArr.length + 1;
    this.completed = false;
    // create task object
    mainArr.push({
      index: this.index,
      description: this.description,
      completed: this.completed,
    });
    // save to local storage
    localStorage.setItem('todotasks', JSON.stringify(mainArr));
    // update the length of the container
    createTodoListComponents(this);
  }

  // remove
  removeFromToDo(index) {
    const MyToDo = new MyToDoList();
    const listContainer = document.querySelector('.listContainer');

    MyToDo.tasks = MyToDo.tasks.filter((task) => task.index !== Number(index));
    // update local storage
    localStorage.setItem('todotasks', JSON.stringify(MyToDo.tasks));
    // set container to empty in order to update the index
    listContainer.innerHTML = '';
    // update index
    this.updateToDoIndex();
    // display results
    this.displayToDoList();
  }

  // update Index
  updateToDoIndex = () => {
    const MyToDo = new MyToDoList();
    // map through the array of objects
    MyToDo.tasks = MyToDo.tasks.map((node, index) => {
      // increase the index of each task by one after the deletion of an item
      node.index = index + 1;
      return node;
    });
    // save changes to local storage
    localStorage.setItem('todotasks', JSON.stringify(MyToDo.tasks));
  };

  // display
  displayToDoList = () => {
    const MyToDo = new MyToDoList();
    const listContainer = document.querySelector('.listContainer');
    listContainer.innerHTML = '';
    JSON.parse(localStorage.getItem('todotasks')).forEach((task, index) => {
      createTodoListComponents(task);
    });
  };

    // check
    checkTasks = (id, done) => {
      const MyToDo = new MyToDoList();
      const foundIndex = MyToDo.tasks.findIndex(
        (task) => task.index === Number(id),
      );
      MyToDo.tasks[foundIndex] = {
        ...MyToDo.tasks[foundIndex],
        completed: done,
      };
      // save changes to local storage
      localStorage.setItem('todotasks', JSON.stringify(MyToDo.tasks));
      if (done === MyToDo.tasks[foundIndex].completed) {
        return true;
      }
      return false;
    }

  // edit
  editItem = (id, inputValue) => {
    const MyToDo = new MyToDoList();
    const foundIndex = MyToDo.tasks.findIndex(
      (task) => task.index === Number(id),
    );
    MyToDo.tasks[foundIndex] = {
      ...MyToDo.tasks[foundIndex],
      description: inputValue,
    };
    // save changes to local storage
    localStorage.setItem('todotasks', JSON.stringify(MyToDo.tasks));
  };

  // clear tasks
  clearTasks = (myArray) => {
    myArray = myArray.filter((task) => task.completed === false);
    return myArray;
  }
}
export { MyToDo, OneTaskListItem };
