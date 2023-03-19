import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';
import './App.css';
import GlobalStyle from './GlobalStyle';

const queryClient = new QueryClient();

function App() {
    return (
        <>
            <GlobalStyle />
            <QueryClientProvider client={queryClient}>
                <Router />
            </QueryClientProvider>
        </>
    );
}

export default App;
