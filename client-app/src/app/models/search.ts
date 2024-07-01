export interface EventResult {
    id: string;
    title: string;
    description: string;
    date: string;
    category: string;
}

export interface UserResult {
    id: string;
    username: string;
}

export interface SearchResults {
    eventResults: EventResult[];
    userResults: UserResult[];
}