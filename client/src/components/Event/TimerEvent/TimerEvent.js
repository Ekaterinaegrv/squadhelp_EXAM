import React, { useEffect, useState } from "react";

const TimerEvent = (props) => {

    const {todo} = props;
    const [deadlineState, setDeadline] = useState({
                                date: todo.deadline,
                                isComplete: false
                                });

    useEffect(() => {
        const dateNow = Date.parse(new Date());
        const dedlineDate = Date.parse(deadlineState.date);
        const id = setTimeout(() => {
            setDeadline(deadlineState, deadlineState.isComplete = true);
            console.log(deadlineState.isComplete);
        },
        dedlineDate - dateNow )

        return () => {
            clearInterval(id)
        }

    }, []);

    return (
        <>
            <p>{deadlineState.date}</p>
            <p>{deadlineState.isComplete ? 'Event completed' : 'not completed'}
            </p>

        </>
          )

  };

export default TimerEvent;



/**
    //     const id = setInterval(() => {
    //     const nowTime = Date.parse(new Date());
  
    //         do {
    //             setTimer((dedlineTime) => dedlineTime - 7000)

    //         } while (dedlineTime == nowTime);


    //     }, 7000)
    //     return () => {
    //         clearInterval(id)
    //     }
 */




    // const formatDate = deadlineState.date;
    // const dd = formatDate.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    // console.log(dd)
    //"2023-02-21T03:45"

    // const d = new Date("2018-09-22T22:00");
    // console.log(d);
    // const str = d.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    // console.log(str);

    // const a = deadlineState.date;
    // const f = new Date();

    //console.log(`f ${f}`);
    // var today = deadlineState.date;
    // var UTCstring = today.toUTCString();
    // console.log(`today ${today}`);
    // console.log(`UTCstring ${UTCstring}`);

    //const c = f.toUTCString()
    //const stra = f.toLocaleDateString("ru-RU", { hour: "2-digit", minute: "2-digit" });
    //console.log(`stra ${stra}`);
    //console.log(`c ${c}`);