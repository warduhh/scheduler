// import dependencies
import React from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "../hooks/useApplicationData";


export default function Application() {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview
  } = useApplicationData();


  // Data Selectors - helper functions are imported from Selectors module - send the state as an argument and return the interviewers and appointments for the selected day
  const dailyInterviewers = getInterviewersForDay(state, state.day);
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  // The schedule reprsents the schedule of appointments for the selected day. Iterate over the dailyAppointments and create an Appointment component for each appointment.
  const schedule = dailyAppointments.map((appointment) => {
    // Data Selector - helper function imported from Selectors module, returns interview data to be passed down the the Appointment component as a prop.
    const interview = getInterview(state, appointment.interview);
    
    return(
        <Appointment
          key={appointment.id} 
          id={appointment.id}
          time={appointment.time}
          interview={interview}
          interviewers={dailyInterviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
    )
  })


  // Render component
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            value={state.day}
            onChange={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {schedule}
        <Appointment 
          key="last" 
          time="5pm" 
        />
      </section>
    </main>
  );
}
