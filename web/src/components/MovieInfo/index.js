import React, { Component } from 'react';
import { assetsURL } from '../../config';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactSVG from 'react-svg'
import getGenreDescription from '../../helpers/genres';
import { setActiveMovie } from '../../models/movie/actions';

import calendar from '../../static/img/icons/calendar.svg';
import score from '../../static/img/icons/score.svg';
import flame from '../../static/img/icons/flame.svg';
import close from '../../static/img/icons/close.svg';
import './index.css';

class MovieInfo extends Component {

  state = {
    open: false
  }

  componentDidUpdate(){
    const { activeMovie } = this.props;
    const { open } = this.state;
    if (!activeMovie && open) this.setState({ open: false });
    else if (activeMovie && !open) this.setState({ open: true });
  }

  render(){
    const { setActiveMovie, activeMovie } = this.props;
    if (!activeMovie) return null;
    const {
      backdrop_path,
      vote_count,
      vote_average,
      title,
      overview,
      popularity,
      genre_ids,
      release_date
    } = activeMovie;
    const { open } = this.state;
    const releaseDate = new Date(release_date);
    const releaseString = `${releaseDate.toLocaleString('en-US', { month: 'long' })}, ${releaseDate.getDate()}`;
    return (
      <div
        className="movie-info"
        style={{
          opacity: open ? 1 : 0,
          height: open ? 700 : 0,
          background: `url("${assetsURL}/original/${backdrop_path}") no-repeat transparent scroll center center / cover`,
        }}
        >
        <div
          className="dark-overlay"
        >
          <h1>{title}</h1>
          <div
            className="genres"
          >
            {
              genre_ids
              ? genre_ids.map((genreId, index) => (
                  <div
                    key={index}
                    className="genre-tag"
                  >
                    { getGenreDescription(genreId) }
                  </div>
                ))
              : null
            }
          </div>
          <p>
            {overview}
          </p>
          <div className="general-info">
            <div>
              <ReactSVG
                className="calendar"
                src={calendar}
              />
              <div className="text">
                <h3>Release date</h3>
                <p>
                  { releaseString }
                </p>
              </div>
            </div>
            <div>
              <ReactSVG
                className="score"
                src={score}
              />
              <div className="text">
                <h3>Score</h3>
                <p>
                  { vote_average.toFixed(2) } <small>of { vote_count } reviews</small>
                </p>
              </div>
            </div>
            <div>
              <ReactSVG
                className="flame"
                src={flame}
              />
              <div className="text">
                <h3>Popularity Score</h3>
                <p>
                  { popularity.toString().split('.')[0] } <small>.{ popularity.toString().split('.')[1] }</small>
                </p>
              </div>
            </div>
          </div>
        </div>
        <ReactSVG
          onClick={() => { setActiveMovie(); }}
          className="close"
          src={close}
        />
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
)(MovieInfo);