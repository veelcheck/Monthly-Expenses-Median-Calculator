const expenses = {
  '2023-01': {
    '01': {
      food: [22.11, 43, 11.72, 2.2, 36.29, 2.5, 19],
      fuel: [210.22],
    },
    '09': {
      food: [11.9],
      fuel: [190.22],
    },
  },
  '2023-03': {
    '07': {
      food: [20, 11.9, 30.2, 11.9],
    },
    '04': {
      food: [10.2, 11.5, 2.5],
      fuel: [],
    },
  },
  '2023-04': {},
};

const expenses2 = {
  '2023-01': {
    '01': {
      food: ['22,11', 43, 11.72, 2.2, 36.29, '2.5', 19],
      fuel: [210.22],
    },
    '09': {
      food: [11.9],
      fuel: [190.22],
    },
  },
  '2023-03': {
    '07': {
      food: [20, 11.9, 30.2, 11.9],
    },
    '04': {
      food: [10.2, 11.5, 2.5],
      fuel: [],
    },
  },
  '2023-12': {
    '02': {
      flowers: [300],
    },
    '31': {
      food: [150]
    }
  },
};

const expenses3 = {
};

// Concats arrays to group daily expenses toghether.
const concatArrays = (dayObject) => {
  let concatenatedArray = [];

  for (const category in dayObject) {
    if (Array.isArray(dayObject[category])) {
      concatenatedArray = concatenatedArray.concat(dayObject[category]);
    }
  }
  // Makes sure all input is a number
  concatenatedArray = concatenatedArray.map((value) => {
    if (typeof value === 'string') {
      // Convers to number and replaces any mistaken commas
      return parseFloat(value.replace(',', '.'));
    }

    return value;
  });

  return concatenatedArray;
};

//Gets the first Sunday in a month.
const getFirstSunday = (dateString) => {
  const [year, month] = dateString.split('-').map(Number);
  // Uses Date.UTC for UTC time zone, because my local time zone is 1h ahead of UTC, which is interpreted by JavaScript as the day before.
  const firstDayOfMonth = new Date(Date.UTC(year, month - 1, 1));

  let firstSunday = new Date(firstDayOfMonth);

  // Increments the date until it's a Sunday
  while (firstSunday.getUTCDay() !== 0) {
    // Uses getUTCDay to get the day in UTC
    firstSunday.setUTCDate(firstSunday.getUTCDate() + 1); // Uses setUTCDate to set the day in UTC
  }
  // Converts to ISO string and extracts the day part of date, expected output: 01, 02, etc.
  return firstSunday.toISOString().slice(8, 10);
};

const getMedian = (expenses) => {
  let result = [];

  for (const [yearMonth, days] of Object.entries(expenses)) {
    // Converts to number for comparison
    const firstSunday = Number(getFirstSunday(yearMonth));

    for (const [day, categories] of Object.entries(days)) {
      // If the condition 'expenses until first Sunday' is met, the arrays are concated to the result.
      if (Number(day) <= firstSunday) {
        result = result.concat(concatArrays(categories))
      }
    }
  }
  // If nothing matches the conditon, null is returned.
    if (result.length === 0) {
      return null;
    }
  
  // Sorts the array ascendingly.
  const sortedResult = result.sort((a, b) => a - b);
  // Finds the middle index.
  const midIndex = Math.floor(sortedResult.length / 2);
  // Calculates the median.
  const median =
    sortedResult.length % 2 !== 0
      ? sortedResult[midIndex]
      : (sortedResult[midIndex - 1] + sortedResult[midIndex]) / 2;
  return median;
};

console.log(getMedian(expenses)); // Expected output 11.72
console.log(getMedian(expenses2)); // Expected output 15.36
console.log(getMedian(expenses3)); // Expected output null