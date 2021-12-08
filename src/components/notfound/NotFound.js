export default function NotFound() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col items-center md:flex-row">
        <div className="w-full space-y-5 md:w-3/5 md:pr-16">
          <p className="font-medium text-purple-700 uppercase">404</p>
          <h2 className="text-2xl font-extrabold leading-none text-black sm:text-3xl md:text-5xl">
            The page you requested is not found.
          </h2>
        </div>
      </div>
    </div>
  );
}
