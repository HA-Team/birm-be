import User from './User/User';
import Birm from './Birm/Birm';

export type TApi = {
  user: User,
  birm: Birm
}

export function createApi(): TApi {
  return {
    user: new User(),
    birm: new Birm()
  }
}