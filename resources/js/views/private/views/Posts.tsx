import * as React from 'react';
import api from '../../../services/api';
import EnhancedTable from '../../../components/EnhancedTable';
import AdminPageLoader from '../../../components/AdminPageLoader';

let data = {
  rows: [
    { id: 'postId', disablePadding: false, label: 'Id' },
    { id: 'title', disablePadding: false, label: 'Title' },
    { id: 'slug', disablePadding: false, label: 'Slug' },
    { id: 'published', disablePadding: false, label: 'Published' },
    { id: 'visibility', disablePadding: false, label: 'Visibility' },
  ],
  order: 'asc',
  orderBy: 'id',
  selected: [],
  data: [],
}

export default class Posts extends React.Component<any, any> {
  state = {
    posts: [],
    isLoading: null,
  }

  getPosts = () => {
    let posts = [];
    this.setState({ isLoading: true })

    api.get('/posts')
      .then(response => {
        const data = response.data.data;
        data.map((post, index) => {
          posts.push({
            id: index,
            postId: post.id,
            title: post.title,
            slug: post.slug,
            published: post.published ? 'true' : 'false',
            visibility: post.visibility
          });
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false,
          posts: posts
        });
      });

    return posts;
  }

  componentDidMount() {
    data.data = this.getPosts();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <AdminPageLoader />
        ) : (
          <EnhancedTable title={'Posts'} tooltipTerm={'Post'} data={data} />
        )}
      </div>
    );
  }
}