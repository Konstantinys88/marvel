import { useHttp } from "../hooks/http.hook";

const MarvelService = () => {

    const { loading, request, error, clearError } = useHttp();

    const _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    const _apiKey = `apikey=c2cc01f8db8cc03a2c3a5e6e7cd4849f`;
    const _baseOffset = 200;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?&${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description.slice(0, 150) + '...' : 'Description is missing...',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    //commics my

    const getResourse = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error('Error');
        }
        return await res.json();
    }

    const getAllCommics = () => {
        return getResourse(`https://gateway.marvel.com:443/v1/public/comics?limit=8&offset=210&apikey=c2cc01f8db8cc03a2c3a5e6e7cd4849f`);
    }





    return { loading, error, getAllCharacters, getCharacter, clearError, getAllCommics }
}


export default MarvelService;