import { useState } from 'react';
import './Counter.css';
import VerifyToken from '../../components/ConnectUserForm/VerifyToken';

function Counter() {
  const [counter, setCounter] = useState(0);
  const {loggedIn, name} = VerifyToken();
  console.log(name);

  return (
    <div className="Counter-container">
      <h1>This is a counter example</h1>
      <div>Counter value : {counter}</div>
      <button onClick={() => setCounter(counter + 1)}>Increment counter</button>
    </div>
  );
}

export default Counter;
