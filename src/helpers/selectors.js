export function getAppointmentsForDay(state, day) {
  // console.log("STATE: ", state);
  // console.log("DAY", day);
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
  // console.log("APPOINTMENTS ARRAY", appointmentsArray);
  for (const i of appointmentsArray) {
    if (state.appointments[i]) {
      appointments.push(state.appointments[i])
    }
  }
  // console.log("APPOINTMENTS", appointments);
  return appointments;
}

export function getInterview(state, interview) {
  // console.log("STATE: ", state);
  // console.log("INTERVIEW", interview);
  if (interview === null) {
    return null
  }
  const output = interview;
  console.log("OUTPUT:", output);
  const appointmentsKeys = Object.keys(state.appointments)
  for (const i of appointmentsKeys) {
    if (state.appointments[i].interview === null) {
      continue;
    }
    console.log(state.appointments[i]);
    if (state.appointments[i].interview.interviewer === interview.interviewer) {
      const interviewersKeys = Object.keys(state.interviewers);
      for (const i of interviewersKeys) {
        console.log('HELLO OUTPUT.INTERVIEWER', output.interviewer, i);
        if (state.interviewers[i].id === output.interviewer) {
          output.interviewer = state.interviewers[i]
          return output;
        }
      }
    }
  }
}