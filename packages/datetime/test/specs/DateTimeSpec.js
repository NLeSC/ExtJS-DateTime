describe('NLeSC.ee.form.field.DateTime', function() {
    'use strict';

    var instance = null, esj = ExtSpec.Jasmine;

    function mockDateField() {
        return jasmine.createSpyObj('dateField', ['focus', 'setValue', 'setMaxValue', 'setMinValue']);
    }

    beforeEach(function() {
        this.addMatchers(esj.Matchers);
        instance = ExtSpec.create('NLeSC.ee.form.field.DateTime', function() {
            this.callParent = jasmine.createSpy('callParent');
            ExtSpec.Jasmine.createConfigSpies(this);
        });
    });

    describe("focus", function() {
        beforeEach(function() {
            instance.dateField = mockDateField();
        });

        it('focuses date field', function() {

            instance.focus();

            expect(instance.dateField.focus).toHaveBeenCalled();
        });
    });

    describe("getValue", function() {
        beforeEach(function() {
            instance.getFormat = function() {return 'c';};
        });

        it('Returns null when date and time are not set', function() {
            instance.dateField = {getSubmitValue: function() {return null;}};
            instance.timeField = {getSubmitValue: function() {return null;}};

            var value = instance.getValue();

            expect(value).toBeNull();
        });

        it('returns datetime when date and time are set', function() {
            Ext.Date = {parse: function() {}};
            spyOn(Ext.Date, 'parse').andReturn('1234');
            instance.dateField = {getSubmitValue: function() {return "2013-08-26";}};
            instance.timeField = {getSubmitValue: function() {return "12:34:57";}};

            var value = instance.getValue();

            expect(value).toBe('1234');
            expect(Ext.Date.parse).toHaveBeenCalledWith('2013-08-26T12:34:57', 'c');
        });
    });

    describe('getSubmitValue', function() {
        it('returns null when getValue() returns null', function() {
            instance.getValue = function() {return null; };

            var value = instance.getSubmitValue();

            expect(value).toBeNull();
        });
    });

    describe('setValue', function() {
        beforeEach(function() {
            instance.dateField = mockDateField();
            instance.timeField = jasmine.createSpyObj('timeField', ['setValue']);
            instance.syncValue = jasmine.createSpy('syncValue');
        });

        it('set fields when value is a Date object', function() {
            Ext.isString = function() { return false; };

            var dt = new Date('2013-08-26T12:34:57Z');
            instance.setValue(dt);

            expect(instance.dateField.setValue).toHaveBeenCalledWith(dt);
            expect(instance.timeField.setValue).toHaveBeenCalledWith(dt);
            expect(instance.syncValue).toHaveBeenCalledWith();
        });

        it('set fields when value is a string', function() {
            Ext.isString = function() { return true; };
            Ext.Date = {parse: function() {}};
            spyOn(Ext.Date, 'parse').andReturn('1234');

            var dt = '2013-08-26T12:34:57Z';
            instance.setValue(dt);

            expect(instance.dateField.setValue).toHaveBeenCalledWith('1234');
            expect(instance.timeField.setValue).toHaveBeenCalledWith('1234');
            expect(instance.syncValue).toHaveBeenCalledWith();
        });
    });

    it('setMaxValue', function() {
        instance.dateField = mockDateField();

        var dt = new Date('2013-08-26T12:34:57Z');
        instance.setMaxValue(dt);

        expect(instance.dateField.setMaxValue).toHaveBeenCalledWith(dt);
    });

    it('setMinValue', function() {
        instance.dateField = mockDateField();

        var dt = new Date('2013-08-26T12:34:57Z');
        instance.setMinValue(dt);

        expect(instance.dateField.setMinValue).toHaveBeenCalledWith(dt);
    });
});