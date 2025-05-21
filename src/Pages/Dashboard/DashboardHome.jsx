import { useState } from "react"
import { Users, Briefcase, Store, Globe } from "lucide-react"
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from "@/components/Chart"
import { Card } from "@/components/ui/card"
import CustomButton from "@/components/CustomButton"

function DashboardHome() {
  const [timeRange, setTimeRange] = useState("year")

  // Sample stats data
  const stats = [
    {
      title: "All Users",
      value: "12,345",
      icon: Users,
    },
    {
      title: "Admin Users",
      value: "42",
      icon: Users,
    },
    {
      title: "Total Gigs",
      value: "2,342",
      icon: Briefcase,
    },
    {
      title: "Merchants",
      value: "342",
      icon: Store,
    },
    {
      title: "Total website visits",
      value: "123,456",
      icon: Globe,
    },
  ]

  // Chart data based on time range
  const yearData = [
    { name: "Apr", value: 30 },
    { name: "May", value: 45 },
    { name: "Jun", value: 65 },
    { name: "Jul", value: 75 },
    { name: "Aug", value: 55 },
    { name: "Sep", value: 65 },
    { name: "Oct", value: 45 },
    { name: "Nov", value: 55 },
    { name: "Dec", value: 75 },
    { name: "Jan", value: 65 },
    { name: "Feb", value: 55 },
    { name: "Mar", value: 70 },
  ]

  const monthData = [
    { name: "1", value: 30 },
    { name: "5", value: 45 },
    { name: "10", value: 65 },
    { name: "15", value: 55 },
    { name: "20", value: 75 },
    { name: "25", value: 65 },
    { name: "30", value: 70 },
  ]

  const weekData = [
    { name: "Mon", value: 45 },
    { name: "Tue", value: 65 },
    { name: "Wed", value: 55 },
    { name: "Thu", value: 75 },
    { name: "Fri", value: 65 },
    { name: "Sat", value: 55 },
    { name: "Sun", value: 70 },
  ]

  const todayData = [
    { name: "00:00", value: 25 },
    { name: "04:00", value: 15 },
    { name: "08:00", value: 45 },
    { name: "12:00", value: 65 },
    { name: "16:00", value: 55 },
    { name: "20:00", value: 35 },
    { name: "23:59", value: 25 },
  ]

  // Get data based on selected time range
  const getChartData = () => {
    switch (timeRange) {
      case "year":
        return yearData
      case "month":
        return monthData
      case "week":
        return weekData
      case "today":
        return todayData
      default:
        return yearData
    }
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border rounded-md shadow-md">
          <p className="font-medium">{label}</p>
          <p className="text-indigo-600">{`${payload[0].value}%`}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6 p-2">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Insert section description here.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4">
            <div className="flex flex-col items-center text-center">
              <div className="mb-2">
                <stat.icon className="h-6 w-6 text-gray-500" />
              </div>
              <p className="text-sm text-gray-500">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
            </div>
          </Card>
        ))}
      </div>

      {/* Graph Section */}
      <Card className="p-6">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center mb-6">
          <h3 className="text-lg font-medium">All users</h3>
          <div className="flex flex-wrap gap-2">
            <CustomButton
              variant={timeRange === "year" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("year")}
            >
              1 Year
            </CustomButton>
            <CustomButton
              variant={timeRange === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("month")}
            >
              30 days
            </CustomButton>
            <CustomButton
              variant={timeRange === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("week")}
            >
              7 days
            </CustomButton>
            <CustomButton
              variant={timeRange === "today" ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeRange("today")}
            >
              Today
            </CustomButton>
          </div>
        </div>

        <div className="h-[400px] w-full mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={getChartData()}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366F1" stopOpacity={0.1} />
                  <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                tickFormatter={(value) => `${value}%`}
                ticks={[0, 25, 50, 75, 100]}
                domain={[0, 100]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#B2FCE4"
                strokeWidth={3}
                fill="#B2FCE2"
                activeDot={{ r: 8, fill: "#B2FCE4", stroke: "#fff", strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

export default DashboardHome

