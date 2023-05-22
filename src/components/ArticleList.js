import axios from "axios";

axios.defaults.baseURL = "https://hn.algolia.com/api/v1";

const ArticleList = ({articles}) => {
  <ul>
    {articles.map(({objectID, url, title}) =>(
      <li key={objectID}>
        <a href={url} target="_blank" rel="noreferrer noopener">
          {title}
          </a>
      </li>
    ))}
  </ul>
}

export default ArticleList;