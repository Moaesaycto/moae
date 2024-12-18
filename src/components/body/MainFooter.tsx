import SelectOptions from "../../global/components/inputs/SelectOptions";
import { useDisplaySettings } from "../../global/contexts/DisplayContext";

const MainFooter = () => {
  const { updateSettings } = useDisplaySettings(); // Call the hook at the top of the component
  
  const options = [
    { label: "None", value: "none" },
    { label: "Random", value: "random" },
    { label: "Falling", value: "falling" },
    { label: "Wave", value: "wave" },
  ];

  const handleSelect = (selectedObject: { label: string; value: any }) => {
    updateSettings({
      bgStrategy: selectedObject.value, // Update only the bgStrategy
    });
  };

  return (
    <div className="w-[100%] ">
      {/* <div className="construction-pattern w-screen h-[10px] relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] z-10" /> */}
      <div className="construction-pattern h-[10px]" />

      <div className="relative p-3 flex flex-row justify-center bg-zinc-950 bg-opacity-80">
        <div className="flex flex-row justify-between w-[50%] h-[100%]">
          <div>
            <p>Hello</p>
            <p>This</p>
            <p>Is</p>
            <p>A</p>
            <p>Test</p>
          </div>
          <div className="p-[1px] min-h-[100%] bg-white"></div>
          <div></div>
        </div>
      </div>
      <div className="bg-black">
        <SelectOptions
          options={options}
          onSelect={handleSelect}
          placeholder="Choose a Background"
        />
      </div>
    </div>
  );
};

export default MainFooter;
