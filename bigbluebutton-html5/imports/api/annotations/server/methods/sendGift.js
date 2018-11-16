import Acl from '/imports/startup/acl';
import RedisPubSub from '/imports/startup/server/redis';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export default function sendGift(credentials) {
  const REDIS_CONFIG = Meteor.settings.private.redis;
  const CHANNEL = REDIS_CONFIG.channels.toHtml5;
  const EVENT_NAME = 'SendWhiteboardGiftMsg';

  const { meetingId, requesterUserId, requesterToken } = credentials;

  check(meetingId, String);
  check(requesterUserId, String);
  check(requesterToken, String);

  // We allow messages to pass through in 3 cases:
  // 1. When it's a standard message in presenter mode (Acl check)
  // 2. When it's a standard message in multi-user mode (getMultUserStatus check)
  // 3. When it's the last message, happens when the user is currently drawing
  // and then slide/presentation changes, the user lost presenter rights,
  // or multi-user whiteboard gets turned off
  // So we allow the last "DRAW_END" message to pass through, to finish the shape.
  const allowed = Acl.can('methods.sendGift', credentials);

  if (!allowed) {
    throw new Meteor.Error('not-allowed', `User ${requesterUserId} is not allowed to send an annotation`);
  }

  return RedisPubSub.publishUserMessage(CHANNEL, EVENT_NAME, meetingId, requesterUserId, {});
}

