import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState<number>(10);

  const increaseBy = (value:number)=>{
    setCount(count + value);
  }

  return (
    <div>
      <h2>
        Contador: <small>{count}</small>{" "}
      </h2>

      <div>
        <button onClick={()=>increaseBy(+1)}>+1</button>
        &nbsp;&nbsp;
        <button onClick={() => setCount(count - 1)}>-1</button>
      </div>
    </div>
  );
};

export default Counter;
