import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-muted-foreground">
          &copy; {currentYear} Finally. All rights reserved.
        </p>
        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Terms of Service
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;