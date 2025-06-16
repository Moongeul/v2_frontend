import { create } from 'zustand'

export interface TermsStoreType {
  allOptions?: boolean
  termsOfServiceOptions?: boolean
  personalInformation?: boolean
  marketingInformation?: boolean
}

interface useTermsStoreType {
  allOptions: boolean
  termsOfServiceOptions: boolean
  personalInformation: boolean
  marketingInformation: boolean
  setTermsState: (params: TermsStoreType) => void
}

export const useTermsStore = create<useTermsStoreType>((set) => ({
  allOptions: false,
  termsOfServiceOptions: false,
  personalInformation: false,
  marketingInformation: false,
  setTermsState: (params: TermsStoreType) => {
    set((state) => ({
      ...state,
      ...params,
    }))
  },
}))
