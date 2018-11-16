import RedisPubSub from '/imports/startup/server/redis';
import { processForHTML5ServerOnly } from '/imports/api/common/server/helpers';
import handleWhiteboardCleared from './handlers/whiteboardCleared';
import handleWhiteboardUndo from './handlers/whiteboardUndo';
import handleWhiteboardSend from './handlers/whiteboardSend';
import handleWhiteboardAnnotations from './handlers/whiteboardAnnotations';
import handleGiftSend from './handlers/giftSend';

RedisPubSub.on('ClearWhiteboardEvtMsg', handleWhiteboardCleared);
RedisPubSub.on('UndoWhiteboardEvtMsg', handleWhiteboardUndo);
RedisPubSub.on('SendWhiteboardAnnotationEvtMsg', handleWhiteboardSend);
RedisPubSub.on('GetWhiteboardAnnotationsRespMsg', processForHTML5ServerOnly(handleWhiteboardAnnotations));

RedisPubSub.on('SendWhiteboardGiftMsg', processForHTML5ServerOnly(handleGiftSend));
