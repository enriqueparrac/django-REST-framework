Ext.onReady(function() {
    
    //*** Inicio Modelo Orden Trabajo
    Ext.define('modelo_persona', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'id',
            type: 'integer'
        }, {
            name: 'nombre',
            type: 'string'
        }, {
            name: 'estado_civil',
            type: 'integer'
        }]
    });

    var columnas = [{
        header: 'id',
        dataIndex: 'id',
        hidden: false,
        hideable: false
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
            maskRe: /[-0-9]/
        }
    }, {
        header: 'Estatura',
        dataIndex: 'estatura',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        editor: {
            xtype: 'textfield',
            id: 'estatura',
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
        renderer: function(val) {
            var dt = Ext.Date.parse(val, "Y-m-d");
            return Ext.util.Format.date(dt, "d/m/Y");
        }
    }, {
        header: 'Hora nacimiento',
        dataIndex: 'hora_nacimiento',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        submitFormat: 'H:i',
        editor: {
            xtype: 'timefield',
            id: 'hora_nacimiento',
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
        },
        renderer: function (val){
            switch (val){
                case 1:
                    return 'SOLTERO';
                    break
                case 2:
                    return 'CASADO';
                    break
                case 3:
                    return 'VIUDO';
                    break
                case 4:
                    return 'DIVORCIADO'
            }
        }
    }];

    var fields = [];
    
    Ext.each(columnas, function(g, index) {
        if (g.dataIndex == "id") {
            Ext.apply(g, {
                tipo: "int"
            });
        } else {
            Ext.apply(g, {
                tipo: "string"
            });
        }
        fields[index] = {
            name: g.dataIndex,
            type: g.tipo
        };
    });

    var paginado = 50;

    grid = Ext.define('grid_personas_api', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.grid_personas_api',
        id: 'grid_personas_api',
        columns: columnas,
        initComponent: function(){

            if(typeof(this.store) == "undefined"){            
                this.store = Ext.create('Ext.data.JsonStore',{
                    autoLoad: true,
                    fields: fields,
                    model: 'modelo_persona',
                    pageSize: paginado,                    
                    proxy: {
                        type: 'ajax', //Asynchronous Javascript And Xml
                        url: '/api/apps/personas/',
                        method: 'GET',
                        reader: {
                            type: 'json',
                            root: 'datos',
                            idProperty: 'id',
                            totalProperty: 'totalRegistros'                                  
                        }
                    }
                })             
            } 
            
            /*this.dockedItems = [{
                xtype   : 'toolbar_personas_api',
                position: 'bottom'
            }, libreria.nuevoPaginado({
                store: this.store,
                pageSize: paginado
            })];*/

            this.dockedItems = [{
            }, libreria.nuevoPaginado({
                store: this.store,
                pageSize: paginado
            })];

            this.plugins = [Ext.create('Ext.grid.plugin.RowEditing', {
                clicksToMoveEditor: 1,
                autoCancel: false,
                listeners: {
                    beforeedit: function(oEditor, oOptions) {},
                    afteredit: function(oEditor, oOptions) {
                        grid_personas_api = Ext.getCmp('grid_personas_api');
                        persona_seleccionada = libreria.gridRegistrosSeleccionados(grid_personas_api);
                        //editarPruebaCalidadAsignada(pruebaSeleccionada[0].data)
                        editarPersona(persona_seleccionada[0].data)
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