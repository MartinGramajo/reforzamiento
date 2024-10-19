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

Si seleccionamos nuestros estilos y abrimos la paleta de comandos y escribimos *sort lines Ascending* podemos ordenar ascendentemente los estilos. 

### Repaso de los tipos básicos de typescript

La ventaja de typescript es que al colocar un tipo a una var o const al utilizar dicha var o const el mismo typescript nos infiere si es un string al colocar un punto nos tira todos los métodos de un string, si es un number y colocamos un punto lo mismo, nos ayuda diciendo es una var o const de tipo number entonces tienes estos métodos y asi con todos los tipos de datos.

### Objetos literales

Para el tipado de los objetos, utilizamos las *interfaces*, es una estructura que define el *contrato* o forma que deben seguir los objetos. Sirve especialmente para especificar las propiedades,métodos y sus tipos que un objeto debe tener, sin proporcionar la implementación.
Nos ayudan a verificar que los objetos sigan un tipo coherente.

En el caso de tener en una interface *objetos anidados* como en el siguiente ejemplo: 

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

Por otra parte el valor isAlive al tener el *?* le estamos diciendo a typescript ese valor puede venir dentro del objeto como no podría venir, es decir, *es opcional*.

#### Cual es la ventaja de tipar un objeto? 

Si queremos desestructurar sus propiedades y queremos tomar algunas de sus propiedades, dentro de la llaves oprimimos la barra espaciador y tenemos todo a la mano 

```js
const {} = person;
```