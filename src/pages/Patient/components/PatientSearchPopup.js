import React, { useState } from "react";
import "antd/dist/antd.css";
import { message } from 'antd';
function searchPatientByDetailsProvided () {
  message.info("Proceed to prop function");
  //if found call prop function

  //if not found display error message
}

const PatientSearch = props => {
  let identificationType = props.identificationType;
  let optionsIdentificationTypeItems = identificationType.map((idType) =>
      <option key={idType.id}>{idType.identification_name}</option>
  );
  return (
    <div className="row">
      <div className="col-sm-4">
        <label>Search By</label>
        <div className="form-group">
          <select name="search_patient_by" className="form-control">
            {optionsIdentificationTypeItems}
          </select>
        </div>
      </div>
      <div className="col-sm-8">
        <label>Value</label>

        <div className="input-group">
          <input type="search" className="form-control" />
          <span className="input-group-btn">
            <button onClick={searchPatientByDetailsProvided} className="btn btn-primary" type="button">
              <span
                className="glyphicon glyphicon-search"
                aria-hidden="true"
              ></span>{" "}
              Search
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};
export default PatientSearch;
