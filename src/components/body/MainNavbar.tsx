import { CSSProperties } from 'react';
import options from "../../options.json";
import "./main.css";

interface NavbarOptionProps {
    option: {
        title: string;
        color: string;
        route: string;
    };
}

const MainNavbar = () => {
    return (
        <div className="navbar-main p-0 bg-black bg-opacity-50">
            {options.navigation.map((option, index) => <NavbarOption key={index} option={option} />)}
        </div>
    )
}

const NavbarOption = ({ option }: NavbarOptionProps) => {
    const style: CSSProperties & { '--navbar-text-color'?: string } = {
        '--navbar-text-color': option.color,
    };

    return (
        <a href={option.route}>
            <div style={{ color: option.color }}>
                <p className="navbar-text" style={style}>{option.title}</p>
            </div>
        </a>
    );
};

export default MainNavbar;