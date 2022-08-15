import { IProfile } from '../../Profile/models/IProfile';

export interface IUser {
  id: string;
  name: string;
  login: string;
  active: boolean;
  password: string;
  id_profile: string;
  profile: IProfile;
  created_at?: Date;
  updated_at?: Date;
}
