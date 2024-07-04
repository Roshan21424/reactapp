import NewsItems from "./NewsItems";
import React,{Component} from "react";
import Loadingani from "./Loadingani";
import PropTypes from 'prop-types'

export default class News extends Component{

static defaultProps={
  country:'in',
  category:'general'
}

  static propTypes={
    country:PropTypes.string,
    category:PropTypes.string,


  }

    //articles=[{"source":{"id":null,"name":"BBC News"},"author":"BBC Sport","title":"BBC signs new four-year audio deal for ICC events","description":"The BBC signs a new four-year audio deal with the International Cricket Council (ICC) to broadcast all major global tournaments.","url":"https://www.bbc.com/sport/cricket/articles/c14454kkg9ro","urlToImage":"https://ichef.bbci.co.uk/news/1024/branded_sport/1321/live/7c2fa750-1e66-11ef-a133-cf78601b4a93.jpg","publishedAt":"2024-05-30T09:31:22Z","content":"The BBC has signed a new four-year audio deal with the International Cricket Council (ICC) to broadcast all major global tournaments. \r\nIt means the BBC will have ball-by-ball commentary on every tou… [+1407 chars]"},{"source":{"id":null,"name":"BBC News"},"author":null,"title":"'Cricket is the only source of happiness back home': Afghans celebrate famous win over Australia","description":"The win saw jubilation in the streets in the isolated Taliban-governed country.","url":"https://www.bbc.com/news/articles/cpvvggllp2ko","urlToImage":"https://ichef.bbci.co.uk/news/1024/branded_news/c06c/live/b410f390-3171-11ef-a5a1-f9c06821b1bc.png","publishedAt":"2024-06-23T16:19:26Z","content":"By Dearbail Jordan, BBC News\r\nAfghans have been celebrating their country's surprise cricketing victory over Australia in the T-20 World Cup under way in the US and West Indies.\r\nFootage from the cit… [+2774 chars]"},{"source":{"id":null,"name":"NPR"},"author":"Becky Sullivan","title":"The U.S. Advances in the Cricket World Cup","description":"Heavy rain in south Florida this week saturated the field where the U.S. cricket team had been scheduled to play a Friday match. Officials called it off, automatically sending the U.S. to the next stage.","url":"https://www.npr.org/2024/06/14/nx-s1-5006141/the-u-s-advances-in-the-cricket-world-cup","urlToImage":"https://media.npr.org/include/images/facebook-default-wide-s1400-c100.jpg","publishedAt":"2024-06-14T20:11:21Z","content":"Heavy rain in south Florida this week saturated the field where the U.S. cricket team had been scheduled to play a Friday match. Officials called it off, automatically sending the U.S. to the next st… [+3 chars]"}]
  
    constructor(props){
        super(props)
        this.state={
            articles:[],
            page:1,
            totalResults:0,
            loading:false
        }
    }

   async componentDidMount(){

    const url =`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&from=2024-06-04&sortBy=publishedAt&apiKey=73fde9c68d5b46a79ff59891faf523a1&page=${this.state.page}&pageSize=${this.props.page}`
    this.setState(
      {
        loading:true
      }
    )
    const data= await fetch(url)
    const jsonData=await data.json()
    this.setState({
        articles:jsonData.articles,
        totalResults:jsonData.totalResults,
        loading:false

    })
        
   }
 handleonprevious=async ()=>{
    if(this.state.page>1){
        const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&from=2024-06-03&sortBy=publishedAt&apiKey=73fde9c68d5b46a79ff59891faf523a1&page=${this.state.page-1}&pageSize=${this.props.page}`
        this.setState(
          {
            loading:true
          }
        )
        const data= await fetch(url)
        const jsonData=await data.json()
        this.setState({
            articles:jsonData.articles,
            page: this.state.page-1,
            loading:false

        }) 
    }
  
 }


    handleonNext = async ()=>{
     if(this.state.page + 1 <= Math.ceil(this.state.totalResults/10)){
     const url=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&from=2024-06-03&sortBy=publishedAt&apiKey=73fde9c68d5b46a79ff59891faf523a1&page=${this.state.page+1}&pageSize=${this.props.page}`
     this.setState(
      {
        loading:true
      }
    )
     const data= await fetch(url)
     const jsonData=await data.json()
     this.setState({
        articles:jsonData.articles,
        page:this.state.page + 1,
        loading:false
    })
   }
}


 render(){
    return(
    <div className="container my-3">
    <h2>NewsAngle</h2>
    <div className="row">

    {this.state.loading===true ? <Loadingani> </Loadingani> : this.state.articles.map((element)=>{

        if(element.url==="https://removed.com"){

        }else{
        return(
        //each news container
        <div  className="col-md-4" key={element.url}>
        <NewsItems url={element.url} urlimg={element.urlToImage} title={element.title} description={element.description}></NewsItems>
        </div>
     
        )
      }
    }
    )
 }
    </div>
    <button onClick={this.handleonprevious} disabled={this.state.page <= 1} >previous</button>
    <button onClick={this.handleonNext} disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / 10)}>next</button>

  </div>
 
)
  
}
}