import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const { id, name, avatar, selected, setInterviewer } = props;

  //onClick event handler is set on the <li> element to trigger the handleClick function when the item is clicked.
  const handleClick = () => {
    setInterviewer(id);
  };

  return (
    <li className={`interviewers__item ${selected ? 'interviewers__item--selected' : ''}`} onClick={handleClick}>
      <img className="interviewers__item-image" src={avatar} alt={name} />
      {selected && name} {/* Conditionally render the name only when selected is true */}
    </li>
  );
}