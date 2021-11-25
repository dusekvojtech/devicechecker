import { FC } from 'react';
import Nav from './components/Nav';
import Routing from './components/Routing';
import { RecoilRoot } from 'recoil';
import './App.css';

const App: FC = () => {
  return (
    <RecoilRoot>
      <Nav />
      <main role="main" className="bg-light py-5">
        <div className="container py-5">
          <div className="d-flex justify-content-center">
            <Routing />
          </div>
        </div>
      </main>
      <footer className="text-muted py-3">
        <div className="container text-center">
          <p> © DeviceChecker</p>
        </div>
      </footer>
    </RecoilRoot>
  );
};

export default App;
