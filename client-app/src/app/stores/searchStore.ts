import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { SearchResults } from '../models/search';

class SearchStore {
    searchResults: SearchResults = {
        eventResults: [],
        userResults: []
    };
    loading = false;

    constructor() {
        makeAutoObservable(this);
    }

    search = async (query: string) => {
        this.loading = true;
        try {
            const results = await agent.Search.search(query);
            runInAction(() => {
                this.searchResults = results;
                this.loading = false;
            });
        } catch (error) {
            console.error(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    };
}

export default SearchStore;