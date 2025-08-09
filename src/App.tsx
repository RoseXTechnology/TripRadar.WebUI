import { AppLayout } from 'app/layout/AppLayout';
import { Providers } from 'app/providers';

function App() {
  return (
    <Providers>
      <AppLayout />
    </Providers>
  );
}

export default App;
