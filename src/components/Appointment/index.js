import React, { useEffect } from "react";
import "./style.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import useVisualMode from "../../hooks/useVisualMode";
import Confirm from "./Confirm";
import Error from "./Error";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRMING = "CONFIRMING";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  useEffect(() => {
    // Check if we are in the EMPTY mode with a truthy interview value
    if (props.interview?.student) {
      // If interview.student exists (truthy), transition to SHOW mode
      transition(SHOW);
    } else {
      // If interview.student does not exist (falsy), transition to EMPTY mode
      transition(EMPTY);
    }
    // Safe navigation using the optional chaining operator "?"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.interview?.student]);

  // Function to handle the saving of an appointment
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING); // Transition to SAVING mode

    // Call the bookInterview function to make a PUT request and save the appointment with the interview data
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log("Error msg", error);
        transition(ERROR_SAVE, true);
      }); // Replace the SAVING mode with ERROR_SAVE in the history
  }

  function confirmDeletion() {
    transition(CONFIRMING);
  }

  // Function to handle the deletion of an appointment
  function deleting() {
    transition(DELETING, true); // Transition to DELETING mode and replace the current mode
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true)); // Transition to ERROR_DELETE mode and replace the current mode
  }

  // Function to edit an appointment
  function confirmEdit() {
    transition(EDIT); // Transition to EDIT mode
  }

  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}

      {mode === SHOW && props.interview?.student && (
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
          interviewer={props.interview.interviewer.id}
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

      {mode === ERROR_DELETE && (
        <Error
          message="Error occurred while deleting the appointment"
          onClose={() => back()}
        />
      )}

      {mode === ERROR_SAVE && (
        <Error
          message="Error occurred while saving the appointment"
          onClose={() => back()}
        />
      )}
    </article>
  );
}