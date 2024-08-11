import create from 'zustand'
import type { FormError } from '../lib/validate'

type Data = {
  email: string
  code: string
}

interface SignIn {
  data: Data
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useSignInStore = create<SignIn>((set, _get) => (
  {
    data: {
      // TODO: 删除这个地址 
      email: 'jackwang.0212@icloud.com',
      code: ''
    },
    error: {
      email: [],
      code: []
    },
    setData: (data: Partial<Data>) => {
      set(state => ({
        ...state,
        data: {
          ...state.data,
          ...data
        }
      }))
    },
    setError: (error: Partial<FormError<Data>>) => {
      set(state => ({
        ...state,
        error: {
          ...error
        }
      }))
    }
  }
))
