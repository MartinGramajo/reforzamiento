
import useCounter from "../hooks/useCounter";

const CounterWithHook = () => {
 
    const {count, decreaseBy, increaseBy} = useCounter({
        initialValue:5
    })

  return (
    <div>
      <h2>
        Contador: <small>{count}</small>{" "}
      </h2>

      <div>
        <button onClick={()=>increaseBy(1)}>+1</button>
        &nbsp;&nbsp;
        <button onClick={() => decreaseBy(1)}>-1</button>
      </div>
    </div>
  );
};

export default CounterWithHook;
