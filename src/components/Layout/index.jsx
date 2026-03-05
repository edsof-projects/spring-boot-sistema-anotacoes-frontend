import { useState }           from "react";
import { Outlet }             from "react-router-dom";
import MobileMenu             from "../MobileMenu";

export default function Layout({ children }) {

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {children || (
        <Outlet context={{ onMenuClick: () => setMenuOpen(true) }} />
      )}

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </>
  )
}

