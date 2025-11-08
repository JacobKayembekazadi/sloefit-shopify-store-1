import { Link } from "react-router-dom";
import { Search, User } from "lucide-react";
import { Button } from "./ui/button";
import { CartDrawer } from "./CartDrawer";

export const Header = () => {
  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-primary text-primary-foreground text-center py-2 px-4 text-sm font-medium">
        Founding drop: early members get exclusive pricing & app perks.
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-primary">SLOE</span>
              <span className="text-foreground"> FIT</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 text-sm">
            <Link to="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
              Shop All
            </Link>
            <Link to="/bundles" className="text-muted-foreground hover:text-foreground transition-colors">
              Bundles & Stacks
            </Link>
            <Link to="/app" className="text-muted-foreground hover:text-foreground transition-colors">
              Sloe Fit App
            </Link>
            <Link to="/quiz" className="text-muted-foreground hover:text-foreground transition-colors">
              Quiz
            </Link>
            <Link to="/results" className="text-muted-foreground hover:text-foreground transition-colors">
              Results
            </Link>
            <Link to="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
              Learn
            </Link>
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <CartDrawer />
          </div>
        </div>
      </header>
    </>
  );
};
