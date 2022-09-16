import React, { useEffect, useState } from 'react';
import { RepoCard } from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useSearchUsersQuery , useLazyGetUserReposQuery} from '../store/github/github.api';

export function HomePage() {
    const [search, setSearch] = useState('');
    const [dropDown, setDropDown] = useState(false);
    const debounced = useDebounce(search)
    const { isLoading, isError, data: users } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 3,
        refetchOnFocus: true
    });
    const [fetchRepos, {isLoading:areReposLoading, data:repos}] = useLazyGetUserReposQuery();
    const onClickHandler = (username:string) =>{
       fetchRepos(username);
       setDropDown(false);
    }
    useEffect(() => {
            setDropDown(users?.length! > 0);
    }, [debounced, users ])
    return (
        <div className='flex justify-center pt-10 mx-auto h-scrren w-screen'> HOME PAGE
            {isError && <p className="text-center text-red-600">Something went wrong</p>}
            <div className="relative w-[560px]">
                <input type="text"
                    className="border py-2 px-4 w-full h-[42px] mb-2"
                    placeholder='Search for Github username....'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <ul className="w-full List-none absolute width: 100% top-[42px] left-0 max-h-[200px] shdow-md overflow-y-scroll bg-[#cccccc]" >
                {isLoading && <p className="text-center"> Loading...</p>}
                {dropDown && users?.map((user) => {
                    return (
                        <li onClick={() => onClickHandler(user.login)} key={user.id} className="justify-left text-left py-2 px-4 hover:bg-gray-500 hover:text-white transition-color cursor-pointer">
                            { user.login }
                        </li>
                    )
                })}
                </ul>
              <div className="container">
                   { areReposLoading && <p className="text-center">Repos are loading</p>}
                   {repos?.map((repo,index) => <RepoCard repo={repo} key={index} />)}
                </div>
            </div>
        </div>
    )
}
