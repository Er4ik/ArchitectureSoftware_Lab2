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
        if (!this.head) return;

        const value = this.get(index);

        if (index === 0) {
            [this.head, value.next.previous] = [value.next, null];
            return value;
        }

        if (index === this.length() - 1) {
            [this.tail, value.previous.next] = [value.previous, null];

            return value;
        }

        [value.previous.next, value.next.previous] = [value.next, value.previous];

        return value;
    }

    deleteAll(element) {
        if (!this.head) return;

        let currentValue = this.head;

        for (let counter = 0; counter < this.length(); counter++) {
            if (currentValue.data === element) {
                currentValue = this.delete(counter);

                currentValue = this.head;
                counter = 0;
            }

            currentValue = currentValue.next;
        }

        return;
    }

    clear() {
        this.head.data = null;
        this.tail.data = null;
        [this.head.next, this.tail.previous] = [this.tail, this.head];

        return;
    }

    clone() {
        return new DoublyLinkedList(this.head, this.tail);
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
        const newLinkedList = new DoublyLinkedList();

        for(let counter = 0; counter < linkedList.length(); counter++) {
            newLinkedList.append(linkedList.get(counter).data);
        }

        [this.tail.next, newLinkedList.head.previous, this.tail] = [newLinkedList.head, this.tail, newLinkedList.tail];
        return;
    }
}
