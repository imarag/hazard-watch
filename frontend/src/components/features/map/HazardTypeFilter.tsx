import { Stack, Chip } from '@mui/material'
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

  const toggle = (hazard: HazardType) => {
    setHazardTypeSelected((prev) =>
      prev.includes(hazard)
        ? prev.filter((h) => h !== hazard)
        : [...prev, hazard],
    )
  }

  return (
    <Stack direction='column' spacing={0.75}>
      {allHazards.map((hazardName) => {
        const Icon = hazardMeta[hazardName].muiIcon
        const isSelected = hazardTypeSelected.includes(hazardName)
        return (
          <Chip
            key={hazardName}
            icon={<Icon sx={{ fontSize: '16px !important' }} />}
            label={hazardName.charAt(0).toUpperCase() + hazardName.slice(1)}
            onClick={() => toggle(hazardName)}
            variant={isSelected ? 'filled' : 'outlined'}
            color={isSelected ? 'primary' : 'default'}
            sx={{
              justifyContent: 'flex-start',
              px: 1,
              height: 36,
              borderRadius: 2,
              fontWeight: isSelected ? 600 : 400,
              transition: 'all 0.15s ease',
              '& .MuiChip-label': { p: 2 },
            }}
          />
        )
      })}
    </Stack>
  )
}
