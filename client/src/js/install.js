const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Handler to the `beforeinstallprompt` event that saves the event
window.addEventListener('beforeinstallprompt', (e) => {
    window.deferredPrompt = e;
    butInstall.classList.toggle('hidden', false);
});

// Handler on the `butInstall` element that triggers the `deferredPrompt` event
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    } 
  
    promptEvent.prompt();
    
    window.deferredPrompt = null;
    
    butInstall.classList.toggle('hidden', true);
});

// Handler for the `appinstalled` event that clears the deferredPrompt global
window.addEventListener('appinstalled', (e) => {
    window.deferredPrompt = null
});
