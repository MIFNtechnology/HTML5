async function init() {
	const video = document.getElementById('video');
    const ui = video['ui'];
    const controls = ui.getControls();
    const player = controls.getPlayer();
    player.configure({
    	drm: {
    	clearKeys: {
    	'1a05bebf706408431a390c3f9f40f410': '89c5ff9f8e65c7fe966afbd2f9128e5f'
    }
    }
    });
    player.setTextTrackVisibility(true); // Auto ON caption
    window.player = player;
    window.ui = ui;
    player.addEventListener('error', onPlayerErrorEvent);
    controls.addEventListener('error', onUIErrorEvent);
    try {
        await player.load('https://linearjitp-playback.astro.com.my/dash-wv/linear/509/default_ott.mpd');
        console.log('✅ Stream loaded!');
        } catch (error) {
        	onPlayerError(error);
        }
        }
        function onPlayerErrorEvent(errorEvent) { onPlayerError(event.detail); }
        function onPlayerError(error) { console.error('Error code', error.code, 'object', error); }
        function onUIErrorEvent(errorEvent) { onPlayerError(event.detail); }
        function initFailed(errorEvent) { console.error('❌ UI load failed!'); }
        document.addEventListener('shaka-ui-loaded', init);
        document.addEventListener('shaka-ui-load-failed', initFailed);