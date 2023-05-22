import { Component } from "react";
import axios from "axios";
import ArticleList from "./ArticleList";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

class App extends Component {
  state ={
    articles: [],
    isLoading: false,
    error: null,
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    try{
      const response = await axios.get("/search?query=react");
      this.setState(
        { articles: response.data.hits,
          isLoading: false,  
      });
    }catch(error){
      this.setState({error});
    }finally{
      this.setState({isLoading: false});
    }
  }

  render(){
    const {articles, isLoading, error} = this.state;
    return(
      <div>
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {isLoading && <p>Loading... </p>}
        {articles.length > 0 && <ArticleList articles={articles} />}
      </div>
    );
  }
}

export default App;