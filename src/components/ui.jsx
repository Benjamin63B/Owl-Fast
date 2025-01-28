import {
    Card,
    CardContent,
    CardHeader,
    Button,
    Input,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
  } from "../components/ui.jsx";
  

export const Card = ({ children, className }) => (
    <div className={`bg-gray-800 p-4 rounded-lg shadow-md ${className}`}>{children}</div>
  );
  
  export const CardHeader = ({ children }) => (
    <h3 className="text-xl font-semibold mb-2">{children}</h3>
  );
  
  export const CardContent = ({ children }) => <div>{children}</div>;
  
  export const Button = ({ children, className, ...props }) => (
    <button
      className={`px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  
  export const Navbar = ({ children, className }) => (
    <nav className={`flex items-center justify-between p-4 ${className}`}>
      {children}
    </nav>
  );
  
  export const NavbarBrand = ({ children }) => (
    <div className="text-xl font-bold">{children}</div>
  );
  
  export const NavbarContent = ({ children }) => (
    <div className="flex space-x-4">{children}</div>
  );
  
  export const NavbarItem = ({ children }) => (
    <a className="hover:text-blue-400 cursor-pointer">{children}</a>
  );
  