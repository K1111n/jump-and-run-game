/**
 * Main orientation check function - now refactored into smaller functions
 */
function checkOrientation() {
    const isMobile = detectMobileDevice();
    
    if (isMobile) {
        handleMobileOrientation();
    } else {
        handleDesktopOrientation();
    }
}

/**
 * Detects if the device is mobile based on user agent and screen size
 * @returns {boolean} True if device is mobile
 */
function detectMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
           window.innerWidth <= 1023;
}

/**
 * Handles orientation for mobile devices
 */
function handleMobileOrientation() {
    if (isPortraitMode()) {
        showPortraitMessage();
    } else {
        showLandscapeMode();
    }
}

/**
 * Handles orientation for desktop devices
 */
function handleDesktopOrientation() {
    const elements = getOrientationElements();
    
    hideOrientationMessage(elements);
    hideMobileControls(elements);
    setupDesktopCanvas(elements);
    showTitle(elements);
    enableBodyScroll();
}

/**
 * Checks if device is in portrait mode
 * @returns {boolean} True if in portrait mode
 */
function isPortraitMode() {
    return window.innerHeight > window.innerWidth;
}

/**
 * Gets all orientation-related DOM elements
 * @returns {Object} Object containing all relevant elements
 */
function getOrientationElements() {
    return {
        orientationMsg: document.getElementById('orientation-message'),
        mobileControls: document.getElementById('mobile-controls'),
        canvas: document.getElementById('canvas'),
        title: document.querySelector('h1')
    };
}

/**
 * Shows the portrait orientation message and hides other elements
 */
function showPortraitMessage() {
    const elements = getOrientationElements();
    
    showElement(elements.orientationMsg);
    hideElement(elements.canvas);
    hideElement(elements.mobileControls);
    showElement(elements.title);
}

/**
 * Sets up landscape mode for mobile devices
 */
function showLandscapeMode() {
    const elements = getOrientationElements();
    
    hideOrientationMessage(elements);
    setupMobileCanvas(elements);
    showMobileControls(elements);
    hideTitle(elements);
    disableBodyScroll();
}

/**
 * Sets up canvas for mobile landscape mode
 * @param {Object} elements - DOM elements object
 */
function setupMobileCanvas(elements) {
    if (elements.canvas) {
        showElement(elements.canvas);
        
        const gameAspectRatio = 720 / 480;
        const screenAspectRatio = window.innerWidth / window.innerHeight;
        
        let canvasWidth, canvasHeight;
        
        if (screenAspectRatio > gameAspectRatio) {
            canvasHeight = window.innerHeight;
            canvasWidth = canvasHeight * gameAspectRatio;
        } else {
            canvasWidth = window.innerWidth;
            canvasHeight = canvasWidth / gameAspectRatio;
        }
        
        elements.canvas.style.width = canvasWidth + 'px';
        elements.canvas.style.height = canvasHeight + 'px';
        elements.canvas.width = 720;
        elements.canvas.height = 480;
    }
}

/**
 * Sets up canvas for desktop mode
 * @param {Object} elements - DOM elements object
 */
function setupDesktopCanvas(elements) {
    if (elements.canvas) {
        showElement(elements.canvas);
        elements.canvas.style.width = '720px';
        elements.canvas.style.height = '480px';
        elements.canvas.width = 720;
        elements.canvas.height = 480;
    }
}

/**
 * Shows mobile controls
 * @param {Object} elements - DOM elements object
 */
function showMobileControls(elements) {
    if (elements.mobileControls) {
        elements.mobileControls.style.display = 'block';
    }
}

/**
 * Hides mobile controls
 * @param {Object} elements - DOM elements object
 */
function hideMobileControls(elements) {
    if (elements.mobileControls) {
        elements.mobileControls.style.display = 'none';
    }
}

/**
 * Hides the orientation message
 * @param {Object} elements - DOM elements object
 */
function hideOrientationMessage(elements) {
    if (elements.orientationMsg) {
        elements.orientationMsg.style.display = 'none';
    }
}

/**
 * Shows the title element
 * @param {Object} elements - DOM elements object
 */
function showTitle(elements) {
    if (elements.title) {
        elements.title.style.display = 'block';
    }
}

/**
 * Hides the title element
 * @param {Object} elements - DOM elements object
 */
function hideTitle(elements) {
    if (elements.title) {
        elements.title.style.display = 'none';
    }
}

/**
 * Shows a DOM element
 * @param {HTMLElement} element - Element to show
 */
function showElement(element) {
    if (element) {
        element.style.display = 'block';
    }
}

/**
 * Hides a DOM element
 * @param {HTMLElement} element - Element to hide
 */
function hideElement(element) {
    if (element) {
        element.style.display = 'none';
    }
}

/**
 * Disables body scrolling for mobile fullscreen mode
 */
function disableBodyScroll() {
    document.body.style.overflow = 'hidden';
}

/**
 * Enables body scrolling for desktop mode
 */
function enableBodyScroll() {
    document.body.style.overflow = 'visible';
}

// Event listeners for orientation changes
window.addEventListener('orientationchange', () => {
    setTimeout(checkOrientation, 100); 
});
window.addEventListener('resize', checkOrientation);