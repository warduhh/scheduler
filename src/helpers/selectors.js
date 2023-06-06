export function getAppointmentsForDay(state, day) {
  const selectedDay = state.days.find((item) => item.name === day);

  if (!selectedDay) {
    return [];
  }

  const appointments = selectedDay.appointments.map(
    (id) => state.appointments[id]
  );

  return appointments;
}

export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const interviewer = state.interviewers[interview.interviewer];//interview.interviewer is interviewer id
  return {
    ...interview,
    interviewer,
  };
}

export function getInterviewersForDay(state, day) {
  const selectedInteriew = state.days.find((item) => item.name === day);

  if (!selectedInteriew) {
    return [];
  }

  const interviewers = selectedInteriew.interviewers.map(
    (id) => state.interviewers[id]
  );

  return interviewers;
}