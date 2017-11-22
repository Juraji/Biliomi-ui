export enum BILIOMI_API {
  API_URI_PREFIX = "/api",
  EVENTS_ENDPOINT = "/events",
  COMMAND_ENDPOINT = "/events/commands/run",
  CLI_COMMAND_ENDPOINT = "/events/commands/cli/run",
}

export enum BILIOMI_CLI_COMMANDS {
  // Exit Biliomi
  EXIT = "exit",
  // Hot restart Biliomi
  RESTART = "restart",
  // Add a REST api user
  API_ADD_USER = "apiadduser",
  // Delete a REST api user
  API_DELETE_USER = "apideleteuser",
  // Export a CSV of your custom commands
  EXPORT_COMMANDS = "exportcommands",
  // Export a CSV of all system commands
  EXPORT_SYSTEM_COMMANDS = "exportsystemcommands",
  // Import your Steam library using the information in the user settings
  IMPORT_STEAM_LIBRARY = "importsteamlibrary",
  // Manually run the ModWatch
  UPDATE_MODS = "updatemods",
  // Force the Tamagotchi Aging service to run aging
  FORCE_TG_AGING = "forcetamagotchiaging",
}

export enum BILIOMI_EVENTS {
  ACHIEVEMENT_EVENT = "AchievementEvent",
  CONSOLE_INPUT_EVENT = "ConsoleInputEvent",
  IRC_CHANNEL_JOINED_EVENT = "IrcChannelJoinedEvent",
  IRC_CHANNEL_NOTICE_EVENT = "IrcChannelNoticeEvent",
  IRC_CHAT_MESSAGE_EVENT = "IrcChatMessageEvent",
  IRC_CONNECTED_EVENT = "IrcConnectedEvent",
  IRC_DISCONNECTED_EVENT = "IrcDisconnectedEvent",
  IRC_EVENT = "IrcEvent",
  IRC_PRIVATE_MESSAGE_EVENT = "IrcPrivateMessageEvent",
  IRC_SYSTEM_MESSAGE_EVENT = "IrcSystemMessageEvent",
  IRC_USER_JOINED_EVENT = "IrcUserJoinedEvent",
  IRC_USER_LEFT_EVENT = "IrcUserLeftEvent",
  IRC_USER_MODE_EVENT = "IrcUserModeEvent",
  STREAM_LABS_DONATION_EVENT = "StreamLabsDonationEvent",
  TWITCH_BITS_EVENT = "TwitchBitsEvent",
  TWITCH_EVENT = "TwitchEvent",
  TWITCH_FOLLOW_EVENT = "TwitchFollowEvent",
  TWITCH_HOST_IN_EVENT = "TwitchHostInEvent",
  TWITCH_HOST_OUT_EVENT = "TwitchHostOutEvent",
  TWITCH_SUBSCRIBER_EVENT = "TwitchSubscriberEvent",
}
