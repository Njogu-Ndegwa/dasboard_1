import React from "react";

const PatientIdentifier = props => {
  console.log(props)
  return props.identifiers.map((val, idx) => {
    let identification_type = `id_type-${idx}`,
      identification_valueId = `identification_value-${idx}`;
    let identificationType = props.identificationType;
    let optionsIdentificationTypeItems = identificationType.map((idType) =>
        <option value={idType.id} key={idType.id}>{idType.identification_name}</option>
    );
    return (
      <div key={idx} className="row">
        <div className="col-sm-6">
          <label>{["Identification Type"]}</label>
          <div className="form-group">
            <select
              name={identification_type}
              data-id={idx}
              id={identification_type}
              value={props.identifiers[idx].id_type}
              className="form-control"
              fieldname="id_type"
            >
              <option value="">-Select-</option>
              {optionsIdentificationTypeItems}
            </select>
          </div>
        </div>
        <div className="col-sm-6">
          <label>Value</label>
          <div className="form-group">
            <div className="input-group">
              <input
                type="text"
                name={identification_valueId}
                data-id={idx}
                id={identification_valueId}
                value={props.identifiers[idx].identification_value}
                className="form-control"
                fieldname="identification_value"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={props.onDeletePatientIdentifier()}
                >
                  <span
                    className="glyphicon glyphicon-trash"
                    aria-hidden="true"
                  ></span>
                  &nbsp; Remove
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  });
};
export default PatientIdentifier;
