import ApartmentDetail from "../ApartmentDetail/ApartmentDetail";
import React, { useState, useEffect } from "react";
import "./Apartment.css";
import SearchBar from "../SearchBar/SearchBar";
import PropTypes from "prop-types";
import moment from "moment";

const Apartment = ({ apartments, stays, history }) => {
  const [apartmentList, setApartmentList] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setApartmentList(apartments);
  }, [apartments]);

  const handleNewInput = event => {
    setInputValue(event.target.value);
  };

  const sortApartmentsByStatus = apartmentList => {
    const activeApartments = apartmentList.filter(apartment =>
      apartment.status.includes("Active")
    );
    const inactiveApartments = apartmentList.filter(apartment =>
      apartment.status.includes("Inactive")
    );
    return activeApartments.concat(inactiveApartments);
  };

  const handleApartmentSearch = () => {
    if (inputValue) {
      return sortApartmentsByStatus(apartmentList).filter(apartment => {
        return apartment.name.toLowerCase().includes(inputValue.toLowerCase());
      });
    } else {
      return sortApartmentsByStatus(apartmentList);
    }
  };

  const calculateVancancy = (apartment, staysForApartment) => {
    const today = new Date();

    const currentStays = staysForApartment
      .filter(stay =>
        moment(today).isSameOrBefore(new Date(stay.checkOutDate), "day")
      )
      .filter(stay =>
        moment(today).isSameOrAfter(new Date(stay.checkInDate), "day")
      ).length;

    return apartment.capacity - currentStays;
  };

  const renderTable = () => {
    return (
      <table className="apartments__table">
        <thead className="apartments__tableHeaders">
          <tr>
            <th>Status</th>
            <th>Vacancy</th>
            <th>Apartment Name</th>
            <th>Lease Start</th>
            <th>Lease End</th>
            <th>Rental Per Month</th>
          </tr>
        </thead>
        <tbody>
          {handleApartmentSearch().map(apartment => {
            const staysForCurrentApartment = stays.filter(
              stay => stay.apartmentId === apartment._id
            );
            return (
              <ApartmentDetail
                key={apartment._id}
                vacancy={calculateVancancy(apartment, staysForCurrentApartment)}
                {...apartment}
                history={history}
              />
            );
          })}
        </tbody>
      </table>
    );
  };

  return (
    <div className="apartments" data-testid="apartment">
      <div className="apartments__div">
        <h1 className="apartments__heading">Apartments</h1>
        <SearchBar handleChange={handleNewInput} placeholder="Apartment" />
        {renderTable()}
      </div>
    </div>
  );
};

Apartment.propTypes = {
  stays: PropTypes.array.isRequired
};

export default Apartment;
