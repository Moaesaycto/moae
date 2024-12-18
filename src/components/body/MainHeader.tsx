import MainHeading from '../titles/MainHeading';
import MainNavbar from './MainNavbar';

const MainHeader = () => {
    return (
        <div className="bg-black bg-opacity-60">
            <MainHeading />
            <MainNavbar />
        </div>
    )
}

export default MainHeader;