import React from "react";

const PersonContact = props => {
  return props.contact.map((val, idx) => {
    let email = `email-${idx}`,
      telephone = `telephone-${idx}`,
      mobile = `mobile-${idx}`;
    return (
      <div key={idx} className="row">
        <div className="col-sm-4">
          <label>Email</label>
          <div className="form-group">
            <input
              className="form-control"
              placeholder=""
              data-id={idx}
              type="email"
              name={email}
              id={email}
              defaultValue={props.contact[idx].email}
              fieldname="email"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <label>Tel No.</label>
          <div className="form-group">
            <input
              className="form-control"
              placeholder=""
              type="number"
              data-id={idx}
              name={telephone}
              id={telephone}
              defaultValue={props.contact[idx].telephone}
              fieldname="telephone"
            />
          </div>
        </div>
        <div className="col-sm-4">
          <label>Mobile No.</label>

          <div className="form-group">
            <div className="input-group">
              <input
                className="form-control"
                placeholder=""
                type="number"
                data-id={idx}
                name={mobile}
                id={mobile}
                defaultValue={props.contact[idx].mobile}
                fieldname="mobile"
              />
              <span className="input-group-btn">
                <button
                  className="btn btn-danger"
                  type="button"
                  onClick={props.onContactRemove()}
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
export default PersonContact;
