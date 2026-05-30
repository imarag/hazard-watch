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
  onChange?: (value: string) => void
}

export type DateFieldProps = BaseFieldProps & {
  type: 'date'
  value: string
  onChange?: (value: string) => void
}

export type NumberFieldProps = BaseFieldProps & {
  type: 'number'
  value: number | null
  onChange?: (value: number | null) => void
  min?: number
  max?: number
}

export type SelectFieldProps = BaseFieldProps & {
  type: 'select'
  value: string
  onChange?: (value: string) => void
  options: Option[]
}

export type FormFieldProps =
  | TextFieldProps
  | DateFieldProps
  | NumberFieldProps
  | SelectFieldProps
