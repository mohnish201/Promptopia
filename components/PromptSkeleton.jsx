export const PromptSkeleton = () => {
  return (
    <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-3 gap-4">
      {[1, 2, 3].map((_, i) => (
        <div
          key={i}
          className="h-[300px] w-full rounded-lg bg-gray-200 animate-pulse"
        />
      ))}
    </div>
  );
};
