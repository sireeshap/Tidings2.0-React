    import React, { Component } from 'react';
import 'assets/scss/material-kit-react.css';
    //Material -ui
    import Header from 'components/Header/Header';
    import HeaderLinks from 'components/Header/HeaderLinks';
    import Parallax from 'components/Parallax/Parallax';
    import styles from "assets/jss/material-kit-react/views/components.js"; 
import NavigationBar from './NavigationBar/NavigationBar';
 // @material-ui/core components
 import { makeStyles } from "@material-ui/core/styles";
 import { withStyles } from '@material-ui/styles';
 import GridContainer  from 'components/Grid/GridContainer.js';
 import  GridItem  from 'components/Grid/GridItem.js';
 import LatestNews from 'client/LatestNews/LatestNews.js';
import { conditionalExpression } from '@babel/types';
 //const useStyles = makeStyles(styles);
 //const classes = useStyles();
 class CodeMessApp extends React.Component {
  
  constructor(props){
super(props)
this.state={
  countryNames:[],
  selectedCountry : process.env.REACT_APP_DEFAULT_COUNTRY
}
  }
  componentWillMount(){
    fetch('./../../sources/country.json', {
      headers : { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
       }
    })
    .then((responce) =>{
      return responce.json()
    })
    .then((countryData) => {
      this.setState({countryNames: countryData.countries})
    })
  }
  setCountry(v){
    this.setState({selectedCountry :v},()=>{
      return this.state.selectedCountry
    })
  }
  render(){
    const { classes } = this.props;
return(
  <div>
  < Header
  rightLinks= {<HeaderLinks countryNames={this.state.countryNames} clickDropDown={this.setCountry.bind(this)}/>}
  fixed
  color="transparent"
  changeColorOnScroll= {{
    height: 400,
    color:  "white"}}
    font='20px'
  >
  </Header>
  <Parallax image={require("./../assets/img/newNewsBanner.jpg")}>
  <div className={classes.container}>
  <div>
            <GridContainer>
  <GridItem>
    <div className={classes.brand}>
      <h1 className={classes.title}>Tidings</h1>
      <h3 className={classes.subtitle}>
         Catch latest updates all time around world
      </h3>
    </div>
  </GridItem>
</GridContainer>  
             </div>
  </div>
  </Parallax>
  <LatestNews selectedCountry = {this.state.selectedCountry}/>
  </div>
);}
  }
  export default withStyles(styles)(CodeMessApp)