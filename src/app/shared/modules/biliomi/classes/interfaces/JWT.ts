import {Biliomi} from "./Biliomi";
import ITokenUserType = Biliomi.ITokenUserType;

export interface IJwtBody {
  sub: string; // Subject/Username
  iat: number; // Issued at timestamp
  iss: string; // Issuer
  exp: number; // Expiry timestamp
  chn: string; // Channelname
  utp: ITokenUserType; // User type
}
