import { Box, Typography, MenuItem, TextField, IconButton } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import type { SortField, SortDirection } from '@/types/posts'
import { sortOptions } from '@/constants/hazards'

interface PostToolBarProps {
  totalPosts: number
  totalFilteredPosts: number
  sortDir: SortDirection
  sortField: SortField
  setSortDir: React.Dispatch<React.SetStateAction<SortDirection>>
  setSortField: React.Dispatch<React.SetStateAction<SortField>>
  isLoading: boolean
}

export default function PostToolBar({
  totalPosts,
  totalFilteredPosts,
  sortDir,
  sortField,
  setSortDir,
  setSortField,
  isLoading,
}: PostToolBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant='body2' sx={{ color: 'text.disabled' }}>
        {totalFilteredPosts} / {totalPosts}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          color: 'text.disabled',
        }}
      >
        sort by
        <TextField
          select
          size='small'
          disabled={isLoading}
          value={sortField}
          onChange={(e) => setSortField(e.target.value as SortField)}
          sx={{ width: 140, backgroundColor: 'background.paper' }}
        >
          {sortOptions.map((opt) => (
            <MenuItem key={opt.value} value={opt.value}>
              {opt.label}
            </MenuItem>
          ))}
        </TextField>
        <IconButton
          size='small'
          disabled={isLoading}
          onClick={() =>
            setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))
          }
        >
          {sortDir === 'asc' ? (
            <ArrowUpwardIcon fontSize='small' />
          ) : (
            <ArrowDownwardIcon fontSize='small' />
          )}
        </IconButton>
      </Box>
    </Box>
  )
}
