/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Grid } from '@mantine/core';
import { IconArrowRight, IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import ImageActionBanner from '@components/ImageActionBanner';
import MainSearch from '@components/mainSearch';
import MyComponent from '@components/oppComponent';
import RoomComponent from '@components/roomComponent';
import { getFirestoreCollection } from '@packages/firestoreAsQuery/firestoreRequests';

type Booking = {
  id: string;
  roomId: string;
  date: string;
  startTime: number;
  endTime: number;
  description: string;
  userName?: string;
};

type Room = {
  id: string;
  area: string;
  capacity: number;
  amenities: string[];
  image: string;
  availability: number[];
};

type Opportunity = {
  key: string;
  image: string;
  title: string;
  date: string;
  description: string;
  status: string;
  eventURL: string;
  icon: string; // club icon
  clubName: string; // club name
};

function Home() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [showMoreBookings, setShowMoreBookings] = useState(false);
  const [showMoreOpportunities, setShowMoreOpportunities] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await getFirestoreCollection<Booking>('bookings');
        const roomsData = await getFirestoreCollection<Room>('rooms');
        const clubs = await getFirestoreCollection<{
          id: string;
          icon: string;
          clubName: string;
        }>('clubs');
        let allOpportunities: Opportunity[] = [];

        for (const club of clubs) {
          const clubOpportunities = await getFirestoreCollection<
            Omit<Opportunity, 'icon' | 'clubName'>
          >(`clubs/${club.id}/opportunities`);

          const opportunitiesWithClub = clubOpportunities.map((opportunity) => ({
            ...opportunity,
            icon: club.icon,
            clubName: club.clubName,
          }));

          allOpportunities = allOpportunities.concat(opportunitiesWithClub);
        }

        setOpportunities(allOpportunities);
        setBookings(bookingsData);
        setRooms(roomsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getRoomForBooking = (roomId: string) => {
    return rooms.find((room) => room.id === roomId);
  };

  const timeSlots = [
    '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', '9pm',
  ];
  
  function formatTimeSlots(startIndex: number, endIndex: number): string {
    if (
      startIndex < 0 ||
      endIndex >= timeSlots.length ||
      startIndex > endIndex
    ) {
      throw new Error('Invalid time slot indices');
    }
    
    const startTime = timeSlots[startIndex];
    const endTime = timeSlots[endIndex];
    if (startIndex === endIndex) {
        return `${startTime} - ${timeSlots[endIndex+1]}`;
    }
    return `${startTime} - ${endTime}`;
  }

  const CollapsibleGrid = ({
    items,
    renderItem,
    showMore,
    setShowMore,
  }: {
    items: any[];
    renderItem: (item: any, index: number) => JSX.Element;
    showMore: boolean;
    setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    const visibleItems = showMore ? items : items.slice(0, 3);

    return (
      <>
        <Grid gutter="md">
          {visibleItems.map((item, index) => renderItem(item, index))}
        </Grid>
        {items.length > 3 && (
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <button
              onClick={() => setShowMore(!showMore)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#62BB45',
                fontSize: '16px',
              }}
            >
              {showMore ? (
                <>
                  Show Less <IconChevronUp size={16} />
                </>
              ) : (
                <>
                  Show More <IconChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        )}
      </>
    );
  };


    return (
      <div>
        {/* MainSearch and ImageActionBanner remain full-width */}
        <MainSearch />
        <ImageActionBanner />
  
        {/* Upcoming Bookings Section */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Upcoming Bookings
            <Link to="/roomBookings" style={{ textDecoration: 'none' }}>
              <IconArrowRight
                size={20}
                color="#62BB45"
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              />
            </Link>
          </h2>
          <CollapsibleGrid
            items={bookings}
            showMore={showMoreBookings}
            setShowMore={setShowMoreBookings}
            renderItem={(booking, index) => {
              const room = getRoomForBooking(booking.roomId);
              const formattedTime = formatTimeSlots(booking.startTime, booking.endTime);
              return room ? (
                <Grid.Col span={4} key={booking.id}>
                  <RoomComponent
                          image={room.image}
                          title={room.id}
                          description={booking.description}
                          date={booking.date}
                          eventTime={formattedTime}
                          area={room.area}                  />
                </Grid.Col>
              ) : (
                <Grid.Col span={4} key={booking.id}>
                  <div>No Room Available</div>
                </Grid.Col>
              );
            }}
          />
        </div>
  
        {/* Opportunities Section */}
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>
            Opportunities
            <Link to="/opportunities" style={{ textDecoration: 'none' }}>
              <IconArrowRight
                size={20}
                color="#62BB45"
                style={{ marginLeft: '10px', cursor: 'pointer' }}
              />
            </Link>
          </h2>
          <CollapsibleGrid
            items={opportunities}
            showMore={showMoreOpportunities}
            setShowMore={setShowMoreOpportunities}
            renderItem={(opportunity, index) => (
              <Grid.Col key={index} span={{ base: 12, md: 5, lg: 4 }}>
                <MyComponent startDate={opportunity.date} {...opportunity} />
              </Grid.Col>
            )}
          />
        </div>
      </div>
    );
  }

export default Home;