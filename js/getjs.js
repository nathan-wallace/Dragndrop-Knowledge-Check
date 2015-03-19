// JavaScript Document

require.config({
    //By default load any module IDs from js/lib
    baseUrl: 'js/',
	shim:{
		'jquery-1.9.1':{
			exports: '$'
		},
		'jquery-ui-1.10.3.custom.min':{
			deps:['jquery-1.9.1']
		},
		'dragndrop':{
			deps:['jquery-1.9.1']
		}
	}
});

require(['jquery-1.9.1', 'jquery-ui-1.10.3.custom.min', 'dragndrop'], function(dragndrop){
   initPage(); 
});