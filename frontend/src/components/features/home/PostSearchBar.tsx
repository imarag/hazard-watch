import { TextField } from '@mui/material'

interface PostSearchProps {
  searchText: string
  setSearchText: React.Dispatch<React.SetStateAction<string>>
  disabled: boolean
}

export default function PostSearch({
  searchText,
  setSearchText,
  disabled,
}: PostSearchProps) {
  return (
    <TextField
      size='medium'
      disabled={disabled}
      sx={{ backgroundColor: 'background.paper' }}
      id='filled-search'
      label='Search posts'
      type='search'
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      variant='outlined'
    />
  )
}
