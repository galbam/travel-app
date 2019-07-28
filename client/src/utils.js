
export function loadGoogleMaps() {
  return new Promise((resolve) => {
    window.resolveGoogleMapsPromise = () => {
      resolve(window.google);
      delete window.resolveGoogleMapsPromise;
    };
    const script = document.createElement("script");
    const API = 'AIzaSyALu2H4MN0txO_RLeAlpC93xAhkcTsTMXg';
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

// Venues search API docs: https://developer.foursquare.com/docs/api/venues/search
export function loadPlaces(city, categoryId){
  let query = ''
  let maxResults = 50;
  let intent = 'browse';
  const clientId = '5R5N5JHEEE2C01QS11INO5GQWE30SFQMBLATVZJ3N5W31H2E';
  const clientSecret = 'VULJIZUWDDRZKY0HCMM3DRS4EQ1OXM22FUZODS1UJ13QDOMN';
  var apiURL = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=20130815%20&intent=${intent}&limit=${maxResults}&categoryId=${categoryId}&near=${city}&query=${query}`;
  return fetch(apiURL).then(resp => resp.json())
}
