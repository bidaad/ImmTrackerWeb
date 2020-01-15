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
        , { key: "ImmStream", name: "Stream", draggable: true, resizable: true }
        , { key: "CurrentStatus", name: "Status", draggable: true, resizable: true }
        , { key: "MedicalPassedDate", name: "Medical Passed Date", type: Date, draggable: true, resizable: true }
        , { key: "BiometricsInvitationLetterDate", name: "Biometrics LetterDate", type: Date, draggable: true, resizable: true }
        , { key: "BGCheckStatus", name: "BG Check", draggable: true, resizable: true }
        , { key: "BGSChangeDate", name: "BGS ChangeDate", type: Date, draggable: true, resizable: true }
        , { key: "PrincipalApplicantDependents", name: "Dependents", draggable: true, resizable: true }
        , { key: "PPRDate", name: "PPR Date", type: Date, draggable: true, resizable: true }
        , { key: "NOC", name: "NOC", draggable: true, resizable: true }
        , { key: "VisaOffice", name: "Visa Office", draggable: true, resizable: true }
        , { key: "AdditionalInfo", name: "Additional Info", draggable: true, resizable: true }
        , { key: "BGCheckStartDate", name: "BG Check Start Date", type: Date, draggable: true, resizable: true }
        , { key: "EmploymentVerificationDate", name: "Employment Verification Date", type: Date, draggable: true, resizable: true }
        , { key: "AdditionalDocReqDate", name: "Additional Doc ReqDate", type: Date, draggable: true, resizable: true }
        , { key: "ProvinceSponsor", name: "Province", draggable: true, resizable: true }
        , { key: "RPRFPaidDate", name: "RPRF Paid Date", type: Date, draggable: true, resizable: true }
        , { key: "CRSScore", name: "CRSScore", draggable: true, resizable: true }
        , { key: "GCMSNotesOrdered", name: "GCMS Notes", draggable: true, resizable: true }
        , { key: "SecurityScreening", name: "Security Screening", draggable: true, resizable: true }
        , { key: "Refused", name: "Refused", draggable: true, resizable: true }
      ],
      rows: [],
      filter: null,
      message: null,
      refreshGrid: false,
    };

  };




  componentDidMount() {
    console.log('aaa=' + this.props.userData);
    if (this.props.userData != undefined)
      this.setState({ filter: 'userID=' + this.props.userData.userID, userToken: this.props.userData.userToken })
    //this.getData();
    if (this.props.shouldAuthorized != undefined) {
      if (this.props.shouldAuthorized && this.props.userData == null) {
        const { match, location, history } = this.props;
        history.push('/login')
      }
    }
  }

  gotoAddCase = () => {
    const { match, location, history } = this.props;
    history.push('/addcase')
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
    const confirmDelete = window.confirm("Are you sure to delete this record?");
    if (confirmDelete) {

      axios.delete('http://localhost:3000/api/cases/',
        {
          data: {
            id: id,
            userToken: this.state.userToken
          }
        }
      )
        .then((response) => {
          //console.log(response);

          // var elem = document.getElementById(id);
          // elem.style.display = "none"; 
          //elem.parentNode.removeChild(elem);
          //console.log(elem);


          this.setState({
            message: { text: 'Case deleted successfully', class: 'alert-primary' },
            isLoading: false,
            visibleForm: false,
            refreshGrid: true
          })
          return true;
        })
        .catch((error) => {
          console.log(error);
          //console.log('http://localhost:3000/api/cases/delete/' + id);

          // this.setState({
          //   message: { text: error, class: 'alert-danger' },
          //   isLoading: false
          // })
          return false;
        });
    }
  }

  render() {
    return (
      <div className="caseList">
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
          refresh={this.state.refreshGrid}
        />
        {this.props.userData != null ?
          <button onClick={() => this.gotoAddCase()} className="btn btn-info">Add My Case</button>
          : null
        }
      </div>

    );
  }
}