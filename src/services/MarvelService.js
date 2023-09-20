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

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`);
        return res.data.results.map(_transformComics);
    };

    // const getComics = async (id) => {
    // 	const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
    // 	return _transformComics(res.data.results[0]);
    // };

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            // pageCount: comics.pageCount
            //     ? `${comics.pageCount} p.`
            //     : "No information about the number of pages",
            thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
            price: comics.prices[0].price
                ? `${comics.prices[0].price}$`
                : "not available",
        };
    };


    return { loading, error, getAllCharacters, getCharacter, clearError, getAllComics }
}


export default MarvelService;