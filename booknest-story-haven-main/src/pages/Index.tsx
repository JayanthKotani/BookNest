import { useState } from "react";
import { Search, ShoppingCart, User, Menu, Star, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SignInDialog } from "@/components/SignInDialog";
import { CartDrawer } from "@/components/CartDrawer";

// Sample book data with proper images
const books = [
  {
    id: 1,
    title: "The Digital Renaissance",
    author: "Emma Thompson",
    genre: "Technology",
    price: 24.99,
    rating: 4.8,
    reviews: 127,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=600&fit=crop",
    description: "A comprehensive look at how technology is reshaping our world.",
    stock: 15
  },
  {
    id: 2,
    title: "Mystic Waters",
    author: "James Morrison",
    genre: "Fantasy",
    price: 19.99,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=600&fit=crop",
    description: "An epic fantasy adventure through mystical realms.",
    stock: 8
  },
  {
    id: 3,
    title: "The Art of Minimalism",
    author: "Sarah Chen",
    genre: "Lifestyle",
    price: 16.99,
    rating: 4.9,
    reviews: 203,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=600&fit=crop",
    description: "Discover the power of living with less.",
    stock: 22
  },
  {
    id: 4,
    title: "Quantum Mechanics Simplified",
    author: "Dr. Michael Brown",
    genre: "Science",
    price: 29.99,
    rating: 4.7,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop",
    description: "Making complex physics accessible to everyone.",
    stock: 12
  },
  {
    id: 5,
    title: "Cooking with Passion",
    author: "Isabella Rodriguez",
    genre: "Cooking",
    price: 22.99,
    rating: 4.8,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=600&fit=crop",
    description: "Rediscover the joy of cooking with authentic recipes.",
    stock: 18
  },
  {
    id: 6,
    title: "The Entrepreneur's Journey",
    author: "Alex Johnson",
    genre: "Business",
    price: 26.99,
    rating: 4.5,
    reviews: 92,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=600&fit=crop",
    description: "From startup to success: a complete guide.",
    stock: 14
  }
];

const genres = ["All", "Technology", "Fantasy", "Lifestyle", "Science", "Cooking", "Business"];

