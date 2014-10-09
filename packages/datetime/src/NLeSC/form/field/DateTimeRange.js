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
/**
 * Date time range.
 *
 * Combine 2 date time components which are each others max and min.
 *
 *     @example
 *     Ext.create('Ext.form.Panel', {
 *         title: 'Time Range',
 *         width: 340,
 *         bodyPadding: 10,
 *         height: 400,
 *         renderTo: Ext.getBody(),
 *         fieldDefaults: {
 *             labelAlign: 'left',
 *             labelWidth: 40,
 *             anchor: '100%'
 *         },
 *         items: [{
 *             xtype: 'datetimerange'
 *        }]
 *     });
 */
Ext.define('NLeSC.form.field.DateTimeRange', {
    extend: 'Ext.form.FieldContainer',
    requires: ['NLeSC.form.field.DateTime'],
    alias: 'widget.datetimerange',
    layout: 'vbox',
    defaultType: 'xdatetime',
    defaults: {
        allowBlank: false
    },
    items: [{
        fieldLabel: 'Start',
        value: new Date(new Date().setUTCHours(0,0,0,0)-(1000*60*60*24*3)), // now - 3 days
        name: 'start'
    }, {
        fieldLabel: 'End',
        value: new Date(new Date().setUTCHours(0,0,0,0)), // date without time now
        name: 'end'
    }],
    getStartField: function() {
        return this.items.getAt(0);
    },
    getEndField: function() {
        return this.items.getAt(1);
    },
    afterComponentLayout: function() {
        var startField = this.getStartField();
        var endField = this.getEndField();

        this.setMinEnd(startField, startField.getValue());
        startField.on('change', this.setMinEnd, this);

        this.setMaxStart(endField, endField.getValue());
        endField.on('change', this.setMaxStart, this);
    },
    setMinEnd: function(startField, value) {
        var endField = this.getEndField();
        endField.setMinValue(value);
    },
    setMaxStart: function(endField, value) {
        var startField = this.getStartField();
        startField.setMaxValue(value);
    }
});