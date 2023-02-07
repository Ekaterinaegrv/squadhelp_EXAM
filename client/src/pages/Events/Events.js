import React, { useEffect, useState } from "react";
import styles from "./Events.module.sass";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import EventForm from "../../components/Event/EventForm/EventForm";
import EventTimer from "../../components/Event/EventTimer/EventTimer";


const Events = (props) => {
  const [todos, setTodos] = useState([]);

  const addTask = (userInput) => {
  if(userInput) {
    const newItem = {
      id:  Math.random().toString().substring(),
      task: userInput,
      complete: false
    }
    if(todos){
      setTodos([...todos, newItem]);
      localStorage.setItem('myEvents',JSON.stringify([...todos, newItem]));

    }
    else{
      setTodos([newItem])
      localStorage.setItem('myEvents',JSON.stringify([newItem]));

    }
  }
  }

const removeTask = (id) => {
  const filtered = todos.filter(elem => elem.id !== id);
  setTodos([...filtered])

}

const handleToggle = (id) => { //функция на класснеймы - зачеркнуть/не зачеркнуть пункт --> переделать на только при завершении complete - redCard
  const toggle = todos.map(elem => elem.id === Number(id) ? {...elem, complete: !elem.complete} : {...elem});
  setTodos([...toggle])
}

useEffect(()=>{
  const storageEvents = JSON.parse(localStorage.getItem('myEvents'));
  setTodos(storageEvents);
  },
  [])

      return (
          <>
          <Header/>
          <section className={styles.eventForm}>
            <h1>Events list</h1>
            <h3>You have a {todos ? todos.length : 0} uncompleted events</h3>
            <EventForm 
              addTask={addTask}/>
              {todos ? (todos.map((todo) => {
                return(
                  <EventTimer
                  todo={todo}
                  key={todo.id}
                  toggleTask={handleToggle}
                  removeTask={removeTask}
                  />
                )

            })) 
            : null
             
            
            }
        
          </section>

          <Footer/>
          </>
          

      );

};

export default Events