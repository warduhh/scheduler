import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

export default function InterviewerList(props) {
  const { interviewers, setInterviewer, interviewer } = props;

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
      {interviewers.map(interviwerPointer => 
        <InterviewerListItem
          key={interviwerPointer.id}
          name={interviwerPointer.name}
          avatar={interviwerPointer.avatar}
          selected={interviwerPointer.id === interviewer}
          setInterviewer={()=> setInterviewer(interviwerPointer.id)}
        />
      )}
      </ul>
    </section>
  );
}
