import { Box, Typography, MenuItem, TextField, IconButton } from '@mui/material'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import type { SortField, SortDirection } from '@/types/posts'
import type { Post } from '@/types/posts'
import { sortOptions } from '@/constants.ts/hazards'

interface PostsToolBarProps {
  posts: Post[]
  sortDir: SortDirection
  sortField: SortField
  setSortDir: React.Dispatch<React.SetStateAction<SortDirection>>
  setSortField: React.Dispatch<React.SetStateAction<SortField>>
}

export default function PostsToolBar({
  posts,
  sortDir,
  sortField,
  setSortDir,
  setSortField,
}: PostsToolBarProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        mb: 2,
      }}
    >
      <Typography variant='body2' color='text.secondary'>
        {posts.length} reports
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        sort by
        <TextField
          select
          size='small'
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
