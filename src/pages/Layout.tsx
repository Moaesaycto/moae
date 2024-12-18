import { Outlet } from "react-router-dom";
import MainHeader from "../components/body/MainHeader";
import MainFooter from "../components/body/MainFooter";
import GridSquares from "../global/components/patterns/GridSquares";

const Layout = () => (
  <div className="flex flex-col min-h-screen overflow-hidden items-center">
    <div className="absolute inset-0 z-0">
      <GridSquares />
    </div>
    <div className="border-double border-x-8 border-black z-10">
      <div className="z-10 flex flex-col min-h-screen w-[1000px] items-center border-solid border-x-8 border-x-black">
        <MainHeader />
        <main className="flex-1 flex flex-col items-center justify-center w-[100%]">
          <div className="flex flex-grow justify-center p-4 bg-black bg-opacity-60 w-[100%]">
            <Outlet />
          </div>
        </main>
        <MainFooter />
      </div>
    </div>
  </div>
);

export default Layout;
