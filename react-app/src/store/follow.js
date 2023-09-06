const GET_ALL_FOLLOWS = 'follows/GET_ALL_FOLLOWS';
const FOLLOW_USER = 'pinsfollows/FOLLOW_USER';
const UNFOLLOW_USER = 'pinsfollows/UNFOLLOW_USER';


// Action Creator

export const getAllFollowers = (follows) => ({
  type: GET_ALL_FOLLOWS,
  follows
})

export const followUser = (follow) => ({
  type: FOLLOW_USER,
  follow
})

export const unfollowUser = (followId) => ({
  type: UNFOLLOW_USER,
  followId
})

// Thunk



export const getAllFollowersThunk = () => async (dispatch) => {
  const response = await fetch('/api/follows/');

  if (response.ok) {
    const data = await response.json();
    dispatch(getAllFollowers(data));
    return response;
  }
}

export const followUserThunk = (formData) => async (dispatch) => {
  const response = await fetch("/api/follows/new", {
    method: "POST",
    body: formData,

  });
  if (response.ok) {
    const data = await response.json();
    dispatch(followUser(data))
    return null
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  }
}




export const unfollowUserThunk = (followId) => async (dispatch) => {
  const response = await fetch(`/api/follows/${followId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(unfollowUser(followId));
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
  follows: {}
};

// Reducer
export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {

    case GET_ALL_FOLLOWS:
      newState = { ...state, follows: {} }
      action.follows.forEach((follow) => {
        newState.follows[follow.id] = follow;
      });
      return newState

    case FOLLOW_USER:
      newState = { ...state, follows: {...state.follows} }
      return newState

    case UNFOLLOW_USER:
      newState = { ...state, follows: { ...state.follows} };
      delete newState.follows[action.followId]
      return newState

    default:
      return state;
  }
}
