import {
    collection,
    query,
    where,
    orderBy,
    getDocs,
    Timestamp,
  } from "firebase/firestore";
  import { firestoreDb } from '@packages/firebase/firestoreDb'
  
  // Fetch all bookings for a given week
  export async function fetchAllBookingsForWeek(start: Date, end: Date) {
    const bookingsRef = collection(firestoreDb, "bookings");
    const q = query(
      bookingsRef,
      where("startTime", ">=", Timestamp.fromDate(start)),
      where("startTime", "<=", Timestamp.fromDate(end)),
      orderBy("startTime")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  }
  
  // Check if a new booking overlaps existing ones
  export async function checkOverlap(
    roomId: string,
    start: Date,
    end: Date
  ): Promise<boolean> {
    const bookingsRef = collection(firestoreDb, "bookings");
    const q = query(
      bookingsRef,
      where("roomId", "==", roomId),
      where("startTime", "<", Timestamp.fromDate(end)),
      where("endTime", ">", Timestamp.fromDate(start))
    );
    const snapshot = await getDocs(q);
    return !snapshot.empty;
  }