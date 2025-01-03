export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className={`size-8 animate-spin rounded-full transition-opacity duration-500 dark:invert`}
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='black' stroke-width='1' stroke-dasharray='16%2c 2%2c 16' stroke-dashoffset='0' stroke-linecap='round'/%3e%3c/svg%3e")`,
        }}
      />
    </div>
  );
}
