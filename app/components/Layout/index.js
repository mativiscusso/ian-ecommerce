import Footer from "components/Footer";
import Navbar from "components/Navbar";

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            {children}
            <Footer
                title="Footer"
                description="Something here to give the footer a purpose!"
            />
        </>
    );
}
