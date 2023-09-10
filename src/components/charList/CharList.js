import './charList.scss';
// import abyss from '../../resources/img/abyss.jpg';
import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import { Component } from 'react';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
    }

    updateChars = () => {
        this.onCharLoading();
        this.marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    onCharsLoaded = (chars) => {
        this.setState({
            chars: chars,
            loading: false,
        })
    }

    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    renderItem(arr) {
        const items = arr.map((item) => {
            let imgStyle = { 'objectFit': 'cover' };
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { 'objectFit': 'unset' };
            }
            return (
                <li
                    className="char__item" key={item.id} onClick={() => this.props.onCharSelecterd(item.id)}>
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        });

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {

        const { chars, error, loading } = this.state;
        const items = this.renderItem(chars);

        const errorMessage = error ? <ErrorMessage /> : null;
        const spinner = loading ? <Spinner /> : null;
        const content = !(loading || error) ? items : null;

        return (
            <div className="char__list" >

                {errorMessage}
                {spinner}
                {content}

                <button className="button button__main button__long">
                    <div className="inner" onClick={this.updateChars}>load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;