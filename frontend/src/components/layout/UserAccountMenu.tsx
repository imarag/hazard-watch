import { useState } from 'react'
import {
  Menu,
  MenuItem,
  Avatar,
  Divider,
  ListItemIcon,
  IconButton,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Button,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import { useCurrentUser } from '@/features/auth/store'
import { Logout } from '@mui/icons-material'
import { useSidebarActions } from '@/shared/stores/sidenav'
import { appRoutes } from '@/shared/constants/routes'
import { useNavigate } from 'react-router'

interface UserAccountMenuProps {
  handleLogoutUser: () => void
}

export default function UserAccountMenu({
  handleLogoutUser,
}: UserAccountMenuProps) {
  const { closeSidebar } = useSidebarActions()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const navigate = useNavigate()
  const handleClose = () => {
    setAnchorEl(null)
  }
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const currentUser = useCurrentUser()

  const accountDetails = [
    {
      label: 'My account',
      icon: <Avatar />,
      onClick: () => {
        handleClose()
        closeSidebar()
        navigate(appRoutes.account.path)
      },
    },
    {
      label: 'Logout',
      icon: <Logout fontSize='small' />,
      onClick: () => {
        handleLogoutUser()
        handleClose()
        closeSidebar()
      },
    },
  ]
  return (
    <>
      <IconButton
        onClick={handleClick}
        size='small'
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup='true'
        aria-expanded={open}
        sx={{ gap: 1, padding: 0, display: { xs: 'none', md: 'flex' } }}
      >
        <Avatar sx={{ width: 32, height: 32 }}>
          {currentUser?.email.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Accordion sx={{ display: { xs: 'block', md: 'none', width: '100%' } }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={'nav-panel2-content'}
          id={'nav-panel2-header'}
        >
          <Typography component='span'>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ width: 32, height: 32 }}>
                {currentUser?.email.charAt(0).toUpperCase()}
              </Avatar>
              {currentUser?.email}
            </Box>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {accountDetails.map((item) => (
            <Box>
              <Button
                onClick={() => {
                  item.onClick()
                  handleClose()
                }}
              >
                {item.label}
              </Button>
            </Box>
          ))}
        </AccordionDetails>
      </Accordion>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        {accountDetails.map((item, index) => (
          <>
            <MenuItem key={item.label} onClick={item.onClick}>
              {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
              {item.label}
            </MenuItem>
            {index === 0 && <Divider key='divider' />}
          </>
        ))}
      </Menu>
    </>
  )
}
