Ext.onReady(function() {
    
    //*** Inicio Modelo Orden Trabajo
    Ext.define('modelo_departamento', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'id',
            type: 'integer'
        }, {
            name: 'nombre',
            type: 'string'
        }, {
            name: 'descripcion',
            type: 'string'
        }]
    });

    var columnas = [{
        header: 'id',
        dataIndex: 'id',
        hidden: true,
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
        header: 'Descripción',
        dataIndex: 'descripcion',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        editor: {
            xtype: 'textfield',
            id: 'descripcion'
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

    grid = Ext.define('grid_departamentos', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.grid_departamentos',
        id: 'grid_departamentos',
        columns: columnas,
        initComponent: function(){

            if(typeof(this.store) == "undefined"){            
                this.store = Ext.create('Ext.data.JsonStore',{
                    autoLoad: true,
                    fields: fields,
                    model: 'modelo_departamento',
                    pageSize: paginado,                    
                    proxy: {
                        type: 'ajax', //Asynchronous Javascript And Xml
                        url: '/api/apps/departamentos/',
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
                        grid_departamentos = Ext.getCmp('grid_departamentos');
                        departamento_seleccionado = libreria.gridRegistrosSeleccionados(grid_departamentos);
                        editarDepartamento(departamento_seleccionado[0].data)
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