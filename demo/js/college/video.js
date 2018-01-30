var load;
var logger;

myApp
		.controller(
				"CollegeVideoCtl",
				function($scope, $http, $rootScope, $sce, $timeout, $state, $log) {
					$scope.ckNav("college_video");
					logger=$log;
					$scope.label = "";

					$scope.page = {
						pageNumber : 1,
						pageSize : 10,
						totalRow : 0,
						totalPage : 0
					};

					$scope.initPage = function() {
						$http({
							method : "post",
							url : "uc/college/init",
							data : {
								"pageNumber" : $scope.page.pageNumber,
								"pageSize" : $scope.page.pageSize,
							},
						}).success(function(rs, status, headers, config) {
							if (rs.code == 0) {
								$scope.labelList = rs.result.labelList;
								$scope.page = rs.result.page;
								$scope.loginUser = rs.result.loginUser;

							} else {
								layer.msg("系统异常");
							}
						}).error(function(rs, status, headers, config) {
							layer.msg("页面信息取得时发生系统异常");
						});
					};

					// 点击视频进入视频播放页面
					$scope.gotoPlay = function(video) {
						if (video.attrs.payState == 0
								&& video.attrs.charge != 0) {
							$scope.gotoPay(video);
							return;
						}
						$state.go("college_play", {
							id : video.attrs.id
						});

					};

					$scope.payDlghtml = $('#payDlg').html();
					$('#payDlg').remove();

					$scope.gotoPay = function(video) {
						// 支付处理
						// 判断是否登录，如果没有登录先登录处理
						if (!$scope.loginUser) {
							layer.alert("该视频需付费后才能观看，登录后才能付费。");
							return;
						}
						layer.open({
							type : 1,
							title : '付费',
							area : [ '300px', '170px' ],
							content : $scope.payDlghtml
						});
						$('#payVideoCharge').val(video.attrs.charge);
						$('#payVideoId').val(video.attrs.id);
					};

					$(document).on(
							"click",
							".btnPay",
							function() {
								location.href = "uc/college/pay?videoId="
										+ $('#payVideoId').val() + "&totalFee="
										+ $('#payVideoCharge').val();
							});

					$scope.changeLabel = function(obj) {
						$scope.label = obj.id;
						if ($(obj).hasClass('active')) {
							return;
						}
						$scope.videoList = [];
						$(".video_div_label span").removeClass("active");
						$(obj).addClass("active");
						getList();
					};

					function getList() {
						$http({
							method : "post",
							url : "uc/college/getList",
							data : {
								"videoLabel" : $scope.label,
								"pageNumber" : $scope.page.pageNumber,
								"pageSize" : $scope.page.pageSize,
							},
						}).success(function(rs, status, headers, config) {
							if (rs.code == 0) {
								$scope.page = rs.result.page;
							} else {
								layer.msg("系统异常");
							}
						}).error(function(rs, status, headers, config) {
							layer.msg("页面信息取得时发生系统异常");
						});
					}

					$scope.previous = function() {
						if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
							$scope.page.pageNumber -= 1;
							getList();
						}
					};
					$scope.next = function() {
						if ($scope.page.totalRow > 0
								&& $scope.page.pageNumber < $scope.page.totalPage) {
							$scope.page.pageNumber += 1;
							getList();
						}
					};
					$scope.first = function() {
						if ($scope.page.totalRow > 0 && $scope.page.pageNumber > 1) {
							$scope.page.pageNumber = 1;
							getList();
						}
					};
					$scope.last = function() {
						if ($scope.page.totalRow > 0
								&& $scope.page.pageNumber < $scope.page.totalPage) {
							$scope.page.pageNumber = $scope.page.totalPage;
							getList();
						}
					};

					$scope.upload = function() {
						if (!($scope.uploadDlghtml)) {
							$scope.uploadDlghtml = $('#uploadDlg').html();
							$('#uploadDlg').remove();
						}
						layer.open({
							type : 1,
							title : '视频上传',
							area : [ '500px', '300px' ],
							content : $scope.uploadDlghtml
						});

						Uploader(opts).init();
						$("#fileUploadBtnDisp").focus();
					};

					$scope.video = {
						"label" : "",
						"title" : "",
						"charge" : "",
						"url" : "",
						"poster" : "",
					};

					$(document).on("click", "#fileUploadBtnDisp", function() {
						// 入力check
						if (!$("#fileInput").val()) {
							layer.msg("请选择待上传的文件");
							return;
						}

						if (!$("#vLabel").val()) {
							layer.msg("请选择标签");
							return;
						}
						if (!$("#vTitle").val()) {
							layer.msg("请输入标题");
							return;
						}

						if (!$("#vCharge").val()) {
							layer.msg("请输入观看费用");
							return;
						}

						load = loadJava();
						$("#fileUploadBtn").click();
					});

					$(document).on("keyup", "#vCharge", function() {
						this.value = this.value.replace(/\D/g, '');
					});

					$(document).on("afterpaste", "#vCharge", function() {
						this.value = this.value.replace(/\D/g, '');
					});

					// 插入数据库
					$scope.insertVideo = function() {
						$scope.video.label = $('#vLabel').val();
						$scope.video.title = $('#vTitle').val();
						$scope.video.charge = $('#vCharge').val();
						$http({
							method : "post",
							url : "uc/college/insertVideo",
							data : $scope.video,
						}).success(function(rs, status, headers, config) {
							if (rs.code == 0) {
								layer.close(load);
								layer.closeAll();
								layer.msg("上传成功");
							} else {
								layer.msg("系统异常");
								layer.close(load);
							}

						}).error(function(rs, status, headers, config) {
							layer.close(load);
							layer.msg("页面信息取得时发生系统异常");
						});
					};

					/**
					 * 视频上传相关接口函数及参数
					 */
					var paramData;
					var opts = {
						fileInputId : 'fileInput',
						fileUploadId : 'fileUploadBtn',
						getInitInfo : function(file, callback) {
							var context;
							context = localStorage.getItem(file.fileKey
									+ '_context');
							if (!context) {
								$
										.ajax({
											type : "post",
											url : "uc/college/getCheckSum",
											data : {

											},
											cache : false,
											dataType : 'json',
											success : function(data) {
												logger.debug(data);
												paramData = data.result;
												getInitInfo(file, callback,
														data.result);
											},
											error : function() {
											}
										});
							} else {
								callback({
									'bucketName' : localStorage
											.getItem(file.fileKey + '_bucket'),
									'objectName' : localStorage
											.getItem(file.fileKey + '_object'),
									'nosToken' : localStorage
											.getItem(file.fileKey
													+ '_xNosToken')
								});
							}
						},
						onAdd : function(curFile) {
							logger.debug("onAdd:" + curFile.file.name + ': '
									+ curFile.fileSizeMb + ' MB');
						},
						onProgress : function(curFile) {
							logger.debug(curFile.status);
							logger.debug(curFile.progress);
						},
						noUploadFn : function() {
							logger.debug("noUploadFn:" + '请选择待上传的文件');
							layer.msg('请选择待上传的文件');
						},
						exsitFn : function() {
							logger.debug("exsitFn:" + '文件已存在列表中');
						},
						mismatchFn : function() {
							$('#progressInfo').html('不是有效的视频或图片格式');
							layer.msg('不是有效的视频或图片格式');
						},

						onAllUploaded : function() {
							logger.debug('All done.');
						},
						onError : function(errObj) {
							logger.debug(errObj);
							layer.close(load);
						},

						/**
						 * 单文件上传成功回调
						 * 
						 * @method onUploaded
						 * @static
						 * @param {Object}
						 *            curFile 文件对象
						 * @return {void}
						 * @version 1.0.0
						 */
						onUploaded : function(curFile) {
							logger.debug('File: ' + curFile.fileName
									+ ' is uploaded.');
							/**
							 * 用于获取vid等信息，暂只支持在单个文件上传成功后的回调中进行
							 * 在全部上传成功的回调中发起请求会导致在上传失败时无法执行请求（接口的URL、参数格式、响应格式等均相同）
							 */
							$
									.ajax({
										type : 'post',
										url : 'http://vcloud.163.com/app/vod/video/query',
										data : JSON
												.stringify({
													objectNames : [ curFile.objectName ]
												}),
										dataType : 'json',
										contentType : 'application/json',
										// headers参数为API token校验返回的结果，全部均为必须
										headers : {
											'AppKey' : 'be93c7480710402da7847402cbdc59c4', // 开发者平台分配的appkey
											'Nonce' : paramData.Nonce, // 随机数（随机数，最大长度128个字符）
											'CurTime' : paramData.timestamp, // 当前UTC时间戳，从1970年1月1日0点0分0秒开始到现在的秒数
											'CheckSum' : paramData.CheckSum
										// 服务器认证需要,SHA1(AppSecret+Nonce+CurTime),16进制字符小写
										},
										success : function(data, s, xhr) {
											if (data.code === 200) {
												var vid = data.ret.list[0].vid;
												// 根据vid取得播放地址

												$
														.ajax({
															type : 'post',
															url : 'http://vcloud.163.com/app/vod/video/get',
															data : JSON
																	.stringify({
																		vid : vid
																	}),
															dataType : 'json',
															contentType : 'application/json',
															// headers参数为API
															// token校验返回的结果，全部均为必须
															headers : {
																'AppKey' : 'be93c7480710402da7847402cbdc59c4', // 开发者平台分配的appkey
																'Nonce' : paramData.Nonce, // 随机数（随机数，最大长度128个字符）
																'CurTime' : paramData.timestamp, // 当前UTC时间戳，从1970年1月1日0点0分0秒开始到现在的秒数
																'CheckSum' : paramData.CheckSum
															// 服务器认证需要,SHA1(AppSecret+Nonce+CurTime),16进制字符小写
															},
															success : function(
																	data, s,
																	xhr) {
																if (data.code === 200) {
																	$scope.video.url = data.ret.origUrl;

																	// 获取视频截图
																	$
																			.ajax({
																				type : 'post',
																				url : 'https://vcloud.163.com/app/vod/snapshot/create',
																				data : JSON
																						.stringify({
																							vid : vid,
																							size : 1,
																							offset : 0
																						}),
																				dataType : 'json',
																				contentType : 'application/json',
																				// headers参数为API
																				// token校验返回的结果，全部均为必须
																				headers : {
																					'AppKey' : 'be93c7480710402da7847402cbdc59c4', // 开发者平台分配的appkey
																					'Nonce' : paramData.Nonce, // 随机数（随机数，最大长度128个字符）
																					'CurTime' : paramData.timestamp, // 当前UTC时间戳，从1970年1月1日0点0分0秒开始到现在的秒数
																					'CheckSum' : paramData.CheckSum
																				// 服务器认证需要,SHA1(AppSecret+Nonce+CurTime),16进制字符小写
																				},
																				success : function(
																						data,
																						s,
																						xhr) {
																					if (data.code === 200) {
																						// 获取视频截图
																						$scope.video.poster = data.ret.url;
																						// 将视频信息插入数据库
																						$scope
																								.insertVideo();
																					} else {

																					}
																				},
																				error : function(
																						xhr,
																						s,
																						err) {

																				}
																			});
																} else {

																}
															},
															error : function(
																	xhr, s, err) {

															}
														});

											} else {
												opts.onError({
													errCode : data.Code,
													errMsg : data.msg
												});
											}
										},
										error : function(xhr, s, err) {
											opts.onError(err);
										}
									});

						},

					};

					function getInitInfo(file, callback, initdata) {
						$
								.ajax({
									type : 'post',
									url : 'http://vcloud.163.com/app/vod/upload/init',
									data : JSON.stringify({
										originFileName : file.file.name, // 上传文件的原始名称(包含后缀名)(必填)(规则同Windows文件名规则)
										userFileName : file.file.name, // 用户命名的上传文件名称(规则同Windows文件名规则)
										typeId : null, // 视频所属的类别ID
										presetId : null, // 视频所需转码模板ID
										callbackUrl : null, // 转码成功后回调客户端的URL地址
										description : null
									// 上传视频的描述信息
									}),
									// headers参数为API token校验返回的结果，全部均为必须
									headers : {
										'AppKey' : 'be93c7480710402da7847402cbdc59c4', // 开发者平台分配的appkey
										'Nonce' : initdata.Nonce, // 随机数（随机数，最大长度128个字符）
										'CurTime' : initdata.timestamp, // 当前UTC时间戳，从1970年1月1日0点0分0秒开始到现在的秒数
										'CheckSum' : initdata.CheckSum
									// 服务器认证需要,SHA1(AppSecret+Nonce+CurTime),16进制字符小写
									},
									dataType : 'json',
									contentType : 'application/json',
									success : function(data, s, xhr) {
										/*
										 * data格式： "Content-Type":
										 * "application/json; charset=utf-8" {
										 * "code": 200, "msg": "", "ret": {
										 * "xNosToken": "xxsfsgdsgetret",
										 * "bucket": "origv10000", "object":
										 * "qrwr-eete-dsft-vdfg.mp4" } }
										 */
										if (data.code === 200) {
											localStorage.setItem(file.fileKey
													+ '_bucket',
													data.ret.bucket);
											localStorage.setItem(file.fileKey
													+ '_object',
													data.ret.object);
											localStorage.setItem(file.fileKey
													+ '_xNosToken',
													data.ret.xNosToken);
											callback({
												'bucketName' : data.ret.bucket,
												'objectName' : data.ret.object,
												'nosToken' : data.ret.xNosToken
											});
										} else {
											opts.onError({
												errCode : data.Code,
												errMsg : data.msg
											});
										}
									},
									error : function(xhr, s, err) {
										opts.onError(err);
									},
								});
					}

				});