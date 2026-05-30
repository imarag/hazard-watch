import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import type { SvgIconComponent } from '@mui/icons-material'

interface FilterPanelAccordionProps {
  id: string
  title: string
  children: React.ReactNode
  icon: SvgIconComponent
  color: string
}

export default function FilterPanelAccordion({
  id,
  title,
  children,
  icon: Icon,
  color,
}: FilterPanelAccordionProps) {
  return (
    <Accordion>
      <AccordionSummary
        sx={{
          minHeight: 40,
          '& .MuiAccordionSummary-content': { margin: '8px 0' },
        }}
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`${id}-panel-content`}
        id={`${id}-panel-header`}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Icon sx={{ color: color }} />
          <Typography component='span'>{title}</Typography>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
          }}
        >
          {children}
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}
