import { useEffect } from 'react'
import { useMap } from 'react-leaflet'
import L, { type ControlPosition } from 'leaflet'
import type { LegendItem } from '../types'

interface LegendProps {
  title: string
  items: LegendItem[]
  position: ControlPosition
}

export default function Legend({
  title = 'Legend',
  items = [],
  position = 'bottomright',
}: LegendProps) {
  const map = useMap()

  useEffect(() => {
    // ✅ don't show legend if no items
    if (items.length === 0) {
      return
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const legend = L.control({ position: position })

    legend.onAdd = () => {
      const div = L.DomUtil.create('div')
      L.DomEvent.disableClickPropagation(div)
      // Container styles
      div.style.background = 'rgba(255, 255, 255, 0.8)'
      div.style.padding = '10px 14px'
      div.style.borderRadius = '8px'
      div.style.boxShadow = '0 1px 5px rgba(0,0,0,0.3)'
      div.style.fontSize = '13px'
      div.style.lineHeight = '2'
      div.style.minWidth = '160px'
      div.style.color = 'black'

      // Build rows dynamically from items
      const rows = items
        .map(
          ({ icon, label, count }) => `
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-size:16px;">${icon}</span>
          <span style="flex:1;">${label}</span>
          ${
            count !== undefined
              ? `<span style="font-weight:bold; color:#555;">${count}</span>`
              : ''
          }
        </div>
      `,
        )
        .join('')

      const horLine =
        '<hr style="border:none; border-top:1px solid #dedede; margin:4px 0;" />'

      div.innerHTML = `
        <strong style="display:block; margin-bottom:6px; padding-bottom:4px;">
          ${title}
        </strong>
      ${horLine}
        ${rows}
      `

      return div
    }

    legend.addTo(map)

    return () => legend.remove()
  }, [map, title, items, position]) // re-renders legend if props change

  return null
}
