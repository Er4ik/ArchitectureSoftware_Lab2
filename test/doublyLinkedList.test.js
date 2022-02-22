const { DoublyLinkedList } = require("../src/doublyLinkedList");

const mockTestData = {
    clearList: { head: null, tail: null },
    appendToList: {
        head: { data: 'test', previous: null, next: null },
        tail: null
    },
    getByIndex: { data: "test", previous: null, next: null },
    deleteByIndex: { data: "test", previous: null, next: null },
    
};

describe("Doubly linked list", () => {
    it("Create doubly linked list", () => {
        expect(new DoublyLinkedList()).toEqual(mockTestData.clearList);
    });

    it("The operation of adding an item to the end of the list.", () => {
        const list = new DoublyLinkedList();

        expect(list.append("test")).toBe();
        expect(list).toEqual(mockTestData.appendToList);
    });
    
    it("The operation of get an item from the list by index.", () => {
        const list = new DoublyLinkedList();
        list.append("test");

        expect(list.get(0)).toEqual(mockTestData.getByIndex);
    });
    
    it("The operation of insert an item to the list by index", () => {
        const list = new DoublyLinkedList();
        list.append("test");

        expect(list.insert("test2", 0)).toBe();
        expect(list.findFirst("test2")).toEqual(0);
    });

    it("The operation of delete an item from list by index", () => {
        const list = new DoublyLinkedList();
        list.append("test");

        expect(list.delete(0)).toEqual(mockTestData.deleteByIndex);
    });

    it("The operation of delete all items from list that the same", () => {
        const list = new DoublyLinkedList();
        list.append("test");
        list.append("test");
        list.append("test2");

        expect(list.deleteAll("test")).toBe();
        expect(list.length()).toEqual(1);
        expect(list.findFirst("test2")).toEqual(0);
    });

    it("The operation of delete all items from list", () => {
        const list = new DoublyLinkedList();
        list.append("test");
        list.append("test2");

        expect(list.clear()).toBe();
        expect(list).toEqual(mockTestData.clearList);
    });

    it("The operation of clone list", () => {
        const list = new DoublyLinkedList();
        list.append("test");
        list.append("test2");
        
        const newList = list.clone();

        expect(newList).toEqual(list);
    });

    it("The operation of reverse list", () => {
        const list = new DoublyLinkedList();
        list.append("test");
        list.append("test2");

        expect(list.reverse()).toBe();
        expect(list.findFirst('test')).toEqual(1)
        expect(list.findFirst("test2")).toEqual(0);
    });

    it("The operation of find first item in list by left side", () => {
        const list = new DoublyLinkedList();
        list.append("test");
        list.append("test");

        expect(list.findFirst("test")).toEqual(0);
    });

    it("The operation of find first item in list by right side", () => {
        const list = new DoublyLinkedList();
        list.append("test");
        list.append("test");

        expect(list.findLast("test")).toEqual(1);
    });

    it("The operation of extend lists", () => {
        const list = new DoublyLinkedList();
        const newList = new DoublyLinkedList();
        list.append("test");
        list.append("test");
        newList.append("test1");
        newList.append("test1");
        list.extend(newList);
        newList.clear();

        expect(list.length()).toEqual(3);
        expect(list.findFirst("test1")).toEqual(1);
    });
});