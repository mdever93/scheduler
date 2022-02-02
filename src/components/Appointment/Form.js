import React, { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("")
  //clears the input field and selected interviewer
  const reset = () => {
    setStudent("")
    setInterviewer("")
  };
  //calls reset and onCancel functions
  const cancel = () => {
    reset()
    props.onCancel()
  }
  //checks to ensure that the user has entered their name and selected an interviewer
  const validate = () => {
    if (!student || !interviewer) {
      if (interviewer) { 
        setError("Student name cannot be blank");
        return;
      }
      if (student) { 
        setError("Please select an interviewer");
        return;
      }
      setError("Please enter your name and select an interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer)
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form onSubmit={event => event.preventDefault()} autoComplete="off">
          <input
            value={student}
            onChange={(event) => {
              setStudent(event.target.value)
              setError("")
            }}
            className="appointment__create-input text--semi-bold"
            name="name"
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList
          interviewers={props.interviewers} value={interviewer} onChange={setInterviewer}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button onClick={cancel} danger>Cancel</Button>
          <Button onClick={validate} confirm>Save</Button>
        </section>
      </section>
    </main>

  )
}