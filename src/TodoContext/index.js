import React from "react";
import { useLocalStorage } from "./useLocalStorage";

const TodoContext = React.createContext();

function TodoProvider({ children }) {
    const {
        item: todos,
        saveItem: saveTodos,
        loading,
        error
    } = useLocalStorage("TODOS_V1", [])
    const [searchValue, setSearchValue] = React.useState('');

    const [openModal, setOpenModal] = React.useState(false);

    const completedTodos = todos.filter(todo => !!todo.completed).length;
    const totalTodos = todos.length;

    const searchedTodos = todos.filter(todo => {
        const todoText = todo.text.toLowerCase()
        const searchText = searchValue.toLowerCase()
        return todoText.includes(searchText)
    })

    const addTodo = (text) => {
        const newTodos = [...todos];
        newTodos.push({text:text, completed:false})
        saveTodos(newTodos);
    }
    
    const completeTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(todo => todo.text == text)
        newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
        saveTodos(newTodos);
    }

    const deleteTodo = (text) => {
        const newTodos = [...todos];
        const todoIndex = newTodos.findIndex(todo => todo.text == text)
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos)
    }

    return (
        <TodoContext.Provider value={{
            completedTodos,
            totalTodos,
            searchValue,
            setSearchValue,
            searchedTodos,
            completeTodo,
            deleteTodo,
            loading,
            error,
            openModal,
            setOpenModal,
            addTodo
        }}>
            {children}
        </TodoContext.Provider>
    )
}

export { TodoContext, TodoProvider }

// // localStorage.removeItem("TODOS_V1")
// const defaultTodos = [
//   { text: 'Cortar cebolla', completed: true },
//   { text: 'Tomar el Curso de Intro a React.js', completed: false },
//   { text: 'Llorar con la Llorona', completed: false },
//   { text: 'LALALALALA', completed: false },
//   { text: 's', completed: true },
// ]
// const stringnifiedTodos = JSON.stringify(defaultTodos)
// localStorage.setItem("TODOS_V1", stringnifiedTodos)
// const parsedTodos = JSON.parse(stringnifiedTodos)