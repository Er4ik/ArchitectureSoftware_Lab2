class Node {
    constructor(data, previous, next = null) {
        this.data = data;
        this.previous = previous;
        this.next = next;
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    get(index) {
        let currentValue = this.head;

        for (let counter = 0; counter !== index; counter++) {
            currentValue = currentValue.next;
        }

        return currentValue;
    }

    length() {
        let currentValue = this.head;
        let counterSizeList = 0;

        while (currentValue) {
            counterSizeList++;
            currentValue = currentValue.next;
        }

        return counterSizeList;
    }

    append(data) {
        const node = new Node(data, this.tail);

        if (this.tail) {
            this.tail.next = node;
        }

        if (!this.head) {
            this.head = node;
        }

        this.tail = node;

        return;
    }

    insert(data, index) {
        if (index === this.length()) {
            this.append(data);

            return;
        }

        if (index === 0) {
            const node = new Node(data, null, this.head);
            this.head = node;

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
    }

    delete(index) {
        const value = this.get(index);

        [value.previous.next, value.next.previous] = [value.next, value.previous];

        return value;
    }

    // deleteAll(element) {
    //     let currentValue = this.head;

    //     for(let counter = 0; counter < this.length(); counter++) {
            
    //         this.delete(counter);
            
    //         currentValue = currentValue.next;
    //     }

    //     [value.previous.next, value.next.previous] = [value.next, value.previous];

    //     return value;
    // }

    clear() {
        this.head.data = null;
        this.tail.data = null;
        [this.head.next, this.tail.previous] = [this.tail, this.head];

        return;
    }
}

const list = new DoublyLinkedList();

list.append('Ervin');
list.append("Osmanov");
list.append("Nice");

list.insert('hi', 1);

// list.deleteAll('Ervin');

console.log(list);