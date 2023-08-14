const GET_ALL_BOARDS = "pins/GET_ALL_BOARDS";
const GET_SINGLE_BOARD = "pins/GET_SINGLE_BOARD";
const NEW_BOARD = 'pins/NEW_BOARD';
const DELETE_BOARD = 'pins/DELETE_BOARD'


// Action Creator
export const getAllBoards = (boards) => ({
  type: GET_ALL_BOARDS,
  boards
});

export const getSingleBoard = (board) => ({
  type: GET_SINGLE_BOARD,
  board
})

export const createNewBoard = (board) => ({
  type: NEW_BOARD,
  board
})

export const deleteBoard = (boardId) => ({
  type: DELETE_BOARD,
  boardId
})


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

export const getSingleBoardThunk = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`)
  if (response.ok) {
    const board = await response.json()
    dispatch(getSingleBoard(board))
    return response
  } else {
    const errors = await response.json();
    return errors
  }

}



export const updateBoardThunk = (formData, boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/update/${boardId}`, {
    method: "PUT",
    body: formData
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(createNewBoard(formData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}


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

export const deleteBoardThunk = (boardId) => async (dispatch) => {
  const response = await fetch(`/api/boards/${boardId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteBoard(boardId));
    return response
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}

export const addPinToBoardThunk = (formData) => async (dispatch) => {
  const response = await fetch('/boards/add', {
    method: "PUT",
    body: formData
  })
  if (response.ok) {
    const data = await response.json();
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

    case GET_SINGLE_BOARD:
      newState = { ...state, allPinnedBoards: {}, singlePinnedBoard: {} };
      newState.singlePinnedBoard = action.board
      return newState

    case NEW_BOARD:
      newState = { ...state, allPinnedBoards: { ...state.allPinnedBoards }, singlePinnedBoards: { ...action.board } }
      return newState

    case DELETE_BOARD:
      newState = { ...state, allPinnedBoards: { ...state.allPinnedBoards }, singlePin: {} }
      delete newState.allPinnedBoards[action.boardId]
      return newState

    default:
      return state;
  }
}
