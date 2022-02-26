import { FunctionalComponent, h } from "preact";
import { Link } from "preact-router/match";

const Header: FunctionalComponent = () => {
  return (
    <div className="w-full bg-blue-600 text-white flex items-center justify-center px-2 py-4">
      <h1 className="text-2xl">Ctrl-V Bin</h1>
    </div>
  );
};

export default Header;
