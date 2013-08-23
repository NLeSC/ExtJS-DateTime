describe('NLeSC.form.field.DateTime', function() {
    'use strict';

    var instance, esj = ExtSpec.Jasmine;

    beforeEach(function() {
        this.addMatchers(esj.Matchers);
        instance = ExtSpec.create('NLeSC.form.field.DateTime', function() {
            this.callParent = jasmine.createSpy('callParent');
            ExtSpec.Jasmine.createConfigSpies(this);
        });
    });

    describe("focus", function() {
        beforeEach(function() {
            instance.dateField = jasmine.createSpyObj('dateField', ['focus']);
        });
        
        it('focuses date field', function() {

            instance.focus();

            expect(instance.dateField.focus).toHaveBeenCalled();
        });
    });
});
