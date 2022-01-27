import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss"
import PropTypes from 'prop-types';

export default function InterviewerList(props) {
  const { interviewers, onChange, value } = props;
  const parsedInterviewers = interviewers.map((interviewerItem) => (
    <InterviewerListItem
      key={interviewerItem.id}
      name={interviewerItem.name}
      avatar={interviewerItem.avatar}
      selected={interviewerItem.id === value}
      setInterviewer={() => onChange(interviewerItem.id)}
       />
  ))
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">{parsedInterviewers}</ul>
    </section>
  )
}
InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired
};
