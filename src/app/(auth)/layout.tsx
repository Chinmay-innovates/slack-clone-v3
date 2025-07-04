const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="sm:w-svw sm:h-svh bg-slack w-full h-full flex items-center justify-center">
      {children}
    </div>
  );
};

export default AuthLayout;
