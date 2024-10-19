# React + TypeScript + Vite

La idea de este proyecto es dar un refuerzo o repaso de todos los conceptos claves que vamos utilizar para react native.

### Estructura de carpeta

Dentro de src:

1. Api: carpeta donde vamos a tener una instancia de axios para conectarnos a otros lugares.
2. components: para colocar los componentes re-utilizables
3. hooks: carpeta para tener nuestros custom hooks.
4. interfaces: para colocar los tipado estrictos en nuestra app.
5. store: carpeta donde tenemos nuestra fuente central de información para ello vamos a estar utilizando zustand (gestor de estados globales).
6. typescript: carpeta de ejercicio para practicar ts.

#### Buenas practicas en el css

Si seleccionamos nuestros estilos y abrimos la paleta de comandos y escribimos _sort lines Ascending_ podemos ordenar ascendentemente los estilos.

### Repaso de los tipos básicos de typescript

La ventaja de typescript es que al colocar un tipo a una var o const al utilizar dicha var o const el mismo typescript nos infiere si es un string al colocar un punto nos tira todos los métodos de un string, si es un number y colocamos un punto lo mismo, nos ayuda diciendo es una var o const de tipo number entonces tienes estos métodos y asi con todos los tipos de datos.

### Objetos literales

Para el tipado de los objetos, utilizamos las _interfaces_, es una estructura que define el _contrato_ o forma que deben seguir los objetos. Sirve especialmente para especificar las propiedades,métodos y sus tipos que un objeto debe tener, sin proporcionar la implementación.
Nos ayudan a verificar que los objetos sigan un tipo coherente.

En el caso de tener en una interface _objetos anidados_ como en el siguiente ejemplo:

```js
interface Person {
    firstName: string;
    lastName: string
    age: number;
    isAlive?: boolean;
    address:{
        country: string,
        houseNo: number
    }

}
```

Es bastante común crearle una nueva interface para el objeto anidado.

```js

interface Person {
    firstName: string;
    lastName: string
    age: number;
    isAlive?: boolean;
    address: Address;

}

interface Address {
    country: string,
        houseNo: number
}

```

Por otra parte el valor isAlive al tener el _?_ le estamos diciendo a typescript ese valor puede venir dentro del objeto como no podría venir, es decir, _es opcional_.

#### Cual es la ventaja de tipar un objeto?

Si queremos desestructurar sus propiedades y queremos tomar algunas de sus propiedades, dentro de la llaves oprimimos la barra espaciador y tenemos todo a la mano

```js
const {} = person;
```

### Funciones, retorno y argumentos

Como typescript infiere con los tipos de datos, también lo hace para las funciones de flecha y argumentos.

En el caso de los argumentos, typescript nos dispara los warning debido que si tenemos una función sumar y tiene dos parámetros a y b, no sabemos si los argumentos a y b es posible sumarlos xq uno puede ser un string, un boolean etc.

```js
const addTwoNumber = (a: number, b: number) => {
  return a + b;
};
```

De esta forma le decimos a Typescript mira los dos argumentos que esta función recibe son de tipo numero.

Por otra parte podemos hacer el tipado estricto con el retorno de la función, en la siguiente función le ponemos el tipado de que el retorno si o si sera de tipo number :

```js
const addTwoNumber = (a: number, b: number): number => {
  return a + b;
};
```

### Hook

Trabajamos con el hook useState para realizar el ejercicio del contador pero con Ts.

También podemos asignar mediante un _generico_ un tipo de dato. En este ejemplo tipamos el useState como de tipo number

```js
const [count, setCount] = useState < number > 10;
```

### Custom Hook - useCounter()

En este apartado, movimos todas las lógica del useState y las funciones de incrementar y decrement a un custom hook para dejar mas limpio nuestro componente.

Para poder iniciar un valor al state podemos crear una interface en este caso _Options_ para los hooks en donde vamos a tener nuestro initialValue.

```js
interface Options {
  initialValue : number;
}

const useCounter = ({initialValue}:Options) => {
  const [count, setCount] = useState<number>(initialValue);

```

Pero tambien tenemos que modificar el component _CounterWithHook_ para definirle ese valor inicial:

```js
const CounterWithHook = () => {
  const { count, decreaseBy, increaseBy } = useCounter({
    initialValue: 5
  });
};
```

También podemos definir un valor inicial desde el custom Hook:

```js
interface Options {
  initialValue : number;
}

const useCounter = ({initialValue=0}:Options) => {
  const [count, setCount] = useState<number>(initialValue);

```

En este caso, si no modificamos el component _CounterWithHook_ tomara el valor default del custom hook:

```js
const CounterWithHook = () => {
  const { count, decreaseBy, increaseBy } = useCounter({});
};
```

### Zustand - gestor de estado

1. Hacemos la instalación con el siguiente comando: npm i zustand.

2. Dentro de la carpeta _store_ creamos el archivo _auth.store.ts_

3. Creamos la _interface_ para determinar el contrato o reglas de como quiero que luzca mi estado global.

```js
interface AuthState {
  status: "authenticated" | "unauthenticated" | "checking";
  token?: string;
  user?: {
    name: string,
    email: string
  };
}
```

4. Hacemos el tipado y usamos la siguiente sintaxis para crear la constante que vamos almacenar en memoria, es decir, el store de zustand: 

```js 

export const useAuthStore = create<AuthState>()((set) => ({
  status: "authenticated",
  token: undefined,
  user: undefined
}));

```

set: es una función que nos sirve para dispara la creación de un nuevo estado en nuestra store. 

5. Utilizamos el estado de la siguiente forma: en el component donde lo vamos a utilizar, creamos una constante en donde vamos a guardar el state en este caso del state lo que queremos tomar es el status. 

```js
    const authStatus = useAuthStore(state => state.status)
```
Ahora bien, para utilizarlo en el component es muy fácil: 

```js 
  return (
    <div>
      <h2> Login Page</h2>
      {authStatus}
    </div>
  )
}

```