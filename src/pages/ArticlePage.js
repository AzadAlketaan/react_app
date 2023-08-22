import { Helmet } from 'react-helmet-async';
// @mui
import { Grid, Container, Stack, Typography } from '@mui/material';

import { ArticlePostCard, ArticlePostsSort, ArticlePostsSearch } from '../sections/@dashboard/articles';
// mock
import POSTS from '../_mock/articles';

// ----------------------------------------------------------------------

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

export default function ArticlePage() {
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
          <ArticlePostsSearch posts={POSTS} />
          <ArticlePostsSort options={SORT_OPTIONS} />
        </Stack>

        <Grid container spacing={3}>
          {POSTS.map((post, index) => (
            <ArticlePostCard key={post.id} post={post} index={index} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
