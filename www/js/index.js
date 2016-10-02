/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function() {
		this.bindEvents();
	},
	// Bind Event Listeners
	//
	// Bind any events that are required on startup. Common events are:
	// 'load', 'deviceready', 'offline', and 'online'.
	bindEvents: function() {
		document.addEventListener('deviceready', this.onDeviceReady, false);

		document.getElementById('photo_button').addEventListener('click', this.takeAPhoto, false);
	},
	// deviceready Event Handler
	//
	// The scope of 'this' is the event. In order to call the 'receivedEvent'
	// function, we must explicitly call 'app.receivedEvent(...);'
	onDeviceReady: function() {
		
	},
	//
	displayInfo: function(msg) {
		document.getElementById('info').innerHTML = String(msg);
	},
	//
	getOptions: function() {
		var s_type = document.forms.sourceType.s_type.value;
		if ('camera'==s_type) {
			this.sourceType = Camera.PictureSourceType.CAMERA;
			this.srcMode = 'camera';
		} else {
			this.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
			this.srcMode = 'gallery';
		}

		var d_type = document.forms.destinationType.d_type.value;
		if ('data_url'==d_type) {
			this.destinationType = Camera.DestinationType.DATA_URL;
			this.dstMode = 'data';
		} else {
			this.destinationType = Camera.DestinationType.FILE_URI;
			this.dstMode = 'uri';
		}
	},
	// Фотокамера
	takeAPhoto: function(){
		app.getOptions();

		navigator.camera.getPicture(
			onSuccess, 
			onFail, 
			{ 
				quality: 50, 
				sourceType: app.sourceType,
				destinationType: app.destinationType,
				allowEdit: true,
				encodingType: Camera.EncodingType.PNG,
			}
		);

		function onSuccess(imageData) {
			app.displayInfo('srcMode: '+app.srcMode+', dstMode: '+app.dstMode);

			var image = document.getElementById('photo_picture');
			
			var image_source = ('data'==app.dstMode) ? "data:image/jpeg;base64,"+imageData : imageData;

			image.src = image_source;
		}

		function onFail(message) {
			alert('Failed because: ' + message);
		}
	}
};

app.initialize();