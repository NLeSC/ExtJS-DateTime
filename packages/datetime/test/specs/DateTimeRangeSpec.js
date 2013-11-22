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
describe('NLeSC.form.field.DateTimeRange', function() {
    'use strict';

    var instance = null, esj = ExtSpec.Jasmine;

    function mockDateTimeField() {
        return jasmine.createSpyObj('datetimeField', ['on', 'setValue', 'setMaxValue', 'setMinValue']);
    }

    beforeEach(function() {
        this.addMatchers(esj.Matchers);
        instance = ExtSpec.create('NLeSC.form.field.DateTimeRange', function() {
            this.callParent = jasmine.createSpy('callParent');
            ExtSpec.Jasmine.createConfigSpies(this);
        });
    });

    describe('getters', function() {
        beforeEach(function() {
            instance.items = ['12345', '67890'];
            instance.items.getAt = function(key) {
              return this[key];
            };
        });

        it('getStartField', function() {
            expect(instance.getStartField()).toBe('12345');
        });

        it('getEndField', function() {
            expect(instance.getEndField()).toBe('67890');
        });
    });

    describe('methods', function() {
        var startField, endField;
        beforeEach(function() {
            startField = mockDateTimeField();
            endField = mockDateTimeField();
            instance.getStartField = function() {return startField;};
            instance.getEndField = function() {return endField;};
        });

        it('afterComponentLayout', function() {
            startField.getValue = function() { return '12345'; };
            endField.getValue = function() { return '67890'; };

            instance.afterComponentLayout();

            expect(endField.setMinValue).toHaveBeenCalledWith('12345');
            expect(endField.on).toHaveBeenCalledWith('change', instance.setMaxStart, instance);
            expect(startField.setMaxValue).toHaveBeenCalledWith('67890');
            expect(startField.on).toHaveBeenCalledWith('change', instance.setMinEnd, instance);
        });

        it('setMinEnd', function() {
            instance.setMinEnd(null, '12345');

            expect(endField.setMinValue).toHaveBeenCalledWith('12345');
        });

        it('setMaxStart', function() {
            instance.setMaxStart(null, '67890');

            expect(startField.setMaxValue).toHaveBeenCalledWith('67890');
        });
    });
});