import { Paper, IconButton, Divider, InputBase } from '@mui/material'
import { useNavigate } from 'react-router'
import { appRoutes } from '@/constants/routes'
import { useState } from 'react'
import SearchIcon from '@mui/icons-material/Search'

export default function SearchField() {
  const [searchParam, setSearchParam] = useState('')
  const navigate = useNavigate()

  const handleSearch = () => {
    const q = searchParam.trim()

    if (!q) return

    navigate(`${appRoutes.search.path}?q=${encodeURIComponent(q)}`)
  }

  return (
    <Paper
      elevation={0}
      variant='outlined'
      component='form'
      onSubmit={(e) => {
        e.preventDefault()
        handleSearch()
      }}
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder='Search posts...'
        inputProps={{ 'aria-label': 'search posts' }}
        value={searchParam}
        onChange={(e) => setSearchParam(e.target.value)}
      />

      <Divider sx={{ height: 28, m: 0.5 }} orientation='vertical' />

      <IconButton type='submit' sx={{ p: '10px' }} aria-label='search'>
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
