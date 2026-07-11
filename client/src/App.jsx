import Main from "./pages/Main";
import Header from "./components/Header";
import AuthPage from "./components/AuthPage";
import MissingClerkConfig from "./components/MissingClerkConfig";
import { ClerkLoaded, ClerkLoading, Show } from "@clerk/react";

const App = ({ clerkPublishableKey }) => {
    if (!clerkPublishableKey) {
        return (
            <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-12 font-sans">
                <MissingClerkConfig />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 p-6 md:p-12 font-sans">
            <div className="max-w-6xl mx-auto space-y-8">
                <ClerkLoading>
                    <div className="min-h-[calc(100vh-6rem)] grid place-items-center">
                        <p className="text-sm font-medium text-gray-500">Loading secure workspace...</p>
                    </div>
                </ClerkLoading>

                <ClerkLoaded>
                    <Show when="signed-out">
                        <AuthPage />
                    </Show>

                    <Show when="signed-in">
                        <Header />
                        <Main />
                    </Show>
                </ClerkLoaded>
            </div>
        </div>
    );
};

export default App;
