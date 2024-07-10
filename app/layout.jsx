import "./globals.css";
import Provider from "@/components/Provider";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata = {
  title: "Project With Mani",
  description: "Project With Mani",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className="dark min-h-screen bg-black-100 font-poppins">
        <Provider>
          <SmoothScroll>{children}</SmoothScroll>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
