const currentYear = (new Date()).getFullYear();
const years = [currentYear - 1, currentYear, currentYear + 1];

const config = {
  EVENT_SOURCE: 'https://s3.amazonaws.com/city-scrapers-events-feed/latest.json',
  AGENCY_OPTIONS: [
    { label: 'Chicago Public Building Commission', value: 'chi_buildings' },
  ],
  MONTH_OPTIONS: [
    { label: 'January', value: 0 },
    { label: 'February', value: 1 },
    { label: 'March', value: 2 },
    { label: 'April', value: 3 },
    { label: 'May', value: 4 },
    { label: 'June', value: 5 },
    { label: 'July', value: 6 },
    { label: 'August', value: 7 },
    { label: 'September', value: 8 },
    { label: 'October', value: 9 },
    { label: 'November', value: 10 },
    { label: 'December', value: 11 }
  ],
  YEAR_OPTIONS: years.map(y => { return { label: y, value: y }; })
};

export default config;
