import { IProfile } from '../../Profile/models/IProfile';

export interface IUser {
  id: string;
  name: string;
  login: string;
  active: boolean;
  password: string;
  id_profile: string;
  profile: IProfile;
  first_acess: boolean;
  created_at?: Date;
  updated_at?: Date;
}
