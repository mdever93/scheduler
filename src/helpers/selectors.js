export function getAppointmentsForDay(state, day) {
  if (state.days.length === 0) {
    return [];
  }
  let appointments = [];
  let appointmentsArray = [];
  //finds the given day in state.days
  //gets the appointments array for the correct day
  for (const i of state.days) {
    if (i.name === day) {
      appointmentsArray = i.appointments;
    }
  }
  //finds the appointments that match the ids in appointmentsArray
  //pushes those appointments to the appointments array
  for (const i of appointmentsArray) {
    if (state.appointments[i]) {
      appointments.push(state.appointments[i]);
    }
  }
  return appointments;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }
  //creates a new object that is a copy of the given interview object
  const output = {...interview};
  const appointmentsKeys = Object.keys(state.appointments);
  //iterates through the keys of the state.appointments object
  for (const i of appointmentsKeys) {
    //filters out appointments that don't have a sceduled interview
    //prevents the next if statement from causing errors
    if (state.appointments[i].interview === null) {
      continue;
    }
    //finds the interviewer in each appointments object and compares it to the interviewer for the given interview
    if (state.appointments[i].interview.interviewer === interview.interviewer) {
      //when it finds a match it gets the keys of the state.interviewers object
      const interviewersKeys = Object.keys(state.interviewers);
      //iterates through the keys of the state.interviewsers object
      for (const i of interviewersKeys) {
        //compares the id of each interviewer to the interviewer in the given interview
        if (state.interviewers[i].id === interview.interviewer) {
          //when matching id is found output.interviewer set to the matching interviewer object
          output.interviewer = state.interviewers[i];
          return output;
        }
      }
    }
  }
}

export function getInterviewersForDay(state, day) {
  if (!state.days) {
    return [];
  }
  //finds the given day in the state object
  let foundDay;
  for (const i of state.days) {
    if (i.name === day) {
      foundDay = i;
      break;
    }
  }
  if (!foundDay) {
    return [];
  }
  const interviewers = [];
  //iterates through the interviewers array for the selected day
  for (const i of foundDay.interviewers) {
    //each id from the interviewers array is used to push the interviewer with the matching id to the interviewers array
    interviewers.push(state.interviewers[i])
  }

  return interviewers;
}
