import React, { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import "./states.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    "& .MuiTableCell-root": {
      border: "1px solid black",
    },
  },
});

const States = () => {
  const [allCountries, setAllCountries] = useState([]);
  const [allStates, setAllStates] = useState([]);
  const [allCities, setAllCities] = useState([]);
  const [filteredStates, setFilteredStates] = useState([]);
  const [filteredCities, setFilteredCities] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedStateCode, setSelectedStateCode] = useState("");

  const classes = useStyles();

  useEffect(() => {
    let AllCountries = Country.getAllCountries();
    let AllStates = State.getAllStates();
    let AllCities = City.getAllCities();
    setAllCountries(AllCountries);
    setAllStates(AllStates);
    setAllCities(AllCities);
    setSelectedCountryCode(AllCountries[0].isoCode);

    createStates(AllStates, AllCountries[0].isoCode, AllCities);
  }, []);

  const createCities = (allCities, selectedStateCode) => {
    let FilteredCites = allCities.filter(
      (item) => item.stateCode === selectedStateCode
    );
    setFilteredCities(FilteredCites);
  };

  const createStates = (allStates, selectedCountryCode, AllCities) => {
    let FilteredStates = allStates.filter(
      (item) => item.countryCode === selectedCountryCode
    );
    setFilteredStates(FilteredStates);
    setSelectedStateCode(FilteredStates[0].isoCode);
    createCities(AllCities, FilteredStates[0].isoCode);
  };

  const changeStates = (country) => {
    let FilteredStates = allStates.filter(
      (item) => item.countryCode === country.isoCode
    );
    setSelectedCountryCode(country.isoCode);
    setFilteredStates(FilteredStates);
    setFilteredCities([]);
    setSelectedStateCode([])
  };

  const changeCities = (state) => {
    let  FilteredCites = allCities.filter(
      (item) => item.stateCode === state.isoCode
    );
    setSelectedStateCode(state.isoCode);
    setFilteredCities(FilteredCites);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table
          className={classes.table}
          aria-label="simple table"
        >
          <TableHead className="tablehead">
            <TableRow >
              <TableCell align="center" sx={{ width: "33%" }}>
                Countries
              </TableCell>
              <TableCell align="center" sx={{ width: "33%" }}>
                States
              </TableCell>
              <TableCell align="center" sx={{ width: "33%" }}>
                Cities
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allCountries.map((country, i) => {
              return (
                <TableRow key={country.name}>
                  <TableCell
                    align="center"
                    component="th"
                    scope="row"
                    className={
                      country.isoCode === selectedCountryCode
                        ? "selectedCell"
                        : "tableCell"
                    }
                  >
                    <button
                      className={
                        country.isoCode === selectedCountryCode
                          ? "btn-selected"
                          : "btn-none"
                      }
                      onClick={(e) => {
                        changeStates(country);
                      }}
                    >
                      {country.name}
                    </button>
                  </TableCell>
                  {filteredStates.length > 0 && filteredStates[i] ? (
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      className={
                        filteredStates[i].isoCode === selectedStateCode
                          ? "selectedCell"
                          : "tableCell"
                      }
                    >
                      <button
                        className={
                          filteredStates[i].isoCode === selectedStateCode
                            ? "btn-selected"
                            : "btn-none"
                        }
                        onClick={(e) => {
                          changeCities(filteredStates[i]);
                        }}
                      >
                        {filteredStates[i] && filteredStates[i].name
                          ? filteredStates[i].name
                          : ""}
                      </button>
                    </TableCell>
                  ) : (
                    <TableCell component="th" scope="row"></TableCell>
                  )}
                  {filteredCities.length > 0 && filteredCities[i] ? (
                    <TableCell component="th" scope="row" align="center">
                      {filteredCities[i] && filteredCities[i].name
                        ? filteredCities[i].name
                        : ""}
                    </TableCell>
                  ) : (
                    <TableCell component="th" scope="row"></TableCell>
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default States;
