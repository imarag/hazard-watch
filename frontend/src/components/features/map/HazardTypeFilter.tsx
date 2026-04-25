import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { HazardType } from '@/types/hazards'
import { hazardMeta } from '@/constants/hazards'

interface HazardTypeFilterProps {
  hazardTypeSelected: HazardType[]
  setHazardTypeSelected: React.Dispatch<React.SetStateAction<HazardType[]>>
}

export default function HazardTypeFilter({
  hazardTypeSelected,
  setHazardTypeSelected,
}: HazardTypeFilterProps) {
  const allHazards: HazardType[] = Object.values(HazardType)

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newFormats: HazardType[],
  ) => {
    setHazardTypeSelected(newFormats)
  }

  return (
    <ToggleButtonGroup
      orientation='vertical'
      value={hazardTypeSelected}
      onChange={handleChange}
      aria-label='text formatting'
      size='small'
      sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
    >
      {allHazards.map((hazardName) => {
        const Icon = hazardMeta[hazardName].muiIcon
        return (
          <ToggleButton
            fullWidth
            value={hazardName}
            aria-label={hazardName}
            sx={{
              display: 'flex',
              alignItems: 'stretch',
              justifyContent: 'flex-start',
              gap: 1,
              fontSize: 10,
              backgroundColor: 'background.paper',
            }}
          >
            <Icon sx={{ fontSize: 18 }} />
            {hazardName}
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}
