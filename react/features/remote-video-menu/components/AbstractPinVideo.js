// @flow

import { openDialog } from "../../base/dialog";
import { IconDominantSpeaker } from "../../base/icons";
import {
  getLocalParticipant,
  getParticipantById,
  isParticipantModerator,
  PARTICIPANT_ROLE,
  pinParticipant
} from "../../base/participants";
import {
  AbstractButton,
  type AbstractButtonProps,
} from "../../base/toolbox/components";
import { setFollowMeModerator } from "../../follow-me/actions";

export type Props = AbstractButtonProps & {
  /**
   * The redux {@code dispatch} function.
   */
  dispatch: Function,

  /**
   * The ID of the participant for whom to grant moderator status.
   */
  participantID: string,

  /**
   * The function to be used to translate i18n labels.
   */
  t: Function,
};

/**
 * An abstract remote video menu button which kicks the remote participant.
 */
export default class AbstractPinVideo extends AbstractButton<Props, *> {
  accessibilityLabel = "toolbar.accessibilityLabel.grantModerator";
  icon = IconDominantSpeaker;
  label = "videothumbnail.grantModerator";

  /**
   * Handles clicking / pressing the button, and kicks the participant.
   *
   * @private
   * @returns {void}
   */
  _handleClick() {
    const { dispatch, participantID, _isVideoOnPin,pinVideo } = this.props;
    if (_isVideoOnPin) {
      dispatch(pinParticipant(null));
      console.log(pinParticipant(null))
    } else {
      dispatch(pinParticipant(participantID));
      console.log(pinParticipant(participantID))
      
    }
  }
}

/**
 * Function that maps parts of Redux state tree into component props.
 *
 * @param {Object} state - Redux state.
 * @param {Object} ownProps - Properties of component.
 * @private
 * @returns {{
 *     visible: boolean
 * }}
 */
export function _mapStateToProps(state: Object, ownProps: Props) {
  const pinParticipant = state["features/base/participants"].id;

  return {
    _followMeEnable: state["features/base/conference"].followMeEnabled,
    _followMeModerator: state["features/follow-me"].moderator,
    _isSelfOnSpotLight: state["features/base/conference"].id == pinParticipant,
  };
}
