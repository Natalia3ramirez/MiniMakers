
const NEW_COMMENT = 'pins/NEW_COMMENT';
const DELETE_COMMENT = 'pins/DELETE_COMMENT'

// Action Creator

export const createNewComment = (comment) => ({
  type: NEW_COMMENT,
  comment
})

export const deleteComment = (commentId) => ({
  type: DELETE_COMMENT,
  commentId
})


// Thunk

export const updateCommentThunk = (formData, commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/update/${commentId}`, {
    method: "PUT",
    body: formData
  });

  if (response.ok) {
    const data = await response.json();

    dispatch(createNewComment(formData));
    return data;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}


export const createNewCommentThunk = (formData, pinId) => async (dispatch) => {


  const response = await fetch(`/api/pins/${pinId}/comments`, {
    method: "POST",
    body: formData

  });
  if (response.ok) {
    const data = await response.json();
    dispatch(createNewComment(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(deleteComment(commentId));
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
  singlePin: {}
};

// Reducer
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case NEW_COMMENT:
      newState = { ...state, singlePin: { ...state.pin } }
      newState.singlePin[action.comment.id] = action.comment;
      return newState

    case DELETE_COMMENT:
      newState = { ...state, singlePin: { ...state.pin} };
      delete newState.singlePin[action.commentId]
      return newState

    default:
      return state;
  }
}
