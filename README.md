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
const authStatus = useAuthStore((state) => state.status);
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

### Zustand definir acciones - Login & logout

Los métodos en zustand son funciones que puedes definir dentro de la tienda (store) para modificar el estado o realizar acciones relacionadas.  
En este caso agregamos 2 acciones login - logout

```js
import { create } from "zustand";

interface AuthState {
  status: "authenticated" | "unauthenticated" | "checking";
  token?: string;
  user?: {
    name: string;
    email: string;
  };

  // métodos en zustand: son las acciones
  login: (email: string, password: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  status: "checking",
  token: undefined,
  user: undefined,

  // acciones
  login: (email: string, password: string) => {
    set({
      status: "authenticated",
      token: "token_from_server",
      user: { name: "John Doe", email }
    });
  },

  logout: () => {
    set({
      status: "unauthenticated",
      token: undefined,
      user: undefined
    });
  }
}));


```

Ahora en el component donde estamos trabajando tenemos que extraer esas funciones.

```js
const LoginPage = () => {
  const authStatus = useAuthStore((state) => state.status);
  const login = useAuthStore((state) => state.login);
  const logout = useAuthStore((state) => state.logout);
};
```

IMPORTANTE: se aconseja extraer por separado y no aplicar la des - estructuración dado que puede traer problema en el render.

Por ultimo usamos cada función en nuestro component :

```js
return (
  <>
    <h2> Login Page</h2>

    {authStatus === "authenticated" ? (
      <div>Autenticado como :{JSON.stringify(user, null, 2)} </div>
    ) : (
      <div>No autenticado</div>
    )}

    {authStatus === "authenticated" ? (
      <button onClick={logout}>Logout</button>
    ) : (
      <button onClick={() => login("mar@email.com", "123")}>Login</button>
    )}
  </>
);
```

### Peticiones HTTP - Axios

En este apartado vamos a trabajar con la librería de axios y la api https://reqres.in/

El objetivo de esta tarea es crear una lista de usuarios consumiendo la Api y cargando los datos en la page.

Esta seria la consulta realizada con fetch() :

```js
useEffect(() => {
  fetch("https://reqres.in/api/users?page=2")
    .then((resp) => resp.json())
    .then((data) => console.log(data));
}, []);
```

Pero vamos a trabajar con una librería para hacer las peticiones Axios y vemos la diferencia y como llegamos al mismo resultado que es la respuesta de la petición

Comando de instalación: npm i axios

```js
const UsersPage = () => {
  useEffect(() => {
    axios.get('https://reqres.in/api/users?page=2')
    .then( resp => console.log(resp.data) );
  }, []);

```

### Establecer el tipo - Respuestas HTTP

En la carpeta _interface_ vamos a crear un archivo de barril _index.ts_ y vamos a crear nuestra interface _resrep.interface.ts_

#### Como establecer un tipado estricto en una respuesta HTTP?

1. Copiamos el link a donde hacemos la consulta, en este caso: https://reqres.in/api/users?page=2

2. Abrimos _Postman_ y hacemos la consulta GET, a la respuesta la vamos a copiar  
   ![ej](https://res.cloudinary.com/dtbfspso5/image/upload/v1729362482/Anotaci%C3%B3n_2024-10-19_152614_ogyomm.png)

3. Con la respuesta copiada, nos vamos al visual code y en el archivo _resrep.interface.ts_, abrimos la paleta de comando y buscamos _Paste JSON a code_ (extension), elegimos typescript y le colocamos un nombre a nuestra interface y en esos sencillos pasos nos crea el tipado estricto de la respuesta HTTP.

4. Ahora por ultimo nos queda utilizarla, en este caso separamos la petición en una función fuera de nuestro component y utilizamos la función dentro del hook useEffect

```js
const loadUsers = async () => {
  try {
    const { data } = await axios.get<ReqResUserLists>(
      "https://reqres.in/api/users"
    );
    return data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const UsersPage = () => {
  useEffect(() => {
    loadUsers().then( users => console.log(users)
    )
  }, []);

```

### Mostrar usuarios en pantalla

1. Utilizamos un hook useState para guardar en un estado la respuesta de la petición.

2. Con ese estado hacemos un map y mostramos las propiedades por pantalla.

```js
<tbody>
  {usersList.map((user) => (
    <tr key={user.id}>
      <td>
        <img
          style={{ width: "50px" }}
          src={user.avatar}
          alt={user.first_name}
        />
      </td>
      <td>
        {user.first_name} {user.last_name}
      </td>
      <td>{user.email}</td>
    </tr>
  ))}
</tbody>
```

Nota: Una forma curiosa de guardar la respuesta es la siguiente,
la diferencia radica en la forma que sea mas legible.

```js
const UsersPage = () => {
  const [usersList, setUserslist] = useState<User[]>([]);

  useEffect(() => {
    // En esta forma guardamos en el state la respuesta de la petición

    // loadUsers().then((users) => setUserslist(users));

    // Cargamos lo que retorna loadUsers() directamente en el state
    loadUsers().then(setUserslist);
  }, []);
```

3. Se aconseja tener todo componentizado para evitar re - renders innecesarios por ello vamos a crear un componente aparte para recibir las props y cargar la lista de usuarios.

```js
<tbody>
  {usersList.map((user) => (
    <UsersRow user={user} />
  ))}
</tbody>
```
