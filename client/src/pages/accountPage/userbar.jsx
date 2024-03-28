import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faHeart, faScaleUnbalanced } from '@fortawesome/free-solid-svg-icons';

export default function UserBar() {
    return (
        <div className="flex flex-col items-end w-full p-5 -mt-5">
            <img src="https://as1.ftcdn.net/v2/jpg/02/14/59/76/1000_F_214597619_GgPZ3cQAasuYwMTeEqopTKfjMo2cOF8U.jpg" alt="header" className="object-cover w-full h-60 rounded-2xl" />
            <div className="flex items-center w-11/12 h-20 p-2 mr-2 -mt-8 shadow-md bg-white/30 backdrop-blur-md rounded-2xl">
                <div className="absolute flex items-center w-20 h-20 py-2">
                    <img src="https://media.istockphoto.com/id/1327656409/vector/user-icon-admin-profile-pictogram.jpg?s=612x612&w=0&k=20&c=SCadkvBVVRHToUEiwBL5rxE2e8XS7ch5Eizf509kWeE=" alt="profile" className="object-cover h-full shadow aspect-square rounded-xl" />
                    <FontAwesomeIcon icon={faPen} className='absolute bottom-0 h-4 p-1 bg-white rounded shadow cursor-pointer right-1 hover:bg-gray-200' />
                </div>
                <div className="flex flex-col justify-center w-full h-full pl-24">
                    <h1 className="text-xl font-bold">John Doe</h1>
                    <p className="text-sm text-gray-400">sjnidjfnv@gmail.com</p>
                </div>
                <FontAwesomeIcon icon={faHeart} className='h-6 p-2 mr-2 text-sm text-red-500 bg-white shadow cursor-pointer aspect-square rounded-xl hover:text-red-700 hover:bg-gray-200' />
                <FontAwesomeIcon icon={faScaleUnbalanced} className='h-6 p-2 mr-2 text-sm text-green-500 bg-white shadow cursor-pointer aspect-square rounded-xl hover:text-green-700 hover:bg-gray-200' />
                <button className="w-20 h-10 p-2 mr-2 text-sm text-white bg-red-500 shadow hover:bg-red-700 rounded-xl">Quit</button>
            </div>
        </div>
    );
}