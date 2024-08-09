import create from 'zustand'

interface Data {
  email: string
  code: string
}

interface SignIn {
  data: Data
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useSignInStore = create<SignIn>((set, _get) => (
  {
    data: {
      email: '',
      code: ''
    },
    setData: (data: Partial<Data>) => {
      set(state => ({
        data: {
          ...state.data,
          ...data
        }
      }))
    },
  }
))
