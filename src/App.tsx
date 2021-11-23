import { FC } from 'react';
import Nav from './components/Nav';
import Routing from './components/Routing';
import { RecoilRoot } from 'recoil';
import './App.css';

const App: FC = () => {
  return (
    <div>
      <RecoilRoot>
        <Nav />
        <div className="jumbotron main-wrapper">
          <div className="container">
            <div className="row">
              <div className="col-md-6 offset-md-3">
                <Routing />
              </div>
            </div>
          </div>
        </div>
      </RecoilRoot>
    </div>
  );
};

export default App;
