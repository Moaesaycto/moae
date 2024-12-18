import { Outlet } from "react-router-dom";
import MainHeader from "../components/body/MainHeader";
import MainFooter from "../components/body/MainFooter";
import GridSquares from "../global/components/patterns/GridSquares";

const Layout = () => (
  <div className="flex flex-col min-h-screen overflow-hidden items-center">
    {/* Background Grid */}
    <div className="absolute inset-0 z-0">
      <GridSquares />
    </div>
    {/* Main Content Wrapper */}
    <div className="relative z-10 w-full flex flex-col items-center">
      <div className="w-full max-w-[1000px] flex flex-col min-h-screen md:border-x-8 border-double border-black">
        {/* Header */}
        <MainHeader />
        {/* Main Content */}
        <main className="flex-1 w-full flex flex-col items-center justify-center">
          <div className="flex flex-grow justify-center p-4 bg-black bg-opacity-60 w-full">
            <Outlet />
          </div>
        </main>
        {/* Footer */}
        <MainFooter />
      </div>
    </div>
  </div>
);

export default Layout;
