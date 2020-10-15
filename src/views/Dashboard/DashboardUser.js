import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';

import {
    Nav,
    NavItem,
    NavLink,
    TabContent,
    TabPane
    
  } from "reactstrap";

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Todo from "../../assets/todo.jpg";
import Todo2 from "../../assets/todo2.jpg";
import ToDoList from "../ToDoList/ToDoList";

const useStyles =theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      flexWrap: 'nowrap',
      // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
      transform: 'translateZ(0)',
    },
    title: {
      color: "white",
    },
    titleBar: {
      background:
        'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 90%, rgba(0,0,0,0) 100%)',
    },
  
    inline: {
      display: 'inline',
      color:"green"
    },
    cardstyle:{
      maxWidth: 345,
      alignItems: 'center'
    },
    root1: {
      width: '100%',
   
      backgroundColor: theme.palette.background.paper,
    },
  });
class DashboardUser extends Component {

  constructor(props){
    super(props);
    this.state={
        activeTab: new Array(4).fill("1"),

    }
  }


  toggle(tabPane, tab) {
    const newArray = this.state.activeTab.slice();
    newArray[tabPane] = tab;
    this.setState({
      activeTab: newArray,
    });
  }

  tabPane() {
    const {pageNumber}=this.state;
    return (
      <>
        <TabPane tabId="1">
          {
               <ToDoList />
          }
        </TabPane>
        <TabPane tabId="2">

          {
          <div>
            
          </div>
          }
        </TabPane>
        <TabPane tabId="3">

            {
                
                                    
            }
            </TabPane>

            
         
      </>
    );
  }


  
  render() {

    const {classes} = this.props;
    return (

      <div>

<GridList className={classes.gridList} cols={2.0} style={{cursor:"pointer"}}> 


  <GridListTile key="1"
  onClick={()=>{}}
  style={{borderColor:"red",borderWidth:"medium"}}
 
  >
    <img src={Todo} style={{width:"100%"}} alt="image" />
    
    <GridListTileBar
    
      title="Organize your tasks well"
      classes={{
        root: classes.titleBar,
        title: classes.title,
      }}
      actionIcon={
        <IconButton aria-label={`star ${"hello"}`}
        >
          <StarBorderIcon className={classes.title} />
        </IconButton>
      }
    
    />
  </GridListTile>
  
  <GridListTile key="2"
  onClick={()=>{}}
  style={{borderColor:"red",borderWidth:"medium"}}
 
  >
    <img src={Todo2} style={{width:"100%"}} alt="image" />
    
    <GridListTileBar
    
      title="By extending your membership"
      classes={{
        root: classes.titleBar,
        title: classes.title,
      }}
      actionIcon={
        <IconButton aria-label={`star ${"hello"}`}
        >
          <StarBorderIcon className={classes.title} />
        </IconButton>
      }
    
    />
  </GridListTile>

</GridList>

<Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "1"}
                  onClick={() => {
                    this.toggle(0, "1");
                  }}
                >
                  <b>All Todo List</b>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "2"}
                  onClick={() => {
                    this.toggle(0, "2");
                  }}
                >
                  <b>Create Todo</b>
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "3"}
                  onClick={() => {
                    this.toggle(0, "3");
                  }}
                >
                  <b>Completed Todo</b>
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  active={this.state.activeTab[0] === "4"}
                  onClick={() => {
                    this.toggle(0, "4");
                  }}
                >
                 <b> Renew Membership</b>
                </NavLink>
              </NavItem>

            </Nav>
            <TabContent activeTab={this.state.activeTab[0]}>
              {this.tabPane()}
            </TabContent>
          </Col>
        </Row>





      </div>
     
    );
  }
}

export default withStyles(useStyles)(DashboardUser);
