import { Link } from "react-router-dom";

const NotFound = () => (
  <main className="flex min-h-screen items-center justify-center bg-black px-6 text-center text-white">
    <div className="max-w-lg">
      <p className="text-xs tracking-[0.3em] text-white/35 uppercase">404 · Page not found</p>
      <h1 className="mt-5 font-serif text-5xl tracking-tight sm:text-6xl">
        This moment isn’t here.
      </h1>
      <p className="mx-auto mt-5 max-w-md text-sm leading-6 text-white/45">
        The link may be incorrect, expired, or the page may have moved.
      </p>
      <Link
        to="/"
        className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
      >
        Return home
      </Link>
    </div>
  </main>
);

export default NotFound;
