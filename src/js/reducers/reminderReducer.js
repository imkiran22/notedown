export default function reducer(state={}, action) {

    switch (action.type) {
      case "FETCH_REMINDERS_FULFILLED": {
        return action.payload.data;
      }
    }

    return state
}