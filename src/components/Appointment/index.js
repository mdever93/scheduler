import React from "react";
import "./styles.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props) {
  console.log('PROPS', props);
  const appointmentTime = () => {
    if (props.time) {
      return `Appointment at ${props.time}`
    }
    return 'No Appointments'
  }
  function save(name, interviewer) {
    // console.log(name, interviewer);
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVE);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
  }

  function deleteAppointment() {
    transition(DELETE)
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
  }
  
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE"
  const CONFIRM = "CONFIRM"
  const EDIT = "EDIT"
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  // console.log('INTERVIEWERS', props.interviewers);

  return (
    <article className="appointment">
      {appointmentTime()}
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete = {() => transition(CONFIRM)}
          onEdit = {() => transition(EDIT)}
        />
      )}
      {mode === CREATE && <Form
      onSave = {save} 
      onCancel = {() => back()}
      interviewers = {props.interviewers}
       />}
      {mode === EDIT && <Form
      onSave = {save} 
      onCancel = {() => back()}
      interviewers = {props.interviewers}
      interviewer={props.interview.interviewer.id}
      student={props.interview.student}
       />}
      {mode === SAVE && <Status message = {'Saving'} />}
      {mode === DELETE && <Status message = {'Deleting'} />}
      {mode === CONFIRM && <Confirm
      message = {'Are you sure you would like to delete?'}
      onConfirm = {deleteAppointment}
      onCancel = {() => back()} />}
    </article>

  )
}