export default function reducer(state={}, action) {

    switch (action.type) {
      case "FETCH_REMINDER": {
        return {...state, fetching: true}
      }
    }

    return state
}