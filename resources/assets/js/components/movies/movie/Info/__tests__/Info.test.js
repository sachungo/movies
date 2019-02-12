import React from 'react';
import Info from '../Info';

jest.mock('../../cast', () => () => <div />);
jest.mock('../../Navbar', () => () => <div />);

describe('The Info component', () => {
  let props;

  beforeEach(() => {
    props = {
      data: {},
      genres: [],
      hasGenres: false,
      movieId: 123
    };
  });

  it('renders without throwing an error', () => {
    expect(() => shallow(<Info {...props} />)).not.toThrow();
  });

  it('renders a movie image when the data prop is populated', () => {
    props.data = {
      poster_path: '/6etryuersdtyrty.jpg'
    }
    const wrapper = shallow(<Info {...props} />);
    expect(wrapper.find('[data-test="movie-image"]')).toExist();
  });

  it('renders the title, popularity and release date when the data prop is not empty', () => {
    props.data = {
      title: 'Movie information',
      popularity: 456.76,
      release_date: '2018-05-25'
    }
    const wrapper = shallow(<Info {...props} />);
    expect(wrapper.find('[data-test="movie-basics"]')).toExist();
  });

  it('renders the movie overview', () => {
    props.data = {
      overview: 'Testing movie render'
    }
    const wrapper = shallow(<Info {...props} />);
    expect(wrapper.find('[data-test="movie-overview"]')).toExist();
  });

  it('renders the movie genres', () => {
    props = {
      ...props,
      genres: [
        {
          id: 12,
          name: 'Adventure'
        },
        {
          id: 14,
          name: 'Fantasy'
        }
      ],
      hasGenres: true
    };
    const wrapper = shallow(<Info {...props} />);
    expect(wrapper.find('[data-test="movie-genre"]').first()).toExist();
  });

  it('renders the cast', () => {
    const wrapper = shallow(<Info {...props} />);
    expect(wrapper.find('[data-test="movie-cast"]')).toExist();
  });
});
