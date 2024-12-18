import MainHeading from '../titles/MainHeading';
import MainNavbar from './MainNavbar';

const MainHeader = () => {
    return (
        <div className="flex flex-col items-center bg-black bg-opacity-60 w-[100%]">
                <MainHeading />
                <MainNavbar />
        </div>
    )
}

export default MainHeader;