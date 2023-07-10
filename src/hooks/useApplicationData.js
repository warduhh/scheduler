import { useState, useEffect } from "react";
import axios from "axios";
import {getAppointmentsForDay} from "../helpers/selectors";

export default function useApplicationData (){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  console.log("state",state);
  console.log("Here is the State;",state.day);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) => {
        const [daysResponse, appointmentsResponse, interviewersResponse] = all;
        setState((prev) => ({
          ...prev,
          days: daysResponse.data,
          appointments: appointmentsResponse.data,
          interviewers: interviewersResponse.data,
        }));
      })
      .catch((error) => {

      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {

      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState((prev) => ({
        ...prev,
        appointments,
      }));
      updateSpots(appointments);
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState((prev) => ({
        ...prev,
        appointments,
      }));
       updateSpots(appointments);
    });
  }

  function editInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

  
    return axios
      .put(`/api/appointments/${id}`)
      .then(() => {
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        setState((prev) => ({
          ...prev,
          appointments,
        }));
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateSpots(appointments) {
    console.log("Updating spots...", appointments);
    const days = state.days.map((day) => {
      const spots = getAppointmentsForDay({ days: state.days, appointments }, day.name).reduce(

        (count, appointment) => {
          console.log("Appoint[id]:", appointments[appointment.id]);
          console.log("apps", appointments);
          console.log("ID",appointment.id);
          if (appointments[appointment.id].interview === null) {
            return count + 1; // Increment the count if the appointment has no interview
          }
          return count; // Keep the count as is if the appointment has an interview
        },0);// Initial count value is 0

      // Return a new object with the updated 'spots' value for the day
      // console.log("Spots:",spots);
      return { ...day, spots };
    });

    // Update the state with the updated 'days' array
    setState((prev) => ({
      ...prev,
      days,
    }));
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview,
  };
}