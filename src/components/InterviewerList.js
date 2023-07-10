import React from "react";
import PropTypes from 'prop-types';
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange } = props;

  InterviewerList.prototype = {
    interviewers: PropTypes.array.isRequired
  }
  
  const interviewerList = interviewers.map(interviewerItem => {
  return (

          <InterviewerListItem
          key={interviewerItem.id}
          name={interviewerItem.name}
          avatar={interviewerItem.avatar}
          selected={interviewerItem.id === value}
          setInterviewer={() => onChange(interviewerItem.id)}
        />
        
  )
  })
     

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewers</h4>
      <ul className="interviewers__list">
          {interviewerList}
      </ul>
    </section>
  );
}