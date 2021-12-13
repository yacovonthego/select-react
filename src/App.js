import './App.scss';
import './normalize.css';
import GroupControl from './components/GroupControl';
import { groups } from './data.js';

const App = () => {
  return (
    <div style={{width: '300px'}}>
      <GroupControl
        values={groups}
        label={'Группа:'}
        selected={1}
      />    
    </div>
  );
}

export default App;
