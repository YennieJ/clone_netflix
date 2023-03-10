import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getPopularTv, IGetMoviesResult } from "service/moviesApi";

const TopTv = () => {
  //인기 tv
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["tv", "popular"],
    getPopularTv
  );
  console.log(data?.results);
  return (
    <div>
      {data && (
        <>
          <h1>오늘 TOP 10 시리즈</h1>
        </>
      )}
    </div>
  );
};

export default TopTv;