interface CartItem {
  id: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
  image: string;
}

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || book.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return b.reviews - a.reviews;
    }
  });

  const addToCart = (book: typeof books[0]) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === book.id);
      if (existing) {
        return prev.map(item =>
          item.id === book.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        id: book.id,
        title: book.title,
        author: book.author,
        price: book.price,
        quantity: 1,
        image: book.image
      }];
    });
  };

  const updateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4 lg:space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
                  BookNest
                </span>
              </div>
              <nav className="hidden md:flex space-x-4 lg:space-x-6">
                <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors text-sm lg:text-base">Home</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors text-sm lg:text-base">Books</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors text-sm lg:text-base">Categories</a>
                <a href="#" className="text-gray-700 hover:text-amber-600 transition-colors text-sm lg:text-base">About</a>
              </nav>
            </div>
            <div className="flex items-center space-x-2 lg:space-x-4">
              <SignInDialog>
                <Button variant="ghost" size="sm" className="hover:bg-amber-50">
                  <User className="w-5 h-5" />
                </Button>
              </SignInDialog>
              <CartDrawer 
                cartItems={cartItems}
                onUpdateQuantity={updateCartQuantity}
                onRemoveItem={removeFromCart}
              >
                <Button variant="ghost" size="sm" className="hover:bg-amber-50 relative">
                  <ShoppingCart className="w-5 h-5" />
                  {cartItems.length > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-amber-500 hover:bg-amber-600 text-xs">
                      {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                    </Badge>
                  )}
                </Button>
              </CartDrawer>
              <Button variant="ghost" size="sm" className="md:hidden">
                <Menu className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Where Stories Nestle
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-6 lg:mb-8 max-w-3xl mx-auto px-4">
              Discover your next favorite book from our curated collection of thousands of titles
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-2xl mx-auto px-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500 z-10" />
                <Input
                  placeholder="Search books, authors, or genres..."
                  className="pl-10 h-12 text-lg bg-white text-black placeholder:text-gray-500 border-gray-300 focus:border-amber-500 focus:ring-amber-500 w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white px-6 lg:px-8 h-12">
                Search Books
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-start sm:items-center w-full lg:w-auto">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Filter by:</span>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="rating">Highest Rated</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="newest">Newest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center space-x-2 self-end lg:self-auto">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-amber-500 hover:bg-amber-600" : ""}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6 lg:mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              {selectedGenre === "All" ? "All Books" : `${selectedGenre} Books`}
            </h2>
            <p className="text-gray-600">
              {sortedBooks.length} {sortedBooks.length === 1 ? "book" : "books"} found
            </p>
          </div>

          <div className={`grid gap-4 lg:gap-6 ${
            viewMode === "grid" 
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
              : "grid-cols-1"
          }`}>
            {sortedBooks.map((book) => (
              <Card 
                key={book.id} 
                className={`group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 ${
                  viewMode === "list" ? "flex flex-col sm:flex-row" : ""
                }`}
              >
                <div className={`${viewMode === "list" ? "w-full sm:w-48 flex-shrink-0" : ""}`}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img 
                      src={book.image} 
                      alt={book.title}
                      className={`w-full object-cover transition-transform duration-300 group-hover:scale-105 ${
                        viewMode === "list" ? "h-48 sm:h-full sm:rounded-l-lg sm:rounded-t-none" : "h-48 lg:h-64"
                      }`}
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-amber-500 hover:bg-amber-600 text-white text-xs">
                        {book.stock} left
                      </Badge>
                    </div>
                  </div>
                </div>
                
                <div className={`${viewMode === "list" ? "flex-1" : ""}`}>
                  <CardHeader className="pb-3 p-4 lg:p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-base lg:text-lg text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">by {book.author}</p>
                        <Badge variant="secondary" className="mt-2 bg-amber-50 text-amber-700 border-amber-200 text-xs">
                          {book.genre}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pt-0 p-4 lg:p-6 lg:pt-0">
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {book.description}
                    </p>
                    
                    <div className="flex items-center space-x-1 mb-4">
                      {renderStars(book.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        {book.rating} ({book.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <div className="flex flex-col">
                        <span className="text-xl lg:text-2xl font-bold text-gray-900">
                          ${book.price}
                        </span>
                      </div>
                      <Button 
                        onClick={() => addToCart(book)}
                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white w-full sm:w-auto"
                        size="sm"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-xl lg:text-2xl font-bold">BookNest</span>
              </div>
              <p className="text-gray-400 text-sm lg:text-base">
                Where Stories Nestle - Your premier destination for discovering and purchasing books online.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-base lg:text-lg">Quick Links</h3>
              <div className="space-y-2 text-gray-400 text-sm lg:text-base">
                <a href="#" className="block hover:text-amber-400 transition-colors">Home</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">Books</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">Categories</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">About Us</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-base lg:text-lg">Support</h3>
              <div className="space-y-2 text-gray-400 text-sm lg:text-base">
                <a href="#" className="block hover:text-amber-400 transition-colors">Contact Us</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">FAQ</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">Shipping</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">Returns</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4 text-base lg:text-lg">Connect</h3>
              <div className="space-y-2 text-gray-400 text-sm lg:text-base">
                <a href="#" className="block hover:text-amber-400 transition-colors">Newsletter</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">Social Media</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">Blog</a>
                <a href="#" className="block hover:text-amber-400 transition-colors">Reviews</a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-6 lg:mt-8 pt-6 lg:pt-8 text-center text-gray-400 text-sm lg:text-base">
            <p>&copy; 2025 BookNest. All rights reserved. Built with ❤️ for book lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
