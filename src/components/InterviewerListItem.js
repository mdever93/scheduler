import React from "react";
import classNames from "classnames";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  const interviewerClass = classNames('interviewers__item', {
    'interviewers__item--selected': selected
  })
  const renderName = () => {
    if (selected) {
      return name;
    }
  }
  return (
    <li onClick={setInterviewer} className={interviewerClass}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {renderName()}
    </li>

  )
}