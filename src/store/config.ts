/**
 * Data structure of the AppStore state
 */
export interface AppStoreState {
  referrals: any[]
  selectedReferral: any
  referralModalOpen: boolean
}

/**
 * Initial values for the AppStore state
 */
export const APP_STORE_INITIAL_STATE: AppStoreState = {
  referrals: [],
  selectedReferral: null,
  referralModalOpen: false
};
