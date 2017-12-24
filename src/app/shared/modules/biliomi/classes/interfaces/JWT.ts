import {Biliomi} from "./Biliomi";
import ITokenUserType = Biliomi.ITokenUserType;
import ITokenType = Biliomi.ITokenType;

export interface IJwtBody {
  sub: string; // Subject username
  iat: number; // Issued at timestamp
  iss: string; // Issuer
  exp: number; // Expiry timestamp
  usr?: string; // Subject display name
  chn?: string; // Channelname
  utp?: ITokenUserType; // User type
  ttp?: ITokenType; // Token type
}
