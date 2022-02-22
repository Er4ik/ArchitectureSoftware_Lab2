class Node {
    constructor(data, previous, next = null) {
        this.data = data;
        this.previous = previous;
        this.next = next;
    }
}

class DoublyLinkedList {
    constructor(head = null, tail = null) {
        this.head = head;
        this.tail = tail;
    }

    get(index) {
        try {
            if (!this.head) return;

            let currentValue = this.head;

            for (let counter = 0; counter !== index; counter++) {
                currentValue = currentValue.next;
            }

            return currentValue;
        } catch (error) {
            throw new Error(`Error get item from list ----> ${error}`);
        }
    }

    length() {
        try {
            let currentValue = this.head;
            let counterSizeList = 0;

            while (currentValue) {
                counterSizeList++;
                currentValue = currentValue.next;
            }

            return counterSizeList;
        } catch (error) {
            throw new Error(`Error check length of list ----> ${error}`);
        }

    }

    append(data) {
        try {
            const node = new Node(data, this.tail);
            let currentValue = this.head;

            if (!this.head) {
                this.head = node;
                return;
            }

            while (currentValue.next) {
                currentValue = currentValue.next;
            }

            [currentValue.next, this.tail] = [node, node];
            this.tail.previous = currentValue;

            return;   
        } catch (error) {
            throw new Error(`Error append item to list ----> ${error}`);
        }
    }

    insert(data, index) {
        try {
            if (index === this.length()) {
                this.append(data);

                return;
            }

            if (index === 0 && this.length() === 1) {
                this.tail = this.get(index);

                const node = new Node(data, null, this.tail);

                this.tail.previous = node;
                this.head = node;

                return;
            }

            if (index === 0) {
                const node = new Node(data, null, this.head);
                [this.head, node.next.previous] = [node, node];

                return;
            }

            const currentValue = this.get(index);
            const node = new Node(data, currentValue.previous, currentValue);
            [currentValue.previous.next, node.previous, node.next, node.next.previous] = [
                node,
                currentValue.previous,
                currentValue,
                node,
            ];

            return;
        } catch (error) {
            throw new Error(`Error insert item to list ----> ${error}`);
        }
    }

    delete(index) {
        try {
            if (!this.head) return;

            const value = this.get(index);

            if (index === 0 && this.length() === 1) {
                [this.head, this.tail] = [null, null];

                return value;
            }

            if (index === 0 && this.length() > 1) {
                [this.head, value.next.previous] = [value.next, null];

                return value;
            }

            if (index === this.length() - 1) {
                if (value.previous !== this.head) {
                    [this.tail, value.previous.next] = [value.previous, null];
                } else {
                    [this.tail, value.previous.next] = [null, this.tail];
                }

                return value;
            }

            [value.previous.next, value.next.previous] = [value.next, value.previous];

            return value;   
        } catch (error) {
            throw new Error(`Error delete item from list ----> ${error}`);
        }
    }

    deleteAll(element) {
        try {
            if (!this.head) return;

            let currentValue = this.head;

            for (let counter = 0; counter < this.length(); counter++) {
                if (!this.length()) {
                    this.head = null;
                    this.tail = null;
                    return;
                }

                if (currentValue.data === element) {
                    this.delete(counter);
                    currentValue = this.head;
                    counter = -1;
                } else currentValue = currentValue.next;
            }

            return;   
        } catch (error) {
            throw new Error(`Error delete items like "${element}" ----> ${error}`);
        }
    }

    clear() {
        try {
            this.head = null;
            this.tail = null;

            return;
        } catch (error) {
            throw new Error(`Error clear list ----> ${error}`);
        }

    }

    clone(linkedList = this) {
        try {
            const newLinkedList = new DoublyLinkedList();

            for (let counter = 0; counter < linkedList.length(); counter++) {
                newLinkedList.append(linkedList.get(counter).data);
            }

            return newLinkedList;   
        } catch (error) {
            throw new Error(`Error clone list ----> ${error}`);
        }
    }

    reverse() {
        try {
            if (!this.head) return;

            let currentValue = this.head;
            while (currentValue) {
                [currentValue.next, currentValue.previous] = [currentValue.previous, currentValue.next];
                currentValue = currentValue.previous;
            }

            [this.head, this.tail] = [this.tail, this.head];

            return;
        } catch (error) {
            throw new Error(`Error reverse list ----> ${error}`);
        }
 
    }

    findFirst(element) {
        try {
            if (!this.head) return;

            let currentValue = this.head;

            if (!this.head) {
                return -1;
            }

            for (let counter = 0; counter < this.length(); counter++) {
                if (currentValue.data === element) return counter;
                currentValue = currentValue.next;
            }

            return -1;   
        } catch (error) {
            throw new Error(`Error find first item in list ----> ${error}`);
        }
    }

    findLast(element) {
        try {
            if (!this.head) return;

            let currentValue = this.tail;

            for (let counter = this.length() - 1; counter > 0; counter--) {
                if (currentValue.data === element) return counter;
                currentValue = currentValue.previous;
            }

            return -1;
        } catch (error) {
            throw new Error(`Error find item in list ----> ${error}`);
        }
    }

    extend(linkedList) {
        try {
            if (!linkedList.head) return;
            const newLinkedList = this.clone(linkedList);

            [this.tail.next, newLinkedList.head.previous, this.tail] = [
                newLinkedList.head,
                this.tail,
                newLinkedList.tail,
            ];
            return;   
        } catch (error) {
            throw new Error(`Error extend list ----> ${error}`);
        }
    }
}

module.exports = { DoublyLinkedList };