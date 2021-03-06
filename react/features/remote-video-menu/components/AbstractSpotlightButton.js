// @flow

import { openDialog } from "../../base/dialog";
import { IconDominantSpeaker } from "../../base/icons";
import {
  getLocalParticipant,
  getParticipantById,
  isParticipantModerator,
  PARTICIPANT_ROLE,
} from "../../base/participants";
import {
  AbstractButton,
  type AbstractButtonProps,
} from "../../base/toolbox/components";
import { videoOnSpotlight } from "../../spotlight";
import { setFollowMeModerator } from "../../follow-me/actions";
import { SpotlightDialog } from ".";

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
export default class AbstractSpotlightButton extends AbstractButton<Props, *> {
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
    const { dispatch, participantID, _isSelfOnSpotLight } = this.props;
    if (_isSelfOnSpotLight) {
      dispatch(videoOnSpotlight(null));
     
    } else {
      dispatch(videoOnSpotlight(participantID));
      
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
  const videoOnSpotlight = state["features/spotlight"].id;

  return {
    _followMeEnable: state["features/base/conference"].followMeEnabled,
    _followMeModerator: state["features/follow-me"].moderator,
    _isSelfOnSpotLight: ownProps.participantID == videoOnSpotlight,
    
  };
}
