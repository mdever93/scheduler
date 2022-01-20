import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const appointmentTime = () => {
    if (props.time) {
      return `Appointment at ${props.time}`
    }
    return 'No Appointments'
  }
  return (
    <article className="appointment">
      {appointmentTime()}
      <Header time = {props.time} />
      {props.interview ? <Show /> : <Empty />}
      </article>

  )
}