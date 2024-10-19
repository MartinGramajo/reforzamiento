import { useState } from "react";


interface Options {
  initialValue : number;
}

const useCounter = ({initialValue=0}:Options) => {
  const [count, setCount] = useState<number>(initialValue);

  const increaseBy = (value: number) => {
    setCount(count + value);
  };

  const decreaseBy = (value: number) => {
    const newValue = count - value;

    // Agregamos validaciones evita que se pueda restar en numero negativo.
    if (newValue >= 0) {

      setCount(count - value);
    }
  };

  return {
    // Properties
    count,
    
    // Methods
    increaseBy,
    decreaseBy
  };
};

export default useCounter;
