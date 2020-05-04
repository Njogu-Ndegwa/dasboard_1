import React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import { Transfer } from 'antd';
import { UserGroupsService, PermissionsService } from '../../../../../../config/security';
class App extends React.Component {
  state = {
      dataSource: [],
      data: [],
      mockData: [],
    dataSource: [],
    targetKeys: [],
  };

  componentDidMount() {
      
    PermissionsService.fetchPermissions().then(res => {
        console.log('server response', res)
       console.log('data,', )
       this.setState({dataSource: res.data.content})
       this.getMock()
    }).catch(error => {
        console.log(error)

        
    })
  
  }
 
 

  getMock = () => {
      const targetKeys=[];
      const mockData = [];
const {dataSource} = this.state
    
console.log('dataaaaa', dataSource)
    for (let i =0; i<dataSource.length; i++) {
const data = {
    key: i.toString(),
    chosen: Math.random() * 2 > 1,
    ...dataSource[i],
    title: dataSource[i].name
}

console.log('mock', data)

if (data.chosen) {
    targetKeys.push(data.key);
  }
  mockData.push(data);

    }

    this.setState({ mockData, targetKeys });

  };

  filterOption = (inputValue, option) => option.description.indexOf(inputValue) > -1;

  handleChange = targetKeys => {
    this.setState({ targetKeys });
  };

  handleSearch = (dir, value) => {
    console.log('search:', dir, value);
  };

  render() {
    
    const{mockData,dataSource} = this.state;
    console.log('mockData', mockData)
    console.log('dataSource 24', dataSource)
    return (
      <Transfer
        dataSource={this.state.mockData}
        showSearch
        filterOption={this.filterOption}
        targetKeys={this.state.targetKeys}
        onChange={this.handleChange}
        onSearch={this.handleSearch}
        render={item => item.title}
      />
    );
  }
}

export default App