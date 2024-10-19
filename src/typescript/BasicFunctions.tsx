
// interface Props {
//     a: number;
//     b: number;
// }


const BasicFunctions = () => {


    const addTwoNumber = (a:number, b:number  ): number=>{
        return a + b;

    }


  return (
    <div>
      <h2> Basic Functions</h2>
      <h3> el resultado de sumar es: {addTwoNumber( 2, 8)}</h3>
    </div>
  )
}

export default BasicFunctions
