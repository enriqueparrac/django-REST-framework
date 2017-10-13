Ext.onReady(function() {
    
    //*** Inicio Modelo Orden Trabajo
    Ext.define('modelo_empleado', {
        extend: 'Ext.data.Model',
        fields: [{
            name: 'departamento_nombre',
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
        header: 'Turno',
        dataIndex: 'turno',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        editor: {
            xtype: 'textfield',
            id: 'turno'
        }
    }, {
        header: 'Departamento',
        dataIndex: 'departamento_nombre',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        editor: {
            xtype: 'textfield',
            id: 'departamento_nombre'
        }
    }, {
        header: 'Fecha inicio turno',
        dataIndex: 'fecha_hora_inicio_turno',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        submitFormat: 'Y-m-d',
        editor: {
            xtype: 'datefield',
            id: 'fecha_inicio_turno',
        },
        renderer: function(val) {
            //var dt = Ext.Date.parse(val, "Y-m-d");
            //return Ext.util.Format.date(dt, "d/m/Y");
            return Ext.util.Format.date(val, "d/m/Y");
        }
    }, {
        header: 'Hora inicio turno',
        dataIndex: 'fecha_hora_inicio_turno',
        menuDisabled: true,
        sortable: false,
        flex: 1,
        editor: {
            xtype: 'timefield',
            id: 'hora_inicio_turno',
            /*minValue: '00:00',
            maxValue: '23:45',
            increment: 15,
            format: 'H:i'*/ 
            minValue: '00:00',
            maxValue: '23:45',
            increment: 15,
            format: 'G:i'
        },
        renderer: function(val) {
            var fecha_inicio = new Date(val);
            var horas = fecha_inicio.getUTCHours();        
            var minutos = fecha_inicio.getUTCMinutes();
            return (horas + ":" + minutos)
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

    grid = Ext.define('grid_empleados', {
        extend: 'Ext.grid.Panel',
        alias: 'widget.grid_empleados',
        id: 'grid_empleados',
        columns: columnas,
        initComponent: function(){

            if(typeof(this.store) == "undefined"){            
                this.store = Ext.create('Ext.data.JsonStore',{
                    autoLoad: true,
                    fields: fields,
                    model: 'modelo_empleado',
                    pageSize: paginado,                    
                    proxy: {
                        type: 'ajax', //Asynchronous Javascript And Xml
                        url: '/api/apps/empleados/',
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
                        grid_empleados = Ext.getCmp('grid_empleados');
                        empleado_seleccionado = libreria.gridRegistrosSeleccionados(grid_empleados);
                        //editarEmpleado(empleado_seleccionado[0].data)
                        console.log('editando empleado')
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