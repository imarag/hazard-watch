export type Option = { label: string; value: string }

export type BaseFieldProps = {
  id: string
  name?: string
  label: string
  required?: boolean
  disabled?: boolean
  size?: 'small' | 'medium'
}

export type TextFieldProps = BaseFieldProps & {
  type: 'text'
  value: string
  setValue: (value: string) => void
}

export type DateFieldProps = BaseFieldProps & {
  type: 'date'
  value: string
  setValue: (value: string) => void
}

export type NumberFieldProps = BaseFieldProps & {
  type: 'number'
  value: number | null
  setValue: (value: number | null) => void
  min?: number
  max?: number
}

export type SelectFieldProps = BaseFieldProps & {
  type: 'select'
  value: string
  setValue: (value: string) => void
  options: Option[]
}

export type FormFieldProps =
  | TextFieldProps
  | DateFieldProps
  | NumberFieldProps
  | SelectFieldProps
