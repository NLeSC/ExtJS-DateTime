/*
 * Copyright 2013 Netherlands eScience Center
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
describe('NLeSC.form.field.DateTime', function() {
    'use strict';

    var instance = null, esj = ExtSpec.Jasmine;

    function mockDateField() {
        return jasmine.createSpyObj('dateField', ['focus', 'setValue', 'setMaxValue', 'setMinValue']);
    }

    beforeEach(function() {
        this.addMatchers(esj.Matchers);
        instance = ExtSpec.create('NLeSC.form.field.DateTime', function() {
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
        it('Returns null when date and time are not set', function() {
            instance.dateField = {getValue: function() {return null;}};
            instance.timeField = {getValue: function() {return null;}};

            var value = instance.getValue();

            expect(value).toBeNull();
        });

        it('returns datetime when date and time are set', function() {
            instance.dateField = {getValue: function() {return new Date('2013-08-26T00:00:00Z');}};
            instance.timeField = {getValue: function() {return new Date('1997-02-21T12:34:57Z');}};

            var value = instance.getValue();

            var expected = new Date('2013-08-26T12:34:57Z');
            expect(value.getTime()).toBe(expected.getTime());
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

    describe('getFormat', function() {
        it('should use datefield.format+"T"+timefield.format', function() {
            instance.dateField = {format: 'Y-m-d'};
            instance.timeField = {format: 'H:i:s'};

            var value = instance.getFormat();

            expect(value).toEqual('Y-m-dTH:i:s');
        });

        it('should use datefield.submitFormat+"T"+timefield.submitFormat', function() {
           instance.dateField = {submitFormat: 'Y-m-d'};
           instance.timeField = {submitFormat: 'H:i:s'};

           var value = instance.getFormat();

           expect(value).toEqual('Y-m-dTH:i:s');
       });
    });

    describe('getErrors', function() {
        var dateErrors = [];
        var timeErrors = [];

        beforeEach(function() {
            dateErrors = [];
            timeErrors = [];
            instance.vtype = 'daterange';
            instance.dateField = {
                getErrors: function() {
                    return dateErrors;
                }
            };
            instance.timeField = {
                getErrors: function() {
                    return timeErrors;
                }
            };
            instance.getValue = function() {
                return '2013-08-26T12:34:57Z';
            };
            Ext.form = {
                field: {
                    VTypes: {
                        daterange : function(val, field) { return true;},
                        daterangeText : 'Start date must be less than end date'
                    }
                }
            };
        });

        it('should return no errors without a vtype', function() {
            instance.vtype = null;
            var errors = instance.getErrors();

            expect(errors).toEqual([]);
        });

        it('should return date and time errors', function() {
            dateErrors = ['Invalid date format'];
            timeErrors = ['Invalid time format'];

            var errors = instance.getErrors();

            expect(errors).toEqual([
                'Invalid date format',
                'Invalid time format'
            ]);
        });


        it('should return no errors with a vtype', function() {
            spyOn(Ext.form.field.VTypes, 'daterange').andReturn(true);

            var errors = instance.getErrors();

            expect(errors).toEqual([]);
        });

        it('should return vtype error', function() {
            spyOn(Ext.form.field.VTypes, 'daterange').andReturn(false);

            var errors = instance.getErrors();

            expect(errors).toEqual(['Start date must be less than end date']);
        });
    });
});
