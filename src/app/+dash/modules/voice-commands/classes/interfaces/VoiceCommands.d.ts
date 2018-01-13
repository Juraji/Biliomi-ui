interface IVoiceCommand {
  regex: RegExp;
  executor: (...values: string[]) => void;
}

interface IVoiceNavigationRoutes {
  commands: string[];
  path: string;
}
