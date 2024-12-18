import SelectOptions from "../../global/components/inputs/SelectOptions";
import { useDisplaySettings } from "../../global/contexts/DisplayContext";
import dataoptions from "../../options.json";

import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";

const linkIcons: { [key: string]: React.ComponentType<any> } = {
  "GitHub": GitHubLogoIcon,
  "Instagram": InstagramLogoIcon
};

const MainFooter = () => {
  const { updateSettings } = useDisplaySettings();

  const options = [
    { label: "None", value: "none" },
    { label: "Random", value: "random" },
    { label: "Falling", value: "falling" },
    { label: "Wave", value: "wave" },
  ];

  const handleSelect = (selectedObject: { label: string; value: any }) => {
    updateSettings({
      bgStrategy: selectedObject.value,
    });
  };

  return (
    <div className="w-[100%] bg-zinc-950 bg-opacity-80">
      <div className="construction-pattern h-[10px]" />

      <div className="relative p-3 flex flex-row">
        <div className="flex flex-row justify-between w-[50%] h-[100%] border-r-2">
          <div>
            {/* Left Section Content */}
          </div>
        </div>
        <div className="w-[50%] h-[100%] border-l-2">
          Hello
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center gap-4 mt-4">
          {dataoptions.socials.map((social) => {
            const IconComponent = linkIcons[social.title as keyof typeof linkIcons]; // Dynamically get the icon component
            return (
              <a
                key={social.title}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-400"
                aria-label={social.title}
              >
                {IconComponent ? <IconComponent className="w-6 h-6" /> : null}
              </a>
            );
          })}
        </div>
        <div className="text-white text-center p-2">
          &copy; {new Date().getFullYear()} Moaesaycto. All rights reserved.
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
