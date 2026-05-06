import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, Package, LogOut, UserCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { categories } from '@/lib/mock-data';
import { getCurrentUser, logout } from '@/lib/auth';
import { User as UserType } from '@/types';

interface NavbarProps {
  cartCount: number;
  onNavigate: (page: string) => void;
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onNavigate, onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    onNavigate('home');
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <Package className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold tracking-tight hidden sm:inline-block">ELECTRO<span className="text-primary">FLOW</span></span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md">
            <form onSubmit={handleSearch} className="relative w-full">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search components, SKUs, brands..."
                className="pl-9 w-full bg-muted/50 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Categories <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {categories.map((cat) => (
                  <DropdownMenuItem key={cat.id} onClick={() => onNavigate(`category-${cat.slug}`)}>
                    {cat.name}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button variant="ghost" size="icon" className="relative" onClick={() => onNavigate('cart')}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2">
                    <UserCircle className="h-5 w-5" />
                    <span className="max-w-[100px] truncate font-medium">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => onNavigate('orders')}>My Orders</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onNavigate('profile')}>Profile</DropdownMenuItem>
                  {user.role === 'admin' && (
                    <DropdownMenuItem onClick={() => onNavigate('admin')}>Admin Dashboard</DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4 mr-2" /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="outline" onClick={() => onNavigate('login')}>Sign In</Button>
            )}
          </div>

          <div className="flex md:hidden items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => onNavigate('cart')}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Button>
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t bg-background p-4 animate-in slide-in-from-top duration-300">
          <form onSubmit={handleSearch} className="mb-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-9 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <div className="space-y-2">
            <p className="text-sm font-semibold text-muted-foreground px-2">Categories</p>
            {categories.map((cat) => (
              <Button 
                key={cat.id} 
                variant="ghost" 
                className="w-full justify-start"
                onClick={() => {
                  onNavigate(`category-${cat.slug}`);
                  setIsMenuOpen(false);
                }}
              >
                {cat.name}
              </Button>
            ))}
            <div className="pt-2 border-t">
              {user ? (
                <>
                  <Button variant="ghost" className="w-full justify-start" onClick={() => onNavigate('orders')}>My Orders</Button>
                  <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={handleLogout}>Log Out</Button>
                </>
              ) : (
                <Button variant="ghost" className="w-full justify-start" onClick={() => onNavigate('login')}>Sign In</Button>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};