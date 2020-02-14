import {
  GET_TECHS,
  ADD_TECH,
  DELETE_TECH,
  TECHS_ERROR,
  SET_LOADING
} from '../actions/types';

const initialState = {
  techs: null,
  loading: false,
  error: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TECHS: {
      return {
        ...state,
        techs: action.payload,
        loading: false
      };
    }

    case ADD_TECH: {
      return {
        ...state,
        loading: false,
        techs: [...state.techs, action.payload]
      };
    }
    case DELETE_TECH: {
      return {
        ...state,
        loading: false,
        techs: state.techs.filter(tech => tech.id !== action.payload)
      };
    }
    case TECHS_ERROR: {
      console.error(action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    }
    case SET_LOADING: {
      return {
        ...state,
        loading: true
      };
    }

    default: {
      //   console.log(`Unsupported reducer action ${action.type}`);
      return state;
    }
  }
};
