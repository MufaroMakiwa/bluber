const express = require("express");
const router = express.Router();

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const BLUEBIKE_STATION_INFO_API = 'https://gbfs.bluebikes.com/gbfs/en/station_information.json';
const BLUEBIKE_STATION_STATUS_API = 'https://gbfs.bluebikes.com/gbfs/en/station_status.json';

/**
 * gets bluebike station status
 */
async function get_station_status(){
    const stationStatusData = await fetch(BLUEBIKE_STATION_STATUS_API);
    return await stationStatusData.json();
}

/**
 * gets bluebike station information
 */
async function get_station_information(){
    const stationInfoData = await fetch(BLUEBIKE_STATION_INFO_API);
    return await stationInfoData.json();
}

/**
 * 
 * process bluebike information and configures it in a way
 * that suitable for rendering in the frontend. It merges
 * station status data and station meta data
 * 
 */
async function process_bluebike_data(){
  
    const stationInfoData  = await get_station_information();
    const stationStatusData = await get_station_status();

    const processedData = {}
    stationInfoData.data.stations.forEach((station)=>{
        processedData[station.station_id] = { stationId: station.station_id,lat: station.lat , lng: station.lon, name: station.name }
    })
    
    stationStatusData.data.stations.forEach((station)=>{
        if (stationStatusData.station_status==='active'){
            processedData[station.station_id].active = true
        }else{
            processedData[station.station_id].active = false
        }
        processedData[station.station_id].numBikesAvailable = station.num_bikes_available;
        processedData[station.station_id].numDocksAvailable = station.num_docks_available;
        processedData[station.station_id].lastReported = new Date(station.last_reported*1000) ;
    });
    return processedData;
}

  
/**
 * Sign in user.
 * 
 * @name GET /api/bluebikes
 * 
 * @return {Bluebike data} an object that maps each station id to its metadata and current status
 *
 */
router.get('/',async (req,res)=>{
    const bluebikesData = await process_bluebike_data();
    res.status(200).json(Object.values(bluebikesData)).end();
});

module.exports = router;