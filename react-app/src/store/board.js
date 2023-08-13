const GET_ALL_BOARDS = "pins/GET_ALL_BOARDS";
// const GET_SINGLE_BOARD = "pins/GET_SINGLE_BOARD";
const NEW_BOARD = 'pins/NEW_BOARD';
// const DELETE_BOARD = 'pins/DELETE_BOARD'


// Action Creator
export const getAllBoards = (boards) => ({
  type: GET_ALL_BOARDS,
  boards
});

// export const getSinglePin = (pin) => ({
//   type: GET_SINGLE_PIN,
//   pin
// })

export const createNewBoard = (board) => ({
  type: NEW_BOARD,
  board
})

// export const deletePin = (pinId) => ({
//   type: DELETE_PIN,
//   pinId
// })


// Thunk
export const getAllBoardsThunk = () => async (dispatch) => {
  const response = await fetch('/api/boards');

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllBoards(data));
    return response;
   } else {
    const errors = await response.json();
    return errors
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


export const createNewBoardThunk = (formData) => async (dispatch) => {
  const response = await fetch("/api/boards/new", {
    method: "POST",
    body: formData,

  });
  if (response.ok) {
    const data = await response.json();
    await dispatch(createNewBoard(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}

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

    case GET_ALL_BOARDS:
      newState = { ...state, allPinnedBoards: {}, singlePinnedBoard: {} };
      action.boards.forEach((board) => {
        newState.allPinnedBoards[board.id] = board;
      });
      return newState

    // case GET_SINGLE_PIN:
    //   newState = { ...state, allPins: {}, singlePin: {} };
    //   newState.singlePin = action.pin
    //   return newState

    case NEW_BOARD:
      newState = { ...state, allPinnedBoards: { ...state.allPins }, singlePinnedBoards: { ...action.pin } }
      return newState

    // case DELETE_PIN:
    //   newState = { ...state, allPins: { ...state.allPins }, singlePin: {} }
    //   delete newState.allPins[action.pinId]
    //   return newState

    default:
      return state;
  }
}