import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  // console.log('INTERVIEWERS', interviewers);
  const parsedInterviewers = interviewers.map((interviewerItem) => (
    <InterviewerListItem
      key={interviewerItem.id}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewerItem.id === value}
      setInterviewer={() => onChange(interviewerItem.id)}
       />
  ))
  console.log("PARSED INTERVIEWERS", parsedInterviewers);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
}