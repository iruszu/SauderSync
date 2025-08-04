// Check how the date parsing handles some specific date formats
console.log('Current date:', new Date().toISOString());

// Test sample dates from the screenshot
const testDates = [
  'March 21, 2025', // ProductX
  'September 10, 2024', // MIS Night
  'November 29, 2024', // Dataverse
];

testDates.forEach((dateStr) => {
  const parsedDate = new Date(dateStr);
  console.log(`\nOriginal date string: "${dateStr}"`);
  console.log(`Standard JS parsing: ${parsedDate.toISOString()}`);

  // Try with regex approach similar to your code
  const monthDayYearRegex = /^(\w+)\s+(\d{1,2}),\s+(\d{4})$/;
  const match = dateStr.match(monthDayYearRegex);

  if (match) {
    const [_, monthName, day, year] = match;
    const monthNames = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december',
    ];
    const monthIndex = monthNames.findIndex((m) => m === monthName.toLowerCase());

    if (monthIndex !== -1) {
      const customDate = new Date(parseInt(year), monthIndex, parseInt(day));
      console.log(`Custom parsing: ${customDate.toISOString()}`);

      // Compare with today
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      console.log(`Is future: ${customDate >= today}`);
      console.log(`Is past: ${customDate < today}`);
    }
  }
});
