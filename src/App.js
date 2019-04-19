import React, { Component } from 'react';
import './App.css';
import axios from "axios";


const SubMenu = (props) => {
  let tbody = props.items.map(item => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.description}</td>
      </tr>
    )
  })

  if (props.shortName === "") {
    return null;
  } else {
    return (
      <div>
        <h1>Items in Categories:({props.shortName})</h1>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Description</th>
            </tr>
            {tbody}
          </tbody>
        </table>
      </div>
    )

  }
}
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
      items: [],
      shortName: ""
    }
  }

  componentDidMount() {
    axios
      .get("https://stream-restaurant-menu-svc.herokuapp.com/category")
      .then(res => {
        console.log(res.data);
        this.setState({menuList: res.data});
      })
  }

  downloadItems(shortName) {
    console.log(shortName);
    axios
      .get(`https://stream-restaurant-menu-svc.herokuapp.com/item?category=${shortName}`)
      .then(res => {
        console.log(res.data);
        this.setState({ items: res.data, shortName: shortName})
      })
  }

  render() {
    let menuList = this.state.menuList.map(menu => {
      return (
        <li 
          key={menu.id}
          onClick={() => this.downloadItems(menu.short_name)}
        >
        <div className="box">{menu.name} - {menu.short_name}</div>
        </li>
      )
    });

    return (
      <div className="container">
        <div className="left">
          <h1>Menu Categories</h1>
          <ul>{menuList}</ul>
        </div>
        <div className="right">
          <SubMenu items={this.state.items} shortName={this.state.shortName}></SubMenu>
        </div>
      </div>
    );
  }
}

export default App;
