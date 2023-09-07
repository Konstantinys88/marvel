

class MarvelService {

    _apiBase = `https://gateway.marvel.com:443/v1/public/`;
    _apiKey = `apikey=c2cc01f8db8cc03a2c3a5e6e7cd4849f`;

    getResource = async (url) => {
        let res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Url ${url} , status: ${res.status}`)
        }
        return await res.json();
    }

    getAllCharacters = () => {
        return this.getResource(`${this._apiBase}characters?limit=9&offset=150&${this._apiKey}`);
    }

    getCharacters = (id) => {
        return this.getResource(`${this._apiBase}characters/${id}?&${this._apiKey}`);
    }
}


export default MarvelService;