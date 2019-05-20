import React, { Component } from 'react';
import api from '../../../services/api';
import EnhancedTable from '../../../components/EnhancedTable';
import AdminPageLoader from '../../../components/AdminPageLoader';

let data = {
  rows: [
    { id: 'pageId', disablePadding: false, label: 'Id' },
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

export default class Pages extends Component {
  state = {
    pages: [],
    isLoading: null,
  }

  getPages = () => {
    let pages = [];
    this.setState({ isLoading: true })

    api.get('/pages')
      .then(response => {
        const data = response.data.data;
        data.map((page, index) => {
          pages.push({
            id: index,
            pageId: page.id,
            title: page.title,
            slug: page.slug,
            published: page.published ? 'true' : 'false',
            visibility: page.visibility
          });
        });
      })
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        this.setState({
          isLoading: false,
          pages: pages
        });
      });

    return pages;
  }

  componentDidMount() {
    data.data = this.getPages();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div>
        {isLoading ? (
          <AdminPageLoader />
        ) : (
          <EnhancedTable title={'Pages'} tooltipTerm={'Page'} data={data} />
        )}
      </div>
    );
  }
}