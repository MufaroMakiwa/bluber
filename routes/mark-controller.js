const markModel = require("../models/mark");
const BLUBER_DATA_SERVER_URL = "https://bluber-server.herokuapp.com"

/**
 * Convert to radians
 * 
 * @param {Integer} degree - The angle in degrees
 * @returns - The angle in radians
 */
function toRadian(degree) {
  return degree * Math.PI / 180;
}


/**
 * Get distance between two points
 * 
 * @param {Object} start - (lat, lng) of start point
 * @param {Object} end - (lat, lng) of end point
 * @returns {Integer} - The distance in metres
 */
function getDistance(start, end) {
  // return distance in meters
  let lng1 = toRadian(start.lng),
      lat1 = toRadian(start.lat),
      lng2 = toRadian(end.lng),
      lat2 = toRadian(end.lat);

  const EARTH_RADIUS = 6371;

  let deltaLat = lat2 - lat1;
  let deltaLng = lng2 - lng1;
  let a = Math.pow(Math.sin(deltaLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(deltaLng / 2), 2);
  let c = 2 * Math.asin(Math.sqrt(a));
  return c * EARTH_RADIUS * 1000;
}


/**
 * Get center between two points
 * 
 * @param {Object} start - (lat, lng) of start point
 * @param {Object} end - (lat, lng) of end point
 * @returns {Object} - (lat, lng) of center of the point
 */
function getCenter(start, end) {
  const lat = (start.lat + end.lat) / 2;
  const lng = (start.lng + end.lng) / 2;
  return { lat, lng }
}


/**
 * Determine if a point is in the spanned area
 * 
 * @param {Object} point - The test point
 * @param {Object} center - The center of the spanned area
 * @param {Integer} radius - The radius of the spanned area
 * @returns {Boolean} - Whether the point is in the spanned area
 */
function isPointInSpannedArea(point, center, radius) {
  const distanceFromCenter = getDistance(point, center);
  return distanceFromCenter < radius;
}


function getMarksInSpannedArea(start, end) {
  // get the radius between the two points
  const radius = getDistance(start, end);

  // get the center of the spanned area
  const center = getCenter(start, end);

  // loop through all the marks and get the ones with the start or end in the spanned area
  const marksInSpannedArea = 
      markModel
        .findAll()
        .filter(mark => {
          return isPointInSpannedArea(mark.start, center, radius) || isPointInSpannedArea(mark.end, center, radius)
        });
  // add is intersection
  return { marksInSpannedArea, radius, center };
}


/**
 * Get the path from the start to the end
 * 
 * @param {Object} start - (lat, lng) of start point
 * @param {Object} end - (lat, lng) of end point
 * @returns {Object[]} - A list of (lat, lng) objects from start to end
 */
async function getPath(start, end) {
  const routeEndpoint = `${BLUBER_DATA_SERVER_URL}/${start.lat}/${start.lng}/${end.lat}/${end.lng}`;
  const path = await fetch(routeEndpoint);
  console.log(path);
  return path;
}


module.exports = Object.freeze({
  getMarksInSpannedArea,
  getPath
})
