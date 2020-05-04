import React from "react";

import {
  BigBreadcrumbs,
} from "../../../../common";

// import Datatable from "../../../../common/tables/components/Datatable";

export default class Datatables extends React.Component {
  render() {
    return (
      <div id="content">
        <div className="row">
          <BigBreadcrumbs
            items={["Organization", "Departments"]}
            icon="fa fa-fw fa-hospital-o"
            className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
          />

        </div>

        <button type="button" className="btn btn-primary " data-toggle="modal" data-target="#myModal">
          Add Department
        </button>

        {/* The Modal */}
        <div className="modal fade" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">

              {/* Modal Header */}
              <div className="modal-header">
                <h4 className="modal-title">Department Details:</h4>
                <button type="button" className="close" data-dismiss="modal">&times;</button>
              </div>

              {/* Modal body */}
              <div className="modal-body">
                <form>
                  <fieldset>
                    <div class="form-group">
                      <div class="row">
                        <div className="col-sm-12 col-md-3">
                          <label for="">Department Name</label>
                          <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />

                        </div>
                        <div className="col-sm-12 col-md-3 selectContainer">
                          <label for="">Income Account</label>
                          <select className="form-control" name="practioner">
                            <option value=""></option>
                            <option value="county">STOCK</option>
                            <option value="dental">PETTY CASH</option>
                            <option value="dispensary">KCB</option>
                            <option value="eye">DEBTOR</option>
                            <option value="health">CREDITOR</option>
                          </select>
                        </div>
                        <div className="col-sm-12 col-md-3 selectContainer">
                          <label for="">Expense Account</label>
                          <select className="form-control" name="practioner">
                            <option value=""></option>
                            <option value="county">STOCK</option>
                            <option value="dental">PETTY CASH</option>
                            <option value="dispensary">KCB</option>
                            <option value="eye">DEBTOR</option>
                            <option value="health">CREDITOR</option>
                          </select>
                        </div>
                        <div className="col-sm-12 col-md-3 selectContainer">
                          <label for="">Store</label>
                          <select className="form-control" name="practioner">
                            <option value="">--SELECT--</option>
                            <option value="county">MAIN STORE</option>
                            <option value="dental">STATIONARY</option>
                            <option value="dispensary">PHARMACY</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </form>
              </div>

              {/* Modal footer */}
              <div className="modal-footer">
                <button type="button" className="btn btn-primary" data-dismiss="modal">Save</button>
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>

            </div>
          </div>
        </div>

        {/* <WidgetGrid>
          <div className="row">
            <article className="col-sm-12">
              <JarvisWidget id="wid-id-2" editbutton={false} color="blueDark">
                <header>
                  <span className="widget-icon">
                    <i className="fa fa-table" />
                  </span>
                  <h2>Hide / Show Columns </h2>
                </header>
                <div>
                  <div className="widget-body no-padding">
                    <Datatable
                      options={{
                        ajax: "assets/api/tables/datatables.standard.json",
                        columns: [
                          { data: "id" },
                          { data: "name" },
                          { data: "phone" },
                          { data: "company" },
                        ],
                        buttons: ["colvis"]
                      }}
                      className="table table-striped table-bordered table-hover"
                      width="100%"
                    >
                      <thead>
                        <tr>
                          <th data-hide="phone">#</th>
                          <th data-class="expand">Department</th>
                          <th>Edit</th>
                          <th data-hide="phone">Delete</th>
                        </tr>
                      </thead>
                    </Datatable>
                  </div>
                </div>
              </JarvisWidget>
             
            </article>
          </div>
        </WidgetGrid> */}
      </div>
    );
  }
}
