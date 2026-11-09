import type { Metadata } from 'next';
import './globals.css';
export const metadata:Metadata={title:'Ribbon',description:'Some days have a color. Turn a photograph into a woven keepsake.',icons:{icon:'/favicon.svg'}};
export default function Layout({children}:Readonly<{children:React.ReactNode}>){return <html lang="en"><body>{children}</body></html>}
