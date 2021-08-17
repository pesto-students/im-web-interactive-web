// Lodash
import _property from "lodash/property";

const id = _property("id");
const etag = _property("etag");
const kind = _property("kind");
const snippet = _property("snippet");
const canReply = _property("snippet.canReply");
const isPublic = _property("snippet.isPublic");
const topLevelComment = _property("snippet.topLevelComment");
const totalReplyCount = _property("snippet.totalReplyCount");
const videoId = _property("snippet.videoId");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  id,
  etag,
  kind,
  snippet,
  canReply,
  isPublic,
  topLevelComment,
  totalReplyCount,
  videoId,
};
