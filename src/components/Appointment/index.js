import React from "react";
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

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };

    transition(SAVING); 
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch((error) => {
        console.log("Error msg", error);
        transition(ERROR_SAVE, true);
      }); 
  }

  function confirmDeletion() {
    transition(CONFIRMING);
  }

  
  function deleting() {
    transition(DELETING, true); 
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true)); 
  }

  
  function confirmEdit() {
    transition(EDIT); 
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