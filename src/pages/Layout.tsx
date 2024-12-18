import { Outlet } from "react-router-dom";
import MainHeader from "../components/body/MainHeader";
import MainFooter from "../components/body/MainFooter";
import GridSquares from "../global/components/patterns/GridSquares";

const Layout = () => (
  <div className="relative flex flex-col min-h-screen overflow-hidden">
    <div className="absolute inset-0 z-0">
      <GridSquares mode="wave" />
    </div>
    <div className="relative z-10 flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-grow justify-center">
          <div className="w-full w-[1280px] p-4 bg-black bg-opacity-60">
            <Outlet />
          </div>
        </div>
      </main>
      <MainFooter />
    </div>
  </div>
);

export default Layout;
