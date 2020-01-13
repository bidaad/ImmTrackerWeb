import React, { Component } from 'react'
import axios from 'axios'
import Pagination from "react-js-pagination";

const qs = require('qs');

const APIUrl = 'http://localhost:3000/api/'
export default class ReactGrid extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            isLoading: true,
            message: '',
            PageNo: 1,
            id: null,
            activePage: 1,
            pageSize: 10,
            totalCount: 0,
            baseID: this.props.baseID,
            isLoading: true,
        };
    };



    handlePageChange = (pageNumber) => {
        this.setState({ activePage: pageNumber });
        var url = APIUrl + this.state.baseID + '/?pageNo=' + pageNumber + '&takeCount=' + this.state.pageSize
        this.getData(url);
    }

    handleClick = (Id) => {
        var url = APIUrl + 'person/' + Id
        this.setState({
            isLoading: true,
            NewEdit: 'Edit',
        }
        )

        this.getSingleData(url);
    }

    getTotalCount(filter) {
        var url = APIUrl + this.state.baseID + '/count'
        if (filter != undefined)
            url += '?' + filter
        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    totalCount: res.recordCount,
                });
            })
            .catch(error => {
                this.setState({ message: 'load error', isLoading: false });
                this.error('ERROR=' + error);
            });

    }

    getData(filter) {
        var url = APIUrl + this.state.baseID + '/?pageNo=' + this.state.activePage + '&takeCount=' + this.state.pageSize
        if (filter != undefined)
            url += '&' + filter
        console.log('Grid Url=' + url);

        fetch(url)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    data: res,
                    isLoading: false,
                    message: '',
                    PageNo: this.state.PageNo + 1,
                    isLoading:false,
                });
            })
            .catch(error => {
                this.setState({ message: 'load error', isLoading: false });
                this.error('ERROR=' + error);
            });

    }

    componentWillReceiveProps(nextProps) {
        // console.log(nextProps.filter);
        // const filter = nextProps.filter;
        // this.getTotalCount(filter);
        // this.getData(filter);

    }
    componentDidMount() {
        const filter = this.props.filter;
        console.log('filter=' + filter);
        
        this.setState({ filter: this.props.filter, isLoading:true })
        //        var url = APIUrl + this.state.baseID + '/?pageNo=' + this.state.activePage + '&takeCount=' + this.state.pageSize
        console.log('XXXXXXXXXXXX');

        this.getTotalCount(filter);
        this.getData(filter);
    }

    error = (msg) => {
        this.setState(
            { message: msg }
        )
    }

    getDate = (fullDate) => {
        if (fullDate == undefined)
            return ""
        // fullDate = new Date(fullDate)
        // var twoDigitMonth = fullDate.getMonth() + "";
        // if (twoDigitMonth.length == 1)
        //     twoDigitMonth = "0" + twoDigitMonth;
        // var twoDigitDate = fullDate.getDate() + "";
        // if (twoDigitDate.length == 1)
        //     twoDigitDate = "0" + twoDigitDate;
        // var currentDate = twoDigitDate + "/" + twoDigitMonth + "/" + fullDate.getFullYear();
        var currentDate = fullDate.substring(0, 10);
        return currentDate;
    }

    render() {

        const Loading = this.state.isLoading ? <div className="spinner-border" role="status">        <span className="sr-only">Loading...</span>      </div> : '';

        const ItemList = () => (
            this.state.data.map((item) => {

                return (
                    <tr id={item._id} key={item._id}>
                        {this.props.editable ? <td onClick={() => this.props.deleteRecord(item._id)} scope="col"><span className="text-danger glyphicon glyphicon-trash"></span></td> : null}
                        {this.props.columns.map((col) => {
                            const curColName = col.key
                            var colVal = item[curColName]
                            if (col.type == Date) {
                                colVal = this.getDate(colVal);
                            }
                            return (
                                <td onClick={() => this.props.editRecord(item._id)} key={col.key} scope="col">{colVal}</td>
                            )
                        })
                        }

                    </tr>
                )
            })

        );

        if (this.state.isLoading)
            return Loading;
        return (
            <div>
                <div>
                    <h1>{this.props.title} List</h1>
                </div>
                <table className="tblRecords table table-hover table-striped">
                    <thead>
                        <tr>
                            {this.props.editable ? <td  scope="col"> </td> : null}
                            {this.props.columns.map((item) => {
                                return (
                                    <th key={item.key} scope="col">{item.name}</th>
                                )
                            })
                            }
                        </tr>
                    </thead>
                    <tbody>
                        <ItemList />
                    </tbody>
                </table>
                {Loading}
                <div>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={this.state.pageSize}
                        totalItemsCount={this.state.totalCount}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                    />
                </div>


            </div>
        )


    }
}
