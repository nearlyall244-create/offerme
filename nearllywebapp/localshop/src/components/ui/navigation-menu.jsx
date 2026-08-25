import React from "react";

export const NavigationMenu = ({ children, className = "" }) => {
  return (
    <nav className={`relative z-10 flex ${className}`}>
      {children}
    </nav>
  );
};

export const NavigationMenuList = ({ children, className = "" }) => {
  return (
    <ul className={`flex items-center gap-1 ${className}`}>
      {children}
    </ul>
  );
};

export const NavigationMenuItem = ({ children, className = "" }) => {
  return (
    <li className={className}>
      {children}
    </li>
  );
};

export const NavigationMenuLink = ({ children, className = "", href, as: Component, ...props }) => {
  const content = (
    <span className={`block select-none space-y-1 rounded-md p-2 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground ${className}`}>
      {children}
    </span>
  );

  if (Component) {
    return <Component to={href} {...props}>{content}</Component>;
  }

  return (
    <a href={href} {...props}>
      {content}
    </a>
  );
};

export default NavigationMenu;
