import React from "react";
import "components/Appointment/style.scss"
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import Confirm from "./Confirm";



export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING);

    props
      .bookInterview(props.id, interview)
      .then(() => {
        transition(SHOW); // Transition to SHOW mode when the PUT request is complete
      })
      .catch((error) => {
        console.error(error); // Handle any errors that occur during the save operation
      });
  }

  function confirmDeletion() {
    transition(CONFIRMING);
  }
  // Function to handle the deletion of an appointment
  function deleting() {
    transition(DELETING); // Transition to deleting mode
    // Call the cancelInterview function to make a DELETE request and remove the interview data
    props
      .cancelInterview(props.id)
      .then(() => {
        transition(EMPTY); // Transition back to EMPTY mode when the DELETE request is complete
      })
      .catch((error) => {
        console.log(error); // Handle any error that occurs during the delete operation
      });
  }

  // Function to edit an appointment
  function confirmEdit() {
    transition(EDIT);// Transition to EDIT mode
    // Call the editInterview function to make a PUT request and modify the interview data
    props
      .editInterview(props.id)
      .then(() => {
        transition(CREATE);// Transition back to CREATE mode
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={confirmDeletion}
          onEdit={confirmEdit}
        />
      )}

      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(EMPTY)}
        />
      )}

      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          onSave={save}
          onCancel={() => back(SHOW)}
          name={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}

      {mode === SAVING && <Status message="Saving..." />}
      {mode === DELETING && <Status message="Deleting..." />}
      {mode === CONFIRMING && (
        <Confirm
          message="Are you sure you would like to delete?"
          onConfirm={deleting}
          onCancel={() => back(SHOW)}
        />
      )}
    </article>
  );
}

