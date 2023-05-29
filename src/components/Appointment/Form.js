import React from "react";
import { useState } from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";

export default function Form(props) {
  const { student, interviewers, interviewer, onSave, onCancel } = props;

  const [studentName, setStudentName] = useState(student || "");
  const [selectedInterviewer, setSelectedInterviewer] = useState(interviewer || null);

  const handleStudentNameChange = (event) => {
    setStudentName(event.target.value);
  };

  const handleInterviewerChange = (interviewerId) => {
    setSelectedInterviewer(interviewerId);
  };

  const reset = () => {
    setStudentName("");
    setSelectedInterviewer(null);
  };

  const cancel = () => {
    reset();
    onCancel();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(student, interviewer);
  };

  return (
      <main className="appointment__card appointment__card--create">
        <section className="appointment__card-left">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <input
              className="appointment__create-input text--semi-bold"
              name="name"
              type="text"
              placeholder="Enter Student Name"
              value={studentName}
              onChange={handleStudentNameChange}
            />
          </form>
          <InterviewerList
            interviewers={interviewers}
            value={selectedInterviewer}
            onChange={handleInterviewerChange}
          />
        </section>
        <section className="appointment__card-right">
          <section className="appointment__actions">
            <Button danger onClick={cancel}>Cancel</Button>
            <Button confirm onClick={() => onSave(studentName, selectedInterviewer)}>Save</Button>
          </section>
        </section>
      </main>
  );
}



