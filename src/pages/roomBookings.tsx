
import { Button, Card, TextInput, Group, Text, Image, Stack, Flex, Box, Center } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { IconCalendar, IconUsers, IconDeviceDesktop, IconSquare } from "@tabler/icons-react"
import { useState } from "react"
import { format, addDays, startOfWeek, endOfWeek, isSameDay, eachDayOfInterval } from "date-fns"
import { notifications } from "@mantine/notifications"

const timeSlots = ["10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm"]

interface Booking {
  id: string
  roomId: string
  date: string
  startTime: number
  endTime: number
  description: string
  userName?: string
}

interface Room {
  id: string
  capacity: number
  amenities: string[]
  image: string
  policy: {
    maxHours: number
    maxBookings: number
    cancellation: string
  }
  availability: number[]
}

const buildingRooms: Record<string, Room[]> = {
  "Birmingham": [
    { id: "HA 191A", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0] },
    { id: "HA 191B", capacity: 4, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 191C", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 191D", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 191E", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 192A", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 192B", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 192C", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 192D", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 192E", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 194", capacity: 12, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 195", capacity: 14, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  ],
  "4th Floor": [
    { id: "HA 491A", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 491B", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 491C", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 492A", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 492B", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 492C", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  ],
  "CLC": [
    { id: "CLC 202", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 203", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 204", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 310", capacity: 4, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 311", capacity: 4, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 312", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 313", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 315", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 317", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 318", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 319", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 320", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "CLC 321", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  ],
  "Floor 0": [
    { id: "HA 092", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 093", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 094", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 095", capacity: 8, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] },
    { id: "HA 096", capacity: 6, amenities: ["TV", "Whiteboard"], image: "https://images.unsplash.com/photo-1473177104440-ffee2f376098?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80", policy: { maxHours: 2, maxBookings: 1, cancellation: "2 hours" }, availability: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] }
  ]
}

export default function Rooms() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date())
  const [viewType, setViewType] = useState<"Day" | "Week">("Day")
  const [selectedBuilding, setSelectedBuilding] = useState("Birmingham")
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<{roomIndex: number, slots: number[]}>({roomIndex: -1, slots: []})
  const [bookingDescription, setBookingDescription] = useState("")
  const [isSelecting, setIsSelecting] = useState(false)
  const [dragStart, setDragStart] = useState<{roomIndex: number, slotIndex: number} | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [expandedRoom, setExpandedRoom] = useState<number | null>(null)

  const currentRooms = buildingRooms[selectedBuilding] || []
  
  // Week view helper functions
  const getWeekStart = (date: Date) => {
    if (!date || isNaN(date.getTime())) return new Date()
    return startOfWeek(date, { weekStartsOn: 1 })
  }
  
  const getWeekDays = (date: Date) => {
    if (!date || isNaN(date.getTime())) return []
    const start = getWeekStart(date)
    return Array.from({ length: 7 }, (_, i) => addDays(start, i))
  }
  
  const getWeekRange = (date: Date) => {
    if (!date || isNaN(date.getTime())) return "Invalid date range"
    const start = getWeekStart(date)
    const end = endOfWeek(date, { weekStartsOn: 1 })
    return `${format(start, "MMM d")} - ${format(end, "MMM d, yyyy")}`
  }

  // Week highlighting helper functions
  const getSelectedWeekDays = (date: Date) => {
    if (!date || isNaN(date.getTime())) return []
    const start = getWeekStart(date)
    return eachDayOfInterval({ start, end: addDays(start, 6) })
  }

  const isInSelectedWeek = (date: Date) => {
    if (!selectedDate || isNaN(selectedDate.getTime())) return false
    const selectedWeekDays = getSelectedWeekDays(selectedDate)
    return selectedWeekDays.some(weekDay => isSameDay(weekDay, date))
  }

  const getBookingsForRoomAndDate = (roomId: string, date: string) => {
    return bookings.filter(booking => booking.roomId === roomId && booking.date === date)
  }

  const handleTimeSlotMouseDown = (roomIndex: number, slotIndex: number, isAvailable: boolean) => {
    if (!isAvailable) return
    setDragStart({ roomIndex, slotIndex })
    setSelectedTimeSlots({ roomIndex, slots: [slotIndex] })
    setIsSelecting(true)
    setExpandedRoom(roomIndex)
  }

  const handleTimeSlotMouseEnter = (roomIndex: number, slotIndex: number, isAvailable: boolean) => {
    if (!isSelecting || !dragStart || dragStart.roomIndex !== roomIndex || !isAvailable) return
    
    const start = Math.min(dragStart.slotIndex, slotIndex)
    const end = Math.max(dragStart.slotIndex, slotIndex)
    const slots = []
    
    for (let i = start; i <= end; i++) {
      if (currentRooms[roomIndex].availability[i] === 0) {
        slots.push(i)
      }
    }
    
    setSelectedTimeSlots({ roomIndex, slots })
  }

  const handleMouseUp = () => {
    setIsSelecting(false)
    setDragStart(null)
  }

  const getSelectedTimeRange = () => {
    if (selectedTimeSlots.slots.length === 0) return ""
    const startSlot = Math.min(...selectedTimeSlots.slots)
    const endSlot = Math.max(...selectedTimeSlots.slots)
    return `${timeSlots[startSlot]} - ${timeSlots[endSlot + 1] || timeSlots[endSlot]}`
  }

  const handleBookRoom = () => {
    if (!bookingDescription.trim() || selectedTimeSlots.slots.length === 0 || !selectedDate) return
    
    const newBooking: Booking = {
      id: Date.now().toString(),
      roomId: currentRooms[selectedTimeSlots.roomIndex].id,
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: Math.min(...selectedTimeSlots.slots),
      endTime: Math.max(...selectedTimeSlots.slots),
      description: bookingDescription,
      userName: "Current User"
    }
    
    setBookings(prev => [...prev, newBooking])
    
    // Update room availability
    const updatedRooms = [...currentRooms]
    selectedTimeSlots.slots.forEach(slot => {
      updatedRooms[selectedTimeSlots.roomIndex].availability[slot] = 1
    })
    
    // Reset form
    setSelectedTimeSlots({ roomIndex: -1, slots: [] })
    setBookingDescription("")
    setExpandedRoom(null)

    notifications.show({
      title: 'Room Booked',
      message: 'Your room has been successfully booked!',
      color: 'blue'
    })
  }

  const handleBuildingChange = (building: string) => {
    setSelectedBuilding(building)
    setSelectedTimeSlots({ roomIndex: -1, slots: [] })
    setBookingDescription("")
    setExpandedRoom(null)
  }

  const handleViewTypeChange = (view: "Day" | "Week") => {
    setViewType(view)
    setSelectedTimeSlots({ roomIndex: -1, slots: [] })
    setBookingDescription("")
    setExpandedRoom(null)
  }

  const handleBookingClick = (booking: Booking) => {
    setViewType("Day")
    // Find the room and navigate to day view
    const roomIndex = currentRooms.findIndex(room => room.id === booking.roomId)
    if (roomIndex !== -1) {
      setExpandedRoom(roomIndex)
    }
  }

  return (

      <Stack gap="xl">
        <div>
          <Text size="xl" fw={700} mb="sm">Book a room</Text>
          
          {/* Filters */}
          <Group gap="sm" mb="xl">
            <Button 
              variant={selectedBuilding === "Birmingham" ? "filled" : "outline"}
              onClick={() => handleBuildingChange("Birmingham")}
            >
              Birmingham
            </Button>
            <Button 
              variant={selectedBuilding === "4th Floor" ? "filled" : "outline"}
              onClick={() => handleBuildingChange("4th Floor")}
            >
              4th Floor
            </Button>
            <Button 
              variant={selectedBuilding === "CLC" ? "filled" : "outline"}
              onClick={() => handleBuildingChange("CLC")}
            >
              CLC
            </Button>
            <Button 
              variant={selectedBuilding === "Floor 0" ? "filled" : "outline"}
              onClick={() => handleBuildingChange("Floor 0")}
            >
              Floor 0
            </Button>
          </Group>

          {/* Date and View Controls */}
          <Flex justify="space-between" align="center" mb="xl">
            <Text size="lg" fw={600}>{selectedBuilding}</Text>
            
            <Group gap="md">
              <Group gap="xs">
                <Button 
                  variant={viewType === "Day" ? "filled" : "outline"} 
                  size="sm"
                  onClick={() => handleViewTypeChange("Day")}
                >
                  Day
                </Button>
                <Button 
                  variant={viewType === "Week" ? "filled" : "outline"} 
                  size="sm"
                  onClick={() => handleViewTypeChange("Week")}
                >
                  Week
                </Button>
              </Group>
              
              <Group gap="xs" align="center">
                <Text size="sm" fw={500}>Date</Text>
                <DatePickerInput
                  leftSection={<IconCalendar size={16} />}
                  value={selectedDate}
                  onChange={(value) => setSelectedDate(new Date(value ?? new Date()))}
                  placeholder="Pick a date"
                  w={240}
                  valueFormat={viewType === "Week" ? (selectedDate ? getWeekRange(selectedDate) : "Pick a date") : "MMM DD, YYYY"}
                />
              </Group>
            </Group>
          </Flex>
        </div>

          {viewType === "Day" ? (
            /* Day View - Room List */
            <Stack gap="xl">
              {currentRooms.map((room, index) => (
                <Card key={index} shadow="sm" padding={0} radius="md" withBorder>
                  <Box style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', minHeight: 120 }}>
                    {/* Room Info */}
                    <Box p="xl" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <Flex gap="xl">
                        <Box style={{ width: 128, height: 96, borderRadius: 8, overflow: 'hidden', flexShrink: 0 }}>
                          <Image src={room.image} alt={room.id} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </Box>
                        
                        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                          <Text size="xl" fw={600} mb="md">{room.id}</Text>
                          
                          <Stack gap="xs">
                            <Group gap="xs">
                              <IconUsers size={16} />
                              <Text size="sm" c="dimmed">{room.capacity} people</Text>
                            </Group>
                            <Group gap="xs">
                              <IconDeviceDesktop size={16} />
                              <Text size="sm" c="dimmed">TV</Text>
                            </Group>
                            <Group gap="xs">
                              <IconSquare size={16} />
                              <Text size="sm" c="dimmed">Whiteboard</Text>
                            </Group>
                          </Stack>
                        </Box>
                      </Flex>
                    </Box>

                    {/* Time Slots */}
                    <Box p="xl" pl="md" style={{ display: 'flex', alignItems: 'center' }} onMouseUp={handleMouseUp}>
                      <Box style={{ width: '100%' }}>
                        <Box style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 4 }}>
                          {timeSlots.map((time, timeIndex) => {
                            const isAvailable = room.availability[timeIndex] === 0
                            const isSelected = selectedTimeSlots.roomIndex === index && selectedTimeSlots.slots.includes(timeIndex)
                            
                            return (
                              <Box key={timeIndex} style={{ textAlign: 'center' }}>
                                <Text size="xs" c="dimmed" mb="xs">{time}</Text>
                                <Box 
                                  style={{
                                    height: 32,
                                    borderRadius: 4,
                                    backgroundColor: room.availability[timeIndex] === 1 
                                      ? 'var(--mantine-color-blue-filled)' 
                                      : isSelected
                                      ? 'var(--mantine-color-blue-light)'
                                      : 'var(--mantine-color-gray-1)',
                                    border: isSelected ? '2px solid var(--mantine-color-blue-filled)' : '2px solid transparent',
                                    cursor: isAvailable ? 'pointer' : 'not-allowed',
                                    transition: 'all 0.2s'
                                  }}
                                  onMouseDown={() => handleTimeSlotMouseDown(index, timeIndex, isAvailable)}
                                  onMouseEnter={() => handleTimeSlotMouseEnter(index, timeIndex, isAvailable)}
                                />
                              </Box>
                            )
                          })}
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  {/* Expanded Booking Form */}
                  {expandedRoom === index && selectedTimeSlots.roomIndex === index && selectedTimeSlots.slots.length > 0 && (
                    <Box style={{ borderTop: '1px solid var(--mantine-color-gray-3)', backgroundColor: 'var(--mantine-color-gray-0)' }} p="xl">
                      <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                        <div>
                          <Text fw={600} mb="md">Room Booking Policy</Text>
                          <Stack gap="xs" mb="lg">
                            <Text size="sm" c="dimmed">Max {room.policy.maxHours} hours per student</Text>
                            <Text size="sm" c="dimmed">{room.policy.maxBookings} booking per day</Text>
                          </Stack>
                          <Text fw={600} mb="md">Cancellation Policy</Text>
                          <Text size="sm" c="dimmed">Please cancel {room.policy.cancellation} in advance</Text>
                        </div>
                        
                        <Stack gap="md">
                          <div>
                            <Text size="sm" fw={500} mb="xs">Description:</Text>
                            <TextInput 
                              placeholder="Study session" 
                              value={bookingDescription}
                              onChange={(e) => setBookingDescription(e.target.value)}
                            />
                          </div>
                          
                          <div>
                            <Text size="sm" fw={500} mb="xs">Date:</Text>
                            <Text size="sm" c="dimmed">{selectedDate ? format(selectedDate, "PPP") : "Invalid date"}</Text>
                          </div>
                          
                          <div>
                            <Text size="sm" fw={500} mb="xs">Time:</Text>
                            <Text size="sm" c="dimmed">{getSelectedTimeRange()}</Text>
                          </div>
                          
                          <Button 
                            fullWidth
                            disabled={!bookingDescription.trim()}
                            onClick={handleBookRoom}
                          >
                            Book
                          </Button>
                        </Stack>
                      </Box>
                    </Box>
                  )}
                </Card>
              ))}
            </Stack>
          ) : (
            /* Week View - Compact Timeline */
            <Card shadow="sm" padding={0} radius="md" withBorder>
              {/* Header */}
              <Flex style={{ borderBottom: '1px solid var(--mantine-color-gray-3)', backgroundColor: 'var(--mantine-color-gray-0)' }}>
                <Box style={{ width: 96, padding: 8, fontSize: 12, fontWeight: 500, borderRight: '1px solid var(--mantine-color-gray-3)' }}>Room</Box>
                {selectedDate && getWeekDays(selectedDate).map((day, index) => {
                  if (!day || isNaN(day.getTime())) return null
                  return (
                    <Box key={index} style={{ flex: 1, borderRight: index < 6 ? '1px solid var(--mantine-color-gray-3)' : 'none' }}>
                      <Center p="xs" style={{ borderBottom: '1px solid var(--mantine-color-gray-3)' }}>
                        <Stack gap={2} align="center">
                          <Text size="xs" fw={500}>{format(day, "EEE")}</Text>
                          <Text size="xs" c="dimmed">{format(day, "MMM d")}</Text>
                        </Stack>
                      </Center>
                    </Box>
                  )
                })}
              </Flex>
              
              {/* Room rows */}
              {currentRooms.map((room, roomIndex) => (
                <Flex key={roomIndex} style={{ borderBottom: '1px solid var(--mantine-color-gray-3)', height: 48, ':hover': { backgroundColor: 'var(--mantine-color-gray-0)' } }}>
                  <Box style={{ width: 96, padding: 8, fontSize: 12, fontWeight: 500, borderRight: '1px solid var(--mantine-color-gray-3)', display: 'flex', alignItems: 'center' }}>{room.id}</Box>
                  {selectedDate && getWeekDays(selectedDate).map((day, dayIndex) => {
                    if (!day || isNaN(day.getTime())) return <Box key={dayIndex} style={{ flex: 1, borderRight: dayIndex < 6 ? '1px solid var(--mantine-color-gray-3)' : 'none' }}></Box>
                    
                    const dayStr = format(day, "yyyy-MM-dd")
                    const dayBookings = getBookingsForRoomAndDate(room.id, dayStr)
                    
                    return (
                      <Box key={dayIndex} style={{ flex: 1, borderRight: dayIndex < 6 ? '1px solid var(--mantine-color-gray-3)' : 'none', position: 'relative', padding: 2 }}>
                        {/* Timeline container */}
                        <Box style={{ position: 'relative', height: '100%' }}>
                          {dayBookings
                            .sort((a, b) => a.startTime - b.startTime)
                            .map((booking, bookingIndex) => {
                              // Calculate position based on time (10am = 0%, 9pm = 100%)
                              const totalSlots = 11 // 10am to 9pm
                              const startPercent = (booking.startTime / totalSlots) * 100
                              const duration = booking.endTime - booking.startTime + 1
                              const widthPercent = (duration / totalSlots) * 100
                              
                              // Truncate description if too long
                              const truncatedDescription = booking.description.length > 12 
                                ? booking.description.substring(0, 12) + "..."
                                : booking.description
                              
                              return (
                                <Box
                                  key={bookingIndex}
                                  style={{
                                    position: 'absolute',
                                    backgroundColor: 'var(--mantine-color-blue-filled)',
                                    color: 'white',
                                    borderRadius: 4,
                                    cursor: 'pointer',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    left: `${startPercent}%`,
                                    width: `${Math.max(widthPercent, 20)}%`,
                                    top: 0,
                                    height: '100%',
                                    fontSize: 10,
                                    lineHeight: 1,
                                    padding: '0 4px',
                                    transition: 'background-color 0.2s'
                                  }}
                                  onClick={() => handleBookingClick(booking)}
                                  title={`${timeSlots[booking.startTime]} - ${timeSlots[booking.endTime + 1] || timeSlots[booking.endTime]}: ${booking.description}`}
                                >
                                  <Text size="xs" fw={500} style={{ textAlign: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    {truncatedDescription}
                                  </Text>
                                </Box>
                              )
                            })}
                        </Box>
                      </Box>
                    )
                  })}
                </Flex>
              ))}
            </Card>
          )}
      </Stack>
  )
}