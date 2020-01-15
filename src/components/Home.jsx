import React, { Component } from 'react'
import CaseList from './CaseList';

export default class Home extends Component {
    constructor(props) {
      super(props)
        
      this.state = {
         
      };
    };
    
    render() {
        return (
            <div>
                <CaseList />
            </div>
        )
    }
}
