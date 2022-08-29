class Node {
  constructor(data) {
    this.data = data;
    this.index = null;
    this.next = null;
  }

  getData() {
    return this.data;
  }

  getNext() {
    return this.next;
  }

  setData(data) {
    this.data = data;
  }

  setNext(nextNode) {
    this.next = nextNode;
  }

  setIndex(index) {
    this.index = index;
  }

  getIndex() {
    return this.index;
  }
}

class List {
  constructor() {
    this.head = null;
    this.lastNode = null;
  }

  add(item) {
    const newNode = new Node(item);
    newNode.setNext(this.head);
    let current = this.head;
    let index = 0;

    /**
     * 1. siempre el nuevo elemento sera igual a cero
     * 2. crear un while que recorra los elementos existente, comenzando
     *      por la cabeza, de esta forma podemos ir actualizando cada
     *      index de cada nodo, y terminar el proceso next cuando este
     *      sea igual a null
     */

    // --> contiene el nuevo item 7
    // asi que while recorre todos lo elementos antes de que se incorpore el nuevo

    while (current !== null) {
      index = current.getIndex() + 1;
      current.setIndex(index);
      current = current.getNext();
    }

    newNode.setIndex(0);
    this.head = newNode;
  }

  remove(value) {
    let current = this.head; // posicion actual
    let previous = null; // porque el anterior al primero siempre sera null
    let found = false;

    while (!found) {
      /**
       * mientras found sea igual a falso, el recorrido se va
       * a seguir haciendo
       */
      if (current.getData() === value) {
        found = true;
        /**
         * esto solo aplica si la primer posicion
         * es igual al valor adquirido
         */
      } else {
        previous = current;
        current = current.getNext();
        /**
         * las variables se van a ir actualizando
         * hasta que actual (arriba) sea igual al valor
         * establecido
         */
      }
    }

    if (previous === null) {
      this.head = current.getNext();
      /**
       * si el valor anterior al primer elemento
       * es igual a null...
       * primero quedamos seguros de que es el primer elemento
       * segundo, decimos ahora que el primer elemento sera igual al
       * segundo, para que el segundo se convierta en el primero
       */
    } else {
      /**
       * si el anterior es diferente a null entonces es porque
       * ya no estamos eliminando el primer elemento,
       * si no solo un elemento, aun asi, la ejecucion de busqueda
       * ya esta hecha, asi que el else solo es un plus mamon
       */
      previous.setNext(current.getNext());
    }
  }

  getHead() {
    return this.head;
  }

  isEmpty() {
    return this.head === null;
  }

  size() {
    let current = this.head;
    let id = 0;

    /**
     * se inicializara
     */

    while (current !== null) {
      id++;
      current = current.getNext();
    }

    return id;
  }

  search(data) {
    let current = this.head;
    let found = false;

    while (current && !found) {
      if (current.getData() === data) {
        found = true;
      } else {
        current = current.getNextNode();
      }
    }

    return found;
  }

  append(item) {
    /**
     * debemos comenzar con el actual
     */
    let current = this.head; // -> node
    let index = 0;
    // node.next = null;
    let node = new Node(item);

    // ahora debo obtener el ultimo node de la lista

    while (current !== null) {
      current.setIndex(index);
      if (current.getNext() === null) {
        current.setNext(node);
        node.setIndex(index + 1);
        node.setNext(null);
        /**
         * si estoy haciendo un recorrido, quiere decir que tengo acceso a la informacion
         * del nodo, incluyendo al index del ultimo
         */

        current = current.getNext();
      }
      index++;
      current = current.getNext();
    }
  }

  index(item) {
    // ingresaremos el elemento
    let current = this.head;
    let index = null;

    while (current.getData() !== item && current.getNext() !== null) {
      current = current.getNext();
      current.getData() === item
        ? (index = current.getIndex())
        : (index = null);
    }

    if (current.getData() === item) {
      return current.getIndex();
    } else if (index === null) {
      return "no existe el item";
    } else {
      return index;
    }
  }

  insert(pos, item) {
    let current = this.head;
    let newNode = new Node(item); // iniciamos un nuevo node con el item ya designado
    let auxNode = this.head,
      id = 0, // debemos modificar index para los nodos posteriores del nodo encontrado
      previous = null;
    /**
     * 1. debemos buuscar la posicion, si la posicion no existe, no insertar nada
     * 2. si la posicion existe, entonces tomar la posicion y guardarla en una variable auxNode,
     *      seguido tener una variable previous, la cual guardara una posicion anterior a la
     *      actual, de esta forma, haremos que la previa apunte a un newNode y newNode apunte a
     *      actual
     * 3. utilicemos a while para modificar index, ya que este avanza hasta el ultimo elementos
     *      aprovechemos a while para estas dos ejecuciones
     */

    while (current !== null) {
      previous = auxNode;
      auxNode = current;
      if (pos === 0 && id === 0) {
        newNode.setIndex(0);
        newNode.setNext(current); // --> this.head
        this.head = newNode;
        id = current.getIndex() + 1;
      }
      if (pos === current.getIndex() && pos !== 0) {
        console.log(`existe ${current.getIndex()} dato ${current.getData()}`);
        newNode.setIndex(current.getIndex()); // nuevo Nodo tiene el id actual
        newNode.setData(item);
        newNode.setNext(current);
        previous.setNext(newNode);
        current.setIndex(current.getIndex() + 1);
        id = current.getIndex();
      }
      current.setIndex(id);
      id = id + 1;
      current = current.getNext();
    }
  }

  pop() {
    /**
     * 1. Guardar un anterior
     * 2. Cuando next apunte a siguiente, guardar el valor y hacer que anterior apunte a null
     *      removiendo y salvando el ultimo elemento
     */
    // elimina y devuelve el último ítem de la lista.
    let current = this.head,
      previous = null,
      auxNode = null,
      item = null;

    while (current !== null) {
      previous = auxNode; // ya tengo control sobre previous
      auxNode = current;
      if (current.getNext() === null) {
        item = current;
        previous.setNext(null);
      }
      current = current.getNext();
    }

    return item.getData();
  }

  position(position) {
    // elimina y devuelve el ítem en la posición indicada
    let current = this.head,
      previous = this.head,
      auxNode = null,
      active = true,
      item = null,
      index = 0;

    if (position === 0) {
      this.head = current.getNext();
      current = this.head;
    }

    while (current !== null) {
      previous = auxNode;
      auxNode = current;
      if (position === current.getIndex() && position !== 0 && active) {
        item = current;
        current = current.getNext();
        previous.setNext(current);
        index = current.getIndex() - 1;
        active = false;
      }
      current.setIndex(index);
      index = index + 1;
      current = current.getNext();
    }

    return item.getData();
  }
}

const list = new List();
list.add(5);
list.add(7);
list.add(8);
list.add(13);
list.add(32);

console.log(list.getHead());
