import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, CreditCard, Shield, Truck, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white mt-20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <ShoppingBag
                className="w-6 h-6 text-primary/90 group-hover:scale-105 transition-transform"
              />

              <span className="text-2xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
                  Fresh
                </span>
                <span className="ml-1 text-white group-hover:text-neutral-200 transition-colors">
                  Buy
                </span>
              </span>
            </Link>
            <p className="text-neutral-400 text-sm leading-relaxed">
              A trusted farmer-to-customer marketplace delivering fresh vegetables, fruits, grains, and daily essentials directly from local farms to your doorstep.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-white/10">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-white/10">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-white/10">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white hover:bg-white/10">
                <Youtube className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: 'About Our Farmers', href: '/about' },
                { name: 'Contact Us', href: '/contact' },
                { name: 'FAQs', href: '/faq' },
                { name: 'Delivery Information', href: '/shipping' },
                { name: 'Returns & Refunds', href: '/returns' },
                { name: 'Become a Seller', href: '/seller' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              {[
                { name: 'Help Center', href: '/help' },
                { name: 'Track Your Order', href: '/track' },
                { name: 'Live Support', href: '/chat' },
                { name: 'Privacy Policy', href: '/privacy' },
                { name: 'Terms & Conditions', href: '/terms' },
                { name: 'Accessibility', href: '/accessibility' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    to={link.href} 
                    className="text-neutral-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Connected</h3>
            <p className="text-neutral-400 text-sm">
               Get updates on fresh arrivals, seasonal produce, and special farmer offers.
            </p>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder:text-neutral-400 focus:border-primary"
              />
              <Button className="w-full bg-primary hover:bg-primary-dark">
                Subscribe
              </Button>
            </form>
            
            <div className="space-y-2 pt-2">
              <div className="flex items-center space-x-2 text-neutral-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+91 6789890990</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@freshbuy.in</span>
              </div>
              <div className="flex items-center space-x-2 text-neutral-400 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Kerala, India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-neutral-800" />

      {/* Features Bar */}
      <div className="bg-neutral-800/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Truck className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Fast Local Delivery</p>
                <p className="text-neutral-400 text-xs">Fresh produce, same day</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Trusted Farmers</p>
                <p className="text-neutral-400 text-xs">Quality checked produce</p>
              </div>
            </div>

            <div className="flex items-center justify-center md:justify-start space-x-3">
              <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">Easy Payments</p>
                <p className="text-neutral-400 text-xs">UPI, Cards & Net Banking</p>
              </div>
            </div>
          </div>
        </div>
      </div>


      <Separator className="bg-neutral-800" />

      {/* Bottom Footer */}
      <div className="bg-neutral-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-neutral-400 text-sm">
                © {currentYear} FreshBuy. Supporting local farmers, delivering fresh food. 
  
              </p>
            </div>
            
            {/* Payment Methods */}
            <div className="flex items-center space-x-4">
              <span className="text-neutral-400 text-xs">We accept:</span>
              <div className="flex items-center space-x-2">
                {['UPI', 'RuPay', 'Visa', 'Mastercard', 'Net Banking', 'Cash on Delivery'].map((method) => (
                  <div
                    key={method}
                    className="bg-white/10 px-2 py-1 rounded text-xs text-neutral-300"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};