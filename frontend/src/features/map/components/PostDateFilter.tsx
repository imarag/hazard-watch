import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { DateFilter } from '@/types/hazards'
import type { DateFilterValue } from '@/types/hazards'

interface PostDateFilterProps {
  postDateSelected: DateFilterValue
  setPostDateSelected: React.Dispatch<React.SetStateAction<DateFilterValue>>
}

export default function PostDateFilter({
  postDateSelected,
  setPostDateSelected,
}: PostDateFilterProps) {
  return (
    <FormControl>
      <InputLabel id='date-filter-label'>Post Date</InputLabel>
      <Select
        MenuProps={{
          sx: { zIndex: 2000 }, // keep it because select appears behind panel
        }}
        labelId='date-filter-label'
        id='date-filter'
        value={postDateSelected}
        label='Post Date'
        size='small'
        onChange={(e) => setPostDateSelected(e.target.value)}
      >
        {DateFilter.map((item) => (
          <MenuItem value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
