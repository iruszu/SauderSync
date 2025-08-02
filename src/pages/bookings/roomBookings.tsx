
import { Button, Card, TextInput, Group, Text, Image, Stack, Flex, Box, Center, SegmentedControl } from "@mantine/core"
import { DatePickerInput } from "@mantine/dates"
import { IconCalendar, IconUsers, IconDeviceDesktop, IconSquare } from "@tabler/icons-react"
import { useEffect, useState } from "react"
import styles from './roomBookings.module.css'
import "@mantine/dates/styles.css";
import { format, addDays, startOfWeek, endOfWeek, isSameDay, eachDayOfInterval } from "date-fns"
import { notifications } from "@mantine/notifications"
import { v4 as uuidv4 } from 'uuid';
import { createFirestoreDocument, getFirestoreCollection } from "@packages/firestoreAsQuery/firestoreRequests"
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
  area: string
  capacity: number
  amenities: string[]
  image: string
  availability: number[];
}



export default function Rooms() {
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewType, setViewType] = useState<"Day" | "Week">("Day")
  const [selectedArea, setSelectedBuilding] = useState("Birmingham")
  const [selectedTimeSlots, setSelectedTimeSlots] = useState<{roomIndex: number, slots: number[]}>({roomIndex: -1, slots: []})
  const [bookingDescription, setBookingDescription] = useState("")
  const [isSelecting, setIsSelecting] = useState(false)
  const [dragStart, setDragStart] = useState<{roomIndex: number, slotIndex: number} | null>(null)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [expandedRoom, setExpandedRoom] = useState<number | null>(null)
  const [currentRooms, setCurrentRooms] = useState<Room[]>([]);
  
  
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

  useEffect(() => {
    const fetchBookingsAndRooms = async () => {
      try {
        const bookingsData = await getFirestoreCollection<Booking>("bookings");
        const roomsData = await getFirestoreCollection<Room>("rooms");
        const filteredRooms = roomsData.filter((room) => room.area === selectedArea);
  
        let filteredBookings: Booking[] = [];
        if (viewType === "Week") {
          // Get all dates in the selected week
          const weekDays = getWeekDays(selectedDate);
          const weekDates = weekDays.map((day) => format(day, "yyyy-MM-dd"));
  
          // Filter bookings for all dates in the week range
          filteredBookings = bookingsData.filter((booking) =>
            weekDates.includes(booking.date)
          );
        } else {
          // Filter bookings for the selected date
          filteredBookings = bookingsData.filter(
            (booking) => booking.date === format(selectedDate, "yyyy-MM-dd")
          );
        }
  
        // Generate availability array for each room
        const updatedRooms = filteredRooms.map((room) => {
          const availability = Array(12).fill(0); // 48 slots for 30-minute intervals (7 AM to 9 PM)
          filteredBookings
            .filter((booking) => booking.roomId === room.id)
            .forEach((booking) => {
              for (let i = booking.startTime; i <= booking.endTime; i++) {
                availability[i] = 1; // Mark slot as booked
              }
            });
          return { ...room, availability };
        });
  
        setBookings(filteredBookings);
        setCurrentRooms(updatedRooms);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchBookingsAndRooms();
  }, [selectedDate, selectedArea, viewType]); // Added viewType to the dependency array

  const handleBookRoom = async () => {
    if (!bookingDescription.trim() || selectedTimeSlots.slots.length === 0 || !selectedDate) return;
  
    const newBooking: Booking = {
      id: uuidv4(),
      roomId: currentRooms[selectedTimeSlots.roomIndex].id,
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: Math.min(...selectedTimeSlots.slots),
      endTime: Math.max(...selectedTimeSlots.slots),
      description: bookingDescription,
      userName: "Current User",
    };
  
    try {
      // Add booking to Firestore
      console.log(newBooking.startTime, newBooking.endTime)
      await createFirestoreDocument(`bookings/${newBooking.id}`, newBooking, false);
  
      // Update local bookings state
      setBookings(prev => [...prev, newBooking]);
  
      // Update room availability locally
      const updatedRooms = [...currentRooms];
      selectedTimeSlots.slots.forEach(slot => {
        updatedRooms[selectedTimeSlots.roomIndex].availability[slot] = 1;
      });
  
      // Reset UI state
      setSelectedTimeSlots({ roomIndex: -1, slots: [] });
      setBookingDescription("");
      setExpandedRoom(null);
  
      notifications.show({
        title: 'Room Booked',
        message: 'Your room has been successfully booked!',
        color: 'blue',
      });
    } catch (error) {
      console.error("Error booking room:", error);
    }
  };
  

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
          
          <Group gap="sm" mb="xl">
            <SegmentedControl
                radius="xl"
                size="md"
                value={selectedArea}
                onChange={(value) => handleBuildingChange(value)}
                data={[
                { value: "Birmingham", label: "Birmingham" },
                { value: "4th Floor", label: "4th Floor" },
                { value: "CLC", label: "CLC" },
                { value: "Floor 0", label: "Floor 0" },
                ]}
                classNames={styles}
            />
            </Group>

          {/* Date and View Controls */}
          <Flex justify="space-between" align="center" mb="xl">
            <Text size="lg" fw={600}>{selectedArea}</Text>
            
            <Group gap="md">
            <SegmentedControl
                radius="xl"
                size="sm"
                value={viewType}
                onChange={(value) => handleViewTypeChange(value as "Day" | "Week")}
                data={[
                    { value: "Day", label: "Day" },
                    { value: "Week", label: "Week" },
                ]}
                classNames={styles}
                />
              
              <Group gap="xs" align="center">
                <Text size="sm" fw={500}>Date</Text>
                <div>
                <DatePickerInput
                  leftSection={<IconCalendar size={16} />}
                  value={selectedDate}
                  onChange={(date) => {
                    if (date) {
                      // Parse date string as local date to avoid timezone issues
                      if (typeof date === 'string') {
                        const [year, month, day] = date.split('-').map(Number)
                        const localDate = new Date(year, month - 1, day) // month is 0-indexed
                        setSelectedDate(localDate)
                      } else {
                        setSelectedDate(date)
                      }
                    }
                  }}
                  placeholder="Pick a date"
                  w={240}
                  valueFormat="MMM DD, YYYY"
                  styles={{
                    input: {
                      fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif !important',
                      fontWeight: '400',
                      letterSpacing: '0.5px',
                      textRendering: 'optimizeLegibility',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale'
                    }
                  }}
                />
                {viewType === "Week" && selectedDate && (
                  <Text size="xs" c="dimmed" mt={4}>
                    Week: {getWeekRange(selectedDate)}
                  </Text>
                )}
              </div>
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
                            {room.amenities.includes("TV") && (
                            <Group gap="xs">
                                <IconDeviceDesktop size={16} />
                                <Text size="sm" c="dimmed">TV</Text>
                            </Group>
                            )}

                            {room.amenities.includes("Whiteboard") && (
                            <Group gap="xs">
                                <IconSquare size={16} />
                                <Text size="sm" c="dimmed">Whiteboard</Text>
                            </Group>
                            )}
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
                              <Box key={timeIndex} style={{ textAlign: 'left' }}>
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
                            <Text size="sm" c="dimmed">Max 2 hours per student</Text>
                            <Text size="sm" c="dimmed">1 booking per day</Text>
                          </Stack>
                          <Text fw={600} mb="md">Cancellation Policy</Text>
                          <Text size="sm" c="dimmed">Please cancel 2 in advance</Text>
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