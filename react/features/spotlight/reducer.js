import { ReducerRegistry, set } from "../base/redux";
import {
  VIDEO_ON_SPOTLIGHT,
  VIDEO_OFF_SPOTLIGHT,
  SET_FOLLOW_ME_MODERATOR,
} from "./actionType";

ReducerRegistry.register("features/spotlight", (state = {}, action) => {
  switch (action.type) {
    case VIDEO_ON_SPOTLIGHT: {
      return {
        ...state,
        id: action.id,
      };
    }

    case SET_FOLLOW_ME_MODERATOR: {
      let newState = set(state, "moderator", action.id);

      if (!action.id) {
        // clear the state if feature becomes disabled
        newState = set(newState, "state", undefined);
      }

      return newState;
    }
    default:
      return state;
  }
});
