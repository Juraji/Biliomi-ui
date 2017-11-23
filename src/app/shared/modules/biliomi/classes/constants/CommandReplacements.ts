import {Dictionary} from "../../../ts-utilities/FunctionalInterface";

export const STATIC_COMMAND_REPLACEMENTS: Dictionary = {
  callername: "The display name of the calling user",
  callerpoints: "The formatted amount of points of the calling user",
  callertime: "The formatted recorded time of the calling user",
  callergroup: "The name of the calling user's user group"
};

export const ARG_COMMAND_REPLACEMENTS: Dictionary = {
  firstargument: "The first argument supplied to the command",
  firstargumentasuser: "The first argument supplied to the command resolved as display name",
  allarguments: "All arguments supplied to the command separated by spaces"
};
