const manifestUri = 'https://unifi-live2.secureswiftcontent.com/Content/DASH/Live/channel(TV3)/master.mpd';

    async function init() {
      const video = document.getElementById('video');
      const ui = video['ui'];
      const controls = ui.getControls();
      const player = controls.getPlayer();
      
      player.configure({
  drm: {
    clearKeys: {
      // 'key-id-in-hex': 'key-in-hex',
        'ce43641a061a44fb9d95d986cfc9a68f': '3d63855ca5cdfcfb765f306b98bcc646'
    }
  }
});

      window.player = player;
      window.ui = ui;
      window.controls = controls;

      player.addEventListener("error", onPlayerErrorEvent);
      controls.addEventListener("error", onUIErrorEvent);

      try {
        await player.load(manifestUri);
        console.log('The video has now been loaded!');
      } catch (error) {
        onPlayerError(error);
      }

      function onPlayerErrorEvent(errorEvent) {
        onPlayerError(event.detail);
      }

      function onPlayerError(error) {
        console.error('Error code', error.code + ':', 'Video could not be loaded!', '[Media not found].');
      }

      function onUIErrorEvent(errorEvent) {
        onPlayerError(event.detail);
      }
    }

    function initFailed(errorEvent) {
      console.error('Unable to load the UI library!');
    }

    document.addEventListener('shaka-ui-loaded', init);
    document.addEventListener('shaka-ui-load-failed', initFailed);
