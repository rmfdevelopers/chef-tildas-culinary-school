import { Playfair_Display, Outfit } from 'next/font/google';
import './globals.css';

const heading = Playfair_Display({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['400', '700', '900']
});

const body = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '700']
});

export const metadata = {
  title: "Chef Tilda’s Culinary School | Lagos Culinary Academy",
  description: "A premier Lagos academy dedicated to the art of culinary excellence, from professional chef diplomas to artisanal pastry craftsmanship.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}