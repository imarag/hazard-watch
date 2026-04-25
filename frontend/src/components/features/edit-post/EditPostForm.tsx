import { TextField, Button, MenuItem } from '@mui/material'
import { HazardType } from '@/types/hazards'
import HazardMap from '@/components/features/map/HazardMap'
import type { Location } from '@/types/hazards'
import FormContainer from '@/components/ui/FormContainer'

interface EditPostFormProps {
  onSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void
  isPending: boolean
  title: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement, Element>) => void
  }
  description: {
    value: string
    onChange: (e: React.ChangeEvent<HTMLInputElement, Element>) => void
  }
  hazardType: {
    value: HazardType
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  }
  location: Location | null
  setLocation: React.Dispatch<React.SetStateAction<Location | null>>
  isLoading: boolean
}

export default function EditPostForm({
  onSubmit,
  location,
  setLocation,
  isPending,
  title,
  description,
  hazardType,
  isLoading,
}: EditPostFormProps) {
  return (
    <FormContainer title='UPDATE POST' onSubmit={onSubmit} maxWidth='sm'>
      <>
        <TextField
          label='Title'
          size='small'
          {...title}
          disabled={isPending}
          required
        />
        <TextField
          label='Description'
          size='small'
          {...description}
          required
          disabled={isPending}
          multiline
          rows={3}
        />
        <TextField
          size='small'
          select
          label='Category'
          disabled={isPending}
          {...hazardType}
          fullWidth
        >
          {Object.values(HazardType).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </TextField>
        <HazardMap
          location={location}
          setLocation={setLocation}
          isLoading={isLoading || isPending}
        />
        <Button
          disabled={
            !location || !title.value || !description.value || isPending
          }
          type='submit'
          variant='contained'
          fullWidth
        >
          {isPending ? 'Updating...' : 'Update report'}
        </Button>
      </>
    </FormContainer>
  )
}
