import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    //get request to the server
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ])
      //setting state with the returned data or handling errors
      .then(all => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch((err) => console.log(err.message));
  }, [state.day])

  function bookInterview(id, interview) {
    //creating the new appointment object
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    //creating the new appointments object
    //adding the new appointment object
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let days = [...state.days];
    //checking for an already existing interview at the current appointment
    //if there is already an interview at this appointment we do not need to update spots
    if (state.appointments[id].interview === null) {
      days = updateSpots('save');
    }
    //sending the new appointment object to the server
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        //setting the state to add the new appointments object
        setState({
          ...state,
          appointments,
          days
        })
      }
      )
  }

  function cancelInterview(id) {
    //creating a new appointments object
    const appointments = { ...state.appointments };
    //using the appointment id to find the correct appointment and set the value of interview to null
    appointments[id].interview = null
    const days = updateSpots('delete')
    //sending a delete request to the server with the appointment id we would like to delete
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        //setting the state to add the new appointments object
        setState({
          ...state,
          appointments,
          days
        })
      }
      )
  }

  function updateSpots(type) {
    //finds the currently selected day in state.days
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        //if we are booking a new interview, spots will be reduced by one
        if (type === 'save') {
          return { ...day, spots: day.spots - 1 };
        }
        //otherwise, spots will be increased by one
        //this will only be triggered if we are deleting an interview because editing will not call this function
        return { ...day, spots: day.spots + 1 };
      }
      return { ...day }
    })
    return days;
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}