var videoDetail = {};
var loginUser = "";
var payDlghtml = "";
myApp
		.controller(
				"CollegePlayCtl",
				function($scope, $http, $rootScope, $sce, $timeout, $state) {
					$scope.ckNav("college_video");
					layer.closeAll();
					try {
						if (neplayer("idVideo")) {
							myPlayer = neplayer("idVideo");
							myPlayer.release();
						}
					} catch (e) {

					}
					videoId = $state.params.id;
					// 画面初期化
					$scope.initPage = function() {
						$http({
							method : "post",
							url : "uc/college/initPlay",
							data : {
								"videoId" : $state.params.id
							}
						})
								.success(
										function(rs, status, headers, config) {
											if (rs.code == 0) {
												loginUser = rs.result.loginUser;
												videoDetail = rs.result.video;
												$scope.video = rs.result.video;

												var videoHtml = "<video id='idVideo' class='video-js video_size'"
														+ " x-webkit-airplay='allow' webkit-playsinline poster='' preload='auto'"
														+ " width='640' height='360' data-setup='' >"
														+ "<source src='"
														+ videoDetail.attrs.url 
														+ "' >" + " </video>";
												if (videoDetail.attrs.payState == 0
														&& videoDetail.attrs.charge != 0) {
													videoHtml += " <a class='p-thumb_big' href='javascript:void(0)' ><span>付费</span></a>";
												}

												$(".play_video")
														.html(videoHtml);
												initVideo();

												$(document).off("click",
														'.p-thumb_big');
												$(document).on("click",
														'.p-thumb_big',
														function() {
															gotoPay();
														});

												function initVideo() {
													/**
													 * 视频播放相关接口函数及参数
													 */
													var playopts = {
														"controls" : true,
														"poster" : videoDetail.attrs.poster,
														bigPlayButton : true
													};
													neplayer("idVideo",
															playopts);
												}
											} else {
												layer.msg("系统异常");
											}
										}).error(
										function(rs, status, headers, config) {
											layer.msg("页面信息取得时发生系统异常");
										});
					};

					payDlghtml = $('#payDlg').html();
					$('#payDlg').remove();

					$(document).on(
							"click",
							".btnPay",
							function() {
								location.href = "uc/college/pay?videoId="
										+ $('#payVideoId').val() + "&totalFee="
										+ $('#payVideoCharge').val();
							});
					
					$scope.goback = function() {
						$state.go("college_video");
					};

				});
function gotoPay() {
	// 支付处理
	// 判断是否登录，如果没有登录先登录处理
	if (!loginUser) {
		layer.alert("该视频需付费后才能观看，登录后才能付费。");
		return;
	}
	layer.open({
		type : 1,
		title : '付费',
		area : [ '300px', '170px' ],
		content : payDlghtml
	});
	$('#payVideoCharge').val(videoDetail.attrs.charge);
	$('#payVideoId').val(videoDetail.attrs.id);

};
