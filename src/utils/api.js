import axios from 'axios';



export const api = {
    fetchPopularRepos(language) {
        let encodeURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=star&order=desc&type=Repositories');
        return axios.get(encodeURI)
        .then( (response) => {
            return response.data.items;
        })
    }
}