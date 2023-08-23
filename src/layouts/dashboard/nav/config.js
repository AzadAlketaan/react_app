// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [  
  {
    title: 'News Feeds',
    path: '/dashboard/newsfeeds',
    icon: icon('ic_cart'),
  },
  {
    title: 'Explore Articles',
    path: '/dashboard/articles',
    icon: icon('ic_blog'),
  },
];

export default navConfig;
