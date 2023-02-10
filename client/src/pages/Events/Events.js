import React, { useEffect, useState } from "react";
import styles from "./Events.module.sass";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import EventForm from "../../components/Event/EventForm/EventForm";
import RenderEvent from "../../components/Event/RenderEvent/RenderEvent";


const Events = (props) => {
  const [todos, setTodos] = useState([]);

  const addTask = (eventInput) => {
  if(eventInput) {
    const {todoText, deadline} = eventInput;
    const newItem = {
      id:  Math.random().toString(6).substring(2,9),
      event: todoText,
      // complete: false, 
      deadline: deadline,   //"2023-02-21T03:45"
    }
    if(todos){
      setTodos([...todos, newItem]);
      localStorage.setItem('myEvents',JSON.stringify([...todos, newItem]));

    }
    else{
      setTodos([newItem])
      localStorage.setItem('myEvents',JSON.stringify([newItem]));
    }
    //new Date().toString() - дата сейчас 
  }

  }

const removeTask = (id) => {
  const filtered = todos.filter(elem => elem.id !== id);
  setTodos([...filtered])
  localStorage.setItem('myEvents',JSON.stringify([...filtered]))
}

// const handleToggle = (id) => { 
//   const toggle = todos.map((elem)=>
//       elem.id === id ? {...elem, complete: !elem.complete} : {...elem}
//   )
//   setTodos([...toggle]);
//   localStorage.setItem('myEvents',JSON.stringify([...toggle]))
// }



useEffect(()=> {
  setTodos(JSON.parse(localStorage.getItem('myEvents'))); //тут мы запихиваем localStorage в стейт
  },[])




      return (
          <>
          <Header/>
          <section className={styles.containerPadding}>
            <div>
              <h1>Create your events list</h1>
              
              <EventForm 
                addTask={addTask}/>
            </div>
          
            <div className={styles.todoBox}>
              <h3>You have a {todos ? todos.length : 0} uncompleted events</h3>

              <ul>
                {todos ? (todos.map((todo) => {
                    return(
                      <RenderEvent
                      todo={todo}
                      key={todo.id}
                      // toggleTask={handleToggle}
                      removeTask={removeTask}
                      // complete={todo.complete}
                      />
                    )

                })) 
                : null
                }
              </ul>
            </div>
            

            
              
        
          </section>

          <Footer/>
          </>
          

      );

};

export default Events