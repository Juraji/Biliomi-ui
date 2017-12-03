// Generated using typescript-generator version 1.29.366 on 2017-11-12 13:45:13.

export namespace Biliomi {

  export interface IAchievementEvent extends IEvent {
    User: IUser;
    AchievementId: string;
    Achievement: string;
  }

  export interface IAchievementRecord {
    Id: number;
    User: IUser;
    AchievementId: string;
    Achievement: string;
    Date: string;
  }

  export interface IAchievementsSettings extends ISettings {
    AchievementsEnabled: boolean;
  }

  export interface IAdventureRecord {
    Id: number;
    Adventurer: IUser;
    Bet: number;
    Payout: number;
    ByTamagotchi: boolean;
    Date: string;
  }

  export interface IAdventureSettings extends ISettings {
    JoinTimeout: number;
    MinimumBet: number;
    MaximumBet: number;
    Cooldown: number;
    WinMultiplier: number;
  }

  export interface IAnnouncement {
    Id: number;
    Message: string;
  }

  export interface IAnnouncementsSettings extends ISettings {
    Enabled: boolean;
    Shuffle: boolean;
    RunInterval: number;
    MinChatMessages: number;
  }

  export interface IBitsSettings extends ISettings {
    EnableBitsToPoints: boolean;
    BitsToPointsPayoutToAllChatters: boolean;
    BitsToPointsMultiplier: number;
  }

  export interface IChannelInfo {
    LogoUri: string;
    PreviewUri: string;
    Affiliate: boolean;
    Partner: boolean;
    ChannelName: string;
    IsOnline: boolean;
    Status: string;
    CurrentGame: IGame;
    FollowerCount: number;
    SubscriberCount: number;
    Viewers: IUser[];
    Hosters: IUser[];
  }

  export interface IChatModeratorSettings extends ISettings {
    LinksAllowed: boolean;
    LinkPermitExpireTime: number;
    ExcessiveCapsAllowed: boolean;
    CapsTrigger: number;
    CapsTriggerRatio: number;
    RepeatedCharactersAllowed: boolean;
    RepeatedCharacterTrigger: number;
    LinkWhitelist: string[];
    ExemptedGroup: IUserGroup;
    FirstStrike: IModerationAction;
    SecondStrike: IModerationAction;
    ThirdStrike: IModerationAction;
  }

  export interface ICommand {
    Id: number;
    Command: string;
    Price: number;
    Cooldown: number;
    ModeratorCanAlwaysActivate: boolean;
    SystemCommand: boolean;
    UserGroup: IUserGroup;
    Aliasses: string[];
  }

  export interface ICommandHistoryRecord {
    Id: number;
    Command: string;
    TriggeredBy: string;
    Arguments: string;
    Date: string;
    User: IUser;
    Success: boolean;
  }

  export interface ICommandRequest {
    Command: string;
  }

  export interface IConsoleInputEvent extends IEvent {
    Input: string;
    LegacyMode: boolean;
    Indentifier: string;
  }

  export interface ICustomCommand extends ICommand {
    Message: string;
  }

  export interface IDonation {
    Id: number;
    Donation: string;
    Note: string;
    User: IUser;
    Date: string;
  }

  export interface IEvent {
    EventType: string;
  }

  export interface IFollowerWatchSettings extends ISettings {
    Reward: number;
  }

  export interface IGame {
    Id: number;
    Name: string;
    FirstPlayedOn: string;
    SteamId: number;
  }

  export interface IHostRecord {
    Id: number;
    User: IUser;
    Date: string;
    AutoHost: boolean;
    Direction: IDirection;
  }

  export interface IHostWatchSettings extends ISettings {
    Reward: number;
  }

  export interface IInvestmentRecord {
    Id: number;
    Invester: IUser;
    Invested: number;
    Interest: number;
    Project: string;
    Payout: number;
    Date: string;
  }

  export interface IInvestmentSettings extends ISettings {
    InvestmentDuration: number;
    MinInterest: number;
    MaxInterest: number;
  }

  export interface IIrcChannelEvent extends IIrcEvent {
    ChannelName: string;
  }

