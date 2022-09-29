
import { useAppSelector } from "../hooks/redux";

export function Favourites() {
    const { favourites } = useAppSelector(state => state.github);
    if (favourites.length === 0) return <p className="text-center">No FAVS</p>
    return (
        <div className='flex justify-center pt-10 mx-auto h-scrren w-screen'>
        <ul  >
            {favourites.map((f,i) => (
                <li className="hover:bg-gray-500 hover:text-white" key={f+i}>
                    <a href={f} >{f}</a>
                </li>
            ))}
        </ul>
        </div>
    );

}
