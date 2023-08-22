
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


export const createNewCommentThunk = (formData, pinId) => async (dispatch) => {
  const response = await fetch(`/api/comments/${pinId}`, {
    method: "POST",
    body: formData,

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

// export const deleteCommentThunk = (commentId) => async (dispatch) => {
//   const response = await fetch(`/api/pins/${pinId}`, {
//     method: "DELETE",
//   });

//   if (response.ok) {
//     const data = await response.json();
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
  singlePin: {}
};

// Reducer
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case NEW_COMMENT:
      newState = { ...state, singlePin: { ...state.pin } }
      newState.pin[action.comment.id] = action.comment;
      return newState

    // case DELETE_PIN:
    //   newState = { ...state, pin: { ...state.pin} };
    //   delete newState.pin[action.commentId]
    //   return newState

    default:
      return state;
  }
}
