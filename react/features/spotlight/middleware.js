// @flow
import {
  getParticipantById,
  getPinnedParticipant,
  PARTICIPANT_LEFT,
  pinParticipant,
} from "../base/participants";
import { MiddlewareRegistry, set } from "../base/redux";
import { FOLLOW_ME_COMMAND } from "./constant";
import { VIDEO_ON_SPOTLIGHT } from "./actionType";
import { getCurrentConference } from "../base/conference";
import { isFollowMeActive } from "../follow-me/functions";
import { setFollowMeModerator } from "../follow-me/actions";
import { SET_FOLLOW_ME_MODERATOR } from "../follow-me/actionTypes";

import { videoOnSpotlight } from "./action";

declare var APP: Object;

/**
 * The timeout after which a follow-me command that has been received will be
 * ignored if not consumed.
 *
 * @type {number} in seconds
 * @private
 */
const _FOLLOW_ME_RECEIVED_TIMEOUT = 30;

/**
 * An instance of a timeout used as a workaround when attempting to pin a
 * non-existent particapant, which may be caused by participant join information
 * not being received yet.
 *
 * @type {TimeoutID}
 */
let nextOnStageTimeout;

/**
 * A count of how many seconds the nextOnStageTimeout has ticked while waiting
 * for a participant to be discovered that should be pinned. This variable
 * works in conjunction with {@code _FOLLOW_ME_RECEIVED_TIMEOUT} and
 * {@code nextOnStageTimeout}.
 *
 * @type {number}
 */
let nextOnStageTimer = 0;

MiddlewareRegistry.register((store) => (next) => (action) => {
  switch (action.type) {
    case VIDEO_ON_SPOTLIGHT:
      const conference = getCurrentConference(store.getState());

      if (action.id) {
        conference.sendCommand(FOLLOW_ME_COMMAND, {
          attributes: { nextOnStage: action.id },
        });
        store.dispatch(pinParticipant(action.id));
      } else {
        conference.sendCommandOnce(FOLLOW_ME_COMMAND, {
          attributes: { off: true },
        });
      }
      break;

    case PARTICIPANT_LEFT:
      if (store.getState()["features/spotlight"].id === action.participant.id) {
        store.dispatch(videoOnSpotlight(null));
      }
      break;
  }

  return next(action);
});
