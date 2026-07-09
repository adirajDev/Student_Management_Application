import Main from "./pages/Main";
import Header from "./components/Header";

const App = () => {
    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                <Header />
                <Main />
            </div>
        </div>
    );
};

export default App;