  export interface IIrcChannelJoinedEvent extends IIrcChannelEvent {
    Username: string;
  }

  export interface IIrcChannelNoticeEvent extends IIrcChannelEvent {
    Tags: { [index: string]: any };
    Message: string;
  }

  export interface IIrcChatMessageEvent extends IIrcMessageEvent {
  }

  export interface IIrcConnectedEvent extends IIrcEvent {
  }

  export interface IIrcDisconnectedEvent extends IIrcEvent {
    Status: number;
    Reason: string;
    Remote: boolean;
    WillRestart: boolean;
  }

  export interface IIrcEvent extends IEvent {
  }

  export interface IIrcMessageEvent extends IIrcUserEvent {
    Message: string;
  }

  export interface IIrcPrivateMessageEvent extends IIrcMessageEvent {
  }

  export interface IIrcSystemMessageEvent extends IIrcMessageEvent {
  }

  export interface IIrcUserEvent extends IIrcEvent {
    Username: string;
    Tags: { [index: string]: any };
  }

  export interface IIrcUserJoinedEvent extends IIrcUserEvent {
  }

  export interface IIrcUserLeftEvent extends IIrcUserEvent {
  }

  export interface IIrcUserModeEvent extends IIrcUserEvent {
    IsModeratorMode: boolean;
  }

  export interface IKillRecord {
    Id: number;
    Killer: IUser;
    Target: IUser;
    IsSuicide: boolean;
    Date: string;
  }

  export interface ILogInfo {
    LogDate: string;
    Lines: string[];
  }

  export interface IModerationRecord {
    Id: number;
    User: IUser;
    Action: IModerationAction;
    Reason: IModerationReason;
    Message: string;
    Date: string;
  }

  export interface IPointsSettings extends ISettings {
    PointsNameSingular: string;
    PointsNamePlural: string;
    TrackOnline: boolean;
    TrackOffline: boolean;
    OnlinePayoutInterval: number;
    OfflinePayoutInterval: number;
    OnlinePayoutAmount: number;
    OfflinePayoutAmount: number;
  }

  export interface IQuote {
    Id: number;
    User: IUser;
    Message: string;
    Date: string;
    GameAtMoment: IGame;
  }

  export interface IRaidRecord {
    Id: number;
    Channel: IUser;
    Direction: IDirection;
    Date: string;
    GameAtMoment: string;
  }

  export interface IRestAuthorizationRequest {
    Username: string;
    Password: string;
  }

  export interface IRestAuthorizationResponse {
    Token: string;
    Message: string;
  }

  export interface IRestSortDirective {
    Property: string;
    Descending: boolean;
    CaseInsensitive: boolean;
  }

  export interface IRouletteRecord {
    Id: number;
    User: IUser;
    Fatal: boolean;
    Date: string;
  }

  export interface IRouletteSettings extends ISettings {
    TimeoutOnDeathEnabled: boolean;
    TimeoutOnDeath: number;
  }

  export interface ISettings {
    Type: string;
  }

  export interface ISpotifySettings extends ISettings {
    maxDuration: number;
    SongrequestsEnabled: boolean;
    SongRequestPlaylistId: string;
  }

  export interface ISteamSettings extends ISettings {
    AutoUpdateChannelGame: boolean;
  }

  export interface IStreamLabsDonationEvent extends IEvent {
    Username: string;
    FormattedAmount: string;
    Message: string;
    Amount: number;
  }

  export interface ISubscriberWatchSettings extends ISettings {
    RewardTier1: number;
    RewardTier2: number;
    RewardTier3: number;
  }

  export interface ISystemSettings extends ISettings {
    Muted: boolean;
    EnableWhispers: boolean;
  }

  export interface ITamagotchi {
    Id: number;
    Name: string;
    Species: string;
    Owner: IUser;
    Gender: IGender;
    FoodStack: number;
    MoodLevel: number;
    HygieneLevel: number;
    Affection: number;
    Deceased: boolean;
    DateOfBirth: string;
    DateOfDeath: string;
    Toys: ITamagotchiToy[];
  }

