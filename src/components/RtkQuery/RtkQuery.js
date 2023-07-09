import React, { useState } from "react";
import { Puff } from "react-loader-spinner";
import { useGetNewsQuery } from "redux/news";

const RtkQuery = () => {
  const [newsQuery, setNewsQuery] = useState("");
  const { data, error, isFetching, isError } = useGetNewsQuery(newsQuery, {
    skip: newsQuery === "",
  });

  const handleSubmit = (evt) => {
    evt.preventDefault();
    setNewsQuery(evt.target.elements.pokemonName.value.toLowerCase());
    evt.target.reset();
  };

  return (
    <div>
      <h2>News</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <input type="text" name="pokemonName" />
        <button
          type="submit"
          style={{ position: "relative", paddingRight: "30px" }}
        >
          Search
          {isFetching && (
            <Puff
              height="20"
              width="20"
              radius={1}
              color="#9C27B0"
              ariaLabel="puff-loading"
              wrapperStyle={{ position: "absolute", top: "0", right: "5px" }}
              wrapperClass=""
              visible={true}
            />
          )}
        </button>
      </form>

      {isError && error.originalStatus === 404 && (
        <p>
          Oooops... news {newsQuery} {error.data}
        </p>
      )}

      {data && !isFetching && !isError && (
        <ul>
          {data.articles.map((article) => (
            <li key={article.publishedAt}>
              <p>
                <b style={{ color: "#00B0FF" }}>Author:</b> {article.author}
                <br /> <b style={{ color: "#00B0FF" }}>Title:</b>
                {article.title} <br />
                <br />
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RtkQuery;
