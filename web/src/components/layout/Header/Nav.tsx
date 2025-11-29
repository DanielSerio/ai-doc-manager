import { FileHeadphone, FileText, Headphones, Menu } from "lucide-react";
import { NavLink } from "./NavLink";
import { useAppNavigation } from "@/hooks/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Fragment } from "react/jsx-runtime";

const iconStyle = {
  height: 14,
  width: 14,
};

const LINKS = [
  { label: 'Rule Definitions', href: '/rules' as const, icon: <Headphones style={iconStyle} /> },
  { label: 'General Documents', href: '/general-documents' as const, icon: <FileText style={iconStyle} /> },
  { label: 'Rule Documents', href: '/rule-documents' as const, icon: <FileHeadphone style={iconStyle} /> },
] as const;

const DesktopNav = ({ isRouteActive }: { isRouteActive: (href: string) => boolean; }) => {
  const rootClassNames = cn(
    'text-sm font-semibold'
  );
  return (
    <nav className={rootClassNames}>
      <ul className="flex items-center gap-x-2 px-4" style={{}}>
        {LINKS.map((link, index) => {
          const isNotLastItem = index !== LINKS.length - 1;

          return (
            <Fragment key={link.href}>
              <li className="w-full">
                <NavLink to={link.href} icon={link.icon} isActive={isRouteActive(link.href)}>
                  {link.label}
                </NavLink>
              </li>
              {isNotLastItem && <li><span className="text-muted-foreground">&bull;</span></li>}
            </Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

const MobileNav = ({ isRouteActive }: { isRouteActive: (href: string) => boolean; }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ml-auto">
          <Menu className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {LINKS.map((link) => (
          <DropdownMenuItem key={link.href} asChild>
            <NavLink to={link.href} icon={link.icon} isActive={isRouteActive(link.href)}>
              {link.label}
            </NavLink>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export function Nav({ isMobile }: { isMobile?: boolean; }) {
  const [_, { isRouteActive }] = useAppNavigation();

  if (isMobile) {
    return <MobileNav isRouteActive={isRouteActive} />;
  }

  return <DesktopNav isRouteActive={isRouteActive} />;
}