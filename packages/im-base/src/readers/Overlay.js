// Lodash
import _property from "lodash/property";

const id = _property("overlayId");
const title = _property("templateTitle");
const jumpPoint = _property("jumpPoint");
const leftAction = _property("templateLeftAction");
const rightAction = _property("templateRightAction");
const leftLabel = _property("templateLeftLabel");
const rightLabel = _property("templateRightLabel");

export default {
  id,
  title,
  jumpPoint,
  leftAction,
  rightAction,
  leftLabel,
  rightLabel,
};
