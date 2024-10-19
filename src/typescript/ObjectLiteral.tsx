

interface Person {
    firstName: string;
    lastName: string
    age: number;
    address: Address;
    isAlive?: boolean;

}

interface Address {
    country: string,
        houseNo: number
}

const ObjectLiteral = () => {

    const person: Person= {
        firstName: "carlos martin",
        lastName:'gramajo',
        age:37,
        address:{
            country:'argentina',
            houseNo: 1014
        }
    }



  return (
    <div>
      <h2> objectos literales</h2>
      <pre>
      {JSON.stringify( person, null, 2)}
      </pre>
    </div>
  )
}

export default ObjectLiteral
