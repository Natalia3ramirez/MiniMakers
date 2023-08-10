const GET_ALL_PINS = "pins/GET_ALL_PINS";
const GET_SINGLE_PIN = "pins/GET_ONE_PIN";
const NEW_PIN = 'pins/NEW_PIN';
const DELETE_PIN = 'pins/DELETE_PIN'


// Action Creator
export const getAllPins = (pins) => ({
  type: GET_ALL_PINS,
  pins
});

export const getSinglePin = (pin) => ({
  type: GET_SINGLE_PIN,
  pin
})

export const createNewPin = (pin) => ({
  type: NEW_PIN,
  pin
})

export const deletePin = (pinId) => ({
  type: DELETE_PIN,
  pinId
})


// Thunk
export const getAllPinsThunk = () => async (dispatch) => {
  const response = await fetch('/api/pins');

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllPins(data));
    return response;
  }
}

export const getSinglePinThunk = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}`)
  if (response.ok) {
    const pin = await response.json()
    dispatch(getSinglePin(pin))
    return response
  } else {
    const errors = await response.json();
    return errors
  }

}


export const createNewPinThunk = (formData) => async (dispatch) => {
	const response = await fetch("/api/pins/new", {
		method: "POST",
		body: formData,

	});
  if (response.ok) {
    const data = await response.json();
    dispatch(createNewPin(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}

export const deletePinThunk = (pinId) => async (dispatch) => {
  const response = await fetch(`/api/pins/${pinId}`, {
    method: "DELETE",
  });

  if(response.ok){
    const data = await response.json();
    console.log("thunk pinId ----->", pinId)
    dispatch(deletePin(pinId));
    return response
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}


// Initial State
const initialState = {
  allPins: {},
  singlePin: {},
};

// Reducer
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case GET_ALL_PINS:
      newState = { ...state, allPins: {}, singlePin: {} };
      action.pins.forEach((pin) => {
        newState.allPins[pin.id] = pin;
      });
      return newState

    case GET_SINGLE_PIN:
      newState = { ...state, allPins: {}, singlePin: {} };
      newState.singlePin = action.pin
      return newState

    case NEW_PIN:
      newState = { ...state, allPins: { ...state.allPins }, singlePin: {...action.pin} }
      // const newPin = action.pin
      // newState.singlePin = newPin
      // newState.allPins[newPin.id] = newPin
      return newState

    case DELETE_PIN:
      newState = { ...state, allPins: { ...state.allPins}, singlePin: {}}
      delete newState.allPins[action.pinId]
      return newState

    default:
      return state;
  }
}
