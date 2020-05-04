import React from "react";
import countries from "../../../common/forms/commons/countries";

const PersonAddress = props => {
  return props.address.map((val, idx) => {
    let line1 = `line1-${idx}`,
      line2 = `line2-${idx}`,
      country = `country-${idx}`,
      county = `county-${idx}`,
      town = `town-${idx}`,
      postal_code = `postal_code-${idx}`;
    return (
      <div key={idx} className="row">
        <div className="col-sm-4">
          <label>Line 1</label>
          <div className="form-group">
            <input
              className="form-control"
              placeholder=""
              type="number"
              data-id={idx}
              name={line1}
              id={line1}
              value={props.address[idx].line1}
              fieldname="line1"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <label>Line 2</label>
          <div className="form-group">
            <input
              className="form-control"
              placeholder=""
              type="number"
              data-id={idx}
              name={line2}
              id={line2}
              value={props.address[idx].line2}
              fieldname="line2"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <label>Country</label>
          <div className="form-group">
            <select
              className="form-control"
              fieldname="country"
              data-id={idx}
              name={country}
              id={country}
            >
              <option value="">-Select-</option>
              {countries.map(function (country) {
                return (
                  <option value={country.key} key={country.key}>
                    {country.value}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
        <div className="col-sm-4">
          <label>County</label>
          <div className="form-group">
            <input
              className="form-control"
              placeholder=""
              type="text"
              name={county}
              data-id={idx}
              value={props.address[idx].county}
              fieldname="county"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <label>Town</label>
          <div className="form-group">
            <input
              className="form-control"
              placeholder=""
              type="text"
              name={town}
              data-id={idx}
              value={props.address[idx].town}
              fieldname="town"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <label>Postal Code</label>

          <div className="form-group">
            <div className="input-group">
              <input
                className="form-control"
                name={postal_code}
                data-id={idx}
                value={props.address[idx].postal_code}
                placeholder=""
                type="text"
                fieldname="postal_code"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={props.onAddressRemove()}
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
export default PersonAddress;
