$(document)
		.ready(
				function() {

					// 画面初期化
					var videoDetail = window.parent.videoDetail;

					var videoHtml = "<video id='idVideo' class='video-js vjs-fluid video_size'"
							+ " x-webkit-airplay='allow' webkit-playsinline poster='' preload='auto'"
							+ " width='640' height='360' data-setup='' src='"
							+ videoDetail.attrs.url + "'>" + " </video>";
					if (videoDetail.attrs.payState == 0
							&& videoDetail.attrs.charge != 0) {
						videoHtml += " <a class='p-thumb' href='javascript:void(0)' ><span>付费</span></a>";
					}

					$(".play_video").html(videoHtml);
					initVideo();

					$(document).on("click", '.p-thumb', function() {
						window.parent.gotoPay();
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
						neplayer("idVideo", playopts);
					}

				});
