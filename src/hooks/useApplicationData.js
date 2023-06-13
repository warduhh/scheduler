import { useState, useEffect } from "react";
import axios from "axios";


export default function useApplicationData (){

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  console.log("state",state);

  const setDay = (day) => setState((prev) => ({ ...prev, day }));

  // hook to fetch data from the server
  //renders data for days (nav bar)
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
        // console.log(error);
      });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    // Make a PUT request to update the appointment with the interview data
    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // Update the state with the new appointment
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  }

  function cancelInterview(id) {
    // Update the appointment's interview data to null
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    //Make a DELETE request to remove the interview data from the server
    return axios.delete(`/api/appointments/${id}`).then(() => {
      //Update the state with the modified appointment
      const appointments = {
        ...state.appointments,
        [id]: appointment,
      };
      setState((prev) => ({
        ...prev,
        appointments,
      }));
    });
  }

  function editInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    //Make a PUT request to edit the interview data on the server
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

   //to get the interviewers for the selected day
  // const interviewers = getInterviewersForDay(state, state.day);

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
    editInterview,
  };
}s