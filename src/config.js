const currentYear = (new Date()).getFullYear();
const years = [currentYear - 1, currentYear, currentYear + 1];

const config = {
  EVENT_SOURCE: 'https://s3.amazonaws.com/city-scrapers-events-feed/latest.json',
  AGENCY_OPTIONS: [
    { label: 'Chicago Animal Care and Control Commission', value: 'chi_animal' },
    { label: 'Building Commission of Chicago', value: 'chi_buildings' },
    { label: 'City College of Chicago', value: 'chi_city_college' },
    { label: 'Chicago City Council', value: 'chi_citycouncil' },
    { label: 'Chicago Department of Public Health', value: 'chi_pubhealth' },
    { label: 'Chicago Infrastructure Trust', value: 'chi_infra' },
    { label: 'Chicago Local School Council', value: 'chi_localschoolcouncil' },
    { label: 'Chicago Parks District', value: 'chi_parks' },
    { label: 'Chicago Police Department', value: 'chi_police' },
    { label: 'Chicago Police Board', value: 'chi_policeboard' },
    { label: 'Chicago Public Library', value: 'chi_library' },
    { label: 'Chicago Public Schools: Board of Education', value: 'chi_schools' },
    { label: 'Chicago Public Schools: School Actions', value: 'chi_school_actions' },
    { label: 'Chicago Transit Authority', value: 'chi_transit' },
    { label: 'Chicago Aldermanic Ward Nights', value: 'ward_night' },
    { label: 'Cook County Board of Commissioners', value: 'cook_board' },
    { label: 'Cook County Department of Public Health', value: 'cook_pubhealth' },
    { label: 'Cook County Electoral Board', value: 'cook_electoral' },
    { label: 'Cook County Government', value: 'cook_county' },
    { label: 'Cook County Health and Hospitals System', value: 'cook_hospitals' },
    { label: 'Cook County Land Bank', value: 'cook_landbank' },
    { label: 'Illinois Labor Relations Board', value: 'il_labor' },
    { label: 'Illinois Department of Public Health', value: 'il_pubhealth' },
    { label: 'Metra Board of Directors', value: 'metra_board' },
    { label: 'Regional Transportation Authority', value: 'regionaltransit' },
    { label: 'Detroit Board of Education', value: 'det_schools' }
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
