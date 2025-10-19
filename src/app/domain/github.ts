export type GithubRequest = {
    owner: string;
    repo: string;
    token?: string;
};

export type GithubResponse = {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
    description: string | null;
    fork: boolean;
    private: boolean;
    archived: boolean;
    stargazers_count: number;
    forks_count: number;
    open_issues_count: number;
    pushed_at: string;
    owner: {
        login: string;
        html_url: string;
        avatar_url?: string;
    };
};
