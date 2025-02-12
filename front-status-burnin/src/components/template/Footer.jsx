export const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-xl border-t border-white/10 text-white text-xs py-3">
      <div className="container mx-auto text-center px-4 opacity-20">
        <div className="flex flex-col justify-center items-center gap-2">
          An initiative by Eng. Renato Cal y Mayor and Burnin Team
          <img
            src="/ingrasys-logo.png"
            alt=""
            className="w-14 bg-white px-1 py-[1px] rounded-2xl"
          />
        </div>
      </div>
    </footer>
  );
};
