export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  let appointments = [];
  let appointmentsArray = [];
  for (const i of state.days) {
    if (i.name === day) {
      appointmentsArray = i.appointments;
    }
  }
  for (const i of appointmentsArray) {
    if (state.appointments[i]) {
      appointments.push(state.appointments[i])
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null
  }
  const output = {...interview};
  const appointmentsKeys = Object.keys(state.appointments)
  for (const i of appointmentsKeys) {
    if (state.appointments[i].interview === null) {
      continue;
    }
    if (state.appointments[i].interview.interviewer === interview.interviewer) {
      const interviewersKeys = Object.keys(state.interviewers);
      for (const i of interviewersKeys) {
        if (state.interviewers[i].id === output.interviewer) {
          output.interviewer = state.interviewers[i]
          return output;
        }
      }
    }
  }
}

export function getInterviewersForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  const appointments = getAppointmentsForDay(state, day)
  let interviewersArray = [];
  for (const i of appointments) {
    if (i.interview && !interviewersArray.includes(i.interview.interviewer)) {
      interviewersArray.push(i.interview.interviewer)
    }
  }
  let interviewers = [];
  for (const i of interviewersArray) {
    if (state.interviewers[i]) {
      interviewers.push(state.interviewers[i])
    }
  }
  return interviewers;
}
