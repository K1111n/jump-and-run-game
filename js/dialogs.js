/**
 * Shows the controls dialog
 */
function showControls() {
    controlsDialog.showModal();
}

/**
 * Closes the controls dialog
 */
function closeControls() {
    controlsDialog.close();
}

/**
 * displays the end game dialog based on win/loss
 * @param {boolean} won 
 */
function showEndDialog(won) {
    pauseAllAnimations();
    if (world) {
        world = null;
    }
    if (soundManager) {
        soundManager.stopBackgroundMusic();
        if (won) {
            winDialog.showModal();
            soundManager.play('youwon');
        } else {
            loseDialog.showModal();
            soundManager.play('youlost');
        }
    }
    window.addEventListener('keydown', handleEnterStart);
}

/**
 * Shows the impressum dialog
 */
function showImpressum() {
    const impressumDialog = document.getElementById('impressumDialog');
    if (impressumDialog) {
        impressumDialog.showModal();
    }
}
/**
 * Closes the impressum dialog
 */
function closeImpressum() {
    const impressumDialog = document.getElementById('impressumDialog');
    if (impressumDialog) {
        impressumDialog.close();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const impressumDialog = document.getElementById('impressumDialog');
        if (impressumDialog && impressumDialog.open) {
            closeImpressum();
        }
    }
});

function initMuteButton() {
    const muteBtn = document.getElementById('mute-btn');
    if (muteBtn) {
        muteBtn.addEventListener('click', () => {
            if (soundManager) {
                soundManager.toggleMute();
            }
        });
        
        if (soundManager) {
            soundManager.updateMuteButton();
        }
    }
}

/**
 * Enables mobile controls (responsive design mode)
 */
function enableMobileControls() {
    const mobileControls = document.getElementById('mobile-controls');
    if (mobileControls) {
        mobileControls.classList.remove('mobile-controls-hidden');
        mobileControls.classList.add('force-show');
    }
}

/**
 * Disables mobile controls (desktop design mode)
 */
function disableMobileControls() {
    const mobileControls = document.getElementById('mobile-controls');
    if (mobileControls) {
        mobileControls.classList.add('mobile-controls-hidden');
        mobileControls.classList.remove('force-show');
    }
}


let animationsPaused = false;
let pausedIntervals = [];

function pauseAllAnimations() {
    animationsPaused = true;
    if (world) {
        world.pauseAnimations = true;
    }
}

function resumeAllAnimations() {
    animationsPaused = false;
    if (world) {
        world.pauseAnimations = false;
    }
}
