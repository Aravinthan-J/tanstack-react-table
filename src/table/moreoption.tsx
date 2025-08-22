import { useRef, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { DotsVerticalIcon } from "@radix-ui/react-icons";

interface HeaderOptionsProps {
  id: string;
  value: React.ReactNode;
  onClick?: () => void;
}

export const MenuAction = ({
  headerOptions,
}: {
  headerOptions: Array<HeaderOptionsProps>;
}) => {
  const [menuActive, setMenuActive] = useState(false);
  const headerRef = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={headerRef}
      className={`relative duration-150 bg-transparent cursor-pointer
      ${menuActive ? "visible" : "invisible"} group-hover:visible`}
    >
      <DropdownMenu.Root
        onOpenChange={(open) => {
          setMenuActive(open);
        }}
        modal={false}
      >
        <DropdownMenu.Trigger asChild>
          <button
            type="button"
            className="
              w-fit mt-2 rounded border-0 bg-transparent
              focus:outline-none cursor-pointer
              transition-opacity
            "
            aria-label="Open column options"
          >
            <DotsVerticalIcon className="w-16 h-16 text-gray-600" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            side="bottom"
            align="start"
            sideOffset={4}
            className="z-10 min-w-100 rounded-8 bg-white shadow-lg p-2 border-1 border-gray-300 font-semibold max-w-300"
          >
            {headerOptions.map((item) => (
              <DropdownMenu.Item
                key={item.id}
                onSelect={item.onClick}
                className="m-6 p-6 hover:bg-gray-100 text-gray-900 cursor-pointer rounded-4 outline-0 border-0 ellipsis"
              >
                {item.value}
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </span>
  );
};
