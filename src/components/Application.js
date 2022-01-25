import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";


export default function Application(props) {
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

  let dailyAppointments = [];
  dailyAppointments = getAppointmentsForDay(state, state.day)

  const interviewers = getInterviewersForDay(state, state.day)

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
    return axios.put(`/api/appointments/${id}`, appointment )
    .then(
      console.log(1),
      setState({
        ...state,
        appointments
      })
    )
    
  }

  function cancelInterview(id) {
    console.log(id);
    const appointments = {...state.appointments};
    appointments[id].interview = null
    console.log('APPOINTMENTS', appointments);
    return axios.delete(`/api/appointments/${id}`)
    .then (
      setState({
        ...state,
        appointments
      })
    )
    // console.log(state.appointments);
  }
  
  const appointmentsList = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    return (
      <Appointment
      key={appointment.id}
      id={appointment.id}
      time={appointment.time}
      interview={interview}
      interviewers = {interviewers}
      bookInterview = {bookInterview}
      cancelInterview = {cancelInterview} />
      )
    })
    
    // console.log('INTERVIEWERS', interviewers);
    // console.log('DAILYAPPOINTMENTS', dailyAppointments);
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
        {appointmentsList}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