  export interface ITamagotchiSettings extends ISettings {
    NewPrice: number;
    FoodPrice: number;
    SoapPrice: number;
    MaxFood: number;
    MaxMood: number;
    MaxHygiene: number;
    NameMaxLength: number;
    BotTamagotchiEnabled: boolean;
  }

  export interface ITamagotchiToy {
    ToyName: string;
    ExpiresAt: string;
    FoodModifier: number;
    MoodModifier: number;
    HygieneModifier: number;
    Cost: number;
  }

  export interface ITemplate {
    Id: number;
    TemplateKey: string;
    Template: string;
    Description: string;
    KeyDescriptions: { [index: string]: string };
  }

  export interface ITimeTrackingSettings extends ISettings {
    TrackOnline: boolean;
    TrackOffline: boolean;
  }

  export interface ITwitchBitsEvent extends ITwitchEvent {
    Username: string;
    UserId: number;
    BitsUsed: number;
    TotalBitsUsed: number;
  }

  export interface ITwitchEvent extends IEvent {
  }

  export interface ITwitchFollowEvent extends ITwitchEvent {
    Username: string;
    TwitchId: number;
    FollowsSince: string;
  }

  export interface ITwitchHostInEvent extends ITwitchEvent {
    ChannelName: string;
    IsAuto: boolean;
  }

  export interface ITwitchHostOutEvent extends ITwitchEvent {
    Target: string;
  }

  export interface ITwitchSubscriberEvent extends ITwitchEvent {
    Username: string;
    UserId: number;
    Time: string;
    SubPlan: ISubscriberPlanType;
    IsResub: boolean;
  }

  export interface ITwitterSettings extends ISettings {
    TrackedKeywords: string[];
  }

  export interface IUser {
    Id: number;
    Username: string;
    DisplayName: string;
    TwitchUserId: number;
    UserGroup: IUserGroup;
    Title: string;
    RecordedTime: number;
    Points: number;
    Caster: boolean;
    Moderator: boolean;
    Follower: boolean;
    FollowDate: string;
    Subscriber: boolean;
    SubscribeDate: string;
    BlacklistedSince: string;
  }

  export interface IUserAdventureRecordStats extends IUserRecordStats {
    TotalPayout: number;
    PercentageByTamagotchi: number;
  }

  export interface IUserGreeting {
    Id: number;
    User: IUser;
    Message: string;
  }

  export interface IUserGreetingSettings extends ISettings {
    EnableGreetings: boolean;
    GreetingTimeout: number;
  }

  export interface IUserGroup {
    Id: number;
    Name: string;
    Weight: number;
    DefaultGroup: boolean;
    LevelUpHours: number;
  }

  export interface IUserInvestRecordStats extends IUserRecordStats {
    TotalInvested: number;
    TotalEarned: number;
  }

  export interface IUserKDRRecordStats extends IUserRecordStats {
    Suicides: number;
    FavoriteTarget: IUser;
    KDR: string;
  }

  export interface IUserRecordStats {
    RecordCount: number;
    Losses: number;
    Wins: number;
    IsMoreWins: boolean;
  }

  export interface IVersionInfo {
    Version: string;
    BuildDate: string;
  }

  export enum IDirection {
    INCOMING = "INCOMING",
    OUTGOING = "OUTGOING",
  }

  export enum IGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
    NEUTRAL = "NEUTRAL",
  }

  export enum IModerationAction {
    WARN = "WARN",
    PURGE = "PURGE",
    TIMEOUT = "TIMEOUT",
    BAN = "BAN",
  }

  export enum IModerationReason {
    POSTED_LINK = "POSTED_LINK",
    EXCESSIVE_CAPS = "EXCESSIVE_CAPS",
    REPEATED_CHARACTERS = "REPEATED_CHARACTERS",
    UNKNOWN = "UNKNOWN",
  }

  export enum ISubscriberPlanType {
    PRIME = "PRIME",
    TIER1 = "TIER1",
    TIER2 = "TIER2",
    TIER3 = "TIER3",
  }

  export enum ITokenUserType {
    CASTER = "CASTER",
    MODERATOR = "MODERATOR",
  }

}
