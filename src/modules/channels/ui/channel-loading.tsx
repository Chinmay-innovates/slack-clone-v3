const SkeletonItem = () => (
  <div className="relative flex animate-pulse py-3 px-5 gap-3">
    <div className="w-9 h-9 bg-[#797C814D] rounded-lg shrink-0" />
    <div className="flex-1 space-y-2">
      <div className="w-1/3 h-3.5 bg-[#797C814D] rounded-full" />
      <div className="w-full h-20 bg-[#797C814D] rounded-lg" />
    </div>
  </div>
);

const ChannelLoading = () => {
  return (
    <div className="relative flex flex-col pt-14 space-y-1">
      {Array.from({ length: 4 }).map((_, idx) => (
        <SkeletonItem key={idx} />
      ))}

      <div className="absolute bottom-0 w-full px-5 pb-2">
        <div className="w-full h-32 bg-[#232529] border border-[#565856] rounded-lg" />
      </div>
    </div>
  );
};

export default ChannelLoading;
