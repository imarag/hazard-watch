import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material'
import type {
  FormFieldProps
} from '@/types/form'

export default function FormField(props: FormFieldProps) {
  switch (props.type) {
    case 'text':
      return (
        <TextField
          id={props.id}
          name={props.name}
          label={props.label}
          required={props.required}
          size={props.size}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          disabled={props.disabled}
          fullWidth
        />
      )

    case 'date':
      return (
        <TextField
          type='date'
          id={props.id}
          name={props.name}
          label={props.label}
          required={props.required}
          size={props.size}
          value={props.value}
          onChange={(e) => props.setValue(e.target.value)}
          slotProps={{ inputLabel: { shrink: true } }}
          disabled={props.disabled}
          fullWidth
        />
      )

    case 'number':
      return (
        <TextField
          type='number'
          id={props.id}
          name={props.name}
          label={props.label}
          required={props.required}
          size={props.size}
          onChange={(e) => {
            const v = e.target.value
            props.setValue(v === '' ? null : Number(v))
          }}
          value={props.value ?? ''}
          slotProps={{
            htmlInput: { min: props.min, max: props.max, step: 'any' },
          }}
          disabled={props.disabled}
          fullWidth
        />
      )

    case 'select':
      return (
        <FormControl
          fullWidth
          size={props.size}
          required={props.required}
          disabled={props.disabled}
        >
          <InputLabel id={`${props.id}-label`}>{props.label}</InputLabel>
          <Select
            labelId={`${props.id}-label`}
            id={props.id}
            name={props.name}
            label={props.label}
            value={props.value}
            onChange={(e) => props.setValue(e.target.value)}
          >
            {props.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )
  }
}
