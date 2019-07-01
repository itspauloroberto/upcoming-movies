import React, { Component } from 'react';
import { assetsURL } from '../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactSVG from 'react-svg'
import { setActiveMovie } from '../../models/movie/actions';
import star from '../../static/img/icons/star.svg';
import './index.css';

class Movie extends Component {

  state = {
    selected: false
  }

  onClickMovie = movie => {
    const { setActiveMovie } = this.props;
    setActiveMovie(movie);
  }

  componentDidUpdate(prevProps) {
    const { activeMovie, item } = this.props;
    const { activeMovie: lastActiveMovie } = prevProps;
    if (activeMovie !== lastActiveMovie) this.setState({ selected: !activeMovie ? false : (activeMovie.id === item.id) });
  }

  onClickClose = () => {
    const { setActiveMovie } = this.props;
    setActiveMovie();
  }

  render(){
    const { width, item } = this.props;
    const { vote_average, poster_path } = item;
    const { selected } = this.state;
    return (
      <div
        className={selected ? 'selected' : ''}
        style={{
          margin: 2,
          transition: 'all 0.2s linear'
        }}
      >
        <div
          onClick={() => { this.onClickMovie(item); }}
          className="movie-card"
          style={{
            zIndex: 2,
            width,
            background: `url("${assetsURL}/w400${poster_path}") no-repeat transparent scroll center center / cover`,
          }}
        >
          <div className="movie-rating">
            <ReactSVG
              className="star"
              src={star}
            />
            <span>{ vote_average }</span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ movies }) => ({
  activeMovie: movies.activeMovie
});

const mapDispatchToProps = dispatch => bindActionCreators({
  setActiveMovie
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Movie);