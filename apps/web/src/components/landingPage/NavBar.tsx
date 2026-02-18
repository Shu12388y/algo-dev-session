import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/auth.store";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar";
const navItems = [
  { label: "Problems", href: "problems" },
  { label: "Contests", href: "#contests" },
  { label: "Discuss", href: "#discuss" },
  { label: "Interview", href: "interview" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { is_loggedin } = useSelector((state: RootState) => state.auth);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">C</span>
          </div>
          <span className="text-lg font-semibold tracking-tight">
            CodeArena
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Auth Buttons */}

        {is_loggedin ? (
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <Link to={"/auth/signin"}>
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to={"/auth/signup"}>
              <Button variant="default" size="sm">
                Get started
              </Button>
            </Link>
          </div>
        )}
        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 -mr-2 text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background border-b border-border">
          <div className="px-6 py-4 flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="px-4 py-3 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
              <Link to="/auth/signin">
                <Button variant="ghost" size="sm" className="justify-start">
                  Sign in
                </Button>
              </Link>
              <Link to="/auth/signup">
                <Button variant="default" size="sm">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
