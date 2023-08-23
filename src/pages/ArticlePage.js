import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';
// @mui
import { Pagination, Grid, Container, Stack, Typography } from '@mui/material';

import { ArticleCard, ArticlesSort, ArticlesSearch } from '../sections/@dashboard/articles';

import usePagination from "../utils/Pagination";

import axios from "../axios-instance";

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function ArticlePage() {
  
  const [ARTICLES, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;
  const count = Math.ceil(ARTICLES.length / PER_PAGE);
  const _DATA = usePagination(ARTICLES, PER_PAGE);

  useEffect(() => {
    const fetchArticles = async () => {
      const { data } = await axios.get("/articles");
      setArticles(data.data);
    };
    fetchArticles();
  }, []);

  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };
  
  return (
    <>
      <Helmet>
        <title> Articles </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Explore Articles
          </Typography>
        </Stack>

        <Stack mb={5} direction="row" alignItems="center" justifyContent="space-between">
          <ArticlesSearch articles={ARTICLES} />
          <ArticlesSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {_DATA.currentData().map((article, index) => (
            <ArticleCard key={article.id} article={article} index={index} />
          ))}
        </Grid>
        <Pagination
          count={count}
          size="large"
          page={page}
          variant="outlined"
          shape="rounded"
          onChange={handleChange}
        />
      </Container>
    </>
  );
}
