class MySet {
    constructor(value) {
        if (new.target === 'undefined') {
        }

        this._initSet(value ?? []);
        this._initSize();

        this[Symbol.toStringTag] = '^_^';
    }

    _isIterable(value) {
        if (value === null && value === undefined) {
          return false;
        }
        return typeof value[Symbol.iterator] === 'function';
      }

    _initSet(value) {
        if (this._isIterable(value)) {
            this.clear();
            for (const item of value) {
                this.add(item);
            }
        } else {
            throw new Error('Внесенное значение неитерируемо!');
        }
    }

    _initSize() {
        this.size = this.iterableValues.length;
    }

    *[Symbol.iterator]() {
        for (const item of this.iterableValues) {
            yield item;
        }
    }

    entries() {
        const self = this;
        const generator = function* () {
            for (const item of self.iterableValues) {
                yield [item, item];
            }
        };
        return generator();
    }

    values() {
        const self = this;
        const generator = function* () {
            for (const item of self.iterableValues) {
                yield item;
            }
        };
        return generator();
    }

    keys() { return this.values(); }

    clear() {
        this.iterableValues = [];
        this._initSize();
    }

    add(value) {
        if (!this.iterableValues.includes(value)) {
            this.iterableValues.push(value);
        }
        return this;
    }

    delete(value) {
        const index = this.iterableValues.indexOf(value);

        if (index === -1) {
            return false;
        } else {
            this.iterableValues.splice(index, 1);
            return true;
        }
    }

    has(value) {
        return this.iterableValues.includes(value);
    }

    getValue() {
        this.value;
    }

    forEach(callback, data) {
        for (const self of this) {
            callback.call(data, self);
        }
    }
};

module.exports = MySet;