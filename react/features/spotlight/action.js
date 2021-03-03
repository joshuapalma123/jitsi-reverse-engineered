import {
  VIDEO_ON_SPOTLIGHT,
  VIDEO_OFF_SPOTLIGHT,
  SET_FOLLOW_ME_MODERATOR,
} from "./actionType";

export function videoOnSpotlight(id: ?string) {
  return {
    type: VIDEO_ON_SPOTLIGHT,
    id,
  };
}

