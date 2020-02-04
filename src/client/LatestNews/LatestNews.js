import React from 'react';
import Articles from './Articles';
import APIService from '../APIService/APIService';
export default class LatestNews extends React.Component {
 
  constructor(props){
    super(props);
    this.state= {
      currentNews:[],
      currentCountry:null,
      isNew:false
    }
   // alert(props.selectedCountry)
   this.fetchNews(props.selectedCountry)
  }

    displayme=(data) =>{
      if(data){
        this.setState({currentNews : data},()=>{
          this.setState({isNew:true})
          return this.state.currentNews
        }); 
      } 
   } 
   fetchNews = (code) =>{
    //alert(this.props.selectedCountry+'-'+code)
    APIService(code).then((data) =>{
      this.setState({currentCountry:code})
      return this.displayme(data)
     } ).catch(error=>{
      return(<div>Somethinhg went wrong. Sorry forinconvinance</div>)
    })
   }
   componentDidUpdate(props){
    if(props.selectedCountry!=this.props.selectedCountry){
      this.fetchNews(this.props.selectedCountry)
      this.setState({isNew:true})
    }
   }

  render(){
    //alert(this.state.isNew)
    let display;
    if(this.state.currentNews.articles && this.state.currentNews.articles.length>0 && this.state.isNew){
       display = <Articles currentCountry={this.state.currentCountry} articles={this.state.currentNews.articles}/>
      
    }
    else{
      display=<p>Loading....please wait</p>
    }
      return(
        <div> 
          {display}
        </div>
        )
       
  }
 
}