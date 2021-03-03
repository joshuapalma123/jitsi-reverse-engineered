/* @flow */

import React from "react";

import { translate } from "../../../base/i18n";
import { Pin } from "../../../base/icons";
import { connect } from "../../../base/redux";
import AbstractPinVideo, {
  _mapStateToProps,
  type Props,
} from "../AbstractPinVideo";

import RemoteVideoMenuButton from "./RemoteVideoMenuButton";

/**
 * Implements a React {@link Component} which displays a button for audio muting
 * a participant in the conference.
 *
 * NOTE: At the time of writing this is a button that doesn't use the
 * {@code AbstractButton} base component, but is inherited from the same
 * super class ({@code AbstractMuteButton} that extends {@code AbstractButton})
 * for the sake of code sharing between web and mobile. Once web uses the
 * {@code AbstractButton} base component, this can be fully removed.
 */
class PinVideo extends AbstractPinVideo {
  /**
   * Instantiates a new {@code Component}.
   *
   * @inheritdoc
   */
  constructor(props: Props) {
    super(props);

    this._handleClick = this._handleClick.bind(this);
  }

  /**
   * Implements React's {@link Component#render()}.
   *
   * @inheritdoc
   * @returns {ReactElement}
   */
  render() {
    const {
     _followMeEnable,
     _followMeModerator,
     _isVideoOnPin,
      participantID,
      t,
    } = this.props;
    const videoPinConfig = _isVideoOnPin
      ? {
          translationKey: "Remove Pin Video",
          videoPinClassName: `pinvideolink ${ _followMeModerator || _followMeEnable ? "disabled" : ""}` 
        }
      : {
          translationKey: "Pin Video",
          videoPinClassName: `pinvideolink ${ _followMeModerator || _followMeEnable ? "disabled" : ""}`
        };

    return (
      <RemoteVideoMenuButton
        buttonText={videoPinConfig.translationKey}
        displayClass={videoPinConfig.videoPinClassName}
        icon={Pin}
        id={`spotlightlink_${participantID}`}
        // eslint-disable-next-line react/jsx-handler-names
        onClick={this._handleClick}
      />
    );
  }

  _handleClick: () => void;
}

export default translate(connect(_mapStateToProps)(PinVideo));
