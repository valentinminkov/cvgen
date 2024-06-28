"use client";
import * as React from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { $settings, setDarkMode } from "@/stores/settingsStore";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@nanostores/react";

export default function Navbar() {
  return (
    <div className="flex justify-between">
      <Nav />
      <DarkModeControll />
    </div>
  );
}

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Fill",
    href: "/fill",
    description: "Fill your CV data",
  },
  {
    title: "Arrange",
    href: "/fill/arrange",
    description: "Arrange the order in which your data should be display",
  },
  {
    title: "Theme",
    href: "/fill/arrange/theme",
    description: "Choose the theme for your data",
  },
];

const navItemClasses =
  "bg-zinc-700 rounded-none text-white hover:text-gray-200 dark:hover:bg-gray-700 transition-colors border-solid border-b-2 border-slate-400 text-center";

export function Nav() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-4 items-end">
        <NavigationMenuItem>
          <NavigationMenuTrigger className={navItemClasses}>
            Create
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 pleading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

function DarkModeControll() {
  const settings = useStore($settings);
  return (
    <div className="flex gap-4">
      Dark mode:
      <Switch
        defaultChecked={!!settings.darkMode}
        onCheckedChange={setDarkMode}
      />
    </div>
  );
}
