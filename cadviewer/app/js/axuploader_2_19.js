/*!
 * jQuery AXuploader
 * Alban Xhaferllari
 * albanx@gmail.com
 * Copyright 2010, AUTHORS.txt (http://www.albanx.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 *
 */

(function($)
{
	var methods =
	{
		init : function(options)
		{

    	    return this.each(function()
    	    {
    	        var settings = {
        	      'remotePath' : '',
        	      'url':'../php/upload_2.php',
        	      'data':'',
        	      'async':true,
        	      'maxFiles':9999,
        	      'allowExt':['all'],
        	      'showSize':'Mb',
        	      'success':function(respTxt,fileName) {},
        	      'finish':function(respTxt,filesName) {},
        	      'fileObject':'',
        	      'error':function(e){},
        	      'GIFprogress':'',
        	      'enable':true,
        	      'chunkSize':50*1024*1024//default 1Mb
    	        };

				var _this=this;
				var div_p = "";  // CH
				var o_global = "";
				var n_global = "";
				var old_perc = 0;

				if(options)	$.extend(settings,options);
				var allowExt=settings.allowExt.join('|').toLowerCase();


				/*================================================================================*\
				 Test if support pure ajax upload
				\*================================================================================*/
				var _browse = document.createElement('input');
				_browse.type = 'file';
				_browse.name='ax-files[]';
			    var isAjaxUpload=('multiple' in _browse &&  typeof File != "undefined" &&  typeof (new XMLHttpRequest()).upload != "undefined" );
			   // isAjaxUpload=false;

				/*================================================================================*\
				 helper variables
				\*================================================================================*/
			    var fileCount=0;//Number of selected files
			    var totalFiles=0;

				/*================================================================================*\
				 Form for classic upload
				\*================================================================================*/
			    var onLoadIframe=false;
			    var mainFrame=$('<iframe src="javascript:false;" name="ax-main-frame" />').hide().appendTo(_this).load(function(){
			    	if(onLoadIframe)
			    	{
			    		fileCount=1;
			    		$(_this).find('.ax-progress-div').html('100%');
			    		onFinish(this.contentWindow.document.body.innerHTML,'',$(_this).find('.ax-upload'));
			    	}
				});

			    var mainForm=$('<form target="ax-main-frame" method="POST" action="" encType="multipart/form-data" />').appendTo(_this);


				/*================================================================================*\
				 Browse input used for selecting files to upload. Cloned for normal upload
				\*================================================================================*/

/* CH - blocked
			    var browse=$(_browse).attr('multiple',isAjaxUpload).appendTo(mainForm).bind('change',function(){
			    	var fileObject = settings.fileObject;

					if(isAjaxUpload)
					{
						for (var i = 0; i < fileObject.files.length; i++)
						{
							if(fileCount<=settings.maxFiles)
							{
//window.alert("fobject"+fileObject.files[i].name);
								add_file(fileList,fileObject.files[i],fileObject.files[i].name,fileObject.files[i].size,fileCount);
							}
						}
					}
					else
					{
						if(fileCount<=settings.maxFiles)
						{
//window.alert("fobject"+fileObject.value);
							add_file(fileList,fileObject,fileObject.value.replace(/^.*\\/, ''),0,fileCount);
						}
					}


//					if(isAjaxUpload)
//					{
//						for (var i = 0; i < this.files.length; i++)
//						{
//							if(fileCount<=settings.maxFiles)
//							{
//window.alert(this.files[i].name);
//								add_file(fileList,this.files[i],this.files[i].name,this.files[i].size,fileCount);
//							}
//						}
//					}
//					else
//					{
//						if(fileCount<=settings.maxFiles)
//						{
//window.alert(this.value);
//							add_file(fileList,this,this.value.replace(/^.*\\/, ''),0,fileCount);
//						}
//					}

				});
*/


				/*================================================================================*\
				Upload All files button that upload files at once on click
				\*================================================================================*/
/* CH - blocked */

				var uploadAll=$('<div class="ax-uploadall"><div/>').appendTo(mainForm);
/*
//				var uploadAll=$('<input style="margin-left:5px;" type="button" value="Upload all" class="ax-uploadall" />').attr('disabled',true).appendTo(mainForm).bind('click',function(){
					if(isAjaxUpload)
					{
						$(_this).find('.ax-upload:not(:disabled)').click();
					}
					else
					{
						onLoadIframe=true;
						var finalUrl=get_final_url('');
						mainForm.attr('action',finalUrl).submit();

						$(_this).find('.ax-upload').attr('disabled',true);
						if(settings.GIFprogress!='')
							$(_this).find('.ax-progress-div').html('<img src="'+settings.GIFprogress+'" alt="uploading..." />');
						else
							$(_this).find('.ax-progress-div').html('Uploading...');
					}
				});
*/
				/*================================================================================*\
				Clear buttons that resets file list and variables
				\*================================================================================*/
/* CH - blocked */

				var clear=$('<div class="ax-clear"><div/>').appendTo(mainForm);
/*
				var clear=$('<input style="margin-left:5px;" type="button" value="Clear" class="ax-clear" />').appendTo(mainForm).bind('click',function(){
					fileCount=0;
					totalFiles=0;
					uploadAll.attr('disabled',fileCount==0);
					fileList.children('tbody').remove();

				});
*/

				/*================================================================================*\
				Table with the list of files and their details
				\*================================================================================*/



			    var fileList=$('<table class="ax-file-list" />').append('<div id=\"dummy>'+
													 '</div>').appendTo(mainForm);



/*

			    var fileList=$('<table class="ax-file-list" />').append('<thead><tr>'+
													 	'<th>File</th>'+
													 	'<th>Size</th>'+
													 	'<th>Progress</th>'+
// CH													 	'<th>Remove</th>'+
// CH													 	'<th>Upload</th>'+
													 '</tr></thead>').appendTo(mainForm);
*/

				/*================================================================================*\
				Functions that sets the url for sending additional data
				\*================================================================================*/
			    function get_final_url(enc_name)
			    {
					/*================================================================================*\
					 Encode remote path and calculate it if given as function
					\*================================================================================*/
					settings.remotePath=(typeof(settings.remotePath)=='function')?settings.remotePath():settings.remotePath;


//window.alert("1: "+settings.remotePath);

					/*================================================================================*\
					 set other URL data
					\*================================================================================*/

					var c=(settings.url.indexOf('?')==-1)?'?':'&';
					var url=settings.url+c+'ax-file-path='+encodeURIComponent(settings.remotePath)+'&ax-allow-ext='+encodeURIComponent(allowExt);

//window.alert("url="+url);
					settings.data=(typeof(settings.data)=='function')?settings.data():settings.data;


//window.alert("2: "+url+"  "+url+" c "+c);



					return url+'&ax-file-name='+enc_name+'&'+settings.data;//final url with other data
			    }

				/*================================================================================*\
				Functions that executes and the end of file uploading
				\*================================================================================*/
			    function onFinish(txt,currF,up,ab)
			    {
					fileCount--;//count upload files

					up.attr('disabled',false);
					settings.success(txt,currF);
					if(fileCount==0)
					{
						var filesArr=new Array();
						$(_this).find('.ax-file-name').each(function(){
							filesArr.push($(this).attr('title'));
						});
						fileCount=totalFiles;
						settings.finish(txt,filesArr);
						uploadAll.attr('disabled',false);
					}
			    }

				/*================================================================================*\
				Functions creates file form and xmlhttprequest for upload
				\*================================================================================*/
				function add_file(t,o,n,s,numF)
				{
					var ext=n.split('.').pop().toLowerCase();//file ext

					o_global = o;

					/*================================================================================*\
					File extension control
					\*================================================================================*/
					if(allowExt.indexOf(ext)<0 && allowExt!='all')	return;

					/*================================================================================*\
					Display file size in MB o Kb settings
					\*================================================================================*/
					switch(settings.showSize.toLowerCase())
					{
						case 'mb':s=s/(1024*1024);break;
						case 'kb':s=s/1024;break;
					}
					s=(Math.round(s*100)/100)+' '+settings.showSize;


					fileCount++;//update file number
					totalFiles++;

					uploadAll.attr('disabled',fileCount==0);
					//remove button action bind
					var rm=$('<input type="button" value="Remove" />').bind('click',function(){
						fileCount--;
						totalFiles--;
						uploadAll.attr('disabled',fileCount==0);
						$(this).parents('tr:first').remove();
					});

					//prepare abort and upload button
					var up=$('<input type="button" value="Upload" class="ax-upload" />').bind('click',function(){ this.disabled=true; });

					var tr=$('<tr />').appendTo(t);

					//
					n_global = n;

					var fname= n.split(".");

//					var td_n=$('<td class="ax-file-name" title="'+n+'" />').appendTo(tr).html(n);
					var td_n=$('<td class="ax-file-name" title="'+n+'" />').appendTo(tr).html(fname[0]); //CH

					var dx1 = "<div class=\"whiteUnderbar\">___<div>";
					var dummy1 = $('<td class="ax-file-name" title="'+n+'" />').appendTo(tr).html(dx1);  //CH

					var td_s=$('<td class="ax-size-td" />').appendTo(tr).html(s);


					var dx2 = "<div class=\"whiteUnderbar\">___<div>";
					var dummy2 = $('<td class="ax-file-name" title="'+n+'" />').appendTo(tr).html(dx2);  //CH

					var td_p=$('<td class="ax-progress-td" />').appendTo(tr);

					var dx3 = "<div class=\"whiteUnderbar\">___<div>";
					var dummy3 = $('<td class="ax-file-name" title="'+n+'" />').appendTo(tr).html(dx3);  //CH

// var div_p CH
					div_p=$('<div  class="ax-progress-div" />').css({'width':'0%','background-color':'#0096d7'}).html("0%").appendTo(td_p);
//					var td_r=$('<td class="ax-remove-td" />').appendTo(tr).append(rm);
//					var td_u=$('<td class="ax-upload-td" />').appendTo(tr).append(up);

					/*================================================================================*\
					 Prepare to send
					\*================================================================================*/
					var enc_name=encodeURIComponent(n);//encode file name

					if(!isAjaxUpload)
					{
						var file_holder=$('<div />').appendTo(td_n).hide().append(o);
						up.bind('click',function(){

//window.alert("up clicked! - not ajaxUpload");

							/*================================================================================*\
							 Target Iframe for async upload with iframes
							\*================================================================================*/
							var targetFrame=$('<iframe src="javascript:false;" name="ax-frame-'+numF+'" />').hide().appendTo(td_n).load(function(){
								if($(this).attr('load')=='1')
								{
									div_p.html('Finish');
									onFinish(this.contentWindow.document.body.innerHTML,n,up);
								}
							}).attr('load','0');
							div_p.html('Uploading...');
							targetFrame.attr('load','1');


// window.alert("2 finalUrl "+enc_name+"  "+get_final_url(enc_name));


							var finalUrl=get_final_url(enc_name);

							$('<form method="POST" action="'+finalUrl+'" encType="multipart/form-data" />').attr('target','ax-frame-'+numF).appendTo(td_n).hide().append(o).submit();
						});

						//clone browse file and append it to main form for selecting other files
						$(o).clone(true).val('').prependTo(mainForm);
					}
					else
					{
						/*================================================================================*\
						 bind actions to buttons
						\*================================================================================*/
						up.bind('click',function(){
//window.alert("up clicked! - uploadFileXhr get_final_url(encodeURIComponent(o.name))="+get_final_url(encodeURIComponent(o.name)));

							uploadFileXhr(o,0,$(this),div_p);
						});
					}
				}




				//recrusive file upload with chunk method
				function uploadFileXhr(o,start_byte,up,div_p)
				{
					var totals=o.size;
					var chunk;
					var peice=settings.chunkSize;//bytes to upload at once

//window.alert("uploadFileXhr="+peice);

					var end_byte=start_byte+peice;
					var peice_count=end_byte/peice;
					var is_last=(totals-end_byte<=0)?1:0;

					/*===============================================================*\
					 * Detect support slice method
					 * if slice is not supported then send all file at once
					\*==============================================================*/
					if (o.mozSlice)				chunk=o.mozSlice(start_byte, end_byte);
					else if (o.webkitSlice)		chunk=o.webkitSlice(start_byte, end_byte);
					else if(o.slice)			chunk=o.slice(start_byte, peice);// for this method 2° parameter is length
					else 						{chunk=o;is_last=1;}//send full file if method not supported


					/*================================================================================*\
					 Prepare xmlhttpreq object for file upload Bind functions and progress
					\*================================================================================*/
					var xhr = new XMLHttpRequest();//prepare xhr for upload

					xhr.onreadystatechange=function()
					{
//window.alert("A1");
						if(this.readyState == 4 && this.status == 200)
						{
							if(is_last==0)
							{
//window.alert("A2");
								uploadFileXhr(o,end_byte,up,div_p);
							}
							else
							{
								onFinish(xhr.responseText,o.name,up);
								div_p.html('100%').css('width','100%');
 //window.alert("finish 100%");
 //window.alert("upload done! - now we must clean up!");
 						var fname= n_global.split(".");
 						var end=$(_this).html(fname[0]);

				save_filename_list();   // build a new file save list

							}
						}
					};
//window.alert("A4");
					xhr.upload.onprogress=function(e)
					{
//window.alert("e="+e);
						if (e.lengthComputable)
						{
							var perc = Math.round((e.loaded+peice_count*peice-peice)*100/totals);
							// CH
							if (perc>old_perc){
								div_p.html(perc+'%').css('width',perc+'%');
								old_perc = perc;
							}
						}
					};

					xhr.upload.onerror=settings.error(xhr.responseText,o.name);

//window.alert("error="+xhr.upload.onerror);

// CH - THIS IS WHERE WE LOAD!

//window.alert("3 finalUrl "+encodeURIComponent(o.name)+"  "+get_final_url(encodeURIComponent(o.name)));

					var finalUrl=get_final_url(encodeURIComponent(o.name));
					xhr.open('POST',finalUrl+'&start='+start_byte,settings.async);//url + async/sync
					//xhr.setRequestHeader('Cache-Control', 'no-cache');
					//xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');//header
					//xhr.setRequestHeader('Content-Type', 'multipart/form-data');//type for upload

//					header("Access-Control-Allow-Origin: $http_origin");
//					header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
//					header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');

// 					xhr.setRequestHeader("Access-Control-Allow-Origin", 'http://localhost:8080');
// 					xhr.setRequestHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
// 				 	xhr.setRequestHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
//					xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:8080');


//window.alert(chunk.size);

					xhr.send(chunk);//send request of file

				}


				/*=======================================================
				 * Disable option
				 *======================================================*/
	    	    if(!settings.enable)
	    	    	$(this).find('input:not(:disabled), button:not(:disabled)').addClass('ax-disabled').attr('disabled',true);





// NORE: CH     -  Build the file load component

	    var fObject = settings.fileObject;
		if(isAjaxUpload)
		{
			for (var i = 0; i < fObject.files.length; i++)
			{
				if(fileCount<=settings.maxFiles)
				{
//	window.alert("1 fobject"+fObject.files[i].name);
					add_file(fileList,fObject.files[i],fObject.files[i].name,fObject.files[i].size,fileCount);
				}
			}
		}
		else
		{
			if(fileCount<=settings.maxFiles)
			{
//	window.alert("2 fobject"+fileObject.value);
				add_file(fileList,fObject,fObject.value.replace(/^.*\\/, ''),0,fileCount);
			}
		}


//window.alert("before forced upload !isAjaxUpload="+(!isAjaxUpload));

		if(!isAjaxUpload)
		{


				/*================================================================================*\
				 Target Iframe for async upload with iframes
				\*================================================================================*/
				var targetFrame=$('<iframe src="javascript:false;" name="ax-frame-'+numF+'" />').hide().appendTo(td_n).load(function(){
					if($(this).attr('load')=='1')
					{
						div_p.html('Finish');
						onFinish(this.contentWindow.document.body.innerHTML,n,up);
					}
				}).attr('load','0');
				div_p.html('Uploading...');
				targetFrame.attr('load','1');

//window.alert("1 finalUrl "+enc_name+"  "+get_final_url(enc_name));

				var finalUrl=get_final_url(enc_name);

				$('<form method="POST" action="'+finalUrl+'" encType="multipart/form-data" />').attr('target','ax-frame-'+numF).appendTo(td_n).hide().append(o).submit();

			//clone browse file and append it to main form for selecting other files
			$(o).clone(true).val('').prependTo(mainForm);
		}
		else
		{
				uploadFileXhr(o_global,0,$(this),div_p);
		}





    	    });
		},
		enable:function()
		{
			return this.each(function()
			{
				$(this).find('.ax-disabled').attr('disabled',false).removeClass('ax-disabled');
			});
		},
		disable:function()
		{
			return this.each(function()
			{
				$(this).find('input:not(:disabled), button:not(:disabled)').addClass('ax-disabled').attr('disabled',true);
			});
		},
		start:function()
		{
			$(this).find('.ax-uploadall:not(:disabled)').click();
		},
		clear:function()
		{
			(this).find('.ax-clear:not(:disabled)').click();
		},
		destroy : function()
		{
			return this.each(function()
			{
				var $this = $(this);
				$this.removeData('settings');
				$this.html('');
			});
		}
	};

	$.fn.axuploader = function(method, options)
	{
		if(methods[method])
		{
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
		}
		else if(typeof method === 'object' || !method)
		{
			return methods.init.apply(this, arguments);
		}
		else
		{
			$.error('Method ' + method + ' does not exist on jQuery.axuploader');
		}
	};

})(jQuery);
