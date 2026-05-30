import { Table, TableBody, TableCell, TableRow } from '@mui/material'
import { Tooltip } from 'react-leaflet'

export default function MarkerTooltip({
  tooltip,
}: {
  tooltip: Record<string, unknown>
}) {
  return (
    <Tooltip direction='bottom' offset={[0, 0]} opacity={1}>
      <Table size='small' sx={{ minWidth: 200, maxWidth: 360 }}>
        <TableBody>
          {Object.entries(tooltip).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  color: 'inherit',
                  borderColor: 'divider',
                  padding: '2px 8px',
                }}
              >
                {key}
              </TableCell>
              <TableCell
                sx={{
                  color: 'inherit',
                  borderColor: 'divider',
                  padding: '2px 8px',
                }}
              >
                {String(value)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Tooltip>
  )
}
