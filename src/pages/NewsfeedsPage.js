import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
// @mui
import { Container, Stack, Typography } from '@mui/material';
// components
import { NewsfeedSort, NewsfeedList, NewsfeedCartWidget, NewsfeedFilterSidebar } from '../sections/@dashboard/newsfeeds';
// mock
import NEWSFEEDS from '../_mock/newsfeeds';

// ----------------------------------------------------------------------

export default function NewsfeedsPage() {
  const [openFilter, setOpenFilter] = useState(false);

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
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

        <NewsfeedList newsfeeds={NEWSFEEDS} />
        <NewsfeedCartWidget />
      </Container>
    </>
  );
}
