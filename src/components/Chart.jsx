// This file re-exports components from recharts
// It's a common pattern in shadcn/ui to create wrapper components

import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Sector,
    Tooltip,
    XAxis,
    YAxis,
  } from "recharts"
  
  // Re-export the components
  export {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ComposedChart,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    RadialBar,
    RadialBarChart,
    ResponsiveContainer,
    Scatter,
    ScatterChart,
    Sector,
    Tooltip,
    XAxis,
    YAxis,
  }
  
  // Export a generic Chart component for consistency with shadcn/ui patterns
  export function Chart(props) {
    return <div {...props} />
  }
  
  // Export a ChartTooltip component for custom tooltips
  export function ChartTooltip({ active, payload, label, className, ...props }) {
    if (!active || !payload?.length) {
      return null
    }
  
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm" {...props}>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
            <span className="font-bold text-muted-foreground">{payload[0]?.value}</span>
          </div>
        </div>
      </div>
    )
  }
  