<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title><?php echo $site->title(); ?></title>
	<!-- import css -->
	<?php echo css('assets/css/main.css') ?>
  	<?php echo css('@auto') ?>
  	<?php echo js('assets/js/main.js') ?>
  	<?php echo js('@auto') ?>

	<!-- Matomo -->
	<script>
		var _paq = window._paq = window._paq || [];
		/* tracker methods like "setCustomDimension" should be called before "trackPageView" */
		_paq.push(['trackPageView']);
		_paq.push(['enableLinkTracking']);
		(function() {
			var u="//possiblescenarios.com/analytics/";
			_paq.push(['setTrackerUrl', u+'matomo.php']);
			_paq.push(['setSiteId', '1']);
			var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
			g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
		})();
	</script>
	<!-- End Matomo Code -->

</head>
<body>
	<?php if ($page->template() == 'default'): ?>
		<?php snippet('intro') ?>
	<?php endif ?>
	<header>
		<h1><a href="<?php echo $site->url(); ?>" id="title"><?php echo $site->title(); ?></a> / <span id="clearTags" onclick="clearTags()">clear tags</span></h1>
		<!-- import tags -->
		<?php if ($page->template() == 'default'): ?>
		<?php snippet('tags'); ?>
		<?php endif ?>
	</header>

	<div id="mouse">
		<!-- right -->
		<svg id="cursor-right" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M14.7723 0H11.897V2.87536H14.7723V0Z" fill="#00FF00"/>
		<path d="M14.7723 23.0058H11.897V25.8812H14.7723V23.0058Z" fill="#00FF00"/>
		<path d="M20.523 5.75362H17.6477V8.62899H20.523V5.75362Z" fill="#00FF00"/>
		<path d="M20.523 17.2551H17.6477V20.1304H20.523V17.2551Z" fill="#00FF00"/>
		<path d="M17.6477 2.87826H14.7723V5.75362H17.6477V2.87826Z" fill="#00FF00"/>
		<path d="M17.6477 20.1304H14.7723V23.0058H17.6477V20.1304Z" fill="#00FF00"/>
		<path d="M23.3984 8.62899H20.523V11.5044H23.3984V8.62899Z" fill="#00FF00"/>
		<path d="M23.3984 14.3797H20.523V17.2551H23.3984V14.3797Z" fill="#00FF00"/>
		<path d="M26.2738 11.5043H23.3984V14.3797H26.2738V11.5043Z" fill="#00FF00"/>
		<path d="M20.523 11.5043H17.6477V14.3797H20.523V11.5043Z" fill="#00FF00"/>
		<path d="M9.0216 11.5043H6.14624V14.3797H9.0216V11.5043Z" fill="#00FF00"/>
		<path d="M14.7723 11.5043H11.897V14.3797H14.7723V11.5043Z" fill="#00FF00"/>
		<path d="M3.26797 11.5043H0.392609V14.3797H3.26797V11.5043Z" fill="#00FF00"/>
		</svg>

		<!-- close -->
		<svg id="cursor-close" width="27" height="26" viewBox="0 0 27 26" fill="none" xmlns="http://www.w3.org/2000/svg">
		<path d="M3.28537 0.11884H0.410004V2.9942H3.28537V0.11884Z" fill="#00FF00"/>
		<path d="M26.2912 0.11884H23.4158V2.9942H26.2912V0.11884Z" fill="#00FF00"/>
		<path d="M3.28537 23.1246H0.410004V26H3.28537V23.1246Z" fill="#00FF00"/>
		<path d="M26.2912 23.1246H23.4158V26H26.2912V23.1246Z" fill="#00FF00"/>
		<path d="M9.039 5.87246H6.16364V8.74783H9.039V5.87246Z" fill="#00FF00"/>
		<path d="M20.5404 5.87246H17.6651V8.74783H20.5404V5.87246Z" fill="#00FF00"/>
		<path d="M9.039 17.3739H6.16364V20.2493H9.039V17.3739Z" fill="#00FF00"/>
		<path d="M20.5404 17.3739H17.6651V20.2493H20.5404V17.3739Z" fill="#00FF00"/>
		<path d="M6.16073 2.9942H3.28537V5.86957H6.16073V2.9942Z" fill="#00FF00"/>
		<path d="M23.4158 2.9942H20.5404V5.86957H23.4158V2.9942Z" fill="#00FF00"/>
		<path d="M6.16073 20.2493H3.28537V23.1246H6.16073V20.2493Z" fill="#00FF00"/>
		<path d="M23.4158 20.2493H20.5404V23.1246H23.4158V20.2493Z" fill="#00FF00"/>
		<path d="M11.9143 8.74782H9.03897V11.6232H11.9143V8.74782Z" fill="#00FF00"/>
		<path d="M17.6651 8.74782H14.7897V11.6232H17.6651V8.74782Z" fill="#00FF00"/>
		<path d="M11.9143 14.4986H9.03897V17.3739H11.9143V14.4986Z" fill="#00FF00"/>
		<path d="M17.6651 14.4986H14.7897V17.3739H17.6651V14.4986Z" fill="#00FF00"/>
		<path d="M14.7897 11.6232H11.9144V14.4985H14.7897V11.6232Z" fill="#00FF00"/>
		</svg>
	</div>
