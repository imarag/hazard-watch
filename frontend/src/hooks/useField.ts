import { useState } from 'react'

const useField = <T>(initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value as T)
  }

  return {
    value,
    onChange,
    setValue,
  }
}

export default useField
