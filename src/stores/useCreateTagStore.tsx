import create from 'zustand'
import type { FormError } from '../lib/validate'

type Data = Tag

interface CreateTag {
  data: Partial<Data>
  error: FormError<Data>
  setData: (data: Partial<Data>) => void
  setError: (error: Partial<FormError<Data>>) => void
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useCreateTagStore = create<CreateTag>((set, _get) => (
  {
    data: {
      kind: 'expenses',
      sign: '',
      name: ''
    },
    error: {
      kind: [],
      sign: [],
      name: []
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
