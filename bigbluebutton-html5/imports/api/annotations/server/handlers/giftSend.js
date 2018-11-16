import { check } from 'meteor/check';

import { AnnotationsStreamer } from '/imports/api/annotations';

export default function handleGiftSend({}, meetingId) {
  AnnotationsStreamer.emit('gift', { meetingId });
}
