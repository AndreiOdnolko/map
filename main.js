   const listCity = [
     {
       name: "Nashville, TN",
       latitudes: 36.17,
       longitudes: -86.78
     },
     {
       name: "New York, NY",
       latitudes: 40.71,
       longitudes: -74.0
     },
     {
       name: "Atlanta, GA",
       latitudes: 33.75,
       longitudes: -84.39
     },
     {
       name: "Denver, CO",
       latitudes: 39.74,
       longitudes: -104.98
     },
     {
       name: "Seattle, WA",
       latitudes: 47.61,
       longitudes: -122.33
     },
     {
       name: "Los Angeles, CA",
       latitudes: 34.05,
       longitudes: -118.24
     },
     {
       name: "Memphis, TN",
       latitudes: 35.15,
       longitudes: -90.05
     }
   ];
 
   const map = new Map(listCity);
 
   map.findToNorthernmostCity();
   map.findToEastermostCity();
   map.findToSouthernmostCity();
   map.findToWesternmostCity();
 
   map.findToNearestCity(39.11, -100.0);
 
   map.findToCityAbbreviations(); 