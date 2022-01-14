define( [ "qlik","jquery", "css!./style.css","css!./font-awesome.min.css"
],
function ( qlik, $) {
	'use strict';
	

	return {
		initialProperties: {
			qHyperCubeDef: {
				qMeasures: [],
				qInitialDataFetch: [{
					qWidth: 10,
					qHeight: 50
				}]
			}
		},
		definition: {
			type: "items",
			component: "accordion",
			items: {
				
				measures: {
					uses: "measures",
					min: 1,
					max: 1
				},
				sorting: {
					uses: "sorting"
				},
				settings: {
					uses: "settings",
					items: {
			        // Definition of the custom section header
			        kpiSettings: {
			            type: "items",
			            label: "KPI Settings",
			            items: {
			                bgcolor:{
								type:"string",
								label:"BG Color",
								ref:"prop.bgcolor",
								defaultValue:"#F44336",
								expression:"optional"
							},
							titlecolor:{
								type:"string",
								label:"Title Color",
								ref:"prop.titlecolor",
								defaultValue:"#fff",
								expression:"optional"
							},
							opacity:{
								type:"string",
								label:"Icon Opacity",
								ref:"prop.opacity",
								defaultValue:"7",
								expression:"optional"
							},
							iconColor:{
								type:"string",
								label:"Icon Color",
								ref:"prop.iconColor",
								defaultValue:"#fff",
								expression:"optional"
							},
							icon:{
								type:"string",
								label:"Icon",
								ref:"prop.icon",
								defaultValue:"lui-icon lui-icon--grid-large",
								expression:"optional"
							},
							sheetID:{
								type:"string",
								label:"Sheet ID",
								ref:"prop.sheetID",
								defaultValue:"",
								expression:"optional"
							},

			            }
			        }
			    }


				}
			}
		},
		snapshot: {
			canTakeSnapshot: true
		},
		
		paint: function ($element,layout) {
			
			
			
			var qHyperCube = layout.qHyperCube;
		var qMatrix = layout.qHyperCube.qDataPages[0].qMatrix;
		var qMeasureInfo = qHyperCube.qMeasureInfo;

			var htmltext = `
<div class="tile-box tile-box-shortcut " id="cont_`+layout.qInfo.qId+`" style="background: `+layout.prop.bgcolor+`; overflow:hidden;">
	<span class="bs-badge badge-absolute primary">`+qMatrix[0][0].qText+`</span>
	
	<div class="tile-header" style="color: `+layout.prop.titlecolor+`;">`+qMeasureInfo[0].qFallbackTitle+`</div>
	<div id="sheet1" class="tile-content-wrapper" >
		<span class="icon `+layout.prop.icon+`" style="color:`+layout.prop.iconColor+` !important;opacity: .`+layout.prop.opacity+`; -moz-opacity: .`+layout.prop.opacity+`;"></span>
	</div>
</div>
`
			$element.html( htmltext );
			
			$("#sheet1").click(function(){
			  qlik.navigation.gotoSheet(layout.prop.sheetID);
			});

			return qlik.Promise.resolve();
		}
	};

} );

