export default function reducer(state={}, action) {

    switch (action.type) {
      case "DISPLAY_ALERT": {
        return action.payload;
      }
    }

    return state;
}