import React, { useEffect, useState } from "react";

const TimerEvent = (props) => {

    const {todo} = props;
    const [deadlineState, setDeadline] = useState({
                                date: todo.deadline,
                                isComplete: false
                                });

    useEffect(() => {                                            
        const dateNow = Date.parse(new Date());
        const dedlineDate = deadlineState.date;
        const id = setTimeout(() => {
            setDeadline(deadlineState, deadlineState.isComplete = true);
            props.completeToState(todo.id, deadlineState.isComplete)
        },
        dedlineDate - dateNow )

        return () => {
            clearInterval(id)
        }

    }, []);

    return (
        <>

        </>
          )

  };

export default TimerEvent