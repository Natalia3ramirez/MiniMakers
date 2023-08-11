const GET_ALL_PINNED_BOARDS = "pins/GET_ALL_PINNED_BOARDS";
// const GET_SINGLE_BOARD = "pins/GET_SINGLE_BOARD";
// const NEW_Board = 'pins/NEW_Board';
// const DELETE_BOARD = 'pins/DELETE_BOARD'


// Action Creator
export const getAllPinnedBoards = (pinnedBoards) => ({
  type: GET_ALL_PINNED_BOARDS,
  pinnedBoards
});

// export const getSinglePin = (pin) => ({
//   type: GET_SINGLE_PIN,
//   pin
// })

// export const createNewPin = (pin) => ({
//   type: NEW_PIN,
//   pin
// })

// export const deletePin = (pinId) => ({
//   type: DELETE_PIN,
//   pinId
// })


// Thunk
export const getAllPinnedBoardsThunk = () => async (dispatch) => {
  const response = await fetch('/api/boards');

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllPinnedBoards(data));
    return response;
  }
}

// export const getSinglePinThunk = (pinId) => async (dispatch) => {
//   const response = await fetch(`/api/pins/${pinId}`)
//   if (response.ok) {
//     const pin = await response.json()
//     dispatch(getSinglePin(pin))
//     return response
//   } else {
//     const errors = await response.json();
//     return errors
//   }

// }



// export const updatePinThunk = (formData, pinId) => async (dispatch) => {
//   const response = await fetch(`/api/pins/update/${pinId}`, {
//     method: "PUT",
//     body: formData
//   });

//   if (response.ok) {
//     const data = await response.json();

//     dispatch(createNewPin(formData));
//     return data;
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   }
// }


// export const createNewPinThunk = (formData) => async (dispatch) => {
//   const response = await fetch("/api/pins/new", {
//     method: "POST",
//     body: formData,

//   });
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(createNewPin(data))
//     return null
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   }
// }

// export const deletePinThunk = (pinId) => async (dispatch) => {
//   const response = await fetch(`/api/pins/${pinId}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     const data = await response.json();
//     // console.log("thunk pinId ----->", pinId)
//     dispatch(deletePin(pinId));
//     return response
//   } else if (response.status < 500) {
//     const data = await response.json();
//     if (data.errors) {
//       return data.errors;
//     }
//   }
// }


// Initial State
const initialState = {
  allPinnedBoards: {},
  singlePinnedBoard: {},
};

// Reducer
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case GET_ALL_PINNED_BOARDS:
      newState = { ...state, allPinnedBoards: {}, singlePinnedBoard: {} };
      action.pinnedBoards.forEach((pinnedBoard) => {
        newState.allPinnedBoards[pinnedBoard.id] = pinnedBoard;
      });
      return newState

    // case GET_SINGLE_PIN:
    //   newState = { ...state, allPins: {}, singlePin: {} };
    //   newState.singlePin = action.pin
    //   return newState

    // case NEW_PIN:
    //   newState = { ...state, allPins: { ...state.allPins }, singlePin: { ...action.pin } }
    //   return newState

    // case DELETE_PIN:
    //   newState = { ...state, allPins: { ...state.allPins }, singlePin: {} }
    //   delete newState.allPins[action.pinId]
    //   return newState

    default:
      return state;
  }
}
