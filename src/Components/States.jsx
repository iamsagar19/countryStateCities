import React, { useEffect, useState } from 'react'

// import { Country, State, City }  from 'country-state-city';

// // Import Interfaces`
// import { ICountry, IState, ICity } from 'country-state-city'
import { Country, State, City } from 'country-state-city'
import './states.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
var count = 0;



const States = () => {

    const [allCountries, setAllCountries] = useState([]);
    const [allStates, setAllStates] = useState([]);
    const [allCities,setAllCities] = useState([]);

    





useEffect(() => {
    count++;
    if (count === 1) {
        let AllCountries = Country.getAllCountries();
    let AllStates = State.getAllStates();
    let AllCities = City.getAllCities();
    setAllCountries(AllCountries);
    setAllStates(AllStates);
    setAllCities(AllCities);
        createTable()
    }
    
    console.log("object")
},[])

const createTable = () => {

    //Month Arrays -----------------------------------------------------------

var monthsEnglish = ["January","February","March","April", "May", "June", "July", "August", "September","October","November","December"];
var monthsSpanish = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre ","Octubre ","Noviembre","Diciembre"];
var allCountriesList = Country.getAllCountries();
var countLength  = allCountriesList.length;
console.log("countLength",countLength)
var allStatesList = State.getAllStates();
var allCitiesList = City.getAllCities();
var selectedCountryCode = allCountriesList[0].isoCode;
var FilteredStates = allStatesList.filter(item => item.countryCode === selectedCountryCode);
// if(FilteredStates.length > countLength) {
//     countLength = FilteredStates.length;
// }
var selectedStateCode = FilteredStates[0].isoCode;
var FilteredCites = allCitiesList.filter(item => item.stateCode === selectedStateCode)
// if(FilteredCites.length > countLength) {
//     countLength = FilteredCites.length;
// }
// console.log("allCountriesList",allCountriesList, allStatesList)
// console.log("allCitiesList",allCitiesList,allStatesList)
console.log("object",allCountriesList,selectedCountryCode,FilteredStates,FilteredCites,countLength)


//Static content ---------------------------------------------------------
document.write("<table border='1' width='200'>")
document.write("<tr><th>Countries</th><th>States</th><th>Cities</th></tr>");
//Dynamic content --------------------------------------------------------
// for(var i=0; i<250;i++)
// {
    var i = 0;
    while(i<250) {
      if(!FilteredStates[i] && !FilteredCites[i]) {
        document.write("<tr><td>" + allCountriesList[i].name + "</td><td>" + " " + "</td><td>" + " " +"</td></tr>");
      } else if(!FilteredCites[i]) {
        document.write("<tr><td>" + allCountriesList[i].name + "</td><td>" + FilteredStates[i].name + "</td><td>" + " " +"</td></tr>");
      } else if(!FilteredStates[i]) {
        document.write("<tr><td>" + allCountriesList[i].name + "</td><td>" + " " + "</td><td>" + FilteredCites[i].name +"</td></tr>");
      } else {
        document.write("<tr><td>" + allCountriesList[i].name + "</td><td>" + FilteredStates[i].name + "</td><td>" + FilteredCites[i].name +"</td></tr>");
      }

        i++;
}
//Static content  --------------------------------------------------------
document.write("</table>")
}

  return (
    <div>
      <h1>Dynamic Table</h1>
    </div>
  )
}

export default States
