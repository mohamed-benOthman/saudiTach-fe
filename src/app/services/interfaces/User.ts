import { UserProfile } from './UserProfile';

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
  profile: UserProfile;
  groups: any; // add interface...
  config: any; // add interface...
}
