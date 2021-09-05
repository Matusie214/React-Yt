import React, {useState, useRef, useEffect} from 'react'
import TodoList from './TodoList'
import uuidv4 from 'uuid/dist/v4'

const LOCAL_STORAGE_KEY="todoAPP.todos"

function App() {
  
  const [ todos ,setTodos]=useState([])
  const toDoNameRef=useRef()

  useEffect(()=>{
    const storedTodos=JSON.parse( localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  },[])

  useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(todos))
  },[todos])


  function toggleTodo(id){
    const newTodos=[...todos]
    const todo= newTodos.find(todo=>todo.id===id)
    todo.complete=!todo.complete
    setTodos(newTodos)
  }


  function handleAddTodo(e){
    const name= toDoNameRef.current.value
    if(name==='') return
    console.log(name)
    setTodos(PrevTodos =>{
      return [...PrevTodos, {id:uuidv4() ,name:name , complete: false}]
    })
    toDoNameRef.current.value=null
    
  }

  function handleClearTodos(){
    const newTodos=todos.filter(todo=> !todo.complete)
    setTodos(newTodos)
  }
  
  return (
    <>
      <TodoList todos={todos} toggleTodo={toggleTodo}/>
      <input type="text" ref={toDoNameRef}/>
      <button onClick={handleAddTodo}>Add Todo</button>
      <button onClick={handleClearTodos}>Clear Completed</button>
      <div>{todos.filter(todo=>!todo.complete).length} Left to do</div>
    </>
  )

}

export default App;
