import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-lg font-bold">
          Home
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/login">Login</Link>
            </li>
            <li>
              <Link href="/register">Register</Link>
            </li>
            <li>
              <Link href="/account">Account</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
