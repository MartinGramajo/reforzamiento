

const BasicTypes = () => {

  const name: string = 'Martin';

  const age: number = 30;

  const isActive: boolean = true;

  const hobbies: string[] = ['reading', 'painting', 'cooking'];
  
  // hobbies.push('music')

  return (
    <div>
      <h2> basic types</h2>
      {name} {age} {isActive ? 'true' : 'false'}
      <br/>
      {hobbies.join(', ')}
    </div>
  )
}

export default BasicTypes
