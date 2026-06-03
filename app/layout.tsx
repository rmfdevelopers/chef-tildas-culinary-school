import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  display: 'swap'
});

const body = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  display: 'swap'
});

export const metadata = {
  title: "Chef Tilda’s Culinary School | Lagos Culinary Excellence",
  description: "Transform your passion into professional excellence. Join Nigeria's most prestigious academy for aspiring chefs and pastry artists.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={`${heading.variable} ${body.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}