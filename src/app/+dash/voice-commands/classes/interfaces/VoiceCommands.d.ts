interface IVoiceCommand {
  regex: RegExp;
  executor: (...values: string[]) => void;
}
