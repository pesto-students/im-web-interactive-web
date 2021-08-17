// Lodash
import _property from "lodash/property";

const id = _property("id");
const etag = _property("etag");
const kind = _property("kind");
const snippet = _property("snippet");
const videoId = _property("snippet.videoId");
const authorChannelId = _property("snippet.authorChannelId");
const authorDisplayName = _property("snippet.authorDisplayName");
const authorChannelUrl = _property("snippet.authorChannelUrl");
const authorProfileImageUrl = _property("snippet.authorProfileImageUrl");
const canRate = _property("snippet.canRate");
const likeCount = _property("snippet.likeCount");
const publishedAt = _property("snippet.publishedAt");
const textDisplay = _property("snippet.textDisplay");
const textOriginal = _property("snippet.textOriginal");
const updatedAt = _property("snippet.updatedAt");
const viewerRating = _property("snippet.viewerRating");

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  id,
  etag,
  kind,
  snippet,
  videoId,
  authorChannelId,
  authorDisplayName,
  authorChannelUrl,
  authorProfileImageUrl,
  canRate,
  likeCount,
  publishedAt,
  textDisplay,
  textOriginal,
  updatedAt,
  viewerRating,
};
