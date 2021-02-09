import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { styles } from './styles';

const propTypes = {
  children: PropTypes.node.isRequired,
  moderator: PropTypes.bool.isRequired,
  presenter: PropTypes.bool,
  talking: PropTypes.bool,
  muted: PropTypes.bool,
  deafed: PropTypes.bool,
  listenOnly: PropTypes.bool,
  voice: PropTypes.bool,
  noVoice: PropTypes.bool,
  color: PropTypes.string,
  emoji: PropTypes.bool,
  avatar: PropTypes.string,
  className: PropTypes.string,
};

const defaultProps = {
  moderator: false,
  presenter: false,
  talking: false,
  muted: false,
  deafed: false,
  listenOnly: false,
  voice: false,
  noVoice: false,
  color: '#000',
  emoji: false,
  avatar: '',
  className: null,
};

const UserAvatar = ({
  children,
  moderator,
  presenter,
  talking,
  muted,
  deafed,
  listenOnly,
  color,
  voice,
  emoji,
  avatar,
  noVoice,
  className,
}) => (

  <div
    aria-hidden="true"
    data-test="userAvatar"
    className={cx(styles.avatar, {
      [styles.moderator]: moderator,
      [styles.presenter]: presenter,
      [styles.muted]: muted,
      [styles.listenOnly]: listenOnly,
      [styles.voice]: voice,
      [styles.noVoice]: noVoice && !listenOnly,
    }, className)}
    style={{
      backgroundColor: color,
      color, // We need the same color on both for the border
    }}
  >

    <div className={cx({
      [styles.undeafed]: !deafed,
      [styles.deafed]: deafed,
    })}>
    {'\u00a0\ue90c\u00a0'}
    </div>

    <div className={cx({
      [styles.talking]: (talking && !muted && avatar.length === 0),
    })}
    />

    {avatar.length !== 0 && !emoji
      ? (
        <div className={styles.image}>
          <img
            className={cx(styles.img, {
              [styles.circle]: !moderator,
              [styles.square]: moderator,
            })}
            src={avatar}
          />
        </div>
      ) : (
        <div className={styles.content}>
          {children}
        </div>
      )
    }
  </div>
);

UserAvatar.propTypes = propTypes;
UserAvatar.defaultProps = defaultProps;

export default UserAvatar;
