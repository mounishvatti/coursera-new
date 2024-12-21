import Footer from './Footer'
import Nav from './Nav'
import { usePathname } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <>
      <Nav />
      <main className='mx-auto max-w-full md:max-w-6xl min-h-screen px-5'>
        {children}
      </main>
      {/* Footer (only shown on the homepage) */}
      {pathname === "/" && (
        <Footer />
      )}
    </>
  )
}
