import { Link } from "react-router-dom";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Instagram, Youtube } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-card mt-20">
      <div className="container mx-auto px-4 py-12">
        {/* Brand Block */}
        <div className="mb-12">
          <div className="text-2xl font-bold mb-4">
            <span className="text-primary">SLOE</span>
            <span className="text-foreground"> FIT</span>
          </div>
          <p className="text-muted-foreground max-w-md">
            Sloe Fit is a modern performance system: clean supplements + intelligent training app.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Shop */}
          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/shop" className="hover:text-foreground transition-colors">Shop All</Link></li>
              <li><Link to="/bundles" className="hover:text-foreground transition-colors">Bundles & Stacks</Link></li>
              <li><Link to="/results" className="hover:text-foreground transition-colors">Results</Link></li>
              <li><Link to="/quiz" className="hover:text-foreground transition-colors">Quiz</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-foreground transition-colors">About</Link></li>
              <li><Link to="/learn" className="hover:text-foreground transition-colors">Learn</Link></li>
              <li><Link to="/affiliates" className="hover:text-foreground transition-colors">Affiliates</Link></li>
              <li><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/faq" className="hover:text-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="hover:text-foreground transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Email Signup */}
        <div className="mb-12 max-w-md">
          <h4 className="font-semibold mb-2">Stay locked in with Sloe Fit</h4>
          <p className="text-sm text-muted-foreground mb-4">
            Get members-only offers, training systems, and early access to new formulas.
          </p>
          <div className="flex gap-2">
            <Input 
              type="email" 
              placeholder="Your email" 
              className="flex-1"
            />
            <Button className="bg-primary hover:bg-primary/90">
              Join the List
            </Button>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sloe Fit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
