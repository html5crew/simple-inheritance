/*global beforeEach, afterEach, describe, expect, it, spyOn, xdescribe, xit */

describe('simple javascript inheritance', function () {

    describe('define class', function () {
        var MyClass = Class.extend({
            init: function () {
                this.isInitialized = true;
            },
            hello: function (name) {
                return 'Hello ' + name;
            }
        });

        var instance = null;

        beforeEach(function () {
            instance = new MyClass();
        });

        it('instanceof', function () {
            expect(instance instanceof MyClass).toBeTruthy();
        });

        it('constructor', function () {
            expect(instance.isInitialized).toBeTruthy();
        });

        it('method', function () {
            expect(new MyClass().hello('Class')).toBe('Hello Class');
        });
    });

    describe('extend class', function () {
        var Car = Class.extend({
            init: function () {
                this.message = "this is car";
            },
            clutch: false,
            drive: function () {
                this.clutch = true;
            },
            brake: function () {
                this.clutch = false;
            },
            getName: function () {
                return "Car";
            }
        });
        var HybridCar = Car.extend({
            isAirbagDeployed: false,
            deployAirbag: function () {
                this.isAirbagDeployed = true;
            },
            brake: function () {
                this.clutch = false;
                this.chargeBattery();
            },
            chargeBattery: function () {
                // 'charging...'
            },
            getName: function () {
                return "HybridCar";
            }
        });
        var Hyunki = HybridCar.extend({
            deployAirbag: function () {
                throw 'collision angle faults';
            },
            getName: function () {
                return "Hyunki";
            }
        });

        it('instanceof', function () {
            var sonata = new Hyunki();
            expect(sonata instanceof Hyunki).toBeTruthy();
            expect(sonata instanceof HybridCar).toBeTruthy();
            expect(sonata instanceof Car).toBeTruthy();
        });

        it('override method', function () {
            var sonata = new Hyunki();
            expect(function () { sonata.deployAirbag(); }).toThrow();
        });

        it('call super method', function () {
            var sonata = new Hyunki();
            sonata.drive();
            expect(sonata.clutch).toBeTruthy();
            sonata.brake();
            expect(sonata.clutch).toBeFalsy();
        });
    });

    describe('method of super class', function () {
        var Animal = Class.extend({
            init: function () {
                this.message = "Animal";
            },
            getSpecies: function () {
                return "Animal";
            }
        });

        it('don\'t change after extension', function () {
            var animal1 = new Animal();
            expect(animal1.getSpecies()).toBe("Animal");

            var Dog = Animal.extend({
                getSpecies: function () {
                    return "Dog";
                }
            });

            var animal2 = new Animal();
            var chihuahua = new Dog();

            expect(animal2.getSpecies()).toBe("Animal");
            expect(chihuahua.getSpecies()).toBe("Dog");
        });
    });

});