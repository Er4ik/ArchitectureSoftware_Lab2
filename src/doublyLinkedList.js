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
        if (!this.head) return;

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
        let currentValue = this.head;

        if (!this.head) {
            this.head = node;
            return;
        }

        while (currentValue.next) {
            currentValue = currentValue.next;
        }

        [currentValue.next, this.tail] = [node, node]
        this.tail.previous = currentValue;

        return;
    }

    insert(data, index) {
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
        console.log('test');
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
            if(value.previous !== this.head) {
                [this.tail, value.previous.next] = [value.previous, null];
            } else {
                [this.tail, value.previous.next] = [null, this.tail];
            }

            return value;
        }

        [value.previous.next, value.next.previous] = [value.next, value.previous];

        return value;
    }

    deleteAll(element) {
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
    }

    clear() {
        this.head = null;
        this.tail = null;

        return;
    }

    clone(linkedList = this) {
        const newLinkedList = new DoublyLinkedList();

        for (let counter = 0; counter < linkedList.length(); counter++) {
            newLinkedList.append(linkedList.get(counter).data);
        }
        
        return newLinkedList;
    }

    reverse() {
        if (!this.head) return;

        let currentValue = this.head;
        while (currentValue) {
            [currentValue.next, currentValue.previous] = [currentValue.previous, currentValue.next];
            currentValue = currentValue.previous;
        }

        [this.head, this.tail] = [this.tail, this.head];

        return;
    }

    findFirst(element) {
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
    }

    findLast(element) {
        if (!this.head) return;

        let currentValue = this.tail;

        for (let counter = this.length() - 1; counter > 0; counter--) {
            if (currentValue.data === element) return counter;
            currentValue = currentValue.previous;
        }

        return -1;
    }

    extend(linkedList) {
        if (!linkedList.head) return;
        const newLinkedList = this.clone(linkedList);

        [this.tail.next, newLinkedList.head.previous, this.tail] = [newLinkedList.head, this.tail, newLinkedList.tail];
        return;
    }
}

module.exports = { DoublyLinkedList };