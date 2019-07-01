import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactSVG from 'react-svg'
import SearchField from "react-search-field";
import { fetchMovies } from '../../models/movie/actions';
import chevronLeft from '../../static/img/icons/chevron-left.svg';
import chevronRight from '../../static/img/icons/chevron-right.svg';
import LoadingCard from '../../components/LoadingCards';
import Movie from '../../components/Movie';
import MovieInfo from '../../components/MovieInfo';
import './index.css';
const moviesPerPage = 5;

class MovieList extends Component {
  state = {
    clientSideList: [],
    allMoviesList: [],
    allMoviesClientPage: 1,
    allMoviesServerPage: 1
  }

  componentDidMount(){
    const { fetchMovies } = this.props;
    const { allMoviesServerPage } = this.state;
    fetchMovies(allMoviesServerPage);
  }

  componentDidUpdate(prevProps){
    const { movieList: oldMovieList } = prevProps;
    const { movieList } = this.props;
    const { allMoviesList } = this.state;
    if (oldMovieList !== movieList){
      const list = allMoviesList.concat(movieList);
      this.setState({
        allMoviesList: list,
        clientSideList: list
      });
    }
  }

  allMoviesPreviousPage = () => {
    const { allMoviesClientPage } = this.state;
    this.setState({ allMoviesClientPage: allMoviesClientPage ? (allMoviesClientPage - 1) : 1 });
  }
  allMoviesNextPage = () => {
    const { allMoviesClientPage, allMoviesServerPage, allMoviesList } = this.state;
    const { fetchMovies } = this.props;
    if (allMoviesClientPage * moviesPerPage < allMoviesList.length){
      this.setState({ allMoviesClientPage: allMoviesClientPage + 1 });
      const isOnLastPage = ((allMoviesClientPage + 1) * moviesPerPage) === allMoviesList.length;
      if (isOnLastPage){
        const newPage = allMoviesServerPage + 1;
        this.setState({ allMoviesServerPage: newPage});
        fetchMovies(newPage);
      }
    }
  }

  onChangeSearchField = text => {
    const { clientSideList } = this.state;
    this.setState({
      allMoviesList: clientSideList.filter(m => m.title.toLowerCase().includes(text.toLowerCase())),
      allMoviesClientPage: 1
    })
  }

  render() {
    const { isFetching } = this.props;
    const { allMoviesClientPage, allMoviesList } = this.state;
    const moviesPageGap = 1910;
    const movieCardWidth = 382.5;
    return (
      <div
        id="MovieList"
        className="movies-wrapper"
      >
        <div className="header">
          <h1>Upcoming Movies List</h1>
          <SearchField
            placeholder="Search for a movie..."
            onChange={this.onChangeSearchField}
            classNames="search-field"
          />
        </div>
        <ReactSVG
          style={{
            zIndex: (allMoviesClientPage > 1) ? 2 : -1
          }}
          className="chevron-left"
          src={chevronLeft}
          onClick={this.allMoviesPreviousPage}
        />
        <div
          style={{
            width: allMoviesList ? movieCardWidth * allMoviesList.length : 0,
            transform: `translateX(-${(allMoviesClientPage-1) * moviesPageGap}px)`,
            transition: 'all 0.4s ease-in-out'
          }}
          className="movie-list-wrapper"
        >
          <div
            className="movie-list"
          >
            {
              isFetching && allMoviesList.length < 1
              ? [...Array(7)].map((v, i) => <LoadingCard key={i} />)
              : (
                allMoviesList
                ? allMoviesList.map((item, index) => (
                    <Movie
                      key={index}
                      item={item}
                      width={movieCardWidth}
                    />
                  ))
                : null
              )
            }
          </div>
        </div>
        <ReactSVG
          style={{
            zIndex: allMoviesList.length > 5 ? 2 : -1
          }}
          className="chevron-right"
          src={chevronRight}
          onClick={this.allMoviesNextPage}
        />
        <MovieInfo />
      </div>
    );
  }
}

const mapStateToProps = ({ movies }) => ({
  movieList: movies.movieList,
  isFetching: movies.isFetching,
});

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchMovies,
}, dispatch);

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(MovieList));