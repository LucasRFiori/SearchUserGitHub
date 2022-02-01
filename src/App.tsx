import React, { useEffect, useState } from 'react';
type GitUser = {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
    html_url: string;
    repos_url: string;
    name?: string;
    company?: string;
}

type RepoType = {
    id: number;
    name: string;
    full_name: string;
}

type SearchText = {
    text: string;
}

export default function App() {

    const [user, setUser] = useState<GitUser>();
    const [text, setText] = useState<SearchText>();
    const [rep, setRep ] = useState<RepoType | any>();

    function getUser(userToSearch: string | any) {
        fetch(`https://api.github.com/users/${userToSearch}`)
            .then((response) => response.json())
            .then(data => {
                setUser(data)
            })
    }

    function getRepositories(){
        fetch(`https://api.github.com/users/${user?.login}/repos`)
        .then((response) => response.json())
        .then(data => {
            setRep(data)
        })
    }

    useEffect(() =>{
        return(() => setRep(false))
    }, [user])

    function handleSearch() {
        getUser(text);
    }

    return (
        <div className="geral">
            <div className="search">
                <input
                    type="text"
                    name="gituser"
                    placeholder='Search for user name'
                    onChange={(e: any) => setText(e.target.value)} />
                <button type="submit" onClick={() => handleSearch()}>Search</button>
            </div>
            <div>
                {user && (
                    <div className='user'>
                        <div className='user__info'>
                            <h2>Name: <strong>{user.name}</strong></h2>
                        </div>
                        <div className='user__image'>
                            <a href={user.html_url} target='_blank'>
                                <img src={user.avatar_url} width="200px" height="200px" />
                            </a>
                        </div>
                        <div className='user__info'>
                            <h5>Other infos</h5>
                            <p>ID: {user.id}</p>
                            <p>Login: {user.login}</p>
                            {user.company && (<p>Company: {user.company}</p>)}
                            {!rep && (<a href="#" onClick={() => getRepositories()}>View repositories</a>)}
                            {rep && (
                                <ul>
                                    {rep.map((repo: RepoType) =>(
                                        <li key={repo.id}><a href={`https://github.com/${repo.full_name}`} target="_blank">{repo.name}</a></li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}

                {!user && (
                    <div>
                        <h3 className="search__user--title">Search a user</h3>
                    </div>
                )}
            </div>
        </div>
    )
}