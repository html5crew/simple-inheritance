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
            clutch: false,
            drive: function () {
                this.clutch = true;
            },
            brake: function () {
                this.clutch = false;
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
            }
        });
        var Hyunki = HybridCar.extend({
            deployAirbag: function () {
                throw 'collision angle faults';
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

});