import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const reset = () => {
    setStudent("")
    setInterviewer("")
  };
  const cancel = () => {
    reset()
    props.onCancel()
  }
  // console.log('INTERVIEWERS', props.interviewers);
  
  
  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            value={student}
            onChange={(event) => setStudent(event.target.value)}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"

          /*
            This must be a controlled component
            your code goes here
          */
          />
        </form>
        <InterviewerList
         interviewers = {props.interviewers} value={interviewer} onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick = {cancel} danger>Cancel</Button>
          <Button onClick = {() => props.onSave(student, interviewer)} confirm>Save</Button>
        </section>
      </section>
    </main>

  )
}