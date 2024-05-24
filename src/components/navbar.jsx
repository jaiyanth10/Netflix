export default function NavBar(){
    return(
        <div className="flex flex-row items-center z-[100] justify-between w-full p-4 absolute ">
            <h1 className="text-red-600 font-bold text-4xl cursor-pointer ">NETFLIX</h1>
            <div >
            <button className="text-white pr-4 rounded-sm">Sign Up</button>
            <button className="text-white bg-red-600 px-6 py-2 cursor pointer rounded-sm">Sign Up</button>
            </div>
        </div>
    );
}