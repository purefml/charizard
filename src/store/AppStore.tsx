'use client';
import {
  createContext,
  useReducer,
  useContext,
  FunctionComponent,
  PropsWithChildren,
  Dispatch,
  ComponentType,
} from 'react';
import AppReducer from './AppReducer';
import { APP_STORE_INITIAL_STATE, AppStoreState } from './config';


/* 
* To be considered: Usage of redux, redux persists and RTK, 
* especially for Bigger application for scalability and maintainabilty.
* this is solely for demostration but is identical to how redux works.
*/

export type AppContextReturningType = [AppStoreState, Dispatch<any>];
const AppContext = createContext<AppContextReturningType>([APP_STORE_INITIAL_STATE, () => null]);
const AppStoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {

  const initialState: AppStoreState = {
    ...APP_STORE_INITIAL_STATE,
  };
  const value: AppContextReturningType = useReducer(AppReducer, initialState);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

const useAppStore = (): AppContextReturningType => useContext(AppContext);

interface WithAppStoreProps {
  appStore: AppContextReturningType;
}
const withAppStore = (Component: ComponentType<WithAppStoreProps>): FunctionComponent =>
  function ComponentWithAppStore(props) {
    return <Component {...props} appStore={useAppStore()} />;
  };

export { AppStoreProvider, useAppStore, withAppStore };
