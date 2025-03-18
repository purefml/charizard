import { Reducer } from 'react';
import { AppStoreState } from './config';

/**
 * I consider using "Redux instead of this together with RTK and Redux Persists
 * but due to the simplicity of the app required I opt using context and built in redux reducers.
 */


const AppReducer: Reducer<AppStoreState, any> = (state, action) => {
  switch (action.type || action.action) {
    case 'SET_REFERRALS':
      return {
        ...state,
        referrals: action?.payload,
      };
    case 'ADD_REFERRAL':
      return {
        ...state,
        referrals: [...state.referrals, action.payload], // ✅ Append new referral
      };
    case 'REMOVE_REFERRAL':
      return {
        ...state,
        referrals: state.referrals.filter(referral => referral._id !== action.payload),
      };
    case 'SET_SELECTED_REFERRAL':
      return {
        ...state,
        selectedReferral: action.payload,
      };

    /* move this to separate reducer */
    case 'SET_REFERRAL_MODAL':
      return {
        ...state,
        referralModalOpen: action.payload,
      };

    default:
      return state;
  }
};

export default AppReducer;
