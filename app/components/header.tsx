interface HeaderProps {
  children: React.ReactNode;
  variant?: "main" | "section" | "card";
}

const Header = ({ children, variant = "main" }: HeaderProps) => {
  const variantClasses = {
    main: `text-3xl md:text-4xl lg:text-5xl xl:text-6xl`,
    section: `text-2xl md:text-2xl lg:text-3xl xl:text-4xl`,
    card: `text-xl lg:text-2xl`,
  };
  return (
    <h1 className={`${variantClasses[variant]} font-bold mb-6`}>{children}</h1>
  );
};

export default Header;
