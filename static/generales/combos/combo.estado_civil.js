Ext.define('combos.estado_civil', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.combos.estado_civil',
    name: 'estado_civil',
    fieldLabel: '',
    valueField: 'valor',
    displayField: 'display',
    loadingText: 'Cargando...',
    queryMode: 'local',
    msgTarget: 'side',
    emptyText: 'Seleccionar…',
    initComponent: function() {
        this.store = Ext.create('Ext.data.Store', {
            fields: ['valor', 'display'],
            data: [{
                valor: 1,
                display: 'SOLTERO'
            }, {
                valor: 2,
                display: 'CASADO'
            }, {
                valor: 3,
                display: 'VIUDO'
            }, {
                valor: 4,
                display: 'DIVORCIADO'
            }]
        });
        this.callParent(arguments);
    }
});