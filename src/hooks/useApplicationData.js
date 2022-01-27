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
    Promise.all([
      axios.get('http://localhost:8001/api/days'),
      axios.get('http://localhost:8001/api/appointments'),
      axios.get('http://localhost:8001/api/interviewers'),
    ])
      .then(all => {
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
      .catch((err) => console.log(err.message));
  }, [state.day])

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    let days = [...state.days]
    if (state.appointments[id].interview === null) {
      days = updateSpots('save')
    }

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
    const appointments = { ...state.appointments };
    appointments[id].interview = null
    const days = updateSpots('delete')
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState({
          ...state,
          appointments,
          days
        })
      }
      )
  }

  function updateSpots(type) {
    const days = state.days.map((day) => {
      if (day.name === state.day) {
        if (type === 'save') {
          return { ...day, spots: day.spots - 1 }
        }
        return { ...day, spots: day.spots + 1 }
      }
      return { ...day }
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