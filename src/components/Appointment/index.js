import React from "react";
import "./styles.scss"
import useVisualMode from "hooks/useVisualMode";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {

  function save(name, interviewer) {
    //creates the interview object
    const interview = {
      student: name,
      interviewer
    };
    //sets the mode to SAVE
    transition(SAVE);
    //calls bookInterview with appointment id and interview
    //sets mode to SHOW or ERROR_SAVE
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true))
  }

  function deleteAppointment() {
    //sets mode to DELETE and replace to true
    transition(DELETE, true)
    //calls cancelInterview with appointment id
    //sets mode to EMPTY or ERROR_DELETE
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERROR_DELETE, true))
  }

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVE = "SAVE";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW &&
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      }
      {mode === CREATE &&
        <Form
          onSave={save}
          onCancel={() => back()}
          interviewers={props.interviewers}
        />}
      {mode === EDIT &&
        <Form
          onSave={save}
          onCancel={() => back()}
          interviewers={props.interviewers}
          interviewer={props.interview.interviewer.id}
          student={props.interview.student}
        />}
      {mode === SAVE && <Status message={'Saving'} />}
      {mode === DELETE && <Status message={'Deleting'} />}
      {mode === CONFIRM &&
        <Confirm
          message={'Are you sure you would like to delete?'}
          onConfirm={deleteAppointment}
          onCancel={() => back()}
        />}
      {mode === ERROR_DELETE &&
        <Error
          message={'could not delete appointment'}
          onClose={() => back()}
        />}
      {mode === ERROR_SAVE &&
        <Error
          message={'could not save appointment'}
          onClose={() => back()}
        />}
    </article>

  )
}