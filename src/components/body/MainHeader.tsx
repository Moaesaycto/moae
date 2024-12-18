import MainHeading from '../titles/MainHeading';
import MainNavbar from './MainNavbar';

const MainHeader = () => {
    return (
        <div className="flex flex-col items-center bg-black bg-opacity-60 w-[100%]">
                <MainHeading />
                <div className="construction-pattern h-[10px] w-[100%]" />
                <MainNavbar />
        </div>
    )
}

export default MainHeader;