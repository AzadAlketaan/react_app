import React, { useState, useEffect } from "react";
import { Helmet } from 'react-helmet-async';

// @mui
import { Pagination, Container, Stack, Typography } from '@mui/material';
// components
import { NewsfeedSort, NewsfeedList, NewsfeedCartWidget, NewsfeedFilterSidebar } from '../sections/@dashboard/newsfeeds';

import axios from "../axios-instance";
import usePagination from "../utils/Pagination";
// ----------------------------------------------------------------------

export default function NewsfeedsPage() {

  const [openFilter, setOpenFilter] = useState(false);
  const [NEWSFEEDS, setNewsFeeds] = useState([]);
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;
  const count = Math.ceil(NEWSFEEDS.length / PER_PAGE);
  const _DATA = usePagination(NEWSFEEDS, PER_PAGE);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };  

  useEffect(() => {
    const fetchNewsFeeds = async () => {
      const { data } = await axios.get("/articles/newsFeed");
      setNewsFeeds(data.data);
    };
    fetchNewsFeeds();
  }, []);
  
  const handleChange = (e, p) => {
    setPage(p);
    _DATA.jump(p);
  };

  return (
    <>
      <Helmet>
        <title> News Feed </title>
      </Helmet>

      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Top headlines
        </Typography>

        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <NewsfeedFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            <NewsfeedSort />
          </Stack>
        </Stack>
        <NewsfeedList newsfeeds={_DATA.currentData()} />
        <NewsfeedCartWidget />
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
