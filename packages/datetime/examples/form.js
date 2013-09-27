Ext.require([ 'Ext.form.Panel', 'NLeSC.form.field.DateTime',
    'NLeSC.form.field.DateTimeRange' ]);

Ext.onReady(function() {
    Ext.tip.QuickTipManager.init();

    Ext.create('Ext.form.Panel', {
        title : 'Date Time',
        width : 340,
        bodyPadding : 10,
        height : 100,
        renderTo : 'dt1',
        fieldDefaults : {
            labelAlign : 'left',
            labelWidth : 40,
            anchor : '100%'
        },
        items : [ {
            xtype : 'xdatetime',
            name : 'when',
            fieldLabel : 'When',
            value : '2013-01-01T12:00:00Z'
        } ],
        buttons : [ {
            text : 'Submit',
            handler : function() {
                var form = this.up('form').getForm();
                Ext.MessageBox.show({
                    title : 'Submitted values',
                    msg : 'Submitted form with following values',
                    width : 300,
                    buttons : Ext.MessageBox.OKCANCEL,
                    multiline : true,
                    value : Ext.JSON.encode(form.getValues())
                });
            }
        } ]
    });

    Ext.create('Ext.form.Panel', {
        title : 'Date Time Range',
        width : 340,
        bodyPadding : 10,
        height : 120,
        renderTo : 'dt1',
        fieldDefaults : {
            labelAlign : 'left',
            labelWidth : 40,
            anchor : '100%'
        },
        items : [ {
            xtype : 'datetimerange'
        } ],
        buttons : [ {
            text : 'Submit',
            handler : function() {
                var form = this.up('form').getForm();
                Ext.MessageBox.show({
                    title : 'Submitted values',
                    msg : 'Submitted form with following values',
                    width : 300,
                    buttons : Ext.MessageBox.OKCANCEL,
                    multiline : true,
                    value : Ext.JSON.encode(form.getValues())
                });
            }
        } ]
    });
});