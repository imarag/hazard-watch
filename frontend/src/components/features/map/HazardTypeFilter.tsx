import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { HazardType } from '@/types/hazards'
import { hazardMeta } from '@/constants/hazards'

interface HazardTypeFilterProps {
  hazardTypeSelected: HazardType[]
  setHazardTypeSelected: React.Dispatch<React.SetStateAction<HazardType[]>>
}

export default function HardTypeFilter({
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
      value={hazardTypeSelected}
      onChange={handleChange}
      aria-label='text formatting'
      size='small'
    >
      {allHazards.map((hazardName) => {
        const Icon = hazardMeta[hazardName].muiIcon
        return (
          <ToggleButton
            value={hazardName}
            aria-label={hazardName}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              fontSize: 10,
            }}
          >
            {hazardName}
            <Icon sx={{ fontSize: 18 }} />
          </ToggleButton>
        )
      })}
    </ToggleButtonGroup>
  )
}
