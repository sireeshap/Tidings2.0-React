import React,{Component} from 'react';
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import { cardTitle } from 'assets/jss/material-kit-react.js'
import CardFooter from 'components/Card/CardFooter';  
import Moment from 'react-moment';
import FullNews from './FullNews';
import APIService from '../APIService/APIService';
const styles = {
  cardTitle,
  textCenter: {
    textAlign: "center"
  },  
  textRight: {
    textAlign: "right"
  },
  textMuted: {
    color: "#6c757d",     
    position: "absolute",
    bottom: "3px",
    left: "0px",
    padding:"5px"
  },
};
var i=0;
const classes = makeStyles(styles);
export default class Article extends Component{

  constructor(props){
super(props);
this.state={
  articles: props.articles,
  blocks:[]
  }
  }
buildNewsBlocks = () => {
  let newsBlocks=[]
  if(Object.keys(this.state.articles).length>0 ){   
    this.state.articles.map((key, id)=>{
     if(key.urlToImage!=null){
      newsBlocks.push (
      <Card  key={id} className='card-style' >
      <img className={classes.imgCardTop}  style={{height: "180px"}}  src={key.urlToImage} alt="news image" />
      <CardBody className="card-body">
        <span className={classes.cardTitle}>
        <span className='title tailMore'>{key.title}</span>
        <div className="clearfix"></div>
         </span>
        </CardBody> 
        <FullNews fullnews={key}/>
           <CardFooter className={classes.textMuted}>
     <Moment fromNow>{key.publishedAt}</Moment>
   </CardFooter>
     </Card>
     )
    }
    })
  }
  this.setState({blocks:newsBlocks},()=>{
    this.forceUpdate()
  })
  
}
componentWillMount(){
    this.buildNewsBlocks()
}//componentwillmount end 
componentDidUpdate(props){
  if(props.currentCountry!==this.props.currentCountry){
    this.setState({blocks:[] }, ()=>{
      APIService(this.props.currentCountry).then((data) =>{
        this.setState({articles : data.articles},()=>{
          this.buildNewsBlocks();
        })
       } ).catch(error=>{
        return(<div>Somethinhg went wrong. Sorry forinconvinance</div>)
      })

     
    
    })
  }
 }
  render(){
    return <div className="article-container">{this.state.blocks}</div>
  }
}