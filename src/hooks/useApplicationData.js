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
  // const setDays = (days) => setState(prev => ({ ...prev, days }));

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ])
      .then(all => {
        // console.log(all[0]); // first
        // console.log(all[1]); // second
        // console.log(all[2]); // second

        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch((err) => console.log(err.message));
  }, [state.day])

  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const days = updateSpots('save')

    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        })
      }
      )
  }

  function cancelInterview(id) {
    console.log(id);
    const appointments = { ...state.appointments };
    appointments[id].interview = null
    const days = updateSpots('delete')
    console.log('APPOINTMENTS', appointments);
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        })
      }
      )
    // console.log(state.appointments);
  }

  function updateSpots(type) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (type === 'save') {
          return { ...day, spots: day.spots - 1 }
        }
        return {...day, spots: day.spots + 1}
      }
      return {...day}
    })
    return days
  }

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview
  }

}