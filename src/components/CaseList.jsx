import React, { Component } from "react";
import ReactDOM from "react-dom";
import ReactGrid from "./ReactGrid";
import axios from 'axios'


const {
  DraggableHeader: { DraggableContainer }
} = require("react-data-grid-addons");

export default class CaseList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      columns: [
        { key: "fullName", name: "Name", draggable: true },
        { key: "Nationality", name: "Nationality", draggable: true }
        , { key: "AORDate", name: "AORDate", type: Date, draggable: true, resizable: true }
        , { key: "Country", name: "Country", draggable: true, resizable: true }
        , { key: "ImmStream", name: "ImmStream", draggable: true, resizable: true }
        , { key: "CurrentStatus", name: "CurrentStatus", draggable: true, resizable: true }
        , { key: "MedicalPassedDate", name: "MedicalPassedDate", type: Date, draggable: true, resizable: true }
        , { key: "BiometricsInvitationLetterDate", name: "BiometricsInvitationLetterDate", type: Date, draggable: true, resizable: true }
        , { key: "BGCheckStatus", name: "BGCheckStatus", draggable: true, resizable: true }
        , { key: "BGSChangeDate", name: "BGSChangeDate", type: Date, draggable: true, resizable: true }
        , { key: "PrincipalApplicantDependents", name: "PrincipalApplicantDependents", draggable: true, resizable: true }
        , { key: "PPRDate", name: "PPRDate", type: Date, draggable: true, resizable: true }
        , { key: "NOC", name: "NOC", draggable: true, resizable: true }
        , { key: "VisaOffice", name: "VisaOffice", draggable: true, resizable: true }
        , { key: "AdditionalInfo", name: "AdditionalInfo", draggable: true, resizable: true }
        , { key: "BGCheckStartDate", name: "BGCheckStartDate", type: Date, draggable: true, resizable: true }
        , { key: "EmploymentVerificationDate", name: "EmploymentVerificationDate", type: Date, draggable: true, resizable: true }
        , { key: "AdditionalDocReqDate", name: "AdditionalDocReqDate", type: Date, draggable: true, resizable: true }
        , { key: "ProvinceSponsor", name: "ProvinceSponsor", draggable: true, resizable: true }
        , { key: "RPRFPaidDate", name: "RPRFPaidDate", type: Date, draggable: true, resizable: true }
        , { key: "CRSScore", name: "CRSScore", draggable: true, resizable: true }
        , { key: "GCMSNotesOrdered", name: "GCMSNotesOrdered", draggable: true, resizable: true }
        , { key: "SecurityScreening", name: "SecurityScreening", draggable: true, resizable: true }
        , { key: "Refused", name: "Refused", draggable: true, resizable: true }
      ],
      rows: [],
      filter: null,
      message: null,
    };

  };


  // getData = () => {
  //   //let rowArray = [];
  //   var url = 'http://localhost:3000/api/cases'

  //   if (this.props.userID != undefined)
  //     url += '?userId=' + this.props.userID
  //   console.log('url=' + url);

  //   // fetch(url)
  //   //   .then(response => response.json())
  //   //   .then(response => {
  //   //     console.log(response);

  //   //     this.setState({ rows: response })
  //   //   }
  //   //   );

  // };

  componentDidMount() {
    console.log('aaa=' + this.props.userData);
    if (this.props.userData != undefined)
      this.setState({ filter: 'userID=' + this.props.userData.userID })
    //this.getData();
    if (this.props.shouldAuthorized != undefined) {
      if (this.props.shouldAuthorized && this.props.userData == null) {
        const { match, location, history } = this.props;
        history.push('/login')
      }
    }
  }

  editRecord = (id) => {
    if (this.props.userData != undefined) {
      const { match, location, history } = this.props;
      history.push({
        pathname: '/addcase',
        id: id,
      })
    }
  }

  deleteRecord = (id) => {
    console.log(id);
    axios.defaults.withCredentials = true;
    axios.get('http://localhost:3000/api/cases/delete/' + id)
      .then((response) => {
        var elem = document.querySelector(id);
        elem.parentNode.removeChild(elem);

        this.setState({
          message: { text: 'Case deleted successfully', class: 'alert-primary' },
          isLoading: false,
          visibleForm: false,
        })
      })
      .catch((error) => {
        console.log(error);
        console.log('http://localhost:3000/api/cases/delete/' + id);
        
        // this.setState({
        //   message: { text: error, class: 'alert-danger' },
        //   isLoading: false
        // })
      });
  }

  render() {
    return (
      <div>
        {this.state.message != null ?
          <div className={"alert " + this.state.message.class + " mt-1"} >
            {this.state.message.text}
          </div>
          : null}
        <ReactGrid
          title={'Case'}
          columns={this.state.columns}
          //rows={this.state.rows}
          baseID={'cases'}
          filter={this.props.userData != undefined ? 'userID=' + this.props.userData.userID : null}
          editRecord={(id) => this.editRecord(id)}
          editable={this.props.editable}
          deleteRecord={(id) => this.deleteRecord(id)}
        />
      </div>

    );
  }
}