import {AppState} from '../../config/StoreConfig';
import {IAuth} from '../../domain/authentication/interfaces/IAuth';
import {getStore} from './redux';

import {useSelector} from 'react-redux';

export function useSelectors() {
  const auth = useSelector((state: AppState) => state.auth);
  return {auth};
}
