import React from "react";

import {
    BigBreadcrumbs,
    JarvisWidget
} from "../../../../common";

import BootstrapValidator from "../../../../common/forms/validation/BootstrapValidator";


const validatorOptions = {
    feedbackIcons: {
        valid: "glyphicon glyphicon-ok",
        invalid: "glyphicon glyphicon-remove",
        validating: "glyphicon glyphicon-refresh"
    },
    fields: {
        title: {
            group: ".col-md-8",
            validators: {
                notEmpty: {
                    message: "The title is required"
                },
                stringLength: {
                    max: 200,
                    message: "The title must be less than 200 characters long"
                }
            }
        },
        appointmentType: {
            group: ".col-md-4",
            validators: {
                notEmpty: {
                    message: "The appointment type is required"
                }
            }
        },
        practioner: {
            group: ".col-md-4",
            validators: {
                notEmpty: {
                    message: "The Practioner is required"
                }
            }
        },
        urgency: {
            group: ".col-md-4",
            validators: {
                notEmpty: {
                    message: "The Urgency is required"
                }
            }
        },
        appointmentDate: {
            group: ".col-md-4",
            validators: {
                notEmpty: {
                    message: "The Appointment Date is required"
                },

            }
        },
        startTime: {
            group: ".col-md-4",
            validators: {
                notEmpty: {
                    message: "The Start Time is required"
                },
            }
        },
        endTime: {
            group: ".col-md-4",
            validators: {
                notEmpty: {
                    message: "The End Time is required"
                },
            }
        }

    }
};

export default class BootstrapValidation extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        console.log("submit stuff");
    }
    render() {
        return (
            <div id="content">
                <div className="row">
                    <BigBreadcrumbs
                        items={["Organization", "Facility"]}
                        icon="fa fa-fw fa-hospital-o"
                        className="col-xs-12 col-sm-7 col-md-7 col-lg-4"
                    />

                </div>


                <div className="row">

                    <div className="col-sm-12">

                        <JarvisWidget
                            id="wid-id-0"
                            colorbutton={false}
                            editbutton={false}
                            deletebutton={false}
                            sortable={false}
                        >
                            <header>
                                <h2>Facility Information</h2>
                            </header>


                            <div>

                                <div className="widget-body">

                                    <BootstrapValidator options={validatorOptions}>
                                        <form id="movieForm" onSubmit={this.onSubmit} >

                                            <fieldset>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Company Name</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                            
                                                        </div>
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Legal Name</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                            
                                                        </div>
                                                        <div className="col-sm-12 col-md-3 selectContainer">
                                                            <label for="">Category</label>
                                                            <select className="form-control" name="practioner">
                                                                <option value="county">COUNTY HOSPITAL</option>
                                                                <option value="dental">DENTAL CLINIC</option>
                                                                <option value="dispensary">DISPENSARY</option>
                                                                <option value="eye">EYE HOSPITAL</option>
                                                                <option value="health">HEALTH CENTER</option>
                                                            </select>
                                                        </div>
                                                    </div>                                                  
                                                </div>
                                            </fieldset>

                                            <fieldset>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Tax Pin</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                            
                                                        </div>
                                                        <div className="col-sm-12 col-md-3">
                                                            <div class="row">
                                                                <div className="col-sm-4">
                                                                    <label for=""><small>Invoice Pre</small></label>
                                                                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                                    
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <label for=""><small>Invoice Mid</small></label>
                                                                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                                    
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <label for=""><small>Invoice Suf</small></label>
                                                                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Receipt Prefix</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                            
                                                        </div>
                                                        
                                                        <div className="col-sm-12 col-md-3">
                                                            <div class="row">
                                                                <div className="col-sm-4">
                                                                    <label for=""><small>File-No Pre</small></label>
                                                                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                                    
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <label for=""><small>File-No Mid</small></label>
                                                                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                                    
                                                                </div>
                                                                <div className="col-sm-4">
                                                                    <label for=""><small>File-No Suf</small></label>
                                                                    <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                                    
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>                                                  
                                                </div>
                                            </fieldset>

                                            <fieldset>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Physical Address</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                            
                                                        </div>
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Postal Address</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                           
                                                        </div>
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Country</label>
                                                            <select className="form-control" name="practioner">
                                                                <option value="kenya">KENYA</option>
                                                                <option value="rwanda">RWANDA</option>
                                                                <option value="uganda">UGANDA</option>
                                                                <option value="tanzania">TANZANIA</option>
                                                                <option value="somalia">SOMALIA</option>
                                                            </select>
                                                        </div>
                                                        
                                                        <div className="col-sm-12 col-md-3 selectContainer">
                                                            <label for="">County</label>
                                                            <select className="form-control" name="practioner">
                                                                <option value="nairobi">NAIROBI COUNTY</option>
                                                                <option value="kisumu">KISUMU COUNTY</option>
                                                                <option value="kiambu">KIAMBU COUNTY</option>
                                                                <option value="mombasa">MOMBASA COUNTY</option>
                                                                <option value="samburu">SAMBURU COUNTY</option>
                                                            </select>
                                                        </div>
                                                    </div>                                                  
                                                </div>
                                            </fieldset>

                                            <fieldset>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Company Phone</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                           
                                                        </div>
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Email Address</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                            
                                                        </div>
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Website</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                            
                                                        </div>
                                                        
                                                        <div className="col-sm-12 col-md-3">
                                                            <label for="">Registration Number</label>
                                                            <input type="text" name="" id="" class="form-control" placeholder="" aria-describedby="helpId" />
                                                            
                                                        </div>
                                                    </div>                                                  
                                                </div>
                                            </fieldset>

                                            <fieldset>
                                                <div class="form-group">
                                                    <div class="row">
                                                        <div className="col-sm-12 col-md-3 selectContainer">
                                                            <label for="">Currency</label>
                                                            <select className="form-control" name="practioner">
                                                                <option value="KES">KES</option>
                                                                <option value="UGX">UGX</option>
                                                                <option value="RWF">RWF</option>
                                                                <option value="USD">USD</option>
                                                                <option value="EURO">EURO</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-12 col-md-3 selectContainer">
                                                            <label for="">Payment Model</label>
                                                            <select className="form-control" name="practioner">
                                                                <option value="CENTRALIZED">CENTRALIZED</option>
                                                                <option value="DECENTRALIZED">DECENTRALIZED</option>
                                                            </select>
                                                        </div>
                                                        <div className="col-sm-12 col-md-3 selectContainer">
                                                            <label class="control-label" for="">Theme</label>
                                                            <select className="form-control" name="practioner">
                                                                <option value="smart">Smart Color</option>
                                                                <option value="Blue">Blue</option>
                                                                <option value="Red">Red</option>
                                                            </select>
                                                        </div>

                                                    </div>                                                  
                                                </div>
                                            </fieldset>

                                            <div className="form-actions">
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <button className="btn btn-info" type="submit">
                                                            <i className="fa fa-send" />
                                                            &nbsp; Submit </button>

                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </BootstrapValidator>


                                </div>

                            </div>

                        </JarvisWidget>

                    </div>

                </div>


            </div>
        );
    }
}


