Ext.onReady(function() {
    
    var columnas = [{
        header: 'id',
        dataIndex: 'id',
        hidden: false,
        hideable: false,
    }, {
        header: 'Nombre',
        dataIndex: 'nombre',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        editor: {
            xtype: 'textfield',
            id: 'nombre'
        }
    }, {
        header: 'Edad',
        dataIndex: 'edad',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        editor: {
            xtype: 'textfield',
            id: 'edad',
            maskRe: /[-0-9.]/
        }
    }, {
        header: 'Fecha nacimiento',
        dataIndex: 'fecha_nacimiento',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        submitFormat: 'Y-m-d',
        editor: {
            xtype: 'datefield',
            id: 'fecha_nacimiento',
        },
        renderer: Ext.util.Format.dateRenderer('d-m-Y')
    }, {
        header: 'Hora nacimiento',
        dataIndex: 'hora_nacimiento',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        submitFormat: 'H:i',
        format: 'H:i',
        minValue: '00:00',
        maxValue: '23:30',
        increment: 15,
        editor: {
            xtype: 'timefield',
            id: 'hora_nacimiento'
        }
    }, {
        header: 'Estado civil',
        dataIndex: 'estado_civil',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        editor: {
            xtype: 'combos.estado_civil',
            id: 'estado_civil'
        }
    }];

    grid = Ext.define('grid_personas', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.grid_personas',
        id: 'grid_personas',
        columns: columnas,
        initComponent: function(){

            if(typeof(this.store) == "undefined"){            
                this.store = 'store.personas'         
            } 
            
            /*this.dockedItems = [{
                xtype   : 'toolbar_empresas',
                position: 'bottom'
            }, libreria.nuevoPaginado({
                store: this.store,
                pageSize: paginado
            })];*/

            this.plugins = [Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToMoveEditor: 1,
                autoCancel: false,
                listeners: {
                    beforeedit: function(oEditor, oOptions) {},
                    afteredit: function(oEditor, oOptions) {
                        grid_personas = Ext.getCmp('grid_personas');
                        persona_seleccionada = libreria.gridRegistrosSeleccionados(grid_personas);
                        //editarPruebaCalidadAsignada(pruebaSeleccionada[0].data)
                        console.log(persona_seleccionada)
                    }
                }
            })]


            this.selModel = Ext.create('Ext.selection.RowModel', {
                allowDeselect: true
            })

            this.callParent(arguments);        
        }
    })

});