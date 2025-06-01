export function LoadingBlock({
  message = "Loading...",
  size = "lg",
}: {
  message?: string
  size?: "sm" | "md" | "lg"
}) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-6 w-6 border-4",
    lg: "h-8 w-8 border-4",
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-2 text-muted-foreground">
      <div
        className={`animate-spin rounded-full border-t-transparent border-gray-400 ${sizeClasses[size]} border-solid`}
      />
      <p className="text-sm font-medium">{message}</p>
    </div>
  );
}