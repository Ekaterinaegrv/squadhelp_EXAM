import React, { useEffect, useState } from "react";
import styles from "./Events.module.sass";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import EventForm from "../../components/Event/EventForm/EventForm";
import EventItem from "../../components/Event/EventItem/EventItem";
import NotificationEvent from "../../components/Event/TimerEvent/NotificationEvent";

const Events = (props) => {
  const [todos, setTodos] = useState([]);
  const [isVisibleRedCard, setIsVisibleRedCard] = useState(false);

  const addTask = (eventInput) => {
  if(eventInput) {
    const {todoText, deadline, notification} = eventInput;
    const newItem = {
      id:  Math.random().toString(6).substring(2,9),
      event: todoText,
      complete: false, 
      deadline: Date.parse(new Date(deadline)),
      notification: notification
    }
    if(todos){
      setTodos([...todos, newItem]);
      localStorage.setItem('myEvents',JSON.stringify([...todos, newItem]));

    }
    else{
      setTodos([newItem])
      localStorage.setItem('myEvents',JSON.stringify([newItem]));
    }
  }}

  const removeTask = (id) => {
    const filtered = todos.filter(elem => elem.id !== id);
    setTodos([...filtered])
    localStorage.setItem('myEvents',JSON.stringify([...filtered]))
  }

  useEffect(()=> {
    setTodos(JSON.parse(localStorage.getItem('myEvents')));
  },[])

  const setCompleteStatus = (id, isComplete) => {
    if(isComplete) {
      setIsVisibleRedCard(isComplete);
      const complete = todos.map((elem)=>
          elem.id === id ? {...elem, complete: elem.complete = true} : {...elem}
      )
      localStorage.setItem('myEvents',JSON.stringify([...complete]))
    }
 }

if(todos) {
  const compare = (a, b) => {
    if(a.deadline < b.deadline) return -1;
    else if(a.deadline > b.deadline) return 1;
    return 0
  }
  todos.sort(compare);

}

const showQuantityInRedCard = () => {
  const countEventsComplete = todos.filter(elem => elem.complete);
  return (
    countEventsComplete ? countEventsComplete.length : 0
  )
}

const removeCard = () => {
  setIsVisibleRedCard(false)
}



      return (
          <>
          <Header/>
          <section className={styles.containerPadding}>
            <div className={styles.formBox}>
              <h1>Create your events list</h1>
              <EventForm 
                addTask={addTask}
                />
            </div>
          
            <div className={styles.todoBox}>
              <h3>You have a {todos ? todos.length : 0} open events</h3>
              <p>If you completed event - just delete it by clicking trash icon</p>
              {isVisibleRedCard &&
              <div className={styles.redCard}>
                <p>Completed events: {showQuantityInRedCard()}</p>
                <span onClick={() => removeCard()}>X</span> 
              </div>}
              

              <ul>
                {todos ? (todos.map((todo) => {
                    return(
                      <li
                      key={todo.id}
                      >
                      <EventItem
                      todo={todo}
                      removeTask={removeTask}
                      completeToState={setCompleteStatus}
                      />
                      <NotificationEvent
                      todo={todo}
                      />
                      </li>
